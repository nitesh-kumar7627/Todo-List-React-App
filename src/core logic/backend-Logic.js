// fetch all todos

    // useEffect(() => {
    //   fetch("/api/todos")
    //     .then((res) => {
    //       showNotification("success", "Task loaded successfully");
    //       return res.json();
    //     })
    //     .catch((err) => showNotification("err", "Task load failed"))
    //     .then((json) => {
    //       setTasks(json);
    //     });
    // }, []);


//add a new todo
export const addNewTodo = (newTask) => {
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
export const updateTodo = (id, updatedTask) => {
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
export const deleteTodo = (id) => {
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
