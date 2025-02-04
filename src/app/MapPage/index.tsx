'use client'

import {LatLngExpression} from 'leaflet'
import 'leaflet/dist/leaflet.css'
import {
  MapContainer,
  Marker,
  Popup,
  TileLayer,
  ZoomControl,
} from 'react-leaflet'

const CENTER: LatLngExpression = [37.5665, 126.978] // 서울 위치

const MapPage = () => {
  return (
    <section className="w-full h-screen pt-36 relative">
      <MapContainer
        center={CENTER}
        zoom={13}
        scrollWheelZoom={true}
        attributionControl={true}
        zoomControl={false} // 기본 줌 버튼 제거
        className="w-full h-full">
        {/* 지도 타일 레이어 */}
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />

        {/* 현재 위치 마커 */}
        <Marker position={CENTER}>
          <Popup>여기는 서울입니다!</Popup>
        </Marker>

        {/* 줌 버튼을 오른쪽 하단으로 이동 */}
        <ZoomControl position="bottomright" />
      </MapContainer>
    </section>
  )
}

export default MapPage
