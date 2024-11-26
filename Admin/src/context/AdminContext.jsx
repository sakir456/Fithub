import { createContext, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";


export const AdminContext  = createContext()

const AdminContextProvider = (props) => {

    const [aToken, setAToken] = useState(localStorage.getItem("aToken")? localStorage.getItem("aToken") : "")
    const [trainers, setTrainers] = useState([])

    const backendUrl = import.meta.env.VITE_BACKEND_URL

    const getAllTrainers = async()=> {
        try {
            const {data} = await axios.post(backendUrl  + "/api/admin/all-trainers", {}, {headers:{aToken}})
            if(data.success){
              setTrainers(data.trainers)
              console.log(data.trainers)
            } else {
                toast.error(data.message)
            }
        } catch (error) {
            toast.error(error.message)
        }
    }

    const value = {
       backendUrl,aToken,
        setAToken,
        trainers, setTrainers,
        getAllTrainers
    }

    return (
        <AdminContext.Provider value={value}>
         {props.children}
       </AdminContext.Provider>
    )

   

}

export default AdminContextProvider