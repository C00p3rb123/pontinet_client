import axios from "axios";

export const  login = async (data) => {
    const url = process.env.EXPO_PUBLIC_LOGIN_URL;
    try{
        
        const response = await axios.post(url, data);
        return response.data.token
    }catch(err) {
        console.log(err)
        throw new Error("Unable to login");
    }    
}