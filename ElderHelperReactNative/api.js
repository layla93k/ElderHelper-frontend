//util functions interacting with api go here

import axios from "axios";

const request = axios.create({
  baseURL: "https://elderhelper.onrender.com/api",
});

export const fetchElderJobs = async () => {
  return await request.get(`/jobs/elder/4`).then(({ data }) => {
    console.log(data);
    return data;
  });
};

fetchElderJobs();
