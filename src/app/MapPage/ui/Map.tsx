'use client'

import {LatLngExpression} from 'leaflet'
import 'leaflet/dist/leaflet.css'
import dynamic from 'next/dynamic'
import useLiveLocation from '../model/useLiveLocation'

// 🚀 SSR 비활성화 (클라이언트에서만 로드)
const MapContainer = dynamic(
  () => import('react-leaflet').then(mod => mod.MapContainer),
  {ssr: false},
)
const TileLayer = dynamic(
  () => import('react-leaflet').then(mod => mod.TileLayer),
  {ssr: false},
)
const ZoomControl = dynamic(
  () => import('react-leaflet').then(mod => mod.ZoomControl),
  {ssr: false},
)
const ResizeMap = dynamic(() => import('@/app/MapPage/ui/ResizeMap'), {
  ssr: false,
})
const MapMarker = dynamic(() => import('@/app/MapPage/ui/Marker'), {ssr: false})

const SEOUL: LatLngExpression = [37.5665, 126.978]

const Map = () => {
  const position = useLiveLocation()

  return (
    <div className="relative w-full h-screen">
      <MapContainer
        center={position || SEOUL}
        zoom={13}
        scrollWheelZoom={true}
        attributionControl={true}
        zoomControl={false}
        className="absolute inset-0 w-full h-full">
        <ResizeMap />
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
        {position && <MapMarker position={position} />}
        <ZoomControl position="bottomright" />
      </MapContainer>
    </div>
  )
}

export default Map
