import React from 'react'
import { GoogleMap, useJsApiLoader } from '@react-google-maps/api';
import { mapData } from './MapData';

const containerStyle = {
  width: '100%',
  height: '400px',
  borderRadius: '1em',
  transition: 'ease-out 0.16s',
};

const center = {
  lat: mapData.mainData.lat,
  lng: mapData.mainData.lng
};

const Map = () => {
  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY
  })

  const [map, setMap] = React.useState(null)

  const onLoad = React.useCallback(function callback(map) {
    const bounds = new window.google.maps.LatLngBounds(center);
    map.fitBounds(bounds);

    setMap(map)
  }, [])

  const onUnmount = React.useCallback(function callback(map) {
    setMap(null)
  }, [])

  return isLoaded ? (
    <GoogleMap
      mapContainerStyle={containerStyle}
      center={center}
      zoom={10}
      onLoad={onLoad}
      onUnmount={onUnmount}
    >
    </GoogleMap>
  ) : <></>
}

export default Map