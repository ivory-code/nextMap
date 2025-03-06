'use client'

import {useRouter} from 'next/navigation'
import {useEffect, useRef, useState} from 'react'

const DynamicMap = () => {
  const googleMapApiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY!
  const mapRef = useRef<HTMLDivElement>(null)
  const [map, setMap] = useState<google.maps.Map | null>(null)
  const [searchQuery, setSearchQuery] = useState('')
  const [autocomplete, setAutocomplete] =
    useState<google.maps.places.Autocomplete | null>(null)
  const [markers, setMarkers] = useState<google.maps.Marker[]>([])
  const [currentLocation, setCurrentLocation] = useState<{
    lat: number
    lng: number
  } | null>(null)
  const router = useRouter()

  useEffect(() => {
    if (typeof window !== 'undefined' && !map) {
      const loadGoogleMaps = () => {
        if (!window.google || !window.google.maps) {
          const script = document.createElement('script')
          script.src = `https://maps.googleapis.com/maps/api/js?key=${googleMapApiKey}&libraries=places`
          script.async = true
          script.onload = () => initializeMap()
          document.head.appendChild(script)
        } else {
          initializeMap()
        }
      }

      const initializeMap = () => {
        if (!mapRef.current) return
        const lastMapCenter = JSON.parse(
          sessionStorage.getItem('lastMapCenter') || 'null',
        )

        if (navigator.geolocation) {
          navigator.geolocation.getCurrentPosition(position => {
            const userLocation = {
              lat: position.coords.latitude,
              lng: position.coords.longitude,
            }
            setCurrentLocation(userLocation)
            sessionStorage.setItem(
              'lastMapCenter',
              JSON.stringify(userLocation),
            )
          })
        } else if (!lastMapCenter) {
          setCurrentLocation({lat: 37.5825, lng: 127.0015})
          sessionStorage.setItem(
            'lastMapCenter',
            JSON.stringify({lat: 37.5825, lng: 127.0015}),
          )
        }

        const defaultCenter = lastMapCenter || {lat: 37.5825, lng: 127.0015}

        const mapInstance = new window.google.maps.Map(mapRef.current, {
          center: defaultCenter,
          zoom: 16,
          disableDefaultUI: true,
          styles: [
            {
              featureType: 'poi',
              elementType: 'labels',
              stylers: [{visibility: 'off'}],
            },
          ],
        })
        setMap(mapInstance)

        mapInstance.addListener('center_changed', () => {
          const center = mapInstance.getCenter()
          sessionStorage.setItem(
            'lastMapCenter',
            JSON.stringify({
              lat: center?.lat(),
              lng: center?.lng(),
            }),
          )
        })

        const input = document.getElementById(
          'search-input',
        ) as HTMLInputElement
        const autocompleteInstance = new window.google.maps.places.Autocomplete(
          input,
          {
            types: ['geocode'],
          },
        )
        setAutocomplete(autocompleteInstance)

        autocompleteInstance.addListener('place_changed', () => {
          const place = autocompleteInstance.getPlace()
          if (place.geometry?.location) {
            mapInstance.setCenter(place.geometry.location)
            sessionStorage.setItem(
              'lastMapCenter',
              JSON.stringify({
                lat: place.geometry.location.lat(),
                lng: place.geometry.location.lng(),
              }),
            )
          }
        })

        // 저장된 마커 불러오기 및 추가
        const savedMarkers = JSON.parse(
          sessionStorage.getItem('photoMarkers') || '[]',
        )
        savedMarkers.forEach(
          (markerData: {lat: number; lng: number; img: string}) => {
            const marker = new window.google.maps.Marker({
              position: {lat: markerData.lat, lng: markerData.lng},
              map: mapInstance,
              icon: {
                url: markerData.img,
                scaledSize: new window.google.maps.Size(40, 40),
              },
            })
            setMarkers(prevMarkers => [...prevMarkers, marker])
          },
        )
      }
      loadGoogleMaps()
    }
  }, [map])

  return (
    <div className="relative w-full h-screen flex flex-col items-center">
      {/* 검색 바 */}
      <div className="absolute top-4 w-[90%] bg-white p-3 shadow-lg rounded-full flex items-center gap-2 z-10">
        <input
          id="search-input"
          type="text"
          placeholder="어떤 장소를 찾으시나요?"
          className="w-full p-2 border-none rounded-lg focus:outline-none text-gray-700"
          value={searchQuery}
          onChange={e => setSearchQuery(e.target.value)}
        />
        <button className="p-2 bg-gray-200 rounded-full">🔍</button>
        <button
          className="p-2 bg-gray-200 rounded-full"
          onClick={() => {
            if (map) {
              const center = map.getCenter()
              if (center) {
                const currentCenter = {lat: center.lat(), lng: center.lng()}
                sessionStorage.setItem(
                  'uploadLocation',
                  JSON.stringify(currentCenter),
                )
                router.push('/UploadPage')
              }
            }
          }}>
          📷
        </button>
      </div>

      {/* 필터 컨테이너 (투명 배경) */}
      <div className="absolute top-[100px] w-[90%] bg-transparent flex gap-2 overflow-x-auto z-10">
        <button className="bg-orange-500 text-white px-4 py-2 rounded-full text-sm">
          NEW
        </button>
        <button className="bg-gray-200 px-4 py-2 rounded-full text-sm text-gray-700">
          인기있는
        </button>
        <button className="bg-gray-200 px-4 py-2 rounded-full text-sm text-gray-700">
          풍경
        </button>
        <button className="bg-gray-200 px-4 py-2 rounded-full text-sm text-gray-700">
          프사 느낌
        </button>
        <button className="bg-gray-200 px-4 py-2 rounded-full text-sm text-gray-700">
          애완동물과 함께
        </button>
      </div>

      {/* 현재 위치를 나타내는 파란 점 */}
      {currentLocation && (
        <div className="absolute top-1/2 left-1/2 w-4 h-4 bg-blue-500 rounded-full border-2 border-white transform -translate-x-1/2 -translate-y-1/2 z-20"></div>
      )}

      {/* Google Maps 컨테이너 */}
      <div ref={mapRef} className="w-full h-full absolute top-0 left-0" />
    </div>
  )
}

export default DynamicMap
