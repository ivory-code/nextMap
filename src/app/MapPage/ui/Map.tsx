'use client'

import {LatLngExpression} from 'leaflet'
import 'leaflet/dist/leaflet.css'
import dynamic from 'next/dynamic'
import {useEffect} from 'react'
import {useMap} from 'react-leaflet'
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
const MapMarker = dynamic(() => import('@/app/MapPage/ui/Marker'), {ssr: false})

const SEOUL: LatLngExpression = [37.5665, 126.978]

const CenterMapToUser = ({position}: {position: LatLngExpression | null}) => {
  const map = useMap()

  useEffect(() => {
    if (position) {
      map.setView(position, map.getZoom()) // ✅ 유저 위치로 지도 이동
    }
  }, [position, map])

  return null
}

const Map = () => {
  const position = useLiveLocation()

  return (
    <div className="relative w-full h-screen">
      <MapContainer
        center={position || SEOUL}
        zoom={15}
        scrollWheelZoom={true}
        attributionControl={true}
        zoomControl={false}
        className="absolute inset-0 w-full h-full">
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />

        {/* 지도 중심을 유저 위치로 이동 */}
        <CenterMapToUser position={position} />

        {/* 마커는 고정된 상태에서 지도만 이동 */}
        {position && <MapMarker position={position} />}
      </MapContainer>
    </div>
  )
}

export default Map
