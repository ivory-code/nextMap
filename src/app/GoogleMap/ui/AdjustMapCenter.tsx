'use client'

import {useGoogleMap} from '@react-google-maps/api'
import {useEffect} from 'react'

const AdjustMapCenter = ({position}: {position: [number, number] | null}) => {
  const map = useGoogleMap() // Google Maps 인스턴스 가져오기

  useEffect(() => {
    if (map && position) {
      map.panTo({lat: position[0], lng: position[1]}) // 지도 중심 이동
    }
  }, [position, map])

  return null
}

export default AdjustMapCenter
