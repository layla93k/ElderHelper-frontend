//util functions interacting with api go here

import axios from "axios";

const request = axios.create({
  baseURL: "https://elderhelper.onrender.com/api",
});

export const fetchJobs = async () => {
  try {
    const response = await request.get(`/jobs`);
    return response.data;
  } catch (error) {
    console.log(error);
  }
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

export const getChatMessages = async (user_id, chatroom) => {
  console.log("herelo");
  return await request
    .get(`/messages/${user_id}?chatroom=${chatroom}`)
    .then(({ data }) => {
      console.log(data);
      return data;
    });
};

// getChatMessages(4, 1);

export const getJobsByElderId = async (elder_id) => {
  return await request.get(`/jobs/elder/${elder_id}`).then(({ data }) => {
    console.log(data);
    return data;
  });
};

getJobsByElderId(4);
