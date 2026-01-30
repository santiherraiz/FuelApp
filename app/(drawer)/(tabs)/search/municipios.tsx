import { getMunicipiosByProvincia } from '@/src/api/fuelApi';
import { useQuery } from '@tanstack/react-query';
import { useLocalSearchParams, useNavigation, useRouter } from 'expo-router';
import React, { useEffect } from 'react';
import { ActivityIndicator, FlatList, Text, TouchableOpacity, View } from 'react-native';

export default function MunicipiosScreen() {
    const router = useRouter();
    const { idProvincia, nombreProvincia } = useLocalSearchParams<{ idProvincia: string, nombreProvincia: string }>();
    const navigation = useNavigation();

    useEffect(() => {
        if (nombreProvincia) {
            navigation.setOptions({ title: nombreProvincia });
        }
    }, [nombreProvincia]);

    const { data: municipios, isLoading, error } = useQuery({
        queryKey: ['municipios', idProvincia],
        queryFn: () => getMunicipiosByProvincia(Number(idProvincia!)),
        enabled: !!idProvincia
    });

    if (isLoading) {
        return <View className="flex-1 justify-center items-center"><ActivityIndicator size="large" /></View>;
    }

    if (error) {
        return <View className="flex-1 justify-center items-center"><Text className="text-red-500">Error al cargar municipios</Text></View>;
    }

    return (
        <View className="flex-1 bg-white p-4">
            <FlatList
                data={municipios}
                keyExtractor={(item) => item.idMunicipio.toString()}
                renderItem={({ item }) => (
                    <TouchableOpacity
                        className="p-4 border-b border-gray-200"
                        onPress={() => router.push({
                            pathname: '/(drawer)/(tabs)/search/estaciones', // Corrected path
                            params: { idMunicipio: item.idMunicipio, nombreMunicipio: item.nombreMunicipio }
                        })}
                    >
                        <Text className="text-lg">{item.nombreMunicipio}</Text>
                    </TouchableOpacity>
                )}
            />
        </View>
    );
}
