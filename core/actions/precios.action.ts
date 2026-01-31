import { client } from "@/api/client";
import { EstacionMapper } from "@/infrastructure/interfaces/mappers/mappers";
import {
    PrecioMedioDiarioResponse,
    PrecioMedioProvinciaResponse,
} from "@/infrastructure/interfaces/responses";

export const getPrecioMedioDiarioAction = async () => {
    try {
        const { data } = await client.get<PrecioMedioDiarioResponse[]>(
            "/precioMedioDiario"
        );
        const precios = data.map((precio) =>
            EstacionMapper.precioMedioDiarioMapper(precio)
        );
        return precios;
    } catch (error) {
        console.log(error);
        throw "No se puede cargar los precios medios diarios";
    }
};

export const getPreciosMediosProvinciaAction = async (idProvincia: number) => {
    try {
        const { data } = await client.get<PrecioMedioProvinciaResponse[]>(
            `/precios/medios/provincia/${idProvincia}`
        );
        const precios = data.map((precio) =>
            EstacionMapper.precioMedioProvinciaMapper(precio)
        );
        return precios;
    } catch (error) {
        console.log(error);
        throw "No se puede cargar los precios medios de la provincia";
    }
};
