import { getEstacionesByMunicipio } from '@/src/api/fuelApi';
import { EstacionList } from '@/src/api/types';
import { useQuery } from '@tanstack/react-query';
import { useLocalSearchParams, useNavigation, useRouter } from 'expo-router';
import React, { useEffect } from 'react';
import { ActivityIndicator, FlatList, Image, Text, TouchableOpacity, View } from 'react-native';

export default function EstacionesScreen() {
    const router = useRouter();
    const { idMunicipio, nombreMunicipio } = useLocalSearchParams<{ idMunicipio: string, nombreMunicipio: string }>();
    const navigation = useNavigation();

    useEffect(() => {
        if (nombreMunicipio) {
            navigation.setOptions({ title: nombreMunicipio });
        }
    }, [nombreMunicipio]);

    const { data: estaciones, isLoading, error } = useQuery({
        queryKey: ['estaciones', idMunicipio],
        queryFn: () => getEstacionesByMunicipio(Number(idMunicipio!)),
        enabled: !!idMunicipio
    });

    if (isLoading) {
        return <View className="flex-1 justify-center items-center"><ActivityIndicator size="large" /></View>;
    }

    if (error) {
        return <View className="flex-1 justify-center items-center"><Text className="text-red-500">Error al cargar estaciones</Text></View>;
    }

    const renderItem = ({ item }: { item: EstacionList }) => (
        <TouchableOpacity
            className="p-4 border-b border-gray-200 flex-row items-center"
            onPress={() => router.push({
                pathname: '/(drawer)/(tabs)/search/station/[id]',
                params: { id: item.idEstacion, stationName: item.nombre }
            })}
        >
            <Image
                source={{ uri: 'https://via.placeholder.com/50' }} // Generic image
                className="w-12 h-12 rounded mr-4 bg-gray-200"
            />
            <View className="flex-1">
                <Text className="text-lg font-bold">{item.nombre}</Text>
                <Text className="text-sm text-gray-600">{item.direccion}</Text>
                <View className="mt-2 flex-row flex-wrap">
                    {/* Prices not available in list view per API docs provided */}
                </View>
            </View>
        </TouchableOpacity>
    );

    return (
        <View className="flex-1 bg-white">
            <FlatList
                data={estaciones}
                keyExtractor={(item) => item.idEstacion.toString()}
                renderItem={renderItem}
            />
        </View>
    );
}
