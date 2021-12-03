import React, { useEffect } from "react";
import { useHistory } from "./hooks/useHistory";
import { Route } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import Cookies from "js-cookie"

import { Home } from "./components/home/Home";
import { Canvas } from "./components/canvas/Canvas";
import { Toolbar } from "./components/canvas/Toolbar";
import { TopRight } from "./components/canvas/TopRight";
import { setAuth } from "./redux/actions/auth.action";

export default function App() {
  const [elements, setElements, undo, redo] = useHistory([]);
  const auth = useSelector((state=> state.authReducer.auth))
  const dispatch = useDispatch();
  useEffect(()=> {
    dispatch(setAuth(JSON.parse(Cookies.get('user'))))
  },[])
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
        {auth && auth?.name && <TopRight/>}
      </Route>
    </>
  );
}
