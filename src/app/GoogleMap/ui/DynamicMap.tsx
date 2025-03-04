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
        const mapInstance = new window.google.maps.Map(mapRef.current, {
          center: {lat: 37.5825, lng: 127.0015},
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
            const marker = new window.google.maps.Marker({
              position: place.geometry.location,
              map: mapInstance,
            })
            setMarkers(prevMarkers => {
              prevMarkers.forEach(m => m.setMap(null))
              return [marker]
            })
          }
        })
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
          className="w-full p-2 border-none rounded-lg focus:outline-none"
          value={searchQuery}
          onChange={e => setSearchQuery(e.target.value)}
        />
        <button className="p-2 bg-gray-200 rounded-full">🔍</button>
        <button
          className="p-2 bg-gray-200 rounded-full"
          onClick={() => router.push('/UploadPage')}>
          📷
        </button>
      </div>

      {/* 필터 컨테이너 (투명 배경) */}
      <div className="absolute top-[100px] w-[90%] bg-transparent flex gap-2 overflow-x-auto z-10">
        <button className="bg-orange-500 text-white px-4 py-2 rounded-full text-sm">
          NEW
        </button>
        <button className="bg-gray-200 px-4 py-2 rounded-full text-sm">
          인기있는
        </button>
        <button className="bg-gray-200 px-4 py-2 rounded-full text-sm">
          풍경
        </button>
        <button className="bg-gray-200 px-4 py-2 rounded-full text-sm">
          프사 느낌
        </button>
        <button className="bg-gray-200 px-4 py-2 rounded-full text-sm">
          애완과 함께
        </button>
      </div>

      {/* Google Maps 컨테이너 */}
      <div ref={mapRef} className="w-full h-full absolute top-0 left-0" />
    </div>
  )
}

export default DynamicMap
