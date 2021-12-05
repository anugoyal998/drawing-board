import React, { useEffect, useState } from "react";
import { getBoardImg } from "./functions/getBoardImg";
import Moment from "react-moment";
import { Dropdown } from "./Dropdown";
import {Link} from 'react-router-dom'

export const Card = (props) => {
  const [img, setImg] = useState(null);
  useEffect(async () => {
    const rsp = await getBoardImg(props.e);
    setImg(rsp);
  }, []);
  const handleClick = ()=> {
    localStorage.setItem('board', JSON.stringify(props?.e?.board_data))
    localStorage.setItem('uid',props?.e?.uid)
  }
  return (
    <div className="w-64 h-56 border-2 rounded-md m-2 cursor-pointer">
      <canvas
        id="card_canvas"
        className="w-screen h-screen hidden"
        width={window.innerWidth}
        height={window.innerHeight}
      />
      {img && <Link to="/update-board" ><img id="card_img" src={img} className="bg-white h-40 border-b-2 w-full" onClick={handleClick} /></Link>}
      <div className="p-1">
        <p className="font-semibold">{props?.e?.board_name}</p>
        <div className="flex justify-between items-center">
          <div className="flex items-center">
            {/* <p>logo</p> */}
            <Moment fromNow className="text-sm font-semibold" >{props?.e?.updatedAt}</Moment>
          </div>
          <Dropdown data={props.e}/>
        </div>
      </div>
    </div>
  );
};