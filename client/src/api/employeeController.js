import api from "../axios/axios";

export const submitLeave = async (data) => {
  const res = await api.post("employee/submitLeave", data, {
    withCredentials: true,
  });
  return res;
};
