import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { getBoardImg } from "./functions/getBoardImg";

export const SearchDropDown = ({ search }) => {
  const [allBoards, setAllBoards] = useState([]);
  const boards = useSelector((state) => state.boardReducer.allBoards);
  useEffect(() => {
    const data = boards.filter((board) =>
      board.board_name.toLowerCase().includes(search.toLowerCase())
    );
    setAllBoards(data);
  }, [search, boards]);
  if (allBoards?.length && search !== "")
    return (
      <>
        <div
          className="fixed top-14 w-72 bg-white rounded-md shadow-sm hidden xs:flex flex-col"
          style={{ left: "calc(50vw - 144px)" }}
        >
          {allBoards.map((e, key) => {
            return <Card data={e} key={key} />;
          })}
        </div>
        <div className="fixed top-14 left-2 w-72 bg-white rounded-md shadow-sm flex xs:hidden flex-col">
          {allBoards.map((e, key) => {
            return <Card data={e} key={key} />;
          })}
        </div>
      </>
    );
  else return null;
};

const Card = ({ data }) => {
  const [img, setImg] = useState(null);
  useEffect(() => {
    async function fetchData() {
      const rsp = await getBoardImg(data);
      setImg(rsp);
    }
    fetchData();
  }, [data]);
  const handleClick = () => {
    localStorage.setItem("board", JSON.stringify(data.board_data));
    localStorage.setItem("uid", data.uid);
  };
  return (
    <Link to="/update-board">
      <div
        className="flex space-x-2 items-center my-1 px-4 cursor-pointer hover:bg-hoverColor py-2"
        onClick={handleClick}
      >
        <div className="border">
          <img src={img} alt={data.board_name} className="w-16" />
        </div>
        <p className="font-semibold">{data.board_name}</p>
      </div>
    </Link>
  );
};
