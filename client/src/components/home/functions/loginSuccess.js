import axios from 'axios'
import toast from 'react-hot-toast'
import Cookies from 'js-cookie'
import {setAuth} from '../../../redux/actions/auth.action'

export const loginSuccess = async (response,dispatch)=> {
    const url = process.env.REACT_APP_SERVER_BASE_URL
    console.log(url)
    const data = {
        name: response.givenName,
        email: response.email,
        img: response.imageUrl,
        gid: response.googleId
    }
    try {
        await axios.post(`${url}/auth/add/user`,data)
        const jsonString = JSON.stringify(data)
        Cookies.set('user',jsonString,{expires: 1})
        dispatch(setAuth(data))
        toast.success("Login sucess")
        setInterval(() => {
            window.location.reload()
        }, 2000);
    } catch (error) {
        console.log(error,"eror in login")
        toast.error("An error occured")
        setInterval(() => {
            window.location.reload()
        }, 1000);
    }
}