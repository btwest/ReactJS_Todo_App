import { useState, useEffect } from "react";
import TodoInput from "./components/TodoInput";
import TodoList from "./components/TodoList";

function App() {
  // An array to store the todo items. Initialized as an empty array
  const [todos, setTodos] = useState([]);
  // A string to store the value of the current todo item being added or edited
  // Initialized as an empty string.
  const [todoValue, setTodoValue] = useState("");
  //State to hold the App Title
  const [appTitle, setAppTitle] = useState("My Todo App");

  /*Takes a list of todos ('newlist') as an argument and stores it in the browsers local storage
  It uses localStorage.setItem to save the data with "todos" as the key.
  The list is stringified into JSON format before storage. */
  function persistData(newList) {
    localStorage.setItem("todos", JSON.stringify({ todos: newList }));
  }
  /*Takes a new todo item ('newTodo') as an argument and creates a new list of todos
  by appending the new item to the existing list, then saves this new list to lcoal storage,
  and updates the 'todos' state with this new list. */
  function handleAddTodos(newTodo) {
    const newTodoList = [...todos, newTodo];
    persistData(newTodoList);
    setTodos(newTodoList);
  }
  /* Removes a todo item based on its index. It filters out the todo item at the given
  index from the 'todos' array, updates the local storage with th enew list without the deleted
  item, then sets the 'todos' state to this new list.*/
  function handleDeleteTodo(index) {
    const newTodoList = todos.filter((todo, todoIndex) => {
      return todoIndex !== index;
    });
    persistData(newTodoList);
    setTodos(newTodoList);
  }
  /*This function edits a todo item by fetching the todo item's value at the specified index,
  setting the value to the 'todoValue' state (so that it can be edited), then calls
  handleDeleteTodo to remove the original todo item from the list. */
  function handleIndexTodo(index) {
    const valueToBeEdited = todos[index];
    setTodoValue(valueToBeEdited);
    handleDeleteTodo(index);
  }
  /* */
  function handleUpShiftTodo(index) {
    if (index <= 0 || index >= todos.length) {
      return;
    }
    const newTodoList = [
      ...todos.slice(0, index - 1),
      todos[index],
      todos[index - 1],
      ...todos.slice(index + 1),
    ];
    persistData(newTodoList);
    setTodos(newTodoList);
  }
  /*Checks if 'localStorage' is available, fetches the "todos" item from the local storage, if found,
  and parses it from JSON andudpates the 'todos' state with this data. This function is used
  to persist todos between page reloads.  */
  useEffect(() => {
    if (!localStorage) {
      return;
    }
    let localTodos = localStorage.getItem("todos");
    if (!localTodos) {
      return;
    }
    localTodos = JSON.parse(localTodos).todos;
    setTodos(localTodos);
  }, []);

  return (
    <>
      <div>
        <h1 className="appTitle">{appTitle}</h1>
      </div>
      <TodoInput
        todoValue={todoValue}
        setTodoValue={setTodoValue}
        handleAddTodos={handleAddTodos}
      />
      <TodoList
        handleUpShiftTodo={handleUpShiftTodo}
        handleIndexTodo={handleIndexTodo}
        handleDeleteTodo={handleDeleteTodo}
        todos={todos}
      />
    </>
  );
}

export default App;
