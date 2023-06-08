interface Props {
  currentTodos: number;
  allTodos: number;
}
const TodoHeader = ({ currentTodos, allTodos }: Props) => {
  return (
    <header>
      <h1>React Todo List</h1>
      <div className="todo-content">
        <p>
          Completed: {currentTodos}/{allTodos}
        </p>
      </div>
    </header>
  );
};

export default TodoHeader;
