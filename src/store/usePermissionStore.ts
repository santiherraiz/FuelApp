import * as Location from 'expo-location';
import { create } from 'zustand';

interface PermissionState {
    hasPermission: boolean | null;
    location: Location.LocationObject | null;
    requestPermission: () => Promise<void>;
    checkPermission: () => Promise<void>;
    getCurrentLocation: () => Promise<void>;
}

export const usePermissionStore = create<PermissionState>((set) => ({
    hasPermission: null,
    location: null,

    checkPermission: async () => {
        const { status } = await Location.getForegroundPermissionsAsync();
        set({ hasPermission: status === 'granted' });
    },

    requestPermission: async () => {
        const { status } = await Location.requestForegroundPermissionsAsync();
        set({ hasPermission: status === 'granted' });
    },

    getCurrentLocation: async () => {
        const { status } = await Location.getForegroundPermissionsAsync();
        if (status !== 'granted') return;

        try {
            const location = await Location.getCurrentPositionAsync({});
            set({ location });
        } catch (error) {
            console.error("Error getting location", error);
        }
    },
}));
