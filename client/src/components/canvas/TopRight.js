import React from 'react'
import { useSelector } from 'react-redux'

export const TopRight = () => {
    const auth = useSelector(state => state.authReducer.auth)
    return (
        <div className="absolute top-0 right-0 flex items-center m-2 mt-3">
            <img src={auth?.img} alt={auth?.name} className="w-10 h-10 rounded-full"  />
        </div>
    )
}
