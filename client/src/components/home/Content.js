import React, { useEffect } from 'react'
import { NoBoard } from './NoBoard'
import { PlusBtn } from './PlusBtn'
import toast , {Toaster} from "react-hot-toast"
import axios from "axios"
import {useDispatch, useSelector} from 'react-redux'
import { Card } from './BoardCard'

export const Content = ({setElements}) => {
    const url = process.env.REACT_APP_SERVER_BASE_URL
    const auth = useSelector(state=> state.authReducer.auth)
    const allBoards = useSelector(state=> state.boardReducer.allBoards)
    // save board
    useEffect(async () =>{
      async function fetch1(){
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
      }
        fetch1()
    },[])
    if(allBoards.length <= 0){
      return (
        <>
        <div className={`bg-gray-100 absolute top-0 left-0 w-screen h-screen pt-16 px-10`} style={{zIndex: -10}} >
            <Toaster/>
            <p className="font-semibold text-lg text-gray-600">Recent Boards</p>
            <PlusBtn/>
            <NoBoard/>
        </div>
        </>
      )
    }else return(
      <>
      <Toaster/>
      <PlusBtn/>
      <p className="font-semibold text-lg text-gray-600 bg-gray-100 pt-16 px-10">Recent Boards</p>
      <div className="bg-gray-100 grid overflow-y-scroll overflow-x-hidden " style={{gridTemplateColumns: "repeat(auto-fill,minmax(250px,1fr))", height: '85vh' }} >
        {
          allBoards && allBoards?.length && allBoards?.map((e,key)=> {
            return <Card e={e} key={key} />
          })
        }
      </div>
      </>
    )
}