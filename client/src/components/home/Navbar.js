import React, { useEffect, useState } from "react";
import logo from "../../img/logo.png";
import { ImSearch } from "react-icons/im";
import { FaUser } from "react-icons/fa";
import GoogleLogin from "react-google-login";
import toast, { Toaster } from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { loginSuccess } from "./functions/loginSuccess";
import axios from "axios";
import { setAllBoards } from "../../redux/actions/board.action";
import { AdminDropDown } from "./AdminDropDown";
import { SearchDropDown } from "./SearchDropDown";

export const Navbar = () => {
  const url = process.env.REACT_APP_SERVER_BASE_URL;
  const [input, setInput] = useState(false);
  const loginSuccessClick = (response) => {
    loginSuccess(response.profileObj, dispatch);
  };
  const loginFailureClick = (response) => {
    console.log(response);
  };
  const dispatch = useDispatch();
  const auth = useSelector((state) => state.authReducer.auth);
  const [search,setSearch] = useState('')
  useEffect(() => {
    let cancel = true
    async function fetchData() {
      try {
        const rsp = await axios.post(`${url}/get-board`, {
          email: auth?.email,
        });
        var data = rsp.data;
        data = data.sort(function (a, b) {
          var keyA = new Date(a.updatedAt),
            keyB = new Date(b.updatedAt);
          // Compare the 2 dates
          if (keyA > keyB) return -1;
          if (keyA < keyB) return 1;
          return 0;
        });
        dispatch(setAllBoards(data));
      } catch (error) {
        console.log("error fetching data", error);
        toast.error("An error occured");
      }
    }
    cancel && fetchData();
    return ()=> {
      cancel = false
    }
  }, [auth,dispatch,url]);
  return (
    <div className="fixed w-full">
      <SearchDropDown search={search}/>
      <div className="flex items-center justify-between p-2 shadow-md bg-white z-10">
        <Toaster />
        <div className="xs:hidden">
        {input ? (
          <input className="animate__animated animate__fadeInLeft xs:hidden bg-gray-100 py-1 px-3 focus:outline-none w-56 rounded-3xl" type="search" placeholder="Search" value={search} onChange={e=> setSearch(e.target.value)} />
        ) : (
          <Link to="/">
            <img alt="logo" src={logo} className="w-10 xs:w-12 animate__animated animate__fadeInLeft" />
          </Link>
        )}
        </div>
        <div className="hidden xs:block">
        <Link to="/">
            <img alt="logo" src={logo} className="w-10 xs:w-12" />
          </Link>
        </div>
          <div className="bg-gray-100 hidden xs:flex items-center rounded-3xl">
            <div className="p-2 pl-4">
              <ImSearch />
            </div>
            <div className="p-1">
              <input
                type="search"
                placeholder="Search"
                className="bg-gray-100 p-1 outline-none focus:outline-none w-64"
                value={search} 
                onChange={e=> setSearch(e.target.value)} 
              />
            </div>
          </div>
        {auth && auth?.name ? (
          <div className="flex space-x-3 items-center">
            <div className="xs:hidden">
              <ImSearch className="text-xl" onClick={() => setInput(!input)} />
            </div>
            <AdminDropDown/>
          </div>
        ) : (
          <GoogleLogin
            clientId={process.env.REACT_APP_GLOGIN_CID}
            render={(renderProps) => (
              <button
                className="outline-none focus:outline-none"
                onClick={renderProps.onClick}
                disabled={renderProps.disabled}
              >
                <FaUser className="text-3xl" />
              </button>
            )}
            buttonText=""
            onSuccess={loginSuccessClick}
            onFailure={loginFailureClick}
            cookiePolicy={"single_host_origin"}
          />
        )}
      </div>
    </div>
  );
};
