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

    // Calculate dates for history (last 30 days)
    const today = new Date();
    const endDate = today.getDate();
    const startDate = today.getDate() - 30;

    const { data: history, isLoading: loadingHistory, error: historyError } = useQuery({
        queryKey: ['history', id, startDate, endDate],
        queryFn: () => getHistoricoEstacionAction(Number(id!), startDate.toString(), endDate.toString()),
        enabled: !!id,
        staleTime: 1000 * 60 * 60 * 24
    });

    const isLoading = loadingStation || loadingHistory;
    const error = stationError;

    return {
        station,
        history,
        isLoading,
        error,
        id,
        stationName
    };
};
