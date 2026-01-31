import { getEstacionDetalleAction, getHistoricoEstacionAction } from '@/core/actions/estaciones.action';
import { useQuery } from '@tanstack/react-query';
import { useLocalSearchParams, useNavigation } from 'expo-router';
import { useEffect } from 'react';

export const useStationDetailsScreen = () => {
    const { id, stationName } = useLocalSearchParams<{ id: string, stationName: string }>();
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
        queryFn: () => getEstacionDetalleAction(Number(id!)),
        enabled: !!id,
        staleTime: 1000 * 60 * 60 * 24
    });

    const { data: history, isLoading: loadingHistory, error: historyError } = useQuery({
        queryKey: ['history', id],
        queryFn: () => getHistoricoEstacionAction(Number(id!)),
        enabled: !!id,
        staleTime: 1000 * 60 * 60 * 24
    });

    const isLoading = loadingStation || loadingHistory;
    const error = stationError || historyError;

    return {
        station,
        history,
        isLoading,
        error,
        id,
        stationName
    };
};
