'use client'

import LocationInfoBox from '@/app/GoogleMap/ui/LocationInfoBox'
import {GoogleMap, LoadScript} from '@react-google-maps/api'
import {useCallback, useEffect, useRef, useState} from 'react'

const containerStyle = {width: '100%', height: '100vh'}
const defaultCenter = {lat: 37.5665, lng: 126.978} // 서울 좌표

const GoogleMapComponent = () => {
  const mapRef = useRef<google.maps.Map | null>(null) // 지도 객체 참조
  const [center, setCenter] = useState(defaultCenter) // 현재 지도 중심 좌표

  // 현재 위치로 이동하는 버튼 핸들러
  const handleGoToCurrentLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        position => {
          const {latitude, longitude} = position.coords
          setCenter({lat: latitude, lng: longitude})
          mapRef.current?.panTo({lat: latitude, lng: longitude})
        },
        error => console.error('위치 정보를 가져오는 데 실패했습니다:', error),
      )
    }
  }

  const handleMapLoad = (map: google.maps.Map) => {
    mapRef.current = map // 지도 객체 저장
  }

  // 지도 이동 후 실행 (유저가 지도 이동 시)
  const handleCenterChanged = useCallback(() => {
    if (mapRef.current) {
      const newCenter = mapRef.current.getCenter()
      if (newCenter) {
        setCenter({lat: newCenter.lat(), lng: newCenter.lng()})
      }
    }
  }, [])

  // 이 처음 실행될 때 현재 위치 가져오기
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        position => {
          const {latitude, longitude} = position.coords
          setCenter({lat: latitude, lng: longitude}) // 현재 위치로 지도 중심 설정
        },
        error => console.error('위치 정보를 가져오는 데 실패했습니다:', error),
        {enableHighAccuracy: true, timeout: 5000, maximumAge: 10000},
      )
    }
  }, [])

  return (
    <LoadScript googleMapsApiKey={process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY!}>
      <div className="relative w-full h-screen">
        <GoogleMap
          mapContainerStyle={containerStyle}
          center={center}
          zoom={15}
          options={{
            disableDefaultUI: true, // 기본 UI 제거 (줌 버튼 등 필요 시 추가)
            zoomControl: true,
            fullscreenControl: false,
          }}
          onLoad={handleMapLoad} // 지도 객체 저장
          onDragEnd={handleCenterChanged} // 유저가 지도 이동 시 실행
        >
          {/* 현재 위치 마커 고정 */}
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
            <div className="w-6 h-6 bg-blue-500 rounded-full shadow-lg"></div>
          </div>
        </GoogleMap>

        {/* 현재 위치 주소 표시 */}
        <LocationInfoBox lat={center.lat} lon={center.lng} />

        {/* 현재 위치로 이동 버튼 */}
        <button
          className="absolute bottom-16 right-4 bg-white text-black px-4 py-2 rounded-lg shadow-md"
          onClick={handleGoToCurrentLocation}>
          내 위치로 이동
        </button>
      </div>
    </LoadScript>
  )
}

export default GoogleMapComponent
