import { createSlice } from "@reduxjs/toolkit";

const feedSlice = createSlice({
  name: "feed",
  initialState: [], // Initialize state as an array
  reducers: {
    addFeed: (state, action) => {
      return action.payload; // Replace state with the new feed data
    },
    removeFeed: (state, action) => {
      return state.filter((user) => user._id !== action.payload); // Remove a user by ID
    },
  },
});

export const { addFeed, removeFeed } = feedSlice.actions;

export default feedSlice.reducer;