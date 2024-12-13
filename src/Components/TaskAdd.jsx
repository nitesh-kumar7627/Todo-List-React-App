import React, { useRef } from 'react'
import { RiAddLargeFill } from "react-icons/ri";

const TaskAdd = (props) => {
    const TaskTitle = useRef(null)
    const TaskDueDate = useRef(null)
    const clickHandle = (e) => {
        e.preventDefault();
        const Title = TaskTitle.current.value
        const dueDate = TaskDueDate.current.value
        TaskTitle.current.value = ""
        TaskDueDate.current.value = ""
        props.onNewTask(Title, dueDate);
    }

    return (
        <form action='/api/todJos' method='POST'  className="my-3 p-3 border-black dark:border-white border-b  grid  grid-col-4 grid-flow-col justify-between " onSubmit={clickHandle}>
            <input type="text" name="" id="" className='text-black dark:bg-neutral-700 dark:text-white p-1 col-span-3 rounded' placeholder='Enter Task ...' required ref={TaskTitle} minLength={2} />
            <input type="date" name="" id="" className='bg-blue-500  rounded' ref={TaskDueDate} />
            <button type="submit" className='' >
                <RiAddLargeFill className='size-10 bg-green-500  p-1 rounded-md stroke-red-500 hover:fill-blue' />
            </button>
        </form>
    )
}

export default TaskAdd