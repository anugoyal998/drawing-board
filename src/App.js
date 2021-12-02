import React from "react";
import { Canvas } from "./components/Canvas";
import { Toolbar } from "./components/Toolbar";
import { useHistory } from "./hooks/useHistory";

export default function App() {
  const [elements, setElements, undo, redo] = useHistory([]);
  return (
    <div>
      <Canvas elements={elements} setElements={setElements} undo={undo} redo={redo} /> 
      <Toolbar />
    </div>
  );
}
