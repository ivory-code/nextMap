'use client'

import {useEffect, useRef} from 'react'

const Map = ({center}: {center: {lat: number; lng: number}}) => {
  const mapRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (typeof window !== 'undefined' && mapRef.current) {
      new google.maps.Map(mapRef.current, {
        center,
        zoom: 16,
        disableDefaultUI: true,
      })
    }
  }, [center])

  return <div ref={mapRef} className="w-full h-screen" />
}

export default Map
