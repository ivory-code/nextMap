'use client'

import Image from 'next/image'
import {ChangeEvent, useRef, useState} from 'react'

interface Suggestion {
  description: string
}

const StaticMap = () => {
  const googleMapApiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY!
  const [searchQuery, setSearchQuery] = useState('')
  const [suggestions, setSuggestions] = useState<Suggestion[]>([])
  const [latitude, setLatitude] = useState(37.5825)
  const [longitude, setLongitude] = useState(127.0015)
  const inputRef = useRef<HTMLInputElement>(null)
  const zoom = 16

  const mapUrl = `https://maps.googleapis.com/maps/api/staticmap?center=${latitude},${longitude}&zoom=${zoom}&size=1600x900&maptype=roadmap&key=${googleMapApiKey}`

  const handleSearch = async () => {
    if (!searchQuery) return
    try {
      const response = await fetch(
        `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(
          searchQuery,
        )}&key=${googleMapApiKey}`,
      )
      const data = await response.json()
      if (data.results.length > 0) {
        setLatitude(data.results[0].geometry.location.lat)
        setLongitude(data.results[0].geometry.location.lng)
        setSuggestions([])
      }
    } catch (error) {
      console.error('Geocode API 호출 실패:', error)
    }
  }

  const handleInputChange = async (e: ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value)
    if (e.target.value.length > 2) {
      try {
        const response = await fetch(
          `https://maps.googleapis.com/maps/api/place/autocomplete/json?input=${encodeURIComponent(
            e.target.value,
          )}&types=geocode&key=${googleMapApiKey}`,
        )
        const data = await response.json()
        if (data.predictions) {
          setSuggestions(
            data.predictions.map((p: {description: string}) => ({
              description: p.description,
            })),
          )
        }
      } catch (error) {
        console.error('Places Autocomplete API 호출 실패:', error)
      }
    } else {
      setSuggestions([])
    }
  }

  return (
    <div className="relative w-full h-screen flex flex-col items-center p-4 max-w-screen-2xl mx-auto overflow-hidden">
      {/* 지도 배경 */}
      <div className="absolute top-0 left-0 w-full h-full -z-10">
        <Image
          src={mapUrl}
          alt="Static Google Map"
          layout="fill"
          objectFit="cover"
        />
      </div>

      {/* UI 컨테이너 */}
      <div className="relative z-20 flex flex-col items-center w-full max-w-2xl">
        {/* 검색 바 */}
        <div className="w-full bg-white shadow-md p-3 rounded-lg">
          <div className="flex items-center gap-2 focus-within:ring-2 focus-within:ring-blue-500">
            <input
              ref={inputRef}
              type="text"
              placeholder="어떤 장소를 찾으시나요?"
              className="w-full p-2 border-none rounded-lg focus:outline-none"
              value={searchQuery}
              onChange={handleInputChange}
            />
            <button
              onClick={handleSearch}
              className="p-2 bg-gray-200 rounded-lg">
              🔍
            </button>
          </div>
          {/* 연관 검색어 표시 */}
          {suggestions.length > 0 && (
            <ul className="absolute w-full bg-white shadow-lg rounded-lg mt-1 z-10 max-h-60 overflow-y-auto">
              {suggestions.map((suggestion, index) => (
                <li
                  key={index}
                  className="p-2 flex items-center gap-2 hover:bg-gray-100 cursor-pointer"
                  onClick={() => {
                    setSearchQuery(suggestion.description)
                    setSuggestions([])
                    handleSearch()
                  }}>
                  <span className="text-gray-500">📍</span>{' '}
                  {suggestion.description}
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* 필터 버튼 */}
        <div className="relative z-20 flex gap-2 mt-4 overflow-x-auto w-full bg-white p-2 shadow-md rounded-lg">
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
      </div>
    </div>
  )
}

export default StaticMap
