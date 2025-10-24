import axios from "axios";
import { serverUrl } from "../main.jsx";
import { setUserData } from "../Redux/userSlice.js";

const getCurrentUser = async(dispatch) => {

    try {
        const response = await axios.get(`${serverUrl}/api/auth/user/profile`,
            {withCredentials:true})        
        if(response.status===201){
        console.log(response)
        dispatch(setUserData(response.data))
        }

    } catch (error) {
        console.log(error)
    }

}

export default getCurrentUser;