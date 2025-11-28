import api from "../axios/axios";

export const getLeaveData = async () => {
  const res = await api.get("/manager/leave", { withCredentials: true });
  return res.data;
};

export const updateLeave = async (leaveId, status) => {
  try {
    const response = await api.put(
      `manager/leave/${leaveId}`,
      { status },
      { withCredentials: true }
    );
    return response.data;
  } catch (error) {
    return { error: error.message };
  }
};
