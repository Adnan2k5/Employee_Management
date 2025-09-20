import { createSlice, configureStore } from "@reduxjs/toolkit";

const userContext = createSlice({
  name: "user",
  initialState: {
    isAuthenticated: false,
    user: {
      name: null,
      email: null,
      role: "employee",
    },
  },
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
      state.isAuthenticated = true;
    },
    clearUser: (state) => {
      state.user = null;
      state.isAuthenticated = false;
    },
  },
});

export const { setUser, clearUser } = userContext.actions;

const store = configureStore({
  reducer: {
    user: userContext.reducer,
  },
});

export default store;
export { userContext };
