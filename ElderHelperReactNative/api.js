//util functions interacting with api go here

import axios from "axios";

const request = axios.create({
  baseURL: "https://elderhelper.onrender.com/api",
});

export const fetchJobs = async (press) => {
  try {
    const response = await request.get(`/jobs`, {
      params: {
        postcode: press,
      },
    });
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

export const getExistingUser = async (phoneNumber) => {
  return await request.get(`/users/${phoneNumber}`).then(({ data }) => {
    return data;
  });
};

export const postJob = async (newJob) => {
  return await request.post("/jobs", newJob).then(({ data }) => {
    return data;
  });
};

export const getJobsUsers = async () => {
  return await request.get(`/jobs/users`).then(({ data }) => {
    return data;
  });
};
export const updateProfile = async (newProfile, user_id) => {
  return await request
    .patch(`/users/${user_id}`, newProfile)
    .then(({ data }) => {
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

export const getJobsByElderId = async (elder_id) => {
  return await request.get(`/jobs/elder/${elder_id}`).then(({ data }) => {
    console.log(data);
    return data;
  });
};

export const postNewUser = async (newUser) => {
  return await request.post("/users", newUser).then(({ data }) => {
    return data;
  });
};

export const getAcceptedHelperJobs = async (user_id) => {
  return await request.get(`/users/${user_id}/accepted`).then(({ data }) => {
    return data;
  });
};

export const getJobsByElder = async (elder_id) => {
  return await request.get(`/jobs/elder/${elder_id}`).then(({ data }) => {
    return data;
  });
};
