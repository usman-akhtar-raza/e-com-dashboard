import {  createSlice } from "@reduxjs/toolkit";


interface GlobalState{
    mode:"light"|"dark",
    isSideBArOpen:boolean
}
const initailState = {
    mode:"dark",
    isSideBarOpen:false,
}


export const globalSlice = createSlice({
    name:"global",
    initialState:initailState,
    reducers:{
        setMode:(state)=>{
            state.mode = state.mode === "light" ? "dark" : "light"
        },
        toggleSidebar:(state)=>{
            state.isSideBarOpen=!state.isSideBarOpen;
        },
        setSideBar:(state , action)=>{
            state.isSideBarOpen=action.payload
        }
    }
    
})

export const { setMode, setSideBar } = globalSlice.actions;
export default globalSlice.reducer;