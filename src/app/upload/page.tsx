'use client'

import {useRouter} from 'next/navigation'
import React, {useEffect, useState} from 'react'

const UploadPage = () => {
  const router = useRouter()
  const [selectedImage, setSelectedImage] = useState<File | null>(null)
  const [description, setDescription] = useState('')

  useEffect(() => {
    return () => {
      if (!selectedImage) {
        sessionStorage.removeItem('uploadLocation')
      }
    }
  }, [selectedImage])

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      setSelectedImage(event.target.files[0])
    }
  }

  const handleSubmit = async () => {
    const locationData = sessionStorage.getItem('uploadLocation')
    if (!locationData || !selectedImage) return

    const {lat, lng} = JSON.parse(locationData)
    const reader = new FileReader()

    reader.onload = async () => {
      if (!reader.result) return
      const newMarker = {
        lat,
        lng,
        img: reader.result.toString(),
        description: description.trim() || '사진 설명 없음',
      }

      const existingMarkers = JSON.parse(
        sessionStorage.getItem('photoMarkers') || '[]',
      )
      if (!Array.isArray(existingMarkers)) {
        sessionStorage.setItem('photoMarkers', JSON.stringify([newMarker]))
      } else {
        existingMarkers.push(newMarker)
        sessionStorage.setItem('photoMarkers', JSON.stringify(existingMarkers))
      }

      sessionStorage.setItem('lastMapCenter', JSON.stringify({lat, lng}))
      sessionStorage.removeItem('uploadLocation')
      setSelectedImage(null)
      router.push('/map')
    }

    reader.readAsDataURL(selectedImage)
  }

  return (
    <div className="w-full h-screen flex flex-col items-center p-4 bg-gray-100">
      <div className="w-full flex items-center justify-start p-4">
        <button
          onClick={() => {
            sessionStorage.removeItem('uploadLocation')
            router.back()
          }}
          className="text-2xl">
          ←
        </button>
      </div>

      <div className="w-full max-w-md bg-white rounded-lg p-6 shadow-lg flex flex-col items-center">
        <div className="w-full h-48 flex items-center justify-center border border-gray-300 rounded-lg bg-gray-100">
          {selectedImage ? (
            <img
              src={URL.createObjectURL(selectedImage)}
              alt="Uploaded preview"
              className="w-full h-full object-cover rounded-lg"
            />
          ) : (
            <span className="text-gray-500">
              어떤 사진을 추억을 남기셨나요?
            </span>
          )}
        </div>

        <input
          type="file"
          accept="image/*"
          className="hidden"
          id="image-upload"
          onChange={handleImageChange}
        />
        <label
          htmlFor="image-upload"
          className="w-full mt-4 bg-red-500 text-white p-3 rounded-lg flex items-center justify-center cursor-pointer">
          📷 사진 첨부하기
        </label>

        <p className="mt-2 text-sm text-gray-500 text-center">
          방문한 장소와 관련된 사진을 등록해주세요.
          <br />
          방문한 장소와 관련 없거나 부적절한 사진을 등록할 경우,
          <br />
          경고 없이 삭제 및 기타 제재가 들어갈 수 있습니다.
        </p>
      </div>

      <div className="w-full max-w-md mt-4">
        <label className="text-gray-700 font-semibold">
          사진에 대한 설명을 남겨주세요.
        </label>
        <textarea
          className="w-full mt-2 p-3 border border-gray-300 rounded-lg bg-white text-gray-700"
          rows={4}
          placeholder="여기에 설명을 입력하세요"
          value={description}
          onChange={e => setDescription(e.target.value)}
        />
      </div>

      <button
        className={`w-full max-w-md mt-6 p-3 rounded-lg ${
          selectedImage
            ? 'bg-blue-500 text-white cursor-pointer'
            : 'bg-gray-300 text-gray-600 cursor-not-allowed'
        }`}
        onClick={handleSubmit}
        disabled={!selectedImage}>
        다음
      </button>
    </div>
  )
}

export default UploadPage
