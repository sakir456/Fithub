import { createContext } from "react";

export const AppContext = createContext()

const AppContextProvider = (props) => {
 
    const daysOfWeek = ["Sun","Mon","Tue","Wed","Thu","Fri","Sat"]
  const monthsofYear = ["Jan","Feb","Mar","Apr","May","June","July","Aug","Sept","Oct","Nov","Dec"]

  

  const extractDateandDay = (date)=> {
    const newdate = new Date(date)
    const day = newdate.getDate()
    const month = monthsofYear[newdate.getMonth()]  
    const fullYear = newdate.getFullYear()
    const dayOfWeek =  daysOfWeek[newdate.getDay()]
  
    return `${day} ${month} ${fullYear} - ${dayOfWeek} `
  }
    
   
    const value = {
        extractDateandDay    
    }

    return (
        <AppContext.Provider value={value}>
            {props.children}
        </AppContext.Provider>
    )

}

export default AppContextProvider