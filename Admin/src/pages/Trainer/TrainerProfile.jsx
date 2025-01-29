import { useContext, useEffect, useState } from "react"
import { TrainerContext } from "../../context/TrainerContext"
import axios from "axios"
import { toast } from "react-toastify"
import LoadingSpinner from "../../components/LoadingSpinner"


const TrainerProfile = () => {
 const [isEdit, setIsEdit]  = useState(false)
 const {tToken, getProfileData, profileData, setProfileData, backendUrl, loading, setLoading} = useContext(TrainerContext)


 const updateProfile = async()=> {
  setLoading(true)
  try {
    const updateData = {
      address: profileData.address
      } 
      const {data} = await axios.post(backendUrl + "/api/trainer/update-profile", updateData, {headers:{tToken}})
      if(data.success){
        toast.success(data.message)
        setIsEdit(false)
        getProfileData()
     } else {
      toast.error(data.message)
     }
  } catch (error) {
    toast.error(error.message)
    console.log(error)
  }finally{
    setLoading(false)
   }
 }

 useEffect(()=> {
  if(tToken){
    getProfileData()
  }
 },[tToken])

 

  return  (
    loading ? (
      <LoadingSpinner />
    ) : profileData && (
    <div className="">
    <div className="flex flex-col gap-4 m-5  ">
    <div className= "w-full sm:w-64 sm:h-64   rounded-lg overflow-y-scroll ">
    <img  className="w-full" src={profileData.image} alt=""/>
    </div>
    <div className="flex-1 border border-stone-100 rounded-lg p-8 py-7 bg-white">
    <div>
       <div className="flex flex-col gap-1 ">
      <p className="text-3xl font-medium text-gray-700">{profileData.name}</p>
      <div className="flex items-center gap-2 text-gray-600">
        <p className=" text-base " >{profileData.certifications} - {profileData.speciality} </p>
        <p className="text-xs text-center border rounded-full p-0.5 px-2">{profileData.experience}</p>
      </div>
      </div>

      <div className="mt-2.5" >
        <p className="text-sm text-gray-700 font-medium">About:</p>
        <div className="flex flex-wrap text-gray-600 text-sm mt-1 max-w-[700px]">
          {profileData.about}
        </div>
      </div>
      <div className="mt-3 flex">
        <p className="text-gray-600">Salary:</p>
        <p className="ml-1">${profileData.salary}</p>
      </div>

      <div className="mt-3 flex ">
        <p>Address:</p>
        <div className="flex flex-col ml-2 text-sm">
          <p className="text-sm">
          {isEdit ? (
              <input type="text"
              onChange={(e)=> setProfileData((prev)=> ({
                ...prev, 
                address:{...prev.address, line1:e.target.value}
              })) }
              value={profileData.address.line1}
               />
            ) : (
              profileData.address.line1
            )}
            </p> 
          <p className="text-sm">
          {isEdit ? (
              <input type="text"
              onChange={(e)=> setProfileData((prev)=> ({
                ...prev, 
                address:{...prev.address, line2:e.target.value}
              })) }
              value={profileData.address.line2}
               />
            ) : (
              profileData.address.line2
            )}
          </p>
        </div>
      </div>

      <div className="mt-5">
      {isEdit ? (
      <button onClick={updateProfile}  className=" border border-primary rounded-full px-4 py-1 text-sm hover:bg-primary hover:text-white transition-all ">Save</button>
      ) :
     (
      <button onClick={()=> setIsEdit(true)} className=" border border-primary rounded-full px-4 py-1 text-sm hover:bg-primary hover:text-white transition-all ">Edit</button>
      )
      }
      </div>
    </div>

    </div>

    </div>
    </div>
    )
  )
}

export default TrainerProfile