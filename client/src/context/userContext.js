import { createSlice, configureStore } from "@reduxjs/toolkit";

const userContext = createSlice({
  name: "user",
  initialState: {
    isAuthenticated: false,
    isLoading: false,
    user: {
      name: null,
      email: null,
      role: "employee",
    },
  },
  reducers: {
    setLoading: (state, action) => {
      state.isLoading = action.payload;
    },
    setUser: (state, action) => {
      state.user = action.payload;
      state.isAuthenticated = true;
      state.isLoading = false;
    },
    clearUser: (state) => {
      state.user = null;
      state.isAuthenticated = false;
      state.isLoading = false;
    },
  },
});

export const { setLoading, setUser, clearUser } = userContext.actions;

const store = configureStore({
  reducer: {
    user: userContext.reducer,
  },
});

export default store;
export { userContext };
