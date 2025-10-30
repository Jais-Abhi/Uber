import axios from "axios";
import { serverUrl } from "../main.jsx";
import { setCaptainData } from "../Redux/captainSlice.js";

const getCurrentCaptain = async(dispatch) => {

    try {
        const response = await axios.get(`${serverUrl}/api/auth/captain/profile`,
            {withCredentials:true})        
        if(response.status===201){
        console.log("captain",response)
        dispatch(setCaptainData(response.data))
        }

    } catch (error) {
        console.log(error)
    }

}

export default getCurrentCaptain;