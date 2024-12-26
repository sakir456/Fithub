import { useContext, useState } from "react"
import { toast } from "react-toastify"
import axios from "axios"
import { AdminContext } from "../../context/AdminContext"


const AddMemberAndTrainer = () => {
    const [trainerImg, setTrainerImg] = useState(false)
    const [name, setName] = useState("")
    const  [email, setEmail] = useState("")
  const   [password, setPassword] = useState("")
  const   [experience, setExperience] = useState("1 Year")
  const   [salary, setSalary] = useState("")
  const   [about, setAbout] = useState("")
  const [gender, setGender] = useState("Male")
  const [speciality, setSpeciality] = useState("Personal Trainer")
  const [certifications, setCertifications] = useState("")
  const [address1, setAddress1] = useState("")
  const [address2, setAddress2] = useState("")

  const {backendUrl,aToken}  = useContext(AdminContext)


  const onSubmitHandler = async(e) => {
    e.preventDefault()

    try {
        if(!trainerImg){
        return toast.error("Image not selected")
        } 
        const formData = new FormData()

        formData.append("image", trainerImg)
        formData.append("name", name)
        formData.append("email", email)
        formData.append("password", password)
        formData.append("experience", experience)
        formData.append("salary", Number(salary))
        formData.append("about", about)
        formData.append("gender", gender)
        formData.append("speciality", speciality)
        formData.append("certifications", certifications)
        formData.append("address", JSON.stringify({line1:address1,line2:address2}))

        formData.forEach((value,key)=> {
            console.log(`${key} : ${value}`)
        })

        const {data} = await axios.post(backendUrl + "/api/admin/add-trainer", formData, {headers:{aToken}})

        if(data.success){
            toast.success(data.message)
            setTrainerImg(false)
            setName("")
            setEmail("")
            setPassword("")
            setExperience("1 Year")
            setSalary("")
            setAbout("")
            setGender("Male")
            setSpeciality("Personal Trainer")
            setCertifications("")
            setAddress1("")
            setAddress2("")
} else{
            toast.error(data.message)
        }
    } catch (error) {
        toast.error(error.message)
        console.log(error)
    }

  }


  return (
    <form onSubmit={onSubmitHandler} className="m-5 w-full">
        <p className="font-medium text-lg mb-3">Add Trainer</p>
        <div className="bg-white p-8 w-full max-w-4xl border rounded  max-h-[80vh] overflow-y-scroll ">
        <div className="flex items-center gap-4  mb-8 text-gray-500  ">
            <label htmlFor="trainer-img">
                <img src={trainerImg ? URL.createObjectURL(trainerImg) : "/src/assets/upload_area.svg"} className="w-16 bg-gray-100 rounded-full cursor-pointer "  alt=""/>
            </label>
        <input onChange={(e)=> setTrainerImg(e.target.files[0])} type="file" id="trainer-img" hidden/>
            <p>Upload Trainer <br/> picture</p>
        </div>
        <div className=" flex flex-col lg:flex-row items-start gap-10 mb-3   text-gray-600">
        <div className=" w-full lg:flex-1 flex flex-col gap-3"> 
        <div className=" flex-1 flex flex-col gap-1 ">
            <p>Trainer Name</p>
            <input value={name} onChange={(e)=> setName(e.target.value)} className="px-3 py-2 border rounded   " type="text" placeholder="Name" required />
        </div>
        <div className=" flex-1 flex flex-col gap-1  ">
            <p> Email</p>
            <input value={email} onChange={(e)=> setEmail(e.target.value)}  className="px-3 py-2 border rounded   " type="email" placeholder="Email" required />
        </div>
        <div className=" flex-1 flex flex-col gap-1 ">
            <p>Password</p>
            <input value={password} onChange={(e)=> setPassword(e.target.value)} className="px-3 py-2 border rounded   " type="password" placeholder="Password" required />
        </div>
        <div className=" flex-1 flex flex-col gap-1 ">
            <p>Experience</p>
           <select value={experience} onChange={(e)=> setExperience(e.target.value)} className="px-3 py-2 border rounded">
            <option value="1 Year">1 Year</option>
            <option value="2 Year">2 Year</option>
            <option value="3 Year">3 Year</option>
            <option value="4 Year">4 Year</option>
            <option value="5 Year">5 Year</option>
            <option value="6 Year">6 Year</option>
            <option value="7 Year">7 Year</option>
            <option value="8 Year">8 Year</option>
            <option value="9 Year">9 Year</option>
            <option value="10 Year">10 Year</option>
           </select>
        </div>
        <div className=" flex-1 flex flex-col gap-1 ">
            <p>Salary</p>
            <input value={salary} onChange={(e)=> setSalary(e.target.value)} className="px-3 py-2 border rounded   " type="number" placeholder="Salary" required />
        </div>
        </div>
        <div className="  w-full lg:flex-1 flex flex-col gap-3">
        <div className=" flex-1 flex flex-col gap-1 ">
            <p>Gender</p>
           <select value={gender} onChange={(e)=> setGender(e.target.value)} className="px-3 py-2 border rounded">
            <option value="Male">Male</option>
            <option value="Female">Female</option>
            </select>
        </div>
        <div className=" flex-1 flex flex-col gap-1 ">
            <p>Speciality</p>
           <select value={speciality} onChange={(e)=> setSpeciality(e.target.value)} className="px-3 py-2 border rounded">
            <option value="Personal Trainer">Personal Trainer</option>
            <option value="Yoga Instructor">Yoga Instructor</option>
            <option value="Strength & Conditioning Coach">Strength & Conditioning Coach</option>
            <option value="Cardio Specialist">Cardio Specialist</option>
            <option value="Nutritionist">Nutritionist</option>
            </select>
        </div>
        <div  className=" flex-1 flex flex-col gap-1 ">
            <p>Certifications</p>
            <input value={certifications} onChange={(e)=> setCertifications(e.target.value)} className="px-3 py-2 border rounded   " type="text" placeholder="Certifications"  required/>
        </div>

        <div  className=" flex-1 flex flex-col gap-1 ">
            <p>Address</p>
            <input value={address1} onChange={(e)=> setAddress1(e.target.value)} className="px-3 py-2 border rounded   " type="text" placeholder="address1" required />
            <input value={address2} onChange={(e)=> setAddress2(e.target.value)} className="px-3 py-2 border rounded   " type="text" placeholder="address2" required />
        </div>
        </div>

        </div>
        <div className=" flex flex-1 flex-col gap-1 mb-5">
        <p>About Trainer</p>
        <textarea value={about} onChange={(e)=> setAbout(e.target.value)} className=" px-3 py-2 border rounded " placeholder="write about Trainer" rows={5} required/>
        </div>
          <button type="Submit" className="px-10 py-3 rounded-full bg-primary text-white ">Add Trainer</button>
        </div>
    </form>
  )
}

export default AddMemberAndTrainer