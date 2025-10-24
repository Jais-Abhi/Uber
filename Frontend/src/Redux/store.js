import { configureStore } from "@reduxjs/toolkit";
import userSliceReduceres from "./userSlice";
import captainSliceReducers from "./captainSlice";
const store  = configureStore({
    reducer : {
        user : userSliceReduceres,
        captain :captainSliceReducers
    }
})

export default store