'use client'

import useLiveLocation from '@/app/GoogleMap/model/useLiveLocation'
import AdjustMapCenter from '@/app/GoogleMap/ui/AdjustMapCenter'
import GoogleMapMarker from '@/app/GoogleMap/ui/GoogleMapMarker'
import LocationInfoBox from '@/app/GoogleMap/ui/LocationInfoBox'
import {GoogleMap, LoadScript} from '@react-google-maps/api'

const containerStyle = {width: '100%', height: '100vh'}
const defaultCenter = {lat: 37.5665, lng: 126.978} // 서울 중심 좌표

const GoogleMapComponent = () => {
  const position = useLiveLocation() // 사용자의 실시간 위치 가져오기

  return (
    <LoadScript googleMapsApiKey={process.env.PUBLIC_GOOGLE_MAPS_API_KEY!}>
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={position ? {lat: position[0], lng: position[1]} : defaultCenter}
        zoom={15}
        options={{
          disableDefaultUI: true, // 기본 UI 제거 (줌 버튼 등 필요시 추가)
          zoomControl: true, // 줌 컨트롤 활성화
          fullscreenControl: false,
        }}>
        {/* 지도 중심 조정 */}
        <AdjustMapCenter position={position} />

        {/* 현재 위치 마커 표시 */}
        {position && <GoogleMapMarker position={position} />}
      </GoogleMap>

      {/* 현재 위치 주소 표시 UI */}
      {position && <LocationInfoBox lat={position[0]} lon={position[1]} />}
    </LoadScript>
  )
}

export default GoogleMapComponent
