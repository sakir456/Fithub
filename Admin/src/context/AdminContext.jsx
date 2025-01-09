import { createContext,  useEffect,  useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";


export const AdminContext  = createContext()

const AdminContextProvider = (props) => {

    const [aToken, setAToken] = useState(localStorage.getItem("aToken")? localStorage.getItem("aToken") : "")
    const [trainers, setTrainers] = useState([])
    const [queries, setQueries] = useState([])
    const [users, setUsers] = useState([])

    const backendUrl = import.meta.env.VITE_BACKEND_URL

    const getAllUSers = async()=> {
        try {
            const {data} = await axios.post(backendUrl + "/api/admin/all-users", {}, {headers:{aToken}}) 
            if(data.success){
                setUsers(data.users)
                console.log(data.users)
            } else {
                toast.error(data.message)
            }
        } catch (error) {
            console.log(error)
            toast.error(error.message)
        }
        
    }

    const getAllTrainers = async()=> {
        try {
            const {data} = await axios.post(backendUrl  + "/api/admin/all-trainers", {}, {headers:{aToken}})
            if(data.success){
              setTrainers(data.trainers)
              
            } else {
                toast.error(data.message)
            }
        } catch (error) {
            console.log(error)
            toast.error(error.message)
        }
    }

    const getQueries = async()=> {
        try {
            const {data}  = await axios.get(backendUrl + "/api/admin/get-queries", {headers:{aToken}})
            if(data.success){
             setQueries(data.queries)
             console.log(data.queries)
            } else {
                toast.error(data.message)
            }
        } catch (error) {
            console.log(error)
            toast.error(error.message)
        }
    }

    const readQuery = async(queryId)=> {
        try {
             const {data} = await axios.post(backendUrl + "/api/admin/read-query", {queryId}, {headers:{aToken}})
             if(data.success){
                toast.success(data.message)
                getQueries()
             } else{
                toast.error(data.message)
             }
        } catch (error) {
            console.log(error)
            toast.error(error.message)
        } 
    }
    const unReadQuery = async(queryId)=> {
        try {
             const {data} = await axios.post(backendUrl + "/api/admin/unread-query", {queryId}, {headers:{aToken}})
             if(data.success){
                toast.success(data.message)
                getQueries()
             } else{
                toast.error(data.message)
             }
        } catch (error) {
            console.log(error)
            toast.error(error.message)
        } 
    }

    const value = {
       backendUrl,aToken,
        setAToken,
        getAllTrainers,
        trainers, setTrainers,
        getAllUSers,
        users, setUsers,
        queries, setQueries,
        getQueries, 
        readQuery, unReadQuery
    }

    useEffect(()=>{
     getQueries()
    },[])

  
    return (
        <AdminContext.Provider value={value}>
         {props.children}
       </AdminContext.Provider>
    )

   

}

export default AdminContextProvider