import React from "react";
import { createUserWithEmailAndPassword} from "firebase/auth";
import { auth } from "../firebase";
import { Link } from 'react-router-dom';
import validator from 'validator';
import ReactLoading from 'react-loading';

export default function CreateAccount() {
    const [registerEmail, setRegisterEmail] = React.useState("");
    const [registerPassword, setRegisterPassword] = React.useState("");
    const [confirmPassword, setConfirmPassword] = React.useState("");
    const [loadingAuth, setLoadingAuth] = React.useState(false);

    const confirmPasswordChange = (e) => {
        setConfirmPassword(e.target.value);
    };


    const register = async (e) => {
        e.preventDefault(); // Faz com que não seja atualizada a página ao enviar o form, o que causa um erro pois o fireauth não consegue terminar antes que atualize
        setLoadingAuth(true); //define o estado carregando ao clicar no botão login
        try{
            if (!validator.isEmail(registerEmail)) { // Isso pra conferir se o email é válido
                alert('Email inválido');
                return;
            }

            if (registerPassword.length < 6) { //Isso pra conferir se bateu as senhas
                alert('A senha precisa ter no mínimo 6 caracteres');
                return;
            }

            if (registerPassword !== confirmPassword) { //Isso pra conferir se bateu as senhas
                alert('As senhas não conferem');
                return;
            }

            await createUserWithEmailAndPassword(
                auth,
                registerEmail,
                registerPassword
                );
                alert('Conta cadastrada com sucesso!');
                setRegisterEmail(""); //limpa o input email
                setRegisterPassword(""); //limpa o input senha
                setConfirmPassword(""); //limpa o input de confirmação de senha
        } catch (error) {
            alert("Erro ao criar conta: " + error.message);
        } finally {
            setLoadingAuth(false); //define como falso o estado de carregando
            
        }
        
        
    }; 

    

    return(
        <div className="Login">
            <h1>Crie uma conta</h1>

            <form> 
                <div className='form-control'>
                    <label htmlFor='registerEmail'>Email</label>
                    <input type="text" id="registerEmail" placeholder="Digite seu email" aria-label="Digite seu email" value={registerEmail} onChange={(e) => setRegisterEmail(e.target.value)} required />
                </div>

                <div className='form-control'>
                    <label htmlFor='registerPassword'>Senha</label>
                    <input type="password" id="registerPassword" placeholder="Digite sua senha" aria-label="Digite sua senha" value={registerPassword} onChange={(e) => setRegisterPassword(e.target.value) } required />
                </div>

                <div className='form-control'>
                    <label htmlFor='confirmPassword'> Confirmação de Senha</label>
                    <input type="password" id="confirmPassword" placeholder="Digite sua senha novamente" aria-label="Digite sua senha novamente" value={confirmPassword} onChange={confirmPasswordChange} required />
                </div>
        

                <div className="btn-container">
                    <button aria-label="Criar conta" onClick={register}>
                        <div className="loading-container">
                            {loadingAuth ? <ReactLoading type="spin" color="#3b3b3b" height={"100%"} width={"100%"} /> : 'Cadastre-se'}
                        </div>
                    </button>
                </div>
            </form>

            <div className="createAccountLink">
            Tem uma conta? <Link to={'/'} >Conecte-se </Link>
            </div>
        </div>
    );
};