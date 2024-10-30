import React, { useEffect, useState } from "react";
import styles from "./todopage.module.css"
import TodoList from "./TodoList";
import axios from "axios";
import NavBar from "../NavBar/NavBar";

const TodoPage = () => {
  const [todo, addTodo] = useState("");
  const [displayTodo, setdisplayTodo] = useState([]);
  const [searchDisplay, setSearchDisplay] = useState([]);
  const [searchLetter, setSearchLetter] = useState("");

  useEffect(() => {
    fetchTodos();
  }, []);

  // New useEffect to handle search filtering
  useEffect(() => {
    const filteredWords = displayTodo.filter((word) =>
      word.todo.toLowerCase().includes(searchLetter.toLowerCase())
    );
    setSearchDisplay(filteredWords);
  }, [searchLetter, displayTodo]); // Depend on both searchLetter and displayTodo

  const fetchTodos = async () => {
    try {
      const id_user = localStorage.getItem("id");
      const response = await axios.get("https://todo-app-backend-six-umber.vercel.app/get",  
        {
          headers: { 
            token: localStorage.getItem("token"),
            id : id_user
          }
        }
      );
      
      
      setdisplayTodo(response.data.todo);
      setSearchDisplay(response.data.todo);
    //   console.log(response.data.todo);
    } catch (error) {
      console.error("Error fetching todos:", error);
    }
  };

  const submitTodo = async () => {
    try {
      if (todo.trim() === "") return;
      const id_user = localStorage.getItem("id");
      await axios.post("https://todo-app-backend-six-umber.vercel.app/add", { todo: todo , completed : false, id :id_user },{
        headers : {
          token : localStorage.getItem("token")
        }
      });
      addTodo("");
      fetchTodos();
    } catch (error) {
      console.error("Error adding todo:", error);
    }
  };

  const addKey = (e) => {
    if (e.key === "Enter") submitTodo();
  };

  const deleteTodo = async (id) => {
    try {
      await axios.delete(`https://todo-app-backend-six-umber.vercel.app/delete/${id}`, {
        headers : {
          token : localStorage.getItem("token")
        }
      });
      fetchTodos();
    } catch (error) {
      console.error("Error deleting todo:", error);
    }
  };

  const handleSearch = (event) => {
    setSearchLetter(event.target.value);
  };


  const toggleTodoCompletion = async (id, currentStatus) => {
    try {
        // console.log(currentStatus);
        await axios.put(`https://todo-app-backend-six-umber.vercel.app/update/${id}`, {
            completed: !currentStatus
        },{
          headers : {
            token : localStorage.getItem("token")
          }
        });
        const updatedTodos = displayTodo.map((todo) =>
            todo._id === id ? { ...todo, completed: !todo.completed } : todo
          );
      
          setdisplayTodo(updatedTodos); // Update displayTodo
          setSearchDisplay(updatedTodos); // Also update searchDisplay

          // The above method is used to avoid unneccecarly ping the api
          // Instead of the above we can also use fetchTodo();
    } catch (error) {
        console.error("Error updating todo:", error);
    }
};

  return (
    <div className={styles.container}>
      <NavBar/>
      <div className={styles.todo_container}>
        <p className={styles.heading}>TODO</p>
        <div className={styles.search}>
          <p>Search</p>
          <input
            type="text"
            placeholder="Enter your search term..."
            onChange={handleSearch}
            value={searchLetter}
          />
        </div>
        <div className={styles.todo_content}>
          {/* Use searchDisplay instead of displayTodo for rendering */}
          {searchDisplay.map((todo) => (
            <TodoList
              key={todo._id}
              todo={todo.todo}
              id={todo._id}
              delete={deleteTodo}
              updateTodo = {toggleTodoCompletion}
              isCompleted = {todo.completed}
            />
          ))}
        </div>
        <div className={styles.add_new}>
          <p>Add New</p>
          <input
            type="text"
            placeholder="Add new todo..."
            onChange={(e) => addTodo(e.target.value)}
            onKeyDown={addKey}
            value={todo}
          />
        </div>
      </div>
    </div>
  );
};

export default TodoPage;
