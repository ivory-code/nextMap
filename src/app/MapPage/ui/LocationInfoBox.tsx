'use client'

import useLocationAddress from '@/app/MapPage/model/useLocationAddress'

const LocationInfoBox = ({
  lat,
  lon,
}: {
  lat: number | null
  lon: number | null
}) => {
  const address = useLocationAddress(lat, lon)
  console.log(address, ' ?')
  return (
    <div className="fixed bottom-16 left-1/2 transform -translate-x-1/2 w-auto max-w-sm bg-white bg-opacity-90 text-black text-sm px-4 py-2 rounded-lg shadow-lg z-[9999]">
      {address ? address : '위치 정보를 불러오는 중...'}
    </div>
  )
}

export default LocationInfoBox
