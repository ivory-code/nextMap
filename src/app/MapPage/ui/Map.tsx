'use client'

import useLiveLocation from '@/app/MapPage/model/useLiveLocation'
import AdjustMapCenter from '@/app/MapPage/ui/AdjustMapCenter'
import LocationInfoBox from '@/app/MapPage/ui/LocationInfoBox'
import {LatLngExpression} from 'leaflet'
import 'leaflet/dist/leaflet.css'
import dynamic from 'next/dynamic'

// 🚀 SSR 비활성화 (클라이언트에서만 로드)
const MapContainer = dynamic(
  () => import('react-leaflet').then(mod => mod.MapContainer),
  {ssr: false},
)
const TileLayer = dynamic(
  () => import('react-leaflet').then(mod => mod.TileLayer),
  {ssr: false},
)
const MapMarker = dynamic(() => import('@/app/MapPage/ui/Marker'), {ssr: false})

const SEOUL: LatLngExpression = [37.5665, 126.978]

const Map = () => {
  const position = useLiveLocation()

  return (
    <div className="relative w-full h-screen overflow-visible">
      <MapContainer
        center={position || SEOUL}
        zoom={15}
        scrollWheelZoom={true}
        attributionControl={true}
        zoomControl={false}
        className="absolute inset-0 w-full h-full">
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />

        {/* 지도 중심을 유저 위치로 이동 */}
        <AdjustMapCenter position={position} />

        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />

        {/* 마커는 고정된 상태에서 지도만 이동 */}
        {position && <MapMarker position={position} />}
      </MapContainer>

      {/* 현재 위치 주소 표시 UI */}
      {position && <LocationInfoBox lat={position[0]} lon={position[1]} />}
    </div>
  )
}

export default Map
