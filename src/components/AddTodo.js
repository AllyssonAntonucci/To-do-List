import React from "react";
import { db } from "../firebase";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";

export default function AddTodo() {
    const[title, setTitle] = React.useState("");
    const[description, setDescription] = React.useState("");
    const[color, setColor] = React.useState("#fde297"); //deixa amarelo o default
    



    const handleSubmit = async (e) => {
        const uid = localStorage.getItem('uid');
        //console.log(localStorage.getItem('uid'));
        e.preventDefault(); //evita o comportamente de atualizar a página

        if (title !== "" && description !== "" ) {
            if (uid) { // verifique se o usuário está autenticado antes de criar a tarefa
            await addDoc(collection(db, "todos"), {   
                title,
                description,
                color,
                completed:false,
                uid: uid, // Adiciona o uid do usuário no documento
                createdAt: serverTimestamp(), // Serve para marcar a data atual usando serverTimestamp(), isso vai ajudar a ordenar os formulários pela data de criação
                
            });
            setTitle("");
            setDescription("");

        }} else {
            alert("Usuário não autenticado. Não é possível criar a tarefa.");
        } 

    };

    const handleChangeColor = (e) => {
        setColor(e.target.value);
    };

    return(
        <div className='form-todo'>
            <h2>Adicione uma tarefa:</h2>
            <form onSubmit={handleSubmit}>

                <div className='form-control'>
                    <label htmlFor='taskTitle'>O que você precisa fazer?</label>
                    <input type="text" id="taskTitle" placeholder="Dê um nome para sua tarefa" aria-label="Dê um nome para sua tarefa" value={title} onChange={(e) => setTitle(e.target.value)} required/>
                </div>

                <div className='form-control'>
                    <label htmlFor='taskDescription'>Descrição da tarefa:</label>
                    <input type="text" id="taskDescription" placeholder="Descreva o que será feito" aria-label="Descreva o que será feito" value={description} onChange={(e) => setDescription(e.target.value)} required/>
                </div>

                <div className='form-control'>
                    <label htmlFor='taskColor'>Escolha uma cor:</label>
                    <select className='select' id="taskColor" value={color} onChange={handleChangeColor}>
                        <option value="#fde297">Amarelo</option>
                        <option value="#bad3e9">Azul</option>
                        <option value="#fdb797">Rosa</option>
                        <option value="#beddc2">Verde</option>
                    </select>
                </div>

                <div className="btn-container">
                    <button type="submit" aria-label="Criar Tarefa">Criar tarefa</button>
                </div>

            </form>
        </div>
    );
}