const Input = ({
  placeholder,
  value,
  onChange,
}: {
  placeholder: string
  value: string
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
}) => {
  return (
    <input
      type="text"
      className="w-full p-2 border rounded-lg focus:outline-none text-gray-700"
      placeholder={placeholder}
      value={value}
      onChange={onChange}
    />
  )
}

export default Input
