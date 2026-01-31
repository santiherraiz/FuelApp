import { Estacion, EstacionDetalle, HistoricoResponse, Municipio, PrecioMedioDiario, PrecioMedioProvincia, Provincia } from "@/api/types";
import { DetalleEstacionResponse, EstacionCercanaResponse, EstacionMunicipioResponse, EstacionRadioResponse, MunicipioResponse, PrecioMedioDiarioResponse, PrecioMedioProvinciaResponse, ProvinciaResponse } from "../responses";

export class EstacionMapper {
    static estacionCercanaMapper(respuesta: EstacionCercanaResponse): Estacion {
        return {
            idEstacion: respuesta.idEstacion,
            nombre: respuesta.nombreEstacion,
            direccion: respuesta.direccion,
            latitud: Number(respuesta.latitud),
            longitud: Number(respuesta.longitud),
            distancia: respuesta.distancia,
        };
    }

    static detalleEstacionMapper(respuesta: DetalleEstacionResponse): EstacionDetalle {
        return {
            idEstacion: respuesta.idEstacion,
            nombre: respuesta.nombreEstacion,
            direccion: respuesta.direccion,
            latitud: Number(respuesta.latitud),
            longitud: Number(respuesta.longitud),
            precios: [
                { tipo: 'Gasolina 95', precio: Number(respuesta.Gasolina95) || 0 },
                { tipo: 'Gasolina 98', precio: Number(respuesta.Gasolina98) || 0 },
                { tipo: 'Diesel', precio: Number(respuesta.Diesel) || 0 },
                { tipo: 'Diesel Premium', precio: Number(respuesta.DieselPremium) || 0 },
            ].filter(p => p.precio > 0)
        };
    }

    static estacionMunicipioMapper(respuesta: EstacionMunicipioResponse): Estacion {
        return {
            idEstacion: respuesta.idEstacion,
            nombre: respuesta.nombre,
            direccion: respuesta.direccion,
            latitud: respuesta.latitud,
            longitud: respuesta.longitud,
            idMunicipio: respuesta.idMunicipio,
        };
    }

    static historicoMapper(respuesta: HistoricoResponse): HistoricoResponse {
        return {
            title: respuesta.title,
            estacionId: respuesta.estacionId,
            periodo: respuesta.periodo,
            cantidadResultados: respuesta.cantidadResultados,
            data: respuesta.data.map(item => ({
                id: item.id,
                idEstacion: item.idEstacion,
                timestamp: item.timestamp,
                price: item.price
            }))
        };
    }

    static estacionRadioMapper(respuesta: EstacionRadioResponse): Estacion {
        return {
            idEstacion: 0, // No proporcionado en la respuesta de radio
            nombre: respuesta.nombre,
            direccion: respuesta.localidad,
            latitud: respuesta.coordenadas.coordinates[1],
            longitud: respuesta.coordenadas.coordinates[0],
            distancia: respuesta.distancia,
            provincia: respuesta.provincia,
            localidad: respuesta.localidad,
        };
    }

    static municipioMapper(respuesta: MunicipioResponse): Municipio {
        return {
            idMunicipio: respuesta.idMunicipio,
            nombreMunicipio: respuesta.nombreMunicipio,
            idProvincia: respuesta.idProvincia,
        };
    }

    static provinciaMapper(respuesta: ProvinciaResponse): Provincia {
        return {
            idProvincia: respuesta.idProvincia,
            nombreProvincia: respuesta.nombreProvincia,
        };
    }

    static precioMedioDiarioMapper(respuesta: PrecioMedioDiarioResponse): PrecioMedioDiario {
        return {
            id: respuesta.id,
            idFuelType: respuesta.idFuelType,
            fecha: respuesta.fecha,
            precioMedio: respuesta.precioMedio,
        };
    }

    static precioMedioProvinciaMapper(respuesta: PrecioMedioProvinciaResponse): PrecioMedioProvincia {
        return {
            idProvincia: respuesta.idProvincia,
            fuelTypeName: respuesta.fuelTypeName,
            averagePrice: respuesta.averagePrice,
            lastCalculated: respuesta.lastCalculated,
        };
    }
}
