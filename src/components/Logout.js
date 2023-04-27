import '../App.css';
import React from "react";
import ReactLoading from 'react-loading';
import { signOut } from "firebase/auth";
import { useNavigate } from 'react-router-dom';
import { auth } from "../firebase";



function Logout() {
    const [loadingAuth, setLoadingAuth] = React.useState(false);
    const email = localStorage.getItem('email');
    const navigate = useNavigate(); //para navegar entre as páginas



    const logout = async () => {
        setLoadingAuth(true);

        await signOut(auth);
        localStorage.removeItem('uid');
        localStorage.removeItem('email');
        navigate('/');
    };

    
    return(
        <div className='logged'>
        <h3>Usuário logado: {email}</h3>
        <button aria-label="Deslogar" onClick={logout}>
          <div className="loading-container">
            {loadingAuth ? <ReactLoading type="spin" color="#3b3b3b" height={"100%"} width={"100%"} /> : 'Sair'}
          </div>
        </button>
      </div>  
    );
}


export default Logout;