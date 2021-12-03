import React from 'react'
import { NoBoard } from './NoBoard'
import { PlusBtn } from './PlusBtn'

export const Content = () => {
    return (
        <div className="bg-gray-100 absolute top-0 left-0 h-screen w-screen pt-16 px-10" style={{zIndex: -10}} >
            <p className="font-semibold text-lg text-gray-600">Recent Boards</p>
            <NoBoard/>
            <PlusBtn/>
        </div>
    )
}