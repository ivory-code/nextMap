'use client'

import {LatLngExpression} from 'leaflet'
import dynamic from 'next/dynamic'

// 🚀 SSR 비활성화 (클라이언트에서만 로드)
const Marker = dynamic(() => import('react-leaflet').then(mod => mod.Marker), {
  ssr: false,
})
const Popup = dynamic(() => import('react-leaflet').then(mod => mod.Popup), {
  ssr: false,
})

const MapMarker = ({position}: {position: LatLngExpression}) => {
  return (
    <Marker position={position}>
      <Popup>현재 위치</Popup>
    </Marker>
  )
}

export default MapMarker
