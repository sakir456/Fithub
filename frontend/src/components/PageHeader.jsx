

const PageHeader = ({HeaderText}) => {
  return (
    <div className="   w-full h-96 bg-[url('https://res.cloudinary.com/dkmnkggev/image/upload/v1740476246/hero2_mhw5ji.webp')] flex justify-center items-center ">
      <div className="text-white font-bold text-5xl max-sm:text-4xl font-teko">{HeaderText}</div>
    </div>
  )
}

export default PageHeader