import React from "react";
import {AiFillPlusCircle} from 'react-icons/ai'
import {Link} from 'react-router-dom'
import {useSelector} from 'react-redux'
import toast, { Toaster} from 'react-hot-toast'


export const NoBoard = () => {
  const auth = useSelector(state => state.authReducer.auth)
  const handleClick = ()=> {
    if(auth)return
    toast('Login to get started',{
      icon: '🔒'
    })
  }
  return (
    <div
      className="absolute top-0 left-0 h-screen w-screen flex flex-col justify-center items-center"
      style={{ zIndex: -1 }}
    >
      <Toaster/>
      <p className="font-semibold text-lg text-gray-600">
        You don't have any Board yet
      </p>
      <p className="text-gray-600 flex items-center">
        Tap{" "}
        <Link to={auth ? "/new-board" : "/"} className="mx-1 outline-none focus:outline-none transform hover:scale-110">
          <AiFillPlusCircle className="text-3xl" onClick={handleClick} />
        </Link>{" "}
        to create one
      </p>
    </div>
  );
};
