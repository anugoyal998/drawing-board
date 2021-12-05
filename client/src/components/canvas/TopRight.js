import React from 'react'
import { AdminDropDown } from '../home/AdminDropDown'

export const TopRight = () => {
    return (
        <div className="absolute top-0 right-0 flex items-center m-2 mt-3">
            <AdminDropDown/>
        </div>
    )
}
