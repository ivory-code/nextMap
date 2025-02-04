'use client'

import dynamic from 'next/dynamic'

const Map = dynamic(import('@/app/MapPage/ui/Map'), {ssr: false})

const MapPage = () => {
  return (
    <section className="relative w-full h-screen pt-36">
      <Map />
    </section>
  )
}

export default MapPage
