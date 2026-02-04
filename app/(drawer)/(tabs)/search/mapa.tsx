import { Estacion } from '@/api/types';
import { getEstacionesPorRadioAction } from '@/core/actions/estaciones.action';
import { Ionicons } from '@expo/vector-icons';
import * as Location from 'expo-location';
import React, { useEffect, useRef, useState } from 'react';
import { ActivityIndicator, Alert, Dimensions, Text, TextInput, TouchableOpacity, View } from 'react-native';
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps';

const PAGE_SIZE = 20;

export default function MapaRadioScreen() {
    const [location, setLocation] = useState<Location.LocationObject | null>(null);
    const [radio, setRadio] = useState('5');
    const [stations, setStations] = useState<Estacion[]>([]);
    const [loading, setLoading] = useState(false);

    const [currentPage, setCurrentPage] = useState(0);
    const [displayedStations, setDisplayedStations] = useState<Estacion[]>([]);

    const mapRef = useRef<MapView>(null);

    useEffect(() => {
        (async () => {
            let { status } = await Location.requestForegroundPermissionsAsync();
            if (status !== 'granted') {
                Alert.alert('Permiso denegado', 'Necesitamos tu ubicación para buscar gasolineras cercanas.');
                return;
            }

            let currentLocation = await Location.getCurrentPositionAsync({});
            setLocation(currentLocation);
        })();
    }, []);

    const searchStations = async () => {
        if (!location) {
            Alert.alert('Espera', 'Aún obteniendo tu ubicación...');
            return;
        }

        const radioNum = parseInt(radio);
        if (isNaN(radioNum) || radioNum <= 0) {
            Alert.alert('Error', 'Introduce un radio válido (ej: 5, 10, 20)');
            return;
        }

        setLoading(true);
        try {
            const result = await getEstacionesPorRadioAction(
                location.coords.latitude,
                location.coords.longitude,
                radioNum
            );

            setStations(result);
            setCurrentPage(0);
            updatePagination(result, 0);

            if (result.length > 0 && mapRef.current) {
                mapRef.current.animateToRegion({
                    latitude: location.coords.latitude,
                    longitude: location.coords.longitude,
                    latitudeDelta: 0.1 * (radioNum / 5),
                    longitudeDelta: 0.1 * (radioNum / 5),
                }, 1000);
            }

        } catch (error) {
            console.error(error);
            Alert.alert('Error', 'No se pudieron cargar las estaciones');
        } finally {
            setLoading(false);
        }
    };

    const updatePagination = (allStations: Estacion[], page: number) => {
        const start = page * PAGE_SIZE;
        const end = start + PAGE_SIZE;
        const slice = allStations.slice(start, end);
        setDisplayedStations(slice);
    };

    const nextPage = () => {
        if ((currentPage + 1) * PAGE_SIZE < stations.length) {
            const newPage = currentPage + 1;
            setCurrentPage(newPage);
            updatePagination(stations, newPage);
        }
    };

    const prevPage = () => {
        if (currentPage > 0) {
            const newPage = currentPage - 1;
            setCurrentPage(newPage);
            updatePagination(stations, newPage);
        }
    };

    return (
        <View className="flex-1 bg-background">
            <View className="absolute top-12 z-10 w-full px-4">
                <View className="bg-white/90 p-4 rounded-2xl shadow-lg flex-row items-center gap-3 border border-slate-200">
                    <View className="flex-1">
                        <Text className="text-xs font-bold text-text-tertiary uppercase mb-1">Radio (Km)</Text>
                        <TextInput
                            value={radio}
                            onChangeText={setRadio}
                            keyboardType="numeric"
                            className="bg-slate-100 rounded-lg px-3 py-2 text-primary font-bold text-lg"
                        />
                    </View>
                    <TouchableOpacity
                        onPress={searchStations}
                        disabled={loading}
                        className="bg-primary h-12 w-12 rounded-xl items-center justify-center active:bg-blue-600"
                    >
                        {loading ? (
                            <ActivityIndicator color="white" />
                        ) : (
                            <Ionicons name="search" size={24} color="white" />
                        )}
                    </TouchableOpacity>
                </View>
            </View>

            <MapView
                ref={mapRef}
                style={{ width: Dimensions.get('window').width, height: Dimensions.get('window').height }}
                provider={PROVIDER_GOOGLE}
                showsUserLocation={true}
                initialRegion={{
                    latitude: 40.416775,
                    longitude: -3.703790,
                    latitudeDelta: 0.0922,
                    longitudeDelta: 0.0421,
                }}
            >
                {displayedStations.map((station, index) => (
                    <Marker
                        key={`${station.idEstacion}-${index}`}
                        coordinate={{
                            latitude: station.latitud,
                            longitude: station.longitud,
                        }}
                        title={station.nombre}
                        description={station.direccion}
                    >
                        <View className="bg-white p-1 rounded-full border-2 border-primary shadow-sm">
                            <Ionicons name="location" size={20} color="#3B82F6" />
                        </View>
                    </Marker>
                ))}
            </MapView>

            {stations.length > 0 && (
                <View className="absolute bottom-8 w-full px-4 items-center">
                    <View className="bg-white/90 px-4 py-3 rounded-2xl shadow-xl flex-row items-center justify-between w-full border border-slate-200">

                        <TouchableOpacity
                            onPress={prevPage}
                            disabled={currentPage === 0}
                            className={`p-2 rounded-lg ${currentPage === 0 ? 'opacity-30' : 'bg-slate-100'}`}
                        >
                            <Ionicons name="chevron-back" size={24} color="#0F172A" />
                        </TouchableOpacity>

                        <View className="items-center">
                            <Text className="font-black text-primary text-lg">
                                {displayedStations.length} <Text className="text-xs font-normal text-slate-500">estaciones</Text>
                            </Text>
                            <Text className="text-xs text-slate-400 font-bold">
                                Pág {currentPage + 1} de {Math.ceil(stations.length / PAGE_SIZE)}
                            </Text>
                        </View>

                        <TouchableOpacity
                            onPress={nextPage}
                            disabled={(currentPage + 1) * PAGE_SIZE >= stations.length}
                            className={`p-2 rounded-lg ${(currentPage + 1) * PAGE_SIZE >= stations.length ? 'opacity-30' : 'bg-slate-100'}`}
                        >
                            <Ionicons name="chevron-forward" size={24} color="#0F172A" />
                        </TouchableOpacity>

                    </View>
                </View>
            )}
        </View>
    );
}