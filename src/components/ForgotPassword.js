import React from "react";
import { auth } from "../firebase";
import { Link } from 'react-router-dom';
import { sendPasswordResetEmail } from "firebase/auth";
import ReactLoading from 'react-loading';

export default function ForgotPassword() {
    const [loadingAuth, setLoadingAuth] = React.useState(false);
    const [email, setEmail] = React.useState('');

    const handleForgotPassword = (e) => {
        e.preventDefault();
        setLoadingAuth(true); //define o estado carregando ao clicar no botão login
        sendPasswordResetEmail(auth, email).then(() => {
            setLoadingAuth(false);
            alert('E-mail de redefinição de senha enviado!');
            setEmail("");
          })
          .catch((error) => {
            setLoadingAuth(false);
            alert('Erro ao enviar e-mail de redefinição de senha: ' + error.message);
          });
    };


    return(
        <div className="Login">
            <h1>Esqueceu sua senha?</h1>

            <p>Insira o email da sua conta abaixo e enviaremos um link para você definir uma nova senha.</p>

            <form>
                <div className='form-control'>
                    <input type="text" value={email} placeholder="Digite seu email" aria-label="Digite seu email" onChange={(e) => setEmail(e.target.value)} required/>
                </div>

                <div className="btn-container">
                    <button type="submit" aria-label="Login" onClick={handleForgotPassword}> 
                        <div className="loading-container">
                            {loadingAuth ? <ReactLoading type="spin" color="#3b3b3b" height={"100%"} width={"100%"} /> : 'Enviar'}
                        </div>
                    </button>
                </div>
            </form>

            <div className="back">
            <Link to={'/to-do-list'}>Voltar </Link>
            </div>
        </div>



    );
};