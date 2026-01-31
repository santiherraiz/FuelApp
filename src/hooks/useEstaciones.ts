import { getEstacionesByMunicipio } from '@/src/api/fuelApi';
import { useQuery } from '@tanstack/react-query';
import { useLocalSearchParams, useNavigation, useRouter } from 'expo-router';
import { useEffect } from 'react';
import { EstacionList } from '../api/types';

export const useEstaciones = (idMunicipio: string | number | null | undefined) => {
    return useQuery({
        queryKey: ['estaciones', idMunicipio],
        queryFn: () => getEstacionesByMunicipio(Number(idMunicipio)),
        enabled: !!idMunicipio
    });
};

export const useEstacionesScreen = () => {
    const router = useRouter();
    const { idMunicipio, nombreMunicipio } = useLocalSearchParams<{ idMunicipio: string, nombreMunicipio: string }>();
    const navigation = useNavigation();

    useEffect(() => {
        if (nombreMunicipio) {
            navigation.setOptions({
                title: nombreMunicipio,
                headerShadowVisible: false,
                headerStyle: { backgroundColor: '#F8FAFC' },
            });
        }
    }, [nombreMunicipio, navigation]);

    const { data: estaciones, isLoading, error } = useEstaciones(idMunicipio);

    const handleEstacionPress = (item: EstacionList) => {
        router.push({
            pathname: '/(drawer)/(tabs)/search/station/[id]',
            params: { id: item.idEstacion, stationName: item.nombre }
        });
    };

    return { estaciones, isLoading, error, handleEstacionPress };
};
