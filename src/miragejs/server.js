import { createServer } from "miragejs";
import Todo from '../Components/Task.json'

export function makeServer() {
  return createServer({
    routes() {
      this.namespace = "api";

      let todos = Todo;
      // Get all todos
      this.get("/todos", () => todos);

      // Add a new todo
      this.post("/todos", (schema, request) => {
        let newTodo = JSON.parse(request.requestBody);
        todos.push(newTodo);
        return newTodo;
      });

      // Update a todo
      this.put("/todos/:id", (schema, request) => {
        let id = request.params.id;
        let updatedTodo = JSON.parse(request.requestBody);
        todos = todos.map((todo) => (todo.id === id ? updatedTodo : todo));
        return updatedTodo;
      });

      // Delete a todo
      this.delete("/todos/:id", (schema, request) => {
        let id = request.params.id;
        todos = todos.filter((todo) => todo.id !== id);
        return { message: "Todo deleted" };
      });
    },
  });
}
