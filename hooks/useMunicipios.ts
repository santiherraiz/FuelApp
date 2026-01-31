import { getMunicipiosByProvinciaAction } from '@/core/actions/municipios.action';
import { useQuery } from '@tanstack/react-query';
import { useLocalSearchParams, useNavigation, useRouter } from 'expo-router';
import { useEffect } from 'react';
import { Municipio } from '../api/types';

export const useMunicipios = (idProvincia: string | number | null | undefined) => {
    return useQuery({
        queryKey: ['municipios', idProvincia],
        queryFn: () => getMunicipiosByProvinciaAction(Number(idProvincia)),
        enabled: !!idProvincia,
        staleTime: 1000 * 60 * 60 * 24
    });
};

export const useMunicipiosScreen = () => {
    const router = useRouter();
    const { idProvincia, nombreProvincia } = useLocalSearchParams<{ idProvincia: string, nombreProvincia: string }>();
    const navigation = useNavigation();

    useEffect(() => {
        if (nombreProvincia) {
            navigation.setOptions({
                title: nombreProvincia,
                headerStyle: { backgroundColor: '#F8FAFC' },
                headerShadowVisible: false,
            });
        }
    }, [nombreProvincia, navigation]);

    const { data: municipios, isLoading, error } = useMunicipios(idProvincia);

    const handleMunicipioPress = (item: Municipio) => {
        router.push({
            pathname: '/(drawer)/(tabs)/search/estaciones',
            params: { idMunicipio: item.idMunicipio, nombreMunicipio: item.nombreMunicipio }
        });
    };

    return { municipios, isLoading, error, handleMunicipioPress };
};
