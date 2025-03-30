import { createSlice } from "@reduxjs/toolkit";

interface GlobalState {
  mode: "light" | "dark";
  isSideBarOpen: boolean;
  userId: string;
}
const initailState: GlobalState = {
  mode: "light",
  isSideBarOpen: false,
  userId: "63701cc1f03239b7f700000e",
};

export const globalSlice = createSlice({
  name: "global",
  initialState: initailState,
  reducers: {
    setMode: (state) => {
      state.mode = state.mode === "light" ? "dark" : "light";
    },
    toggleSidebar: (state) => {
      state.isSideBarOpen = !state.isSideBarOpen;
    },
    setSideBar: (state, action) => {
      state.isSideBarOpen = action.payload;
    },
  },
});

export const { setMode, setSideBar } = globalSlice.actions;
export default globalSlice.reducer;
