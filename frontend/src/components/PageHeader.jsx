

const PageHeader = ({HeaderText}) => {
  return (
    <div className="   w-full h-96 bg-[url('/assets/hero/hero2.png')] flex justify-center items-center ">
      <div className="text-white font-bold text-5xl max-sm:text-4xl font-teko">{HeaderText}</div>
    </div>
  )
}

export default PageHeader