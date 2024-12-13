import React from "react";
import { TiInfoOutline } from "react-icons/ti";
import { MdOutlineClose } from "react-icons/md";
const Notification = ({ item,handleClose }) => {

  return (
    <div
      className={` bg-neutral-700  hover:bg-neutral-800 border-b-2  overflow-hidden rounded-md text-white grid grid-flow-col items-center justify-between gap-4 `}
    >
      <div
        className={`${
          item.msgType === "err" ? `text-red-500` : `text-green-500`
        } p-2  grid grid-flow-col items-center gap-1`}
      >
        <TiInfoOutline />
        <div>{item.messg}</div>
      </div>
      <MdOutlineClose
        className="hover:bg-red-500 w-6 h-full p-1 hover:cursor-pointer"
        onClick={() => {handleClose(item.id)}}
      />
    </div>
  );
};

export default Notification;
