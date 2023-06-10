import { useEffect, useState } from "react";
import { FiDelete } from "react-icons/fi";
import { IoMdAdd } from "react-icons/io";
import "../styles/styles.css";
import TodoHeader from "./TodoHeader";

interface Todo {
  id: number;
  text: string;
  completed?: boolean;
}

const TodoList = () => {
  const [todos, setTodos] = useState<Todo[]>(() => {
    const localValue = localStorage.getItem("todos");
    if (localValue == null) return [];
    return JSON.parse(localValue);
  });
  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  const [inputValue, setInputValue] = useState("");
  // handling the input change
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  // handling the add todo button
  const handleAddTodo = () => {
    if (inputValue.trim() === "") {
      return;
    }
    setTodos((currentTodos) => {
      return [
        ...currentTodos,
        { id: Math.random() * 1234, text: inputValue, completed: false },
      ];
    });
    setInputValue("");
  };

  // to delete a todo we filter the array without the selected id
  const handleDeleteTodo = (id: number) => {
    const updatedTodos = todos.filter((todo) => todo.id !== id);
    // we add the new todo list to the state
    setTodos(updatedTodos);
    localStorage.setItem("todos", JSON.stringify(updatedTodos));
  };
  const toggleTodo = (id: number, completed: boolean) => {
    setTodos((currentTodos) => {
      return currentTodos.map((todo) => {
        if (todo.id === id) {
          return { ...todo, completed };
        }
        return todo;
      });
    });
  };
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleAddTodo();
    }
  };

  const filteredTodos = todos
    ? todos.filter((todo) => todo.completed !== false)
    : [];
  return (
    <section id="todoList">
      <TodoHeader currentTodos={filteredTodos.length} allTodos={todos.length} />
      <div className="input">
        <input
          placeholder="add a todo..."
          type="text"
          value={inputValue}
          onKeyDown={handleKeyDown}
          onChange={handleInputChange}
        />
        <button onClick={handleAddTodo}>
          <IoMdAdd />
        </button>
      </div>
      <ul>
        {todos.length == 0 && (
          <p
            style={{
              textAlign: "center",
              padding: "10px",
              borderBottom: "1px solid gainsboro",
            }}
          >
            Add your first todo {":)"}
          </p>
        )}
        {todos.map((todo, index) => (
          // we render each todo
          <li key={index}>
            <span className={todo.completed ? "completed" : ""}>
              <input
                id="checkbox"
                type="checkbox"
                checked={todo.completed}
                onChange={(e) => toggleTodo(todo.id, e.target.checked)}
              />
              {todo.text}
            </span>
            <button
              className="danger"
              onClick={() => handleDeleteTodo(todo.id)}
            >
              <FiDelete />
            </button>
          </li>
        ))}
      </ul>
    </section>
  );
};

export default TodoList;
