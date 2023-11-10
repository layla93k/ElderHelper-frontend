//util functions interacting with api go here

import axios from "axios";

const request = axios.create({
  baseURL: "https://elderhelper.onrender.com/api",
});

export const fetchJobs = async () => {
  try {
    const response = await request.get(`/jobs`)
      return response.data;
  } 
  catch(error){
     console.log(error)
  }
};

export const fetchChatMessages = async () => {
  return await request.get(`/api/messages/4?chatroom=1`).then(({ data }) => {
    return data;
  });
};

export const postJob = async (newJob) => {
  return await request.post("/jobs", newJob).then(({ data }) => {
    return data;
  });
};

export const getExistingUser = async (phoneNumber) => {
  return await request.get(`/users/${phoneNumber}`).then(({ data }) => {
    return data;
  });
};
