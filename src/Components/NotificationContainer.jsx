import React from "react";
import Notification from "./Notification";

const MsgDispaly = (props) => {

  
  return (
    <div className=" px-4 py-2 grid grid-flow-row gap-3 align-middle justify-center  fixed bottom-5 left-1 z-30 overflow-y-auto">
     {props.msg.map((item,indx) => <Notification handleClose={props.handleClose} item={item} key={indx}  /> )}
    </div>
  );
};

export default MsgDispaly;
