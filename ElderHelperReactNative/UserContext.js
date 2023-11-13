import React from "react";
import { createContext, useState } from "react";

const UserType = createContext();

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
  return (
    <UserType.Provider value={{ userId, setUserId }}>
      {children}
    </UserType.Provider>
  );
};

export { UserType, UserContext };