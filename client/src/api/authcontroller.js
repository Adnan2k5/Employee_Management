import api from "../axios/axios";

export const login = async (data) => {
  console.log(data);
  const res = await api.post("auth/login", data);
  return res;
};

export const signup = async (data) => {
  console.log(data);
  const res = await api.post("auth/register", data);
  return res;
};
