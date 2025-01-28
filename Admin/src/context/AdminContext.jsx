import { createContext,    useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";


export const AdminContext  = createContext()

const AdminContextProvider = (props) => {
     
    const [loading, setLoading] = useState(false)
    const [aToken, setAToken] = useState(localStorage.getItem("aToken")? localStorage.getItem("aToken") : "")
    const [trainers, setTrainers] = useState([])
    const [queries, setQueries] = useState([])
    const [users, setUsers] = useState([])
    const [classes, setClasses] = useState([])
    const [dashData, setDashData] = useState(false)

    const backendUrl = import.meta.env.VITE_BACKEND_URL

    const getAllUsers = async()=> {
        setLoading(true)
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
        }finally{
            setLoading(false)
        }
        
    }

    const getAllTrainers = async()=> {
        setLoading(true)
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
        }finally{
            setLoading(false)
        }
    }

    const getAllClasses = async()=> {
        setLoading(true)
        try {
              const {data} = await axios.post(backendUrl + "/api/admin/all-classes", {}, {headers:{aToken}})
              if(data.success){
                 setClasses(data.classes)
                 console.log(data.classes)

              } else{
               toast.error(data.message)
              }
        } catch (error) {
              console.log(error)
              toast.error(error.message)
        }finally{
            setLoading(false)
        }
      }

      const cancelClass = async(classId)=> {
        
        try {
          const {data}  = await axios.post(backendUrl + "/api/admin/cancel-class", {classId}, {headers:{aToken}})
          if(data.success){
                toast.success(data.message)
                getAllClasses()
               
          } else{
                toast.error(data.message)
          }
        } catch (error) {
                console.log(error)
                toast.error(error.message)

          
        }
}

const completeClass = async(classId)=> {
    
    try {
            const {data}  = await axios.post(backendUrl  + "/api/admin/complete-class", {classId}, {headers:{aToken}})
            if(data.success){
                    toast.success(data.message)
                    getAllClasses()
                    
            } else{
                    toast.error(data.message)
            }    
    } catch (error) {
           console.log(error)
           toast.error(error.message) 
    }
    
}

    const getQueries = async()=> {
        setLoading(true)
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
        }finally{
            setLoading(false)
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

    const getDashData  = async()=>{
        setLoading(true)
        try {
          const {data} = await axios.get(backendUrl + "/api/admin/dashboard", {headers:{aToken}})
          if(data.success){
             setDashData(data.dashData)
             console.log(data.dashData)
          } else {
            toast.error(data.message)
          }
        } catch(error){
          console.log(error)
          toast.error(error.message)
        }finally{
            setLoading(false)
        }
  }
  

    const value = {
        loading, setLoading,
       backendUrl,aToken,
        setAToken,
        getAllTrainers,
        trainers, setTrainers,
        getAllUsers,
        users, setUsers,
        queries, setQueries,
        getQueries, 
        readQuery, unReadQuery,
        classes, setClasses,
        getAllClasses,
        cancelClass,completeClass,
        dashData, setDashData,
        getDashData 
    }

   

  
    return (
        <AdminContext.Provider value={value}>
         {props.children}
       </AdminContext.Provider>
    )

   

}

export default AdminContextProvider