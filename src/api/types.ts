export interface Provincia {
    idProvincia: number;
    nombreProvincia: string;
    // TODO: Añadir más campos si es necesario
}

export interface Municipio {
    idMunicipio: number;
    nombreMunicipio: string;
    idProvincia: number;
}

export interface CombustiblePrecio {
    tipo: string;
    precio: number;
}

export interface Estacion {
    // Common fields
    idEstacion?: number; // Might vary between endpoints, keeping optional or unifying
    nombre?: string; // /estaciones/cerca uses nombreEstacion
    direccion: string;
    latitud: number;
    longitud: number;

    // Specific to /estaciones/cerca
    nombreEstacion?: string;
    distancia?: number;

    // Specific to /estaciones/municipio
    idMunicipio?: number;

    // Specific to /estaciones/radio
    _id?: string;
    coordenadas?: {
        type: string;
        coordinates: number[];
    };
    provincia?: string;
    localidad?: string;

    // Custom added for UI consistency if needed
    precios?: CombustiblePrecio[];
}

// Keeping it simple for the UI components
export interface EstacionList {
    idEstacion: number;
    nombre: string;
    direccion: string;
    latitud: number;
    longitud: number;
    idMunicipio?: number;
    distancia?: number;
}

export interface EstacionDetalle {
    idEstacion: number;
    nombre: string;
    direccion: string;
    latitud: number;
    longitud: number;
    // Note: Detailed endpoint doesn't show prices in the usage example, 
    // but usually details include them. Will keep optional.
}

export interface HistoricoItem {
    id: number;
    idEstacion: number;
    timestamp: string;
    price: number;
    // The example provided shows 'price' but not fuel type in the data array?
    // "data": [{ "id": 1, "idEstacion": 1, "timestamp": "...", "price": 1.23 }]
    // Wait, the fuel type isn't in the item? 
    // Ah, usually history is per station.
}

export interface HistoricoResponse {
    title: string;
    estacionId: number;
    periodo: {
        inicio: string;
        fin: string;
    };
    cantidadResultados: number;
    data: HistoricoItem[];
}

export interface PrecioMedioDiario {
    id: number;
    idFuelType: number;
    fecha: string;
    precioMedio: number;
}

export interface PrecioMedioProvincia {
    idProvincia: number;
    fuelTypeName: string;
    averagePrice: number;
    lastCalculated: string;
}
