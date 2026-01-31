import { Card } from '@/components/Card';
import { useMunicipiosScreen } from '@/hooks/useMunicipios';
import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { ActivityIndicator, FlatList, Text, View } from 'react-native';

export default function MunicipiosScreen() {
    const { municipios, isLoading, error, handleMunicipioPress } = useMunicipiosScreen();

    if (isLoading) {
        return (
            <View className="flex-1 justify-center items-center bg-background">
                <ActivityIndicator size="large" color="#3B82F6" />
                <Text className="mt-4 text-text-secondary font-medium">Buscando localidades...</Text>
            </View>
        );
    }

    if (error) {
        return (
            <View className="flex-1 justify-center items-center bg-background p-6">
                <View className="w-16 h-16 rounded-full bg-red-50 items-center justify-center mb-4">
                    <Ionicons name="alert-circle-outline" size={32} color="#EF4444" />
                </View>
                <Text className="text-text-secondary text-center">No se pudieron cargar los municipios.</Text>
            </View>
        );
    }

    return (
        <View className="flex-1 bg-background">
            <FlatList
                data={municipios}
                keyExtractor={(item) => item.idMunicipio.toString()}
                ListHeaderComponent={() => (
                    <View className="px-5 py-6">
                        <Text className="text-2xl font-black text-primary">Localidades</Text>
                        <Text className="text-text-secondary text-base">¿En qué municipio quieres buscar hoy?</Text>
                    </View>
                )}
                renderItem={({ item }) => (
                    <Card
                        className="mx-5 mb-2.5 flex-row items-center justify-between border-slate-100"
                        onPress={() => handleMunicipioPress(item)}
                    >
                        <View className="flex-row items-center">
                            <View className="w-2 h-2 rounded-full bg-secondary mr-3" />
                            <Text className="text-base text-text-primary font-semibold">{item.nombreMunicipio}</Text>
                        </View>
                        <Ionicons name="chevron-forward" size={18} color="#CBD5E1" />
                    </Card>
                )}
                contentContainerStyle={{ paddingBottom: 30 }}
            />
        </View>
    );
}


