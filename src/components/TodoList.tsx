import { useEffect, useState } from "react";
import { IoMdAdd } from "react-icons/io";
import { AiTwotoneDelete } from "react-icons/ai";
interface Todo {
  id: number;
  text: string;
}
const TodoList = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [inputValue, setInputValue] = useState("");
  useEffect(() => {
    let lcs = localStorage.getItem("todos");
    if (lcs) {
      const storedTodos = JSON.parse(lcs);
      setTodos(storedTodos);
    }
  }, []);
  // handling the input change
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  // handling the add todo button
  const handleAddTodo = () => {
    if (inputValue.trim() === "") {
      return;
    }
    // creating a new Todo
    const newTodo: Todo = {
      // building unique id :)))
      id: Math.random() * 123456789,
      text: inputValue,
    };
    setTodos([...todos, newTodo]);
    localStorage.setItem("todos", JSON.stringify([...todos, newTodo]));
    // clearing the input
    setInputValue("");
  };

  // to delete a todo we filter the array without the selected id
  const handleDeleteTodo = (id: number) => {
    const updatedTodos = todos.filter((todo) => todo.id !== id);
    // we add the new todo list to the state
    setTodos(updatedTodos);
    localStorage.setItem("todos", JSON.stringify(updatedTodos));
  };
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleAddTodo();
    }
  };
  return (
    <section id="todoList">
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
        {todos.map((todo, index) => (
          // we render each todo
          <li key={index}>
            {todo.text}
            <button
              className="danger"
              onClick={() => handleDeleteTodo(todo.id)}
            >
              <AiTwotoneDelete />
            </button>
          </li>
        ))}
      </ul>
    </section>
  );
};
export default TodoList;
