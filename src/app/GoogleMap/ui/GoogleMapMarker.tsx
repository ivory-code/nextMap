'use client'

import {Marker} from '@react-google-maps/api'

const GoogleMapMarker = ({position}: {position: [number, number]}) => {
  return (
    <Marker
      position={{lat: position[0], lng: position[1]}}
      icon={{
        path: google.maps.SymbolPath.CIRCLE,
        scale: 10, // 마커 크기 조정
        fillColor: '#4285F4',
        fillOpacity: 1,
        strokeWeight: 2,
        strokeColor: 'white',
      }}
    />
  )
}

export default GoogleMapMarker
