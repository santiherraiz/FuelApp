import { EstacionList } from '@/src/api/types';
import { Card } from '@/src/components/Card';
import { useEstacionesScreen } from '@/src/hooks/useEstaciones';
import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { ActivityIndicator, FlatList, Text, View } from 'react-native';

export default function EstacionesScreen() {
    const { estaciones, isLoading, error, handleEstacionPress } = useEstacionesScreen();

    if (isLoading) {
        return (
            <View className="flex-1 justify-center items-center bg-background">
                <ActivityIndicator size="large" color="#3B82F6" />
                <Text className="mt-4 text-text-secondary font-medium">Localizando estaciones...</Text>
            </View>
        );
    }

    if (error) {
        return (
            <View className="flex-1 justify-center items-center bg-background p-6">
                <View className="w-20 h-20 rounded-full bg-red-50 items-center justify-center mb-4">
                    <Ionicons name="alert-circle-outline" size={40} color="#EF4444" />
                </View>
                <Text className="text-text-primary text-xl font-bold">Error de conexión</Text>
                <Text className="text-text-secondary text-center mt-2">No se pudieron cargar las estaciones en esta zona.</Text>
            </View>
        );
    }

    const renderItem = ({ item }: { item: EstacionList }) => (
        <Card
            className="mx-5 mb-4 p-0 overflow-hidden border-none shadow-md"
            onPress={() => handleEstacionPress(item)}
            style={{ elevation: 3 }}
        >
            <View className="flex-row">
                <View className="w-2 bg-secondary" />
                <View className="flex-1 p-4 flex-row items-center">
                    <View className="w-12 h-12 rounded-full bg-slate-50 items-center justify-center mr-4">
                        <Ionicons name="location-sharp" size={24} color="#0F172A" />
                    </View>

                    <View className="flex-1">
                        <Text className="text-base font-black text-text-primary uppercase tracking-tight" numberOfLines={1}>
                            {item.nombre}
                        </Text>
                        <View className="flex-row items-center mt-1">
                            <Ionicons name="location-outline" size={14} color="#64748B" />
                            <Text className="text-xs text-text-secondary ml-1 flex-1" numberOfLines={1}>
                                {item.direccion}
                            </Text>
                        </View>

                        <View className="mt-3 bg-emerald-50 self-start px-2 py-1 rounded-md flex-row items-center">
                            <Ionicons name="checkmark-circle" size={12} color="#10B981" />
                            <Text className="text-[10px] text-emerald-700 ml-1 font-bold uppercase">Precios hoy</Text>
                        </View>
                    </View>

                    <View className="ml-2 bg-slate-50 p-2 rounded-full">
                        <Ionicons name="chevron-forward" size={16} color="#94A3B8" />
                    </View>
                </View>
            </View>
        </Card>
    );

    return (
        <View className="flex-1 bg-background">
            <FlatList
                data={estaciones}
                keyExtractor={(item) => item.idEstacion.toString()}
                renderItem={renderItem}
                ListHeaderComponent={() => (
                    <View className="px-5 py-6">
                        <Text className="text-2xl font-black text-primary">Gasolineras Cercanas</Text>
                        <Text className="text-text-secondary text-base">Hemos encontrado {estaciones?.length || 0} estaciones disponibles.</Text>
                    </View>
                )}
                contentContainerStyle={{ paddingBottom: 40 }}
                ListEmptyComponent={
                    <View className="items-center justify-center py-20 px-10">
                        <Ionicons name="search-outline" size={64} color="#E2E8F0" />
                        <Text className="text-text-secondary text-center mt-4">
                            No se encontraron estaciones en esta zona. Prueba con otra localidad.
                        </Text>
                    </View>
                }
            />
        </View>
    );
}