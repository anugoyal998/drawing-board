import {
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
} from "@chakra-ui/react";
import axios from "axios";
import { useState } from "react";
import { BiDotsVerticalRounded } from "react-icons/bi";
import {HiOutlinePencil} from "react-icons/hi"
import {MdDeleteOutline} from "react-icons/md"
import { Modal } from "../../helper/Modal";
import { RenameModal } from "./RenameModal";

export const Dropdown = ({data}) => {
  const url = process.env.REACT_APP_SERVER_BASE_URL
  const [open,setOpen] = useState(false)
  const handleClick = async ()=> {
    try {
      axios.post(`${url}/delete-board`,{_id: data._id})
      setInterval(() => {
        window.location.reload()
      }, 500);
    } catch (error) {
      console.log("error in deleteBoardFunction",error)
      return
    }
  }
  return (
    <>
    <Menu>
      <MenuButton>
        <BiDotsVerticalRounded className="text-xl" />
      </MenuButton>
      <MenuList>
        <MenuItem className="space-x-2 flex items-center font-semibold" onClick={()=> setOpen(true)} > <HiOutlinePencil className="text-lg" /> <span>Rename</span> </MenuItem> 
        <MenuItem className="space-x-2 flex items-center font-semibold" onClick={handleClick} > <MdDeleteOutline className="text-lg" /> <span>Delete</span> </MenuItem>
      </MenuList>
    </Menu>
    <Modal open={open} setOpen={setOpen}  component={<RenameModal setOpen={setOpen} data={data} />}  />
    </>
  );
};
