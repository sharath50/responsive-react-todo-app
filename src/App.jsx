import { useEffect, useRef, useState } from "react";

function App() {
  const [todos, setTodos] = useState([]);
  const todoRef = useRef();
  const dateRef = useRef();
  if (!localStorage.getItem("to_do_app")) {
    localStorage.setItem("to_do_app", JSON.stringify([]));
  }

  useEffect(() => {
    setTodos(JSON.parse(localStorage.getItem("to_do_app")));
  }, []);

  const toDoHandler = () => {
    if (!todoRef.current.value || todoRef.current.value === " ") {
      return;
    }

    let creationDate = new Date();
    let expiryDate = dateRef.current.value
      ? new Date(dateRef.current.value)
      : null;
    let newTodo = {
      todo: todoRef.current.value,
      createdDateTime: creationDate.toDateString(),
      expiryDateTime: expiryDate?.toDateString(),
    };
    const existing = JSON.parse(localStorage.getItem("to_do_app"));
    existing.push(newTodo);
    localStorage.setItem("to_do_app", JSON.stringify(existing));
    setTodos([...todos, newTodo]);
    todoRef.current.value = "";
    dateRef.current.value = "";
  };

  const deleteToDo = (item) => {
    const updatedTodos = todos.filter((todo) => {
      return todo !== item;
    });
    setTodos(updatedTodos);
    localStorage.setItem("to_do_app", JSON.stringify(updatedTodos));
  };
  return (
    <>
      <div className="container">
        <div className="card">
          <div className="head">
            <h1>To Do App</h1>
          </div>
          <div className="body">
            <div className="inputLine">
              <input ref={todoRef} type="text" />
              <input ref={dateRef} type="date" />
              <button onClick={toDoHandler}>Add To Do</button>
            </div>
            <div className="todoShowLine">
              <ul>
                <li className="todoHead">
                  <div>to do</div>
                  <div>start date</div>
                  <div>end date</div>
                </li>
                {todos.map((item, index) => {
                  return (
                    <li
                      key={index}
                      style={{ display: "flex" }}
                      className="todo"
                    >
                      <div>{item.todo}</div>
                      <div>
                        {item.createdDateTime} <br />
                        <span className="dates">create date</span>
                      </div>
                      <div>
                        {item.expiryDateTime} <br />
                        <span className="dates">expiry date</span>
                      </div>
                      <div
                        className="deleteButton"
                        onClick={() => deleteToDo(item)}
                      >
                        X
                      </div>
                    </li>
                  );
                })}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
