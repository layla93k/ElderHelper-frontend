import React from "react";
import { createContext, useState } from "react";

const CurrentUser = createContext();

const UserContext = ({ children }) => {
  const [userId, setUserId] = useState({
    first_name: "Chloe",
    surname: "White",
    phoneNumber: "00009012345",
    isElder: true,
    user_id: 4,
    postcode: 'M9 9II',
    avatar_url: "https://images.unsplash.com/photo-1699519337091-8499c51d9186",
    profile_msg: "Offering my services for house-sitting."
  });

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
