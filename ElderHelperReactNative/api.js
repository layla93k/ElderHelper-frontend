//util functions interacting with api go here

import axios from "axios";

const request = axios.create({
  baseURL: "https://elderhelper.onrender.com/api",
});

export const fetchElderJobs = async () => {
  return await request.get(`/jobs/elder/4`).then(({ data }) => {
    return data;
  });
};

fetchElderJobs();


export const postJob = async (newJob) => {
  return await request.post('/jobs', newJob).then(({ data }) => {
    return data
  })
}
