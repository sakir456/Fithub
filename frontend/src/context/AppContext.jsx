import { createContext, useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

export const AppContext = createContext();

const AppContextProvider = (props) => {
  const backendUrl = import.meta.env.VITE_BACKEND_URL;
  const [token, setToken] = useState(
    localStorage.getItem("token") ? localStorage.getItem("token") : false
  );
  const [userData, setUserData] = useState(false);
  const [classes, setClasses] = useState([]);
  const [trainers, setTrainers] = useState([])

  const monthsofYear = ["Jan","Feb","Mar","Apr","May","June","July","Aug","Sept","Oct","Nov","Dec"]
  const daysOfWeek = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"]

  const extractDateandDay = (date)=> {
    const newDate = new Date(date)
    const day = newDate.getDate()
    const month = monthsofYear[newDate.getMonth()]  
    const fullYear = newDate.getFullYear()
    const dayOfWeek =  daysOfWeek[ newDate.getDay()]
    
    return `${day} ${month} ${fullYear} - ${dayOfWeek} `
  }

  const loadUserProfileData = async () => {
    try {
      const { data } = await axios.get(backendUrl + "/api/user/get-profile", {
        headers: { token },
      });
      if (data.success) {
        console.log(data.userData);
        setUserData(data.userData);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  const classesForWeek = async () => {
    try {
      const { data } = await axios.get(
        backendUrl + "/api/user/get-classes"
      );
      if (data.success) {
        console.log(data.classes);
        setClasses(data.classes);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  const getTrainersData = async()=> {
    try {
     const {data} = await axios.get(backendUrl + "/api/trainer/list") 
     if(data.success){
      setTrainers(data.trainers)
      console.log(data.trainers)
    } else {
      toast.error(data.message)
    }
    } catch (error) {
      console.log(error)
      toast.error(error.message)
    }
  }

  const value = {
    backendUrl,
    token,
    setToken,
    loadUserProfileData,
    userData,
    setUserData,
    classesForWeek,
    classes,
    setClasses,
    getTrainersData,
    trainers, setTrainers,
    extractDateandDay
  };

  useEffect(() => {
    classesForWeek();
    getTrainersData()
  }, []);

  useEffect(() => {
    if (token) {
      loadUserProfileData();
    } else {
      setUserData(false);
    }
  }, [token]);

  return (
    <AppContext.Provider value={value}>{props.children}</AppContext.Provider>
  );
};

export default AppContextProvider;
