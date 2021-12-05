import React, { useState } from 'react'
import toast , { Toaster } from "react-hot-toast"
import axios from "axios"

export const RenameModal = ({setOpen,data}) => {
    const url = process.env.REACT_APP_SERVER_BASE_URL
    const [new_name,setNewName] = useState('Untitled Board')
    const handleClick = async () => {
        try {
            if(new_name === ''){
                toast.error(`Board Name can't be empty`)
                return
            }
            await axios.post(`${url}/rename-board`, {uid: data.uid,new_board_name: new_name})
            setOpen(false)
            setInterval(() => {
                window.location.reload()
            }, 300);
        } catch (error) {
            console.error("error in rename board", error)
            setOpen(false)
            return
        }
    }
    return (
        <div className="w-96 h-56 bg-white rounded-md px-5 py-6 animate__animated animate__zoomIn">
            <Toaster/>
            <p className="text-xl text-gray-600 font-semibold">Rename Board</p>
            <p className="mt-3">Enter a new name</p>
            <input type="text" value={new_name} onChange={e => setNewName(e.target.value)} className="mt-3 border-2 rounded-md p-1 focus:outline-none w-full" />
            <div className="flex items-center justify-end mt-5 space-x-2">
                <button className="bg-gray-600 text-white py-2 px-6 rounded-md hover:bg-gray-700" onClick={handleClick} >OK</button>
                <button className="bg-white text-gray-600 border py-2 px-5 rounded-md hover:bg-gray-50" onClick={()=> setOpen(false)} >Cancel</button>
            </div>
        </div>
    )
}
