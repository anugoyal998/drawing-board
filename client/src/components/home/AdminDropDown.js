import { Menu, MenuButton, MenuItem, MenuList } from "@chakra-ui/react";
import React from "react";
import { useSelector } from "react-redux";
import {AiOutlineHome} from 'react-icons/ai'
import {CgLogOut} from 'react-icons/cg'
import { useHistory } from "react-router-dom";
import Cookies from 'js-cookie'
import toast from "react-hot-toast";

export const AdminDropDown = () => {
    const auth = useSelector(state => state.authReducer.auth)
    const history = useHistory()
    const handleLogout = ()=> {
        Cookies.remove('user')
        toast.success("Logout success")
        setInterval(() => {
            window.location.reload()
        }, 1500);
    }
  return (
    <Menu>
      <MenuButton>
        <img
          src={auth?.img}
          alt={auth?.name}
          className="rounded-full w-8 h-8 xs:w-10 xs:h-10 cursor-pointer"
        />
      </MenuButton>
      <MenuList>
          <MenuItem className="flex space-x-2 items-center font-semibold" onClick={()=> history.push('/')}><AiOutlineHome className="text-lg"/> <span>Home</span></MenuItem>
          <MenuItem className="flex space-x-2 items-center font-semibold" onClick={handleLogout} ><CgLogOut className="text-lg" /> <span>Logout</span> </MenuItem>
      </MenuList>
    </Menu>
  );
};
