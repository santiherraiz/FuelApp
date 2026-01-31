import { getEstacionDetalle, getHistoricoEstacion } from '@/src/api/fuelApi';
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
        queryFn: () => getEstacionDetalle(Number(id!)),
        enabled: !!id
    });

    const { data: history, isLoading: loadingHistory, error: historyError } = useQuery({
        queryKey: ['history', id],
        queryFn: () => getHistoricoEstacion(Number(id!)),
        enabled: !!id
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
