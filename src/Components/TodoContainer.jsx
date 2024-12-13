import React, { useRef, useState } from "react";
import TaskDisplay from "./TaskDisplay";
import TotalTask from "./Task.json";
import TaskAdd from "./TaskAdd";
import { TodoItemsContext } from "../store/todo-items-store";
import { useEffect } from "react";
import MsgDispaly from "./NotificationContainer";

const TodoContainer = () => {
  const [Tasks, setTasks] = useState([]);
  const [msg, setMsg] = useState([]);

  // fetch all todos
  useEffect(() => {
    fetch("/api/todos")
      .then((res) => {
        showNotification("success", "Task loaded successfully");
        return res.json();
      })
      .catch((err) => showNotification("err", "Task load failed"))
      .then((json) => {
        setTasks(json);
      });
  }, []);

  //add a new todo
  const addNewTodo = (newTask) => {
    fetch(`/api/todos`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newTask),
    })
      .then((res) => {
        showNotification("success", "Task added successfully");
        return res.json();
      })
      .then((json) => {
        setTasks((pre) => [...pre, json]);
        console.log("this is run");
      })
      .catch((err) => showNotification("err", "Task add failed"));
  };

  // update todo
  const updateTodo = (id, updatedTask) => {
    fetch(`/api/todos/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(updatedTask),
    })
      .then((res) => {
        showNotification("success", "Task updated successfully");
        return res.json();
      })
      .then((json) => {
        setTasks((pre) => pre.map((task) => (task.id === id ? json : task)));
      })
      .catch((err) => showNotification("err", "Task updated failed"));
  };

  //delete todo
  const deleteTodo = (id) => {
    fetch(`/api/todos/${id}`, {
      method: "DELETE",
    })
      .then((res) => {
        if (res.ok) {
          setTasks((prevTask) => prevTask.filter((item) => item.id !== id));
          showNotification("success", "Todo Deleted successfully");
        }
      })
      .catch((err) => {
        console.log(err, "err on delete");
        showNotification("err", "Todo Delete failed, Something went wrong! ");
      });
  };

  // show msg notification
  const showNotification = (msgType, messg) => {
    const id = idGenrator();
    setMsg((pre) =>
      pre ? [...pre, { id, msgType, messg }] : [{ id, msgType, messg }]
    );
    let count = true;

    // setTimeout(() => {
    //   if(count) {

    // setMsg((pre) => pre?.shift());
    //     count = false;
    //   }
    // }, 2000);
  };

  // close msg notification
  const closeNotification = (id) => {
    setMsg((pre) => pre.filter((item) => item.id !== id));
  };

  const idGenrator = () => {
    let id1 = Math.round(Math.random() * Math.pow(100, 5));
    let id = id1.toString(16);
    return id;
  };

  const onNewTask = (title, dueDate) => {
    const NewTask = {
      id: idGenrator(),
      title: title,
      dueDate: dueDate,
      completed: false,
    };
    addNewTodo(NewTask);
  };
  const updateLocalStorageTask = () => {
    const Data = JSON.stringify(Tasks);
    localStorage.setItem("taskList", Data);
  };

  const fetchDataFromLocal = () => {
    const Data = localStorage.getItem("taskList");
    const ObjData = JSON.parse(Data);
    console.log(ObjData, "objData");
  };

  const setLocalStorage = () => {
    console.log(localStorage);

    const data = localStorage.getItem("task");
    const form = JSON.parse(data);
    console.log(data, form, "local");
  };

  const onTaskUpdate = (id, isCompleted, newTitle, newDueDate) => {
    const updatedTask = {
      id,
      title: newTitle,
      dueDate: newDueDate,
      completed: isCompleted,
    };
    updateTodo(id, updatedTask);
  };

  const onTaskDelete = (idToRemove, titleToRemove) => {
    deleteTodo(idToRemove);
  };

  return (
    <TodoItemsContext.Provider value={Tasks}>
      <div className="bg-black/30  max-w-screen-lg w-full p-4  ">
        {msg?.length > 0 && (
          <MsgDispaly msg={msg} handleClose={closeNotification} />
        )}

        <TaskAdd onNewTask={onNewTask} />
        <ol className="p-4 bg-black/20   rounded-md flex flex-col gap-2 overflow-scroll">
          {Tasks.length === 0 ? (
            <div className=" w-full h-[20vw] bg-gradient-to-r from-blue-800 via-green-800 to-orange-800 text-4xl font-bold flex justify-center items-center bg-clip-text text-transparent bg-300%">
              Enjoy Your Day
            </div>
          ) : (
            <div className="dark:text-white flex justify-between ">
              <h1>Today Total Tasks : {Tasks.length}</h1>
              <div>input:</div>
            </div>
          )}

          {Tasks.map((item, indx) => (
            <TaskDisplay
              task={item}
              key={indx}
              onDeleteHandle={onTaskDelete}
              onUpdateHandle={onTaskUpdate}
            />
          ))}
        </ol>
      </div>
    </TodoItemsContext.Provider>
  );
};

export default TodoContainer;
