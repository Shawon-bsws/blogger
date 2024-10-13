import { createSlice } from '@reduxjs/toolkit';

const stateSlice = createSlice({
  name: 'state',
  initialState: {
    isLoggedIn: false,
    profileDropdown: false,
    user_token: '',
  },
  reducers: {
    setLoggedIn: (state, action) => {
      state.isLoggedIn = action.payload;
    },
    setProfileDropdown: (state, action) => {
      state.profileDropdown = action.payload;
    },
    setUserToken: (state, action) => {
      state.user_token = action.payload;
    },
  },
});

export const { setLoggedIn, setProfileDropdown, setUserToken } =
  stateSlice.actions;
export { stateSlice };
