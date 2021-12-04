import React, { useEffect } from 'react'
import { NoBoard } from './NoBoard'
import { PlusBtn } from './PlusBtn'
import toast , {Toaster} from "react-hot-toast"
import axios from "axios"
import {useSelector} from 'react-redux'

export const Content = ({setElements}) => {
  const url = process.env.REACT_APP_SERVER_BASE_URL
    const auth = useSelector(state=> state.authReducer.auth)
    useEffect(async () =>{
        if(!auth || !auth?.name)return
        const boardEle = JSON.parse(localStorage.getItem('board'))
        if(!boardEle)return
        localStorage.clear()
        setElements([])
        try {
            const data = {
              name: auth.name,
              email: auth.email,
              gid: auth.gid,
              img: auth.img,
              board_data: boardEle
            }
            await axios.post(`${url}/new-board`,data)
          } catch (error) {
            console.log("error in save board", error)
            toast.error('An error occured while saving board')
          }
    },[])
    return (
        <div className="bg-gray-100 absolute top-0 left-0 h-screen w-screen pt-16 px-10" style={{zIndex: -10}} >
            <Toaster/>
            <p className="font-semibold text-lg text-gray-600">Recent Boards</p>
            <NoBoard/>
            <PlusBtn/>
        </div>
    )
}