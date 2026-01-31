import { client } from "@/api/client";
import { EstacionMapper } from "@/infrastructure/interfaces/mappers/mappers";
import { MunicipioResponse } from "@/infrastructure/interfaces/responses";

export const getMunicipiosByProvinciaAction = async (idProvincia: number) => {
    try {
        const { data } = await client.get<MunicipioResponse[]>(
            `/municipios/provincia/${idProvincia}`
        );
        const municipios = data.map((municipio) =>
            EstacionMapper.municipioMapper(municipio)
        );
        return municipios;
    } catch (error) {
        console.log(error);
        throw "No se puede cargar los municipios";
    }
};
