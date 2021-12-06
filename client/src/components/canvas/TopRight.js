import React from 'react'
import { useSelector } from 'react-redux'
import { AdminDropDown } from '../home/AdminDropDown'

export const TopRight = () => {
    const auth = useSelector(state => state.authReducer.auth)
    return (
        <div className="absolute top-0 right-0 flex items-center m-2 mt-3">
            {/* <AdminDropDown/> */}
            <img
          src={auth?.img}
          alt={auth?.name}
          className="rounded-full w-8 h-8 xs:w-10 xs:h-10 cursor-pointer"
        />
        </div>
    )
}
