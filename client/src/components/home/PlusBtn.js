import React from 'react'
import {AiFillPlusCircle} from 'react-icons/ai'
import { Link } from 'react-router-dom'


export const PlusBtn = () => {
    return (
        <Link to="/new-board" className="fixed bottom-0 right-0 m-2 hover:scale-110 transform outline-none focus:outline-none">
            <AiFillPlusCircle className="text-5xl text-gray-600"/>
        </Link>
    )
}
