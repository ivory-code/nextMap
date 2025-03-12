const Button = ({
  text,
  onClick,
  disabled,
}: {
  text: string
  onClick: () => void
  disabled?: boolean
}) => {
  return (
    <button
      className={`w-full p-3 rounded-lg ${
        disabled
          ? 'bg-gray-300 text-gray-600 cursor-not-allowed'
          : 'bg-blue-500 text-white cursor-pointer'
      }`}
      onClick={onClick}
      disabled={disabled}>
      {text}
    </button>
  )
}

export default Button
