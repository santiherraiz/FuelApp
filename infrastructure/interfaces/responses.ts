export interface EstacionCercanaResponse {
    idEstacion: number;
    nombreEstacion: string;
    direccion: string;
    latitud: number;
    longitud: number;
    distancia: number;
}

export interface DetalleEstacionResponse {
    idEstacion: number;
    nombreEstacion: string;
    longitud: number;
    latitud: number;
    margen: string;
    codPostal: string;
    direccion: string;
    horario: string;
    tipoVenta: string;
    idMunicipio: number;
    lastUpdate: string;
    localidad: string;
    Gasolina95: string;
    Gasolina95_media: string;
    Gasolina98: string;
    Gasolina98_media: string;
    Diesel: string;
    Diesel_media: string;
    DieselPremium: string;
    DieselPremium_media: string;
    DieselB_media: string;
    GLP_media: string;
    provincia: string;
    provinciaDistrito: string;
    marca: string;
}

export interface EstacionMunicipioResponse {
    idEstacion: number;
    nombre: string;
    direccion: string;
    idMunicipio: number;
    latitud: number;
    longitud: number;
}

export interface ItemHistoricoResponse {
    id: number;
    idEstacion: number;
    timestamp: string;
    price: number;
}

export interface HistoricoResponse {
    title: string;
    estacionId: number;
    periodo: {
        inicio: string;
        fin: string;
    };
    cantidadResultados: number;
    data: ItemHistoricoResponse[];
}

export interface EstacionRadioResponse {
    _id: string;
    nombre: string;
    coordenadas: {
        type: string;
        coordinates: [number, number]; // [longitude, latitude]
    };
    distancia: number;
    provincia: string;
    localidad: string;
}

export interface MunicipioResponse {
    idMunicipio: number;
    nombreMunicipio: string;
    idProvincia: number;
}

export interface PrecioMedioDiarioResponse {
    id: number;
    idFuelType: number;
    fecha: string;
    precioMedio: number;
}

export interface PrecioMedioProvinciaResponse {
    idProvincia: number;
    fuelTypeName: string;
    averagePrice: number;
    lastCalculated: string;
}

export interface ProvinciaResponse {
    idProvincia: number;
    nombreProvincia: string;
}
