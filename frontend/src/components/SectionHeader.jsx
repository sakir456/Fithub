

const SectionHeader = ({title, textColor, bgColor}) => {
  return (
    <div  className={`flex  gap-2 items-center  ${textColor} transition-transform duration-700 ease-out delay-100`}>
              <hr className={`border-none outline-none ${bgColor} h-0.5  w-10`} />
              <p className="text-2xl sm:text-xl max-sm:text-lg font-light uppercase md:tracking-wide">
               {title}
              </p>
            </div>
  )
}

export default SectionHeader