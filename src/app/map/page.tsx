'use client'

import {useRouter} from 'next/navigation'
import {useEffect, useRef, useState} from 'react'

const MapPage = () => {
  const GOOGLE_MAPS_API_KEY = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY!
  const mapRef = useRef<HTMLDivElement>(null)
  const searchInputRef = useRef<HTMLInputElement>(null)
  const [map, setMap] = useState<google.maps.Map | null>(null)
  const [searchQuery, setSearchQuery] = useState('')
  const router = useRouter()

  useEffect(() => {
    if (typeof window !== 'undefined' && !map) {
      const loadGoogleMaps = () => {
        if (!window.google || !window.google.maps) {
          const script = document.createElement('script')
          script.src = `https://maps.googleapis.com/maps/api/js?key=${GOOGLE_MAPS_API_KEY}&libraries=places`
          script.async = true
          script.onload = () => initializeMap()
          document.head.appendChild(script)
        } else {
          initializeMap()
        }
      }

      const initializeMap = () => {
        if (!mapRef.current) return
        const defaultCenter = JSON.parse(
          sessionStorage.getItem('lastMapCenter') || 'null',
        ) || {
          lat: 37.5825,
          lng: 127.0015,
        }

        const mapInstance = new window.google.maps.Map(mapRef.current, {
          center: defaultCenter,
          zoom: 16,
          disableDefaultUI: true,
        })
        setMap(mapInstance)

        if (searchInputRef.current) {
          const autocomplete = new window.google.maps.places.Autocomplete(
            searchInputRef.current,
          )
          autocomplete.addListener('place_changed', () => {
            const place = autocomplete.getPlace()
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
        }
      }

      loadGoogleMaps()
    }
  }, [map])

  return (
    <div className="relative w-full h-screen flex flex-col items-center">
      {/* 검색 바 */}
      <div className="absolute top-4 w-[90%] bg-white p-3 shadow-lg rounded-full flex items-center gap-2 z-10">
        <input
          ref={searchInputRef}
          type="text"
          placeholder="어떤 장소를 찾으시나요?"
          className="w-full p-2 border-none rounded-lg focus:outline-none text-gray-700"
          value={searchQuery}
          onChange={e => setSearchQuery(e.target.value)}
        />
        <button
          className="p-2 bg-red-500 text-white rounded-full shadow-lg"
          onClick={() => {
            const lastMapCenter = JSON.parse(
              sessionStorage.getItem('lastMapCenter') || 'null',
            )
            if (lastMapCenter) {
              sessionStorage.setItem(
                'uploadLocation',
                JSON.stringify(lastMapCenter),
              )
              router.push('/upload')
            }
          }}>
          📷
        </button>
      </div>

      {/* Google Maps 컨테이너 */}
      <div ref={mapRef} className="w-full h-full absolute top-0 left-0" />
    </div>
  )
}

export default MapPage
