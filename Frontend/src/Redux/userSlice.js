import {createSlice} from '@reduxjs/toolkit'

const userSlice = createSlice({
    name : "user",
    initialState : {
        userData : null,
        token : null,
    },
    reducers: {
        setUserData: (state, action) => {
            state.userData = action.payload // Accept direct user data
        },
        setUserToken: (state, action) => {
            state.token = action.payload // Accept direct token value
        },
    }
})

export const {setUserData,setUserToken} = userSlice.actions

export default userSlice.reducer