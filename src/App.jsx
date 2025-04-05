import { useRef, useState } from "react";

function App() {
  const [todos, setTodos] = useState([]);
  const todoRef = useRef();
  const dateRef = useRef();

  const toDoHandler = () => {
    let creationDate = new Date();
    let expiryDate = dateRef.current.value
      ? new Date(dateRef.current.value)
      : null;
    let newTodo = {
      todo: todoRef.current.value,
      createdDateTime: creationDate.toDateString(),
      expiryDateTime: expiryDate?.toDateString(),
    };
    setTodos([...todos, newTodo]);
    todoRef.current.value = "";
    dateRef.current.value = "";
  };

  const deleteToDo = (item) => {
    const updatedTodos = todos.filter((todo) => {
      return todo !== item;
    });
    setTodos(updatedTodos);
  };
  return (
    <>
      <div>
        <input ref={todoRef} type="text" />
        <input ref={dateRef} type="date" />
        <button onClick={toDoHandler}>Add To Do</button>
      </div>
      <div>
        <ul>
          {todos.map((item, index) => {
            return (
              <div key={index} style={{ display: "flex" }}>
                <li>{item.todo}</li>
                <li>{item.createdDateTime}</li>
                <li>{item.expiryDateTime}</li>
                <span onClick={() => deleteToDo(item)}>X</span>
              </div>
            );
          })}
        </ul>
      </div>
    </>
  );
}

export default App;
