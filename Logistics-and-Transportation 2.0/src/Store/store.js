

import { configureStore } from "@reduxjs/toolkit";
import authSliceReducer from "../Features/auth/authSlice";



let store = configureStore({
    reducer : {
        auth : authSliceReducer,
    }
})



export default store;