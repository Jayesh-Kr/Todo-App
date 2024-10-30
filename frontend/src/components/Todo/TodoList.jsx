import React, { useEffect } from "react";
import styles from './todopage.module.css'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
const TodoList = (props) => {

  return (
    
      <div className={styles.todo_list} >
        <p onClick={() => props.updateTodo(props.id, props.isCompleted)}
                style={{
                    textDecoration: props.isCompleted ? 'line-through' : 'none',
                    opacity: props.isCompleted ? 0.5 : 1,
                    cursor: 'pointer'
                }}>{props.todo}</p>
        <FontAwesomeIcon icon={faTrash} className={styles.icon} onClick={()=>props.delete(props.id)}/>
      </div>
    
  );
};

export default TodoList;
