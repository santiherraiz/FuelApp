import { client } from "@/api/client";
import { EstacionMapper } from "@/infrastructure/interfaces/mappers/mappers";
import { ProvinciaResponse } from "@/infrastructure/interfaces/responses";

export const getProvinciasAction = async () => {
    try {
        const { data } = await client.get<ProvinciaResponse[]>("/provincias");
        const provincias = data.map((provincia) =>
            EstacionMapper.provinciaMapper(provincia)
        );
        return provincias;
    } catch (error) {
        console.log(error);
        throw "No se puede cargar las provincias";
    }
};
