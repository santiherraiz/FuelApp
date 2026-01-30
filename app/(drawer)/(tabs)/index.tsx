import { usePermissionStore } from '@/src/store/usePermissionStore';
import React, { useEffect } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import MapView, { PROVIDER_GOOGLE } from 'react-native-maps';

export default function MapScreen() {
  const { hasPermission, location, requestPermission, getCurrentLocation } = usePermissionStore();

  useEffect(() => {
    requestPermission();
  }, []);

  useEffect(() => {
    if (hasPermission) {
      getCurrentLocation();
    }
  }, [hasPermission]);

  if (hasPermission === null) {
    return <View className="flex-1 justify-center items-center"><Text>Solicitando permisos...</Text></View>;
  }

  if (hasPermission === false) {
    return <View className="flex-1 justify-center items-center"><Text>Permiso de ubicación denegado</Text></View>;
  }

  return (
    <View className="flex-1">
      <MapView
        provider={PROVIDER_GOOGLE}
        style={StyleSheet.absoluteFill}
        showsUserLocation={true}
        initialRegion={{
          latitude: location?.coords.latitude || 40.416775,
          longitude: location?.coords.longitude || -3.703790,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
      >
        {/* Markers for stations will go here */}
      </MapView>
    </View>
  );
}
