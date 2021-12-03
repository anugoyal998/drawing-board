import React from "react";
import { Home } from "./components/home/Home";
import { Canvas } from "./components/Canvas";
import { Toolbar } from "./components/Toolbar";
import { useHistory } from "./hooks/useHistory";
import { Route } from "react-router-dom";

export default function App() {
  const [elements, setElements, undo, redo] = useHistory([]);
  return (
    <>
      <Route path="/" exact>
        <Home/>
      </Route>
      <Route path="/new-board" exact>
        <Canvas
          elements={elements}
          setElements={setElements}
          undo={undo}
          redo={redo}
        />
        <Toolbar />
      </Route>
    </>
  );
}
