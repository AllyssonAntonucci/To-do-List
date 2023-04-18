import './App.css';
import React from "react";
import AddTodo from "./components/AddTodo";
import Todo from "./components/Todo";
import { collection, query, onSnapshot, doc, updateDoc, deleteDoc, orderBy} from 'firebase/firestore';
import { db } from "./firebase";
import { CatAnimation } from "./components/LottieAnimations/catAnimation";

function App() {
  const [todos, setTodos] = React.useState([]);
  const [loading, setLoading] = React.useState(false); // Aqui é pra termos uma animação de loading antes de aparecer os dados pro usuário, e false é o valor booleano para quando ela é iniciada

  React.useEffect(() => {

    const loadData = async () => {
      setLoading(true)

      const carregar = () => {
        // É necessário definir o tempo de atraso: (2.5 segundos = 2500 ms)
          setTimeout(() => {
          setLoading(false); // Atualiza o estado para indicar que o carregamento foi concluído
          }, 2500);
        };
  
        carregar(); // Chama a função de carregamento
    };

    loadData();


    const q = query(collection(db, "todos"), orderBy("createdAt", "desc")); // orderBy serve para ordenar os elementos usando o createdAt, que na função handleSubmit é definido a data de criação
    const unsub = onSnapshot(q, (querySnapshot) => {
      let todosArray = [];
      querySnapshot.forEach((doc) => {
        todosArray.push({...doc.data(), id: doc.id });
      });
      setTodos(todosArray);
    });
      return () => unsub();

      
  }, []);

    const toggleComplete = async (todo) => {
      await updateDoc(doc(db, "todos", todo.id), {
        completed: !todo.completed
      });
    };

    const handleDelete = async (id) => {
      await deleteDoc(doc(db, "todos", id));
    };


    if(loading) {
      return <div className='carregando'> <p>Carregando tarefas </p> <CatAnimation /> </div> ; //Isso é pra quando estiver carregando a página evitar uma experiência desagradável para o usuário, no caso ele ver as coisas sem estarem carregadas...
     
    }


  return (
    <div className="App">
      <div className='todo-header'>
        <h1>To-do List</h1>
      </div>

      <div className='container'>
        <div>
          <AddTodo/>
        </div>

        <div className='list-todo'>
        <h2>Lista de tarefas: </h2>
          {todos.length === 0 && <span>Não há tarefas para serem feitas!</span>}
          {todos.map((todo) => (
            <Todo key={todo.id} todo={todo} toggleComplete={toggleComplete} handleDelete={handleDelete} />
           
            

          ))}
          
        </div>
      
      </div>
    </div>
  );
}

export default App;
