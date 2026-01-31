import { client } from "@/api/client";
import { EstacionMapper } from "@/infrastructure/interfaces/mappers/mappers";
import {
    DetalleEstacionResponse,
    EstacionCercanaResponse,
    EstacionMunicipioResponse,
    EstacionRadioResponse,
    HistoricoResponse,
} from "@/infrastructure/interfaces/responses";

export const getEstacionesByMunicipioAction = async (idMunicipio: number) => {
    try {
        const { data } = await client.get<EstacionMunicipioResponse[]>(
            `/estaciones/municipio/${idMunicipio}`
        );
        const estaciones = data.map((estacion) =>
            EstacionMapper.estacionMunicipioMapper(estacion)
        );
        return estaciones;
    } catch (error) {
        console.log(error);
        throw "No se puede cargar las estaciones del municipio";
    }
};

export const getEstacionDetalleAction = async (idEstacion: number) => {
    try {
        const { data } = await client.get<DetalleEstacionResponse>(
            `/estaciones/detalles/${idEstacion}`
        );
        return EstacionMapper.detalleEstacionMapper(data);
    } catch (error) {
        console.log(error);
        throw "No se puede cargar los detalles de la estación";
    }
};

export const getHistoricoEstacionAction = async (idEstacion: number) => {
    try {
        const { data } = await client.get<HistoricoResponse>(
            `/estaciones/historico/${idEstacion}`
        );
        return EstacionMapper.historicoMapper(data);
    } catch (error) {
        console.log(error);
        throw "No se puede cargar el historial de la estación";
    }
};

export const getEstacionesCercaEstacionAction = async (idEstacion: number) => {
    try {
        const { data } = await client.get<EstacionCercanaResponse[]>(
            `/estaciones/cerca/${idEstacion}`
        );
        const estaciones = data.map((estacion) =>
            EstacionMapper.estacionCercanaMapper(estacion)
        );
        return estaciones;
    } catch (error) {
        console.log(error);
        throw "No se puede cargar las estaciones cercanas";
    }
};

export const getEstacionesPorRadioAction = async (
    lat: number,
    lng: number,
    radio: number
) => {
    try {
        const { data } = await client.get<EstacionRadioResponse[]>(
            "/estaciones/radio",
            {
                params: { lat, lng, radio },
            }
        );
        const estaciones = data.map((estacion) =>
            EstacionMapper.estacionRadioMapper(estacion)
        );
        return estaciones;
    } catch (error) {
        console.log(error);
        throw "No se puede cargar las estaciones por radio";
    }
};
