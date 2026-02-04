import { getEstacionDetalleAction } from '@/core/actions/estaciones.action';
import { useQuery } from '@tanstack/react-query';
import { useLocalSearchParams, useNavigation } from 'expo-router';
import { useEffect } from 'react';

export const useStationDetailsScreen = () => {
    const { id: idParam, stationName } = useLocalSearchParams<{ id: string, stationName: string }>();
    const id = idParam ? Number(idParam) : undefined;

    const navigation = useNavigation();

    useEffect(() => {
        if (stationName) {
            navigation.setOptions({
                title: '',
                headerTransparent: true,
                headerTintColor: '#fff',
                headerShadowVisible: false,
            });
        }
    }, [stationName, navigation]);

    const { data: station, isLoading: loadingStation, error: stationError } = useQuery({
        queryKey: ['station', id],
        queryFn: () => getEstacionDetalleAction(id!),
        enabled: !!id,
        staleTime: 1000 * 60 * 60 * 24
    });

    const isLoading = loadingStation;
    const error = stationError;

    return {
        station,
        isLoading,
        error,
        id,
        stationName
    };
};