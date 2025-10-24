import {createSlice} from '@reduxjs/toolkit'

const captainSlice = createSlice({
    name : "captain",
    initialState : {
        captainData : null,
    },
    reducers: {
        setCaptainData: (state, action) => {
            state.captainData = action.payload // Accept direct user data
        },
    }
})

export const {setCaptainData} = captainSlice.actions

export default captainSlice.reducer