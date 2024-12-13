import React, { useState, useRef, useContext } from "react";
import { MdOutlineDelete, MdOutlineEdit } from "react-icons/md";
import { ImCheckboxUnchecked, ImCheckboxChecked } from "react-icons/im";
import { TodoItemsContext } from "../store/todo-items-store";

const TaskDisplay = ({ task, onDeleteHandle, onUpdateHandle }) => {
  const [isEditMode, setIsEditMode] = useState(false);
  const [isChecked, setisChecked] = useState(false);
  const isCompleted = useRef();
  const title = useRef();
  const dueDate = useRef();
  const ItemsFromContext = useContext(TodoItemsContext);

  const DeleteTask = (e) => {
    onDeleteHandle(task.id, task.title);
  };
  const editModeOn = () => {
    if (isEditMode) {
      UpdateTask();
      setIsEditMode(false);
    } else {
      setIsEditMode(true);
    }
  };

  const editModeOff = () => {
    setIsEditMode(false);
  };
  const UpdateTask = () => {
    const completed = isCompleted.current.checked;
    const newTitle = title.current.value;
    const taskDueDate = dueDate.current.value;
    onUpdateHandle(task.id, completed, newTitle, taskDueDate);
  };
  return (
    <li className="bg-gradient-to-tr dark:from-blue-800 from-blue-400  dark:to-yellow-800 to-yellow-400  p-3 rounded  dark:text-white grid grid-flow-col grid-cols-3   hover:bg-gradient-to-l">
      <div className=" col-span-2 capitalize subgrid ">
        <span>
          <span className="pr-4 inline-block ">
            {isEditMode ? (
              <input
                className="size-5 dark:bg-neutral-800"
                ref={isCompleted}
                type="checkbox"
                name=""
                id=""
                defaultValue={task.completed}
              />
            ) : task.completed ? (
              <ImCheckboxChecked />
            ) : (
              <ImCheckboxUnchecked />
            )}
          </span>

          {isEditMode ? (
            <input
              className=" px-1 rounded dark:bg-neutral-800"
              ref={title}
              type="text"
              name=""
              id=""
              defaultValue={task.title}
            />
          ) : (
            task.title
          )}
        </span>
      </div>
      <div className=" justify-start ">
        {isEditMode ? (
          <input
            className="dark:bg-neutral-800"
            type="date"
            ref={dueDate}
            name=""
            id=""
            defaultValue={task.dueDate}
          />
        ) : (
          task.dueDate
        )}
      </div>
      <div className=" flex gap-4 *:rounded-sm  items-center  child:hover:scale-150">
        <MdOutlineEdit
          className=" bg-blue-500 relative scale-125"
          onClick={editModeOn}
        />
        {isEditMode ? (
          <button
            className="bg-white dark:bg-black px-2  text-sm"
            onClick={editModeOff}
          >
            Cancel
          </button>
        ) : (
          <MdOutlineDelete
            key={task.id}
            className=" relative scale-150 hover:scale-175 bg-red-500"
            onClick={DeleteTask}
          />
        )}
      </div>
    </li>
  );
};

export default TaskDisplay;
