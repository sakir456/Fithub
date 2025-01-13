import { useNavigate } from "react-router-dom"


const Button = ({label, navigatePath, visibility}) => {
    const navigate = useNavigate()

const handleClick = () => {
    navigate(navigatePath)
}


  return (
    <button
    onClick={handleClick}
    className={` relative  w-48 text-center py-4 mt-2.5 $ max-sm:text-center text-lg uppercase overflow-hidden  bg-primary group text-nowrap
     ${visibility ? visibility : "block"}
     `}
  >
    <span className="relative z-10 tracking-wide text-white">
      {label}
    </span>
    <div
      className="absolute inset-0 bg-primary-hover transform scale-x-0 
origin-left transition-transform duration-300 ease-linear group-hover:scale-x-100 text-white  "
    ></div>
  </button>
  )
}

export default Button