'use client'

import LocationInfoBox from '@/app/GoogleMap/ui/LocationInfoBox'
import {GoogleMap, LoadScript} from '@react-google-maps/api'
import {debounce} from 'lodash'
import {useRef, useState} from 'react'

const containerStyle = {width: '100%', height: '100vh'}
const defaultCenter = {lat: 37.5665, lng: 126.978} // 서울 좌표

const GoogleMapWithDebounce = () => {
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

  // **Debounce 적용된 주소 변환 함수**
  const fetchAddressDebounced = debounce((lat: number, lng: number) => {
    setCenter({lat, lng}) // 지도 중심 좌표 업데이트
  }, 2000) // 500ms 동안 추가 호출이 없을 경우 실행

  // **Debounce 적용된 이벤트 핸들러**
  const handleCenterChanged = () => {
    if (mapRef.current) {
      const newCenter = mapRef.current.getCenter()
      if (newCenter) {
        fetchAddressDebounced(newCenter.lat(), newCenter.lng())
      }
    }
  }

  return (
    <LoadScript googleMapsApiKey={process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY!}>
      <div className="relative w-full h-screen">
        <GoogleMap
          mapContainerStyle={containerStyle}
          center={center}
          zoom={15}
          options={{
            disableDefaultUI: true,
            zoomControl: true,
            fullscreenControl: false,
          }}
          onLoad={handleMapLoad}
          onCenterChanged={handleCenterChanged} // **Debounce 적용**
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

export default GoogleMapWithDebounce
