'use client'

import {LatLngExpression, divIcon} from 'leaflet'
import dynamic from 'next/dynamic'

// 🚀 SSR 비활성화 (클라이언트에서만 로드)
const Marker = dynamic(() => import('react-leaflet').then(mod => mod.Marker), {
  ssr: false,
})
const Popup = dynamic(() => import('react-leaflet').then(mod => mod.Popup), {
  ssr: false,
})

// 📌 커스텀 마커 스타일 설정 (파란색 원 & 그라데이션 효과)
const createCustomMarker = () =>
  divIcon({
    className: '', // ✅ 배경 투명하게 설정
    html: `
      <div class="relative flex items-center justify-center">
        <!-- 바깥쪽 그라데이션 효과 -->
        <div class="absolute w-12 h-12 bg-blue-400 opacity-30 blur-xl rounded-full"></div>
        
        <!-- 내부 파란색 원 -->
        <div class="w-6 h-6 bg-blue-500 opacity-90 rounded-full shadow-lg"></div>

        <!-- 애니메이션 효과 -->
        <div class="absolute w-6 h-6 bg-blue-500 opacity-50 rounded-full animate-ping"></div>
      </div>
    `,
    iconSize: [32, 32], // 마커 크기 조정
    iconAnchor: [16, 16], // 중앙 정렬
  })

const MapMarker = ({position}: {position: LatLngExpression}) => {
  return <Marker position={position} icon={createCustomMarker()} />
}

export default MapMarker
