import { ChevronLeft } from "lucide-react"

const BackButton = () => {
  const handleClick = () => {
    window.history.back()
  }

  return (
    <a
      className="hover:text-blue-500 duration-100 cursor-pointer flex items-center w-fit"
      onClick={handleClick}
    >
      <ChevronLeft size={16} /> back
    </a>
  )
}

export default BackButton
