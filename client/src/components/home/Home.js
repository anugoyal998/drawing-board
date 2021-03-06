import React from 'react'
import { Content } from './Content'
import { Navbar } from './Navbar'

export const Home = ({setElements}) => {
    return (
        <div className="">
            <Navbar/>
            <Content setElements={setElements} />
        </div>
    )
}
