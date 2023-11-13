import React from "react";
import { createContext, useState } from "react";

const CurrentUser = createContext();

const UserContext = ({ children }) => {

  const [userId, setUserId] = useState({});


  //import { CurrentUser } from "../UserContext";
  //const { userId } = useContext(CurrentUser);
  //to use the properties of the current user

  return (
    <CurrentUser.Provider value={{ userId, setUserId }}>
      {children}
    </CurrentUser.Provider>
  );
};

export { CurrentUser, UserContext };
