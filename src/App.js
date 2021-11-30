import React, { useState } from 'react'
import { Canvas } from './components/Canvas'
import { Toolbar } from './components/Toolbar'
import { TopLeft } from './components/TopLeft'

export default function App() {
  const [canvasBg,setCanvasBg] = useState('ffffff')
  
  return (
    <div>
      <TopLeft canvasBg={canvasBg} setCanvasBg={setCanvasBg} />
      <Canvas/>
      <Toolbar/>
    </div>
  )
}
