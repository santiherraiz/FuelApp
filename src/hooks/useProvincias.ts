import { getProvincias } from '@/src/api/fuelApi';
import { useQuery } from '@tanstack/react-query';
import { useRouter } from 'expo-router';
import { Provincia } from '../api/types';

export const useProvincias = () => {
    return useQuery({
        queryKey: ['provincias'],
        queryFn: getProvincias
    });
};

export const useProvinciasScreen = () => {
    const router = useRouter();
    const { data: provincias, isLoading, error } = useProvincias();

    const handleProvinciaPress = (item: Provincia) => {
        router.push({
            pathname: '/(drawer)/(tabs)/search/municipios',
            params: { idProvincia: item.idProvincia, nombreProvincia: item.nombreProvincia }
        });
    };

    return { provincias, isLoading, error, handleProvinciaPress };
};
