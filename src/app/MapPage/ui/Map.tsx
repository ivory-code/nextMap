'use client'

import useLiveLocation from '@/app/MapPage/model/useLiveLocation'
import MapMarker from '@/app/MapPage/ui/Marker'
import {LatLngExpression} from 'leaflet'
import 'leaflet/dist/leaflet.css'
import {useEffect} from 'react'
import {MapContainer, TileLayer, ZoomControl, useMap} from 'react-leaflet'

const SEOUL: LatLngExpression = [37.5665, 126.978]

const ResizeMap = () => {
  const map = useMap()

  useEffect(() => {
    setTimeout(() => {
      map.invalidateSize()
    }, 500)
  }, [map])

  return null
}

const Map = () => {
  const position = useLiveLocation()

  return (
    <div className="relative w-full h-screen">
      <MapContainer
        center={position || SEOUL}
        zoom={13}
        scrollWheelZoom={true}
        attributionControl={true}
        zoomControl={false}
        className="absolute inset-0 w-full h-full">
        <ResizeMap />
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
        {position && <MapMarker position={position} />}
        <ZoomControl position="bottomright" />
      </MapContainer>
    </div>
  )
}

export default Map
