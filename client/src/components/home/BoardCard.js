import React, { useEffect, useState } from "react";
import { getBoardImg } from "./functions/getBoardImg";
import Moment from "react-moment";
import { Dropdown } from "./Dropdown";
import { Link } from "react-router-dom";

export const BoardCard = (props) => {
  const [img, setImg] = useState(null);
  useEffect(() => {
    async function fetchData() {
      const rsp = await getBoardImg(props.e);
      setImg(rsp);
    }
    fetchData();
  }, [props?.e]);
  const handleClick = () => {
    localStorage.setItem("board", JSON.stringify(props?.e?.board_data));
    localStorage.setItem("uid", props?.e?.uid);
  };
  return (
    <div className="w-72 ks:w-96 xs:w-64 h-56 border-2 rounded-md m-2 cursor-pointer">
      <canvas
        id="card_canvas"
        className="hidden"
        width={window.innerWidth}
        height={window.innerHeight}
      />
      {img && (
        <Link to="/update-board">
          <img
            id="card_img"
            src={img}
            className="bg-white h-40 border-b-2 w-full"
            onClick={handleClick}
            alt="cardImg"
          />
        </Link>
      )}
      <div className="p-1">
        <p className="font-semibold">{props?.e?.board_name}</p>
        <div className="flex justify-between items-center">
          <div className="flex items-center">
            {/* <p>logo</p> */}
            <Moment fromNow className="text-sm font-semibold">
              {props?.e?.updatedAt}
            </Moment>
          </div>
          <Dropdown data={props.e} />
        </div>
      </div>
    </div>
  );
};
