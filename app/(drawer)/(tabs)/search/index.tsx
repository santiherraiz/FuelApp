import { Card } from '@/src/components/Card';
import { useProvinciasScreen } from '@/src/hooks/useProvincias';
import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { ActivityIndicator, FlatList, Text, View } from 'react-native';

export default function ProvinciasScreen() {
    const { provincias, isLoading, error, handleProvinciaPress } = useProvinciasScreen();

    if (isLoading) {
        return (
            <View className="flex-1 justify-center items-center bg-background">
                <ActivityIndicator size="large" color="#3B82F6" />
                <Text className="mt-4 text-text-secondary font-medium italic">Buscando regiones...</Text>
            </View>
        );
    }

    if (error) {
        return (
            <View className="flex-1 justify-center items-center bg-background p-6">
                <View className="w-20 h-20 rounded-full bg-red-50 items-center justify-center mb-4">
                    <Ionicons name="alert-circle-outline" size={40} color="#EF4444" />
                </View>
                <Text className="text-text-primary text-xl font-bold">¡Vaya!</Text>
                <Text className="text-text-secondary text-center mt-2">
                    No hemos podido cargar las provincias. Por favor, comprueba tu conexión.
                </Text>
            </View>
        );
    }

    return (
        <View className="flex-1 bg-background">
            <FlatList
                data={provincias}
                keyExtractor={(item) => item.idProvincia.toString()}
                ListHeaderComponent={() => (
                    <View className="px-5 pt-8 pb-4">
                        <Text className="text-3xl font-extrabold text-primary tracking-tight">
                            Encuentra Gasolina
                        </Text>
                        <Text className="text-text-secondary text-base mt-1">
                            Selecciona una provincia para explorar estaciones de servicio.
                        </Text>

                        <View className="mt-8 mb-2 flex-row items-center border-b border-border pb-2">
                            <Ionicons name="location-sharp" size={18} color="#3B82F6" />
                            <Text className="ml-2 text-xs font-bold text-text-tertiary uppercase tracking-widest">
                                Provincias de España
                            </Text>
                        </View>
                    </View>
                )}
                renderItem={({ item }) => (
                    <Card
                        onPress={() => handleProvinciaPress(item)}
                        className="mx-5 mb-3 flex-row items-center justify-between border-none shadow-sm"
                        style={{ elevation: 2 }}
                    >
                        <View className="flex-row items-center">
                            <View className="w-12 h-12 rounded-xl bg-blue-50/50 items-center justify-center mr-4">
                                <Text className="text-lg font-bold text-secondary">
                                    {item.nombreProvincia.charAt(0)}
                                </Text>
                            </View>
                            <View>
                                <Text className="text-base text-text-primary font-bold">{item.nombreProvincia}</Text>
                                <Text className="text-xs text-text-tertiary">Explorar municipios</Text>
                            </View>
                        </View>
                        <View className="bg-slate-50 p-1.5 rounded-full">
                            <Ionicons name="chevron-forward" size={16} color="#94A3B8" />
                        </View>
                    </Card>
                )}
                contentContainerStyle={{ paddingBottom: 40 }}
            />
        </View>
    );
}


