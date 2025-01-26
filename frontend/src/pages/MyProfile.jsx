import { useContext, useState } from "react"
import { AppContext } from "../context/AppContext"
import axios from "axios"
import { toast } from "react-toastify"


const MyProfile = () => {
   const [isEdit, setIsEdit] = useState(false)
   const [image, setImage] = useState(false)

   const{loadUserProfileData,userData, setUserData,backendUrl, token} = useContext(AppContext) 


   const updateUserProfileData = async()=> {
         try {
          const formData  = new FormData()
          formData.append("name", userData.name)
          formData.append("phone", userData.phone)
          formData.append("address", JSON.stringify(userData.address))
          formData.append("gender", userData.gender)
          formData.append("dob", userData.dob)

          image && formData.append("image", image)

          const {data} = await axios.post(backendUrl + "/api/user/update-profile", formData, {headers:{token}})

          if(data.success){
            toast.success(data.message)
            await loadUserProfileData()
            setIsEdit(false)
            setImage(false)
          } else{
            toast.error(data.message)
          }
         } catch (error) {
          console.log(error)
          toast.error(error.message)
         }
   }

  return userData && (
    <div className="min-h-screen">
      <div className="   w-full h-24 bg-[url('/src/assets/hero/hero2.png')] flex justify-center items-center ">
      </div>
      <div className="max-w-lg flex flex-col mx-5 my-5   gap-2 text-sm font-outfit">
      {
      isEdit
      ? <label htmlFor="image">
          <div className="inline-block relative cursor-pointer ">
            <img className="w-36 rounded opacity-75" src={image ? URL.createObjectURL(image) : userData.image} alt="" />
            <img className="w-10 absolute bottom-12 right-12" src={image ? "" : "/src/assets/gallery/upload_icon.png"} alt="" />
          </div>
          <input onChange={(e) => setImage(e.target.files[0])} type="file"  id="image" hidden/>
      </label>  : 
       <img className="w-36 rounded" src={userData.image} alt="" />

    }

      {
        isEdit
          ? <input value={userData.name} onChange={e=>setUserData(prev=>({...prev, name:e.target.value}))} className="bg-gray-100 text-3xl font-medium max-w-60 mt-4" type="text"  />
          : <p className="font-medium text-3xl text-neutral-800 mt-4 ">{userData.name}</p>
      }
      <hr className="bg-zinc-400 h-[1px] border-none" />

      <div>
      <p className="text-neutral-500 underline mt-3">CONTACT INFORMATION</p>
      <div className="grid grid-cols-[1fr_3fr] gap-y-2.5 mt-3 text-neutral-700">
      <p className="font-medium">Email id:</p>
          <p className="text-primary-hover">{userData.email}</p>
          <p className="font-medium">Phone:</p>

          {
            isEdit
              ? <input value={userData.phone} onChange={e=>setUserData(prev=>({...prev, phone:e.target.value}))} className="bg-gray-100 max-w-52" type="text"  />
              : <p className="text-primary">{userData.phone}</p>
          }

          <p className="font-medium ">Address:</p>
           
          {
            isEdit
              ? <p>
                <input value={userData.address.line1} onChange={(e)=>setUserData(prev=>({...prev, address:{...prev.address,line1:e.target.value}}))} className="bg-gray-50"  type="text" />
                <br />
                <input value={userData.address.line2} onChange={(e)=>setUserData(prev=>({...prev, address:{...prev.address, line2:e.target.value}}))} className="bg-gray-50" type="text" />
              </p>
              : <p className="text-gray-500 ">
                 {userData.address.line1}
                <br />
                {userData.address.line2}
              </p>
          }

      </div>
     </div>

     <div>
     <p className="text-neutral-500 underline mt-3">BASIC INFORMATION</p>
     <div className="grid grid-cols-[1fr_3fr] gap-y-2.5 mt-3 text-neutral-700">
     <p className="font-medium ">Gender:</p>
     {
            isEdit
              ? <select value={userData.gender} onChange={e=>setUserData(prev=>({...prev, gender:e.target.value}))} className="max-w-20 bg-gray-100"  >
                <option value="Male">Male</option>
                <option value="Female">Female</option>
              </select>
              : <p className="text-gray-400">{userData.gender}</p>
          }

     <p className="font-medium">Birthday:</p>

     {
            isEdit
            ? <input value={userData.dob} onChange={e=>setUserData(prev=>({...prev, dob:e.target.value}))} className="max-w-28 bg-gray-100" type="date"    />
            : <p className="text-gray-400">{userData.dob}</p>
          }

     </div>
     </div>

     <div className="flex gap-2 mt-10 ">
        {
          isEdit 
          ? <button className="border border-primary px-8 py-2 rounded-full hover:bg-primary hover:text-white transition-all" onClick={updateUserProfileData} >Save information</button>
          : <button className="border border-primary px-8 py-2 rounded-full hover:bg-primary hover:text-white transition-all" onClick={()=> setIsEdit(true)}>Edit</button>
          }

          {
            userData.planType !== "Not a Member" && (
              <button className="border border-primary px-8 py-2 rounded-full hover:bg-primary hover:text-white transition-all">you are a member </button>
            )
          }

          
      </div>

      
       
      </div>
    </div>
  )
}

export default MyProfile