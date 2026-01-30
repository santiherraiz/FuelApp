import { getEstacionDetalle, getHistoricoEstacion } from '@/src/api/fuelApi';
import { useQuery } from '@tanstack/react-query';
import { useLocalSearchParams, useNavigation } from 'expo-router';
import React, { useEffect } from 'react';
import { ActivityIndicator, Image, ScrollView, Text, View } from 'react-native';

export default function StationDetailsScreen() {
    const { id, stationName } = useLocalSearchParams<{ id: string, stationName: string }>();
    const navigation = useNavigation();

    useEffect(() => {
        if (stationName) {
            navigation.setOptions({ title: stationName });
        }
    }, [stationName]);

    const { data: station, isLoading: loadingStation } = useQuery({
        queryKey: ['station', id],
        queryFn: () => getEstacionDetalle(Number(id!))
    });

    const { data: history, isLoading: loadingHistory } = useQuery({
        queryKey: ['history', id],
        queryFn: () => getHistoricoEstacion(Number(id!))
    });

    if (loadingStation || loadingHistory) {
        return <View className="flex-1 justify-center items-center"><ActivityIndicator size="large" /></View>;
    }

    if (!station) {
        return <View className="flex-1 justify-center items-center"><Text>No se encontró la estación</Text></View>;
    }

    return (
        <ScrollView className="flex-1 bg-white">
            <Image
                source={{ uri: 'https://via.placeholder.com/400x200' }}
                className="w-full h-48 bg-gray-300"
            />
            <View className="p-4">
                <Text className="text-2xl font-bold mb-2">{station.nombre}</Text>
                <Text className="text-gray-600 mb-1">{station.direccion}</Text>

                <Text className="text-xl font-semibold mb-2">Precios (Histórico Reciente)</Text>
                {history && history.data && history.data.length > 0 ? (
                    history.data.map((h, index) => (
                        <View key={index} className="flex-row justify-between py-2 border-b border-gray-100">
                            <Text className="text-gray-600">{new Date(h.timestamp).toLocaleDateString()}</Text>
                            <Text className="font-medium">{h.price}€</Text>
                        </View>
                    ))
                ) : (
                    <Text className="text-gray-500">No hay histórico disponible.</Text>
                )}
            </View>
        </ScrollView>
    );
}
