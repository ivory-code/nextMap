'use client'

import { useEffect } from 'react'
import { useMap } from 'react-leaflet'

const AdjustMapCenter = ({ position }: { position: [number, number] | null }) => {
  const map = useMap()

  useEffect(() => {
    if (position) {
      map.panTo(position, { animate: true, duration: 1.0 })
    }
  }, [position, map])

  return null
}

export default AdjustMapCenter
