import { getProvincias } from '@/src/api/fuelApi';
import { useQuery } from '@tanstack/react-query';
import { useRouter } from 'expo-router';
import React from 'react';
import { ActivityIndicator, FlatList, Text, TouchableOpacity, View } from 'react-native';

export default function ProvinciasScreen() {
    const router = useRouter();
    const { data: provincias, isLoading, error } = useQuery({
        queryKey: ['provincias'],
        queryFn: getProvincias
    });

    if (isLoading) {
        return <View className="flex-1 justify-center items-center"><ActivityIndicator size="large" /></View>;
    }

    if (error) {
        return <View className="flex-1 justify-center items-center"><Text className="text-red-500">Error al cargar provincias</Text></View>;
    }

    return (
        <View className="flex-1 bg-white p-4">
            <FlatList
                data={provincias}
                keyExtractor={(item) => item.idProvincia.toString()}
                renderItem={({ item }) => (
                    <TouchableOpacity
                        className="p-4 border-b border-gray-200"
                        onPress={() => router.push({
                            pathname: '/(drawer)/(tabs)/search/municipios',
                            params: { idProvincia: item.idProvincia, nombreProvincia: item.nombreProvincia }
                        })}
                    >
                        <Text className="text-lg">{item.nombreProvincia}</Text>
                    </TouchableOpacity>
                )}
            />
        </View>
    );
}
