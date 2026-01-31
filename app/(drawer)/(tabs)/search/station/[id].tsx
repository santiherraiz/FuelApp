import { useStationDetailsScreen } from '@/hooks/useStationDetails';
import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { ActivityIndicator, Image, ScrollView, Text, TouchableOpacity, View } from 'react-native';

export default function StationDetailsScreen() {
    const { station, history, isLoading, error } = useStationDetailsScreen();

    if (isLoading) {
        return (
            <View className="flex-1 justify-center items-center bg-background">
                <ActivityIndicator size="large" color="#3B82F6" />
                <Text className="mt-4 text-text-secondary font-medium">Obteniendo detalles...</Text>
            </View>
        );
    }

    if (error || !station) {
        return (
            <View className="flex-1 justify-center items-center bg-background p-6">
                <Ionicons name="alert-circle-outline" size={48} color="#EF4444" />
                <Text className="text-text-primary text-xl font-bold mt-4">No disponible</Text>
                <Text className="text-text-secondary text-center mt-2">No se pudo encontrar la información detallada de esta estación.</Text>
            </View>
        );
    }

    return (
        <ScrollView className="flex-1 bg-background" bounces={false}>
            {/* Header Content */}
            <View className="relative">
                <Image
                    source={{ uri: 'https://images.unsplash.com/photo-1545147980-c994176e6f8a?q=80&w=400&h=300&auto=format&fit=crop' }}
                    className="w-full h-80 bg-slate-800"
                />
                <View className="absolute bottom-0 w-full h-40 bg-gradient-to-t from-black/80 to-transparent" />

                <View className="absolute bottom-0 p-6 w-full pb-10">
                    <View className="bg-secondary/90 self-start px-2 py-1 rounded-md mb-2">
                        <Text className="text-[10px] text-white font-bold uppercase tracking-widest">Estación de Servicio</Text>
                    </View>
                    <Text className="text-3xl font-black text-white uppercase tracking-tighter" numberOfLines={2}>
                        {station.nombre}
                    </Text>
                    <View className="flex-row items-center mt-2">
                        <Ionicons name="location-sharp" size={16} color="#3B82F6" />
                        <Text className="text-slate-200 text-sm ml-1 font-medium italic">{station.direccion}</Text>
                    </View>
                </View>
            </View>

            {/* Interaction Layer */}
            <View className="p-5 -mt-8 bg-background rounded-t-[32px] shadow-2xl">
                <View className="flex-row justify-between mb-8">
                    <TouchableOpacity className="flex-1 bg-primary h-14 rounded-2xl mr-2 flex-row items-center justify-center shadow-lg active:scale-95 transition-transform">
                        <Ionicons name="map" size={22} color="white" />
                        <Text className="text-white font-black ml-2 uppercase text-xs">Cómo llegar</Text>
                    </TouchableOpacity>
                    <TouchableOpacity className="w-14 h-14 bg-surface border border-slate-100 rounded-2xl ml-2 items-center justify-center shadow-sm active:bg-slate-50">
                        <Ionicons name="heart-outline" size={24} color="#64748B" />
                    </TouchableOpacity>
                </View>

                {/* Features / Prices Section */}
                <View className="mb-6">
                    <Text className="text-lg font-black text-primary mb-4 uppercase tracking-tighter">Precios Actuales</Text>

                    <View className="bg-surface rounded-3xl p-6 border border-slate-50 shadow-sm mb-6" style={{ elevation: 2 }}>
                        {station.precios && station.precios.length > 0 ? (
                            station.precios.map((precio, index) => (
                                <View key={index} className="flex-row justify-between items-center mb-4 last:mb-0">
                                    <Text className="text-text-primary font-bold">{precio.tipo}</Text>
                                    <View className="flex-row items-baseline bg-primary/10 px-3 py-1.5 rounded-xl">
                                        <Text className="text-lg font-black text-primary">{precio.precio.toFixed(3)}</Text>
                                        <Text className="text-[10px] text-text-tertiary ml-1 font-bold">€/L</Text>
                                    </View>
                                </View>
                            ))
                        ) : (
                            <Text className="text-text-secondary text-center">No hay información de precios disponible.</Text>
                        )}
                    </View>

                    <Text className="text-lg font-black text-primary mb-4 uppercase tracking-tighter">Historial Reciente</Text>
                    <View className="bg-surface rounded-3xl p-6 border border-slate-50 shadow-sm" style={{ elevation: 2 }}>
                        <View className="flex-row items-center justify-between mb-6 border-b border-slate-50 pb-4">
                            <View className="flex-row items-center">
                                <View className="w-10 h-10 rounded-full bg-emerald-50 items-center justify-center mr-3">
                                    <Ionicons name="trending-up" size={20} color="#10B981" />
                                </View>
                                <Text className="text-text-primary font-bold">Historial</Text>
                            </View>
                            <Text className="text-[10px] text-text-tertiary font-bold uppercase tracking-widest">Últimos datos</Text>
                        </View>

                        {history && history.data && history.data.length > 0 ? (
                            <View>
                                {history.data.slice(0, 5).map((h, index) => (
                                    <View
                                        key={index}
                                        className="flex-row justify-between items-center mb-4 last:mb-0"
                                    >
                                        <View>
                                            <Text className="text-text-secondary font-bold text-xs">
                                                {new Date(h.timestamp).toLocaleDateString(undefined, { day: 'numeric', month: 'short' })}
                                            </Text>
                                        </View>
                                        <View className="flex-row items-baseline bg-slate-50 px-3 py-1.5 rounded-xl">
                                            <Text className="text-lg font-black text-primary">{h.price.toFixed(3)}</Text>
                                            <Text className="text-[10px] text-text-tertiary ml-1 font-bold">€/L</Text>
                                        </View>
                                    </View>
                                ))}
                            </View>
                        ) : (
                            <View className="py-10 items-center">
                                <View className="w-16 h-16 bg-slate-50 rounded-full items-center justify-center mb-3">
                                    <Ionicons name="stats-chart-outline" size={32} color="#CBD5E1" />
                                </View>
                                <Text className="text-text-tertiary font-medium">No hay datos históricos para esta estación.</Text>
                            </View>
                        )}
                    </View>
                </View>

                {/* Additional Info */}
                <View className="bg-slate-900 rounded-3xl p-8 mb-10 overflow-hidden relative">
                    <View className="relative z-10">
                        <Text className="text-white text-xl font-black uppercase tracking-tighter mb-2">Información de Localización</Text>
                        <Text className="text-slate-400 text-sm leading-relaxed">
                            Esta estación se encuentra en {station.direccion}. Puedes verla en el mapa pulsando el botón superior.
                        </Text>
                    </View>
                    <Ionicons name="location" size={120} color="rgba(255,255,255,0.05)" style={{ position: 'absolute', right: -20, bottom: -20 }} />
                </View>
            </View>
        </ScrollView>
    );
}