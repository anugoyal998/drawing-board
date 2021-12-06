import axios from 'axios'
import React, { useEffect } from 'react'
import {AiFillPlusCircle} from 'react-icons/ai'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'


export const PlusBtn = ({setElements}) => {
    const auth = useSelector(state => state.authReducer.auth)
    useEffect(() =>{
        var cancel = true
        async function fetchData() {
            const url = process.env.REACT_APP_SERVER_BASE_URL
            setElements([])
            const board = JSON.parse(localStorage.getItem('board'))
            const uid = localStorage.getItem('uid')
            localStorage.clear()
            if(board && !uid){
                const data = {
                    name: auth?.name,
                    email: auth?.email,
                    gid: auth?.gid,
                    img: auth?.img,
                    board_data: board
                }
                try {
                    await axios.post(`${url}/new-board`,data)
                } catch (error) {
                    console.log("error in new-board crete",error)
                    return
                }
            }else if(board && uid){
                try {
                    await axios.post(`${url}/update-board`,{uid,board_data: board})
                } catch (error) {
                    console.log("error in update-board crete",error)
                    return
                }
            }
        }
        cancel && fetchData();
        return ()=> {
            cancel = false;
        }
    },[auth?.email,auth?.gid,auth?.img,auth?.name])
    return (
        <Link to={auth? "/new-board" : "/"} className="fixed bottom-0 right-0 m-2 hover:scale-110 transform outline-none focus:outline-none">
            <AiFillPlusCircle className="text-5xl text-gray-600"/>
        </Link>
    )
}
