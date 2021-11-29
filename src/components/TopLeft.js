import React from 'react'
import {AiOutlineDelete} from 'react-icons/ai'
import {FaRegSave} from 'react-icons/fa'
import {MdDarkMode} from 'react-icons/md'


export const TopLeft = ({canvasBg,setCanvasBg}) => {
    return (
        <div className="absolute top-0 left-0 m-1 rounded-md shadow-md p-2 z-10">
            <div className="flex space-x-3">
                <div className="cursor-pointer p-1 bg-gray-100 rounded-md"><AiOutlineDelete className="text-2xl"/></div>
                <div className="cursor-pointer p-1 bg-gray-100 rounded-md"><FaRegSave className="text-2xl"/></div>
                <div className="cursor-pointer p-1 bg-gray-100 rounded-md"><MdDarkMode className="text-2xl"/></div>
            </div>
            {/* <div className="flex mt-3 space-x-3">
                <div className="w-8 h-8 rounded-md bg-white border"></div>
                <div className="flex">
                    <div className="w-8 h-8 rounded-md bg-gray-100 justify-center items-center flex text-lg font-semibold rounded-tr-none rounded-br-none">#</div>
                    <input type="text" className="border rounded-md rounded-tl-none rounded-bl-none" value={canvasBg} onChange={(e)=> setCanvasBg(e.target.value)} />
                </div>
            </div> */}
        </div>
    )
}
