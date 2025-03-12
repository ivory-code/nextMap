'use client'

const PhotoUpload = ({onUpload}: {onUpload: (file: File) => void}) => {
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      onUpload(event.target.files[0])
    }
  }

  return (
    <div>
      <input
        type="file"
        accept="image/*"
        className="hidden"
        id="image-upload"
        onChange={handleFileChange}
      />
      <label
        htmlFor="image-upload"
        className="w-full bg-red-500 text-white p-3 rounded-lg flex items-center justify-center cursor-pointer">
        📷 사진 첨부하기
      </label>
    </div>
  )
}

export default PhotoUpload
