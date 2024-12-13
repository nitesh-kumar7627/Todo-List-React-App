import React from 'react'
import { MdModeEditOutline, MdOutlineCancel } from "react-icons/md";

const EditTask = ({ task }) => {
    return (
        <>
            <div>
               
            </div>
            <div>
                <input type="date" name="" id="" defaultValue={task.dueDate} />
            </div>
            <div>
                <MdOutlineCancel />
                <MdModeEditOutline />
            </div>
        </>
    )
}

export default EditTask