import api from "../axios/axios";

export const login = async (data) => {
  const res = await api.post("auth/login", data, { withCredentials: true });
  return res;
};

export const signup = async (data) => {
  const res = await api.post("auth/register", data, { withCredentials: true });
  return res;
};

export const verifyOtp = async (data) => {
  const res = await api.post("auth/verify", data, { withCredentials: true });
  return res;
};

export const validateUser = async () => {
  const res = await api.get("auth/validate", { withCredentials: true });
  return res;
};
