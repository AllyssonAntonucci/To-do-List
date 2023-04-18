import React from "react";
import { BsTrash, BsBookmarkCheck, BsBookmarkCheckFill } from "react-icons/bs";

export default function Todo({
    todo,
    toggleComplete,
    handleDelete,


}) {

    const completedColor = () => {
        if (todo.completed) {
          return "#e1d2c2"; // cor da conclusão
        } else {
          return todo.color; // cor que o usuário escolheu no form
        }
      };

   
    

    return(
        <div className="todo" style={{ backgroundColor: completedColor() }}>
            <h3 className={todo.completed ? "todo-completed" : ""}> {todo.title} </h3>
            <p> {todo.description}</p>

        <div className='actions'> 
            <span >
                {!todo.completed ? <BsBookmarkCheck className="check-icon" aria-label="Marcar tarefa como concluída" onClick={() => toggleComplete(todo)}/> : <BsBookmarkCheckFill className="check-icon" aria-label="Marcar tarefa como não concluída" onClick={() => toggleComplete(todo)}/>}
            </span>
            <span /* Aqui precisa ser arrow function pois ela necessita ser clicada para rodar*/>
            <BsTrash className="trash-icon" aria-label="Excluir tarefa" onClick={() => handleDelete(todo.id)} /> 
            </span>
        </div>        
        
        </div>
        
          
    );

};