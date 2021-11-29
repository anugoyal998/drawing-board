import React, { useState } from 'react'
import { TopLeft } from './components/TopLeft'
import { Canvas } from './components/Canvas'

export default function App() {
  const [canvasBg,setCanvasBg] = useState('ffffff')
  
  return (
    <div>
      <TopLeft canvasBg={canvasBg} setCanvasBg={setCanvasBg} />
      <Canvas canvasBg={canvasBg} setCanvasBg={setCanvasBg} />
    </div>
  )
}
