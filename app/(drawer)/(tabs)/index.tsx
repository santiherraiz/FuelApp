import { Estacion } from '@/api/types';
import { getEstacionesPorRadioAction } from '@/core/actions/estaciones.action';
import { Ionicons } from '@expo/vector-icons';
import * as Location from 'expo-location';
import React, { useEffect, useRef, useState } from 'react';
import { ActivityIndicator, Alert, Dimensions, Text, TextInput, TouchableOpacity, View } from 'react-native';
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const PAGE_SIZE = 20;

export default function HomeScreen() {
  const insets = useSafeAreaInsets();

  const [location, setLocation] = useState<Location.LocationObject | null>(null);
  const [initialRegion, setInitialRegion] = useState<any>(null);

  const [radio, setRadio] = useState('5');
  const [stations, setStations] = useState<Estacion[]>([]);
  const [loading, setLoading] = useState(false);

  const [selectedStationIndex, setSelectedStationIndex] = useState(0);

  const mapRef = useRef<MapView>(null);

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        Alert.alert('Permiso necesario', 'Activa la ubicación para ver las gasolineras a tu alrededor.');
        return;
      }

      try {
        let currentLocation = await Location.getCurrentPositionAsync({});
        setLocation(currentLocation);

        setInitialRegion({
          latitude: currentLocation.coords.latitude,
          longitude: currentLocation.coords.longitude,
          latitudeDelta: 0.05,
          longitudeDelta: 0.05,
        });
      } catch (error) {
        Alert.alert('Error', 'No pudimos obtener tu ubicación');
      }
    })();
  }, []);

  const searchStations = async () => {
    if (!location) {
      Alert.alert('Espera', 'Aún estamos localizando tu posición...');
      return;
    }

    const radioNum = parseInt(radio);
    if (isNaN(radioNum) || radioNum <= 0) {
      Alert.alert('Error', 'El radio debe ser un número válido');
      return;
    }

    setLoading(true);
    try {
      const result = await getEstacionesPorRadioAction(
        location.coords.latitude,
        location.coords.longitude,
        radioNum
      );

      if (result.length === 0) {
        Alert.alert('Vaya', 'No hay gasolineras en ese rango.');
      }

      setStations(result);
      setSelectedStationIndex(0);

      if (result.length > 0 && mapRef.current) {
        const zoomDelta = (radioNum / 111) * 2.5;
        mapRef.current.animateToRegion({
          latitude: location.coords.latitude,
          longitude: location.coords.longitude,
          latitudeDelta: zoomDelta,
          longitudeDelta: zoomDelta,
        }, 1000);
      }

    } catch (error) {
      console.error(error);
      Alert.alert('Error', 'Fallo al buscar estaciones');
    } finally {
      setLoading(false);
    }
  };

  const nextStation = () => {
    if (selectedStationIndex < stations.length - 1) {
      const newIndex = selectedStationIndex + 1;
      setSelectedStationIndex(newIndex);
      focusOnStation(stations[newIndex]);
    }
  };

  const prevStation = () => {
    if (selectedStationIndex > 0) {
      const newIndex = selectedStationIndex - 1;
      setSelectedStationIndex(newIndex);
      focusOnStation(stations[newIndex]);
    }
  };

  const focusOnStation = (station: Estacion) => {
    if (mapRef.current) {
      mapRef.current.animateToRegion({
        latitude: station.latitud,
        longitude: station.longitud,
        latitudeDelta: 0.01,
        longitudeDelta: 0.01,
      }, 500);
    }
  };

  if (!initialRegion) {
    return (
      <View className="flex-1 justify-center items-center bg-white">
        <ActivityIndicator size="large" color="#0a7ea4" />
        <Text className="mt-4 text-gray-500 font-medium">Localizando tu posición...</Text>
      </View>
    );
  }

  return (
    <View className="flex-1 bg-white relative">

      <MapView
        ref={mapRef}
        style={{ width: Dimensions.get('window').width, height: Dimensions.get('window').height }}
        provider={PROVIDER_GOOGLE}
        showsUserLocation={true}
        initialRegion={initialRegion}
      >
        {stations.map((station, index) => (
          <Marker
            key={`${station.idEstacion}-${index}`}
            coordinate={{
              latitude: station.latitud,
              longitude: station.longitud,
            }}
            title={station.nombre}
            description={station.direccion}
          >
            <View className={`p-1 rounded-full border shadow-sm ${selectedStationIndex === index ? 'bg-blue-500 border-white' : 'bg-white border-blue-500'}`}>
              <Ionicons name="location" size={24} color={selectedStationIndex === index ? 'white' : '#0a7ea4'} />
            </View>
          </Marker>
        ))}
      </MapView>

      <View
        className="absolute left-4 right-4 z-10"
        style={{ top: insets.top + 10 }}
      >
        <View className="bg-white p-3 rounded-2xl shadow-lg flex-row items-center gap-3 border border-gray-100">
          <View className="flex-1">
            <Text className="text-[10px] font-bold text-gray-400 uppercase ml-1">Radio (Km)</Text>
            <TextInput
              value={radio}
              onChangeText={setRadio}
              keyboardType="numeric"
              className="text-xl font-bold text-gray-800 p-0"
              placeholder="5"
            />
          </View>

          <TouchableOpacity
            onPress={searchStations}
            disabled={loading}
            className="bg-blue-600 h-12 w-12 rounded-xl items-center justify-center shadow-md active:opacity-80"
          >
            {loading ? (
              <ActivityIndicator color="white" />
            ) : (
              <Ionicons name="search" size={24} color="white" />
            )}
          </TouchableOpacity>
        </View>
      </View>

      {stations.length > 0 && (
        <View className="absolute bottom-6 left-4 right-4 items-center">
          <View className="bg-white px-4 py-3 rounded-2xl shadow-xl flex-row items-center justify-between w-full border border-gray-100">
            <TouchableOpacity
              onPress={prevStation}
              disabled={selectedStationIndex === 0}
              className={`p-2 rounded-full ${selectedStationIndex === 0 ? 'opacity-20' : 'bg-gray-100'}`}
            >
              <Ionicons name="arrow-back" size={20} color="#000" />
            </TouchableOpacity>

            <View className="items-center">
              <Text className="text-xs font-bold text-gray-400 uppercase">Gasolinera Seleccionada</Text>
              <Text className="font-bold text-gray-800 text-lg">
                {selectedStationIndex + 1} <Text className="text-sm font-normal text-gray-400">/ {stations.length}</Text>
              </Text>
              <Text className="text-xs text-blue-600 font-medium text-center" numberOfLines={1}>
                {stations[selectedStationIndex]?.nombre}
              </Text>
            </View>

            <TouchableOpacity
              onPress={nextStation}
              disabled={selectedStationIndex >= stations.length - 1}
              className={`p-2 rounded-full ${selectedStationIndex >= stations.length - 1 ? 'opacity-20' : 'bg-gray-100'}`}
            >
              <Ionicons name="arrow-forward" size={20} color="#000" />
            </TouchableOpacity>
          </View>
        </View>
      )}
    </View>
  );
}