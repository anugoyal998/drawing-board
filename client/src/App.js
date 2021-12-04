import React, { useEffect } from "react";
import { useHistory } from "./hooks/useHistory";
import { Route } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import Cookies from "js-cookie"
import toast, {Toaster}from "react-hot-toast"
import axios from 'axios'

import { Home } from "./components/home/Home";
import { Canvas } from "./components/canvas/Canvas";
import { Toolbar } from "./components/canvas/Toolbar";
import { TopRight } from "./components/canvas/TopRight";
import { setAuth } from "./redux/actions/auth.action";
import {setAllBoards} from './redux/actions/board.action'

export default function App() {
  const url = process.env.REACT_APP_SERVER_BASE_URL
  const [elements, setElements, undo, redo] = useHistory([]);
  const auth = useSelector((state=> state.authReducer.auth))
  const dispatch = useDispatch();
  useEffect(async ()=> {
    dispatch(setAuth(JSON.parse(Cookies.get('user'))))
    try {
      const rsp = await axios.post(`${url}/get-board`,{email: auth?.email})
      dispatch(setAllBoards(rsp.data))
    } catch (error) {
      console.log("error in get board", error)
      toast.error('An error occured')
    }
  },[])
  return (
    <>
    <Toaster/>
      <Route path="/" exact>
        <Home setElements={setElements} />
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
