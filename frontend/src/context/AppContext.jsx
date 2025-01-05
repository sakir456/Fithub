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
    trainers, setTrainers
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
