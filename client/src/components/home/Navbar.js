import React from "react";
import { ImSearch } from "react-icons/im";
import { FaUser } from "react-icons/fa";
import GoogleLogin from "react-google-login";
import { Toaster } from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import {Link} from "react-router-dom"
import { loginSuccess } from "./functions/loginSuccess";

export const Navbar = () => {
  const loginSuccessClick = (response) => {
    loginSuccess(response.profileObj, dispatch);
  };
  const loginFailureClick = (response) => {
    console.log(response);
  };
  const dispatch = useDispatch();
  const auth = useSelector((state) => state.authReducer.auth);
  return (
    <div className="flex items-center justify-between p-2 shadow-md bg-white z-10">
      <Toaster />
      <Link to="/">
        <button className="outline-none focus:outline-none italic font-semibold text-2xl">
          Drawing Board
        </button>
      </Link>
      <div className="bg-gray-100 flex items-center rounded-3xl">
        <div className="p-2 pl-4">
          <ImSearch />
        </div>
        <div className="p-1">
          <input
            type="search"
            placeholder="Search"
            className="bg-gray-100 p-1 outline-none focus:outline-none w-64"
          />
        </div>
      </div>
      {auth && auth?.name ? (
        <img
          src={auth?.img}
          alt={auth?.name}
          className="rounded-full w-10 h-10"
        />
      ) : (
        <GoogleLogin
          clientId="820810288686-ha10p9qg9a63163742r45ob5hfug8cdv.apps.googleusercontent.com"
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
  );
};
