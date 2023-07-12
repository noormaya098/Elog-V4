import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    data: '',
}

export const driverslice = createSlice({
    name: "showdriver",
    initialState,
    reducers: {
        setDrvier: (state, action) =>{
            state.dataDriver = action.payload;
        }
    },
});

// Action creators are generated for each case reducer function
export const { setDrvier } = driverslice.actions;

export default driverslice.reducer; 