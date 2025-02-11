// Appcontext.jsx
import React, { createContext } from 'react';

export const Appcontext = createContext();

const AppContextProvider = ({ children }) => {
    const currency = '$'
  const calculateAge = (dob) => {
    const today = new Date();
    const birthdate = new Date(dob);
    let age = today.getFullYear() - birthdate.getFullYear();
    return age;
  };
  const months = ["","Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"]
const slotDateFormat = (slotDate)=>{
    const dataArray = slotDate.split('_')
   return  dataArray[0]+" " + months[Number(dataArray[1])] +" " + dataArray[2]
}
  const value = {
    calculateAge,
    slotDateFormat,
    currency
  };

  return (
    <Appcontext.Provider value={value}>
      {children}
    </Appcontext.Provider>
  );
};

export default AppContextProvider;
