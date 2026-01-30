import { Stack } from 'expo-router';

export default function SearchLayout() {
    return (
        <Stack>
            <Stack.Screen name="index" options={{ title: 'Provincias' }} />
            <Stack.Screen name="municipios" options={{ title: 'Municipios' }} />
            <Stack.Screen name="estaciones" options={{ title: 'Estaciones' }} />
            <Stack.Screen name="station/[id]" options={{ title: 'Detalle Estación' }} />
        </Stack>
    );
}
