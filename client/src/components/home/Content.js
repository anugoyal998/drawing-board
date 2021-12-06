import React, { useEffect } from "react";
import { NoBoard } from "./NoBoard";
import { PlusBtn } from "./PlusBtn";
import toast, { Toaster } from "react-hot-toast";
import axios from "axios";
import { useSelector } from "react-redux";
import { BoardCard } from "./BoardCard";

export const Content = ({ setElements }) => {
  const url = process.env.REACT_APP_SERVER_BASE_URL;
  const auth = useSelector((state) => state.authReducer.auth);
  const allBoards = useSelector((state) => state.boardReducer.allBoards);
  if (allBoards.length <= 0) {
    return (
      <>
        <div
          className={`bg-gray-100 absolute top-0 left-0 w-screen h-screen pt-16 px-10`}
          style={{ zIndex: -10 }}
        >
          <Toaster />
          <p className="font-semibold text-lg text-gray-600">Recent Boards</p>
          <PlusBtn setElements={setElements} />
          <NoBoard />
        </div>
      </>
    );
  } else
    return (
      <>
        <Toaster />
        <PlusBtn setElements={setElements} />
        <p className="font-semibold text-lg text-gray-600 bg-gray-100 pt-16 px-3 xs:px-10">
          Recent Boards
        </p>
        <div
          className="bg-gray-100 grid justify-items-center xs:justify-items-start overflow-y-scroll overflow-x-hidden "
          style={{
            gridTemplateColumns: "repeat(auto-fill,minmax(250px,1fr))",
            height: "85vh",
          }}
        >
          {allBoards &&
            allBoards?.length &&
            allBoards?.map((e, key) => {
              return <BoardCard e={e} key={key} />;
            })}
        </div>
      </>
    );
};
