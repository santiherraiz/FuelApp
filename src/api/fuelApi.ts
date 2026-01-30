import { client } from './client';
import { Estacion, EstacionDetalle, EstacionList, HistoricoResponse, Municipio, PrecioMedioDiario, PrecioMedioProvincia, Provincia } from './types';

export const getProvincias = async (): Promise<Provincia[]> => {
    const response = await client.get('/provincias');
    return response.data;
};

export const getMunicipiosByProvincia = async (idProvincia: number): Promise<Municipio[]> => {
    const response = await client.get(`/municipios/provincia/${idProvincia}`);
    return response.data;
};

export const getEstacionesByMunicipio = async (idMunicipio: number): Promise<EstacionList[]> => {
    const response = await client.get(`/estaciones/municipio/${idMunicipio}`);
    return response.data;
};

export const getEstacionesCercaEstacion = async (idEstacion: number): Promise<Estacion[]> => {
    const response = await client.get(`/estaciones/cerca/${idEstacion}`);
    return response.data;
}

export const getEstacionDetalle = async (idEstacion: number): Promise<EstacionDetalle> => {
    const response = await client.get(`/estaciones/detalles/${idEstacion}`);
    return response.data;
};

export const getHistoricoEstacion = async (idEstacion: number): Promise<HistoricoResponse> => {
    const response = await client.get(`/estaciones/historico/${idEstacion}`);
    return response.data;
};

export const getEstacionesPorRadio = async (lat: number, lng: number, radio: number): Promise<Estacion[]> => {
    const response = await client.get('/estaciones/radio', {
        params: { lat, lng, radio }
    });
    return response.data;
}

export const getPrecioMedioDiario = async (): Promise<PrecioMedioDiario[]> => {
    const response = await client.get('/precioMedioDiario');
    return response.data;
}

export const getPreciosMediosProvincia = async (idProvincia: number): Promise<PrecioMedioProvincia[]> => {
    const response = await client.get(`/precios/medios/provincia/${idProvincia}`);
    return response.data;
}
