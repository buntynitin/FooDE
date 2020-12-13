import React, { createContext, useState } from "react";
export const UserContext = createContext([{}, () => {}]);

const UserContextProvider = props => {
  const [state, setState] = useState({
    user: {
      username:"",
      email:"",
      password:"",
      confirmPassword:"",
      restaurantName:"",
      image:"",
      tags: [{ key: 0, label: 'North Indian' }],
      address:"",
      city:"",
      state:"",
      zipcode:"",
      coordinates:['',''],
      mobile:"",
      openingTime:"",
      closingTime:"",
      acceptTerms: false,
    },
    errors: {}
  });
  return (
    <UserContext.Provider value={[state, setState]}>
      {props.children}
    </UserContext.Provider>
  );
};

export default UserContextProvider