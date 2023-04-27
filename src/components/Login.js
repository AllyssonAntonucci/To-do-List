import React from "react";

import { signInWithEmailAndPassword, onAuthStateChanged } from "firebase/auth";
import { auth } from "../firebase";
import { Link, useNavigate, Navigate, Routes, Route } from 'react-router-dom';
import ReactLoading from 'react-loading';
import AppBody from "./AppBody";
import { PencilAnimation } from './LottieAnimations/pencilAnimation';

export default function Login() {
    const [LoginEmail, setLoginEmail] = React.useState("");
    const [LoginPassword, setLoginPassword] = React.useState("");
    const [ , setUser] = React.useState({});
    const [loadingAuth, setLoadingAuth] = React.useState(false);
    const navigate = useNavigate(); //para navegar entre as páginas
    const uid = localStorage.getItem('uid');
    const [loading, setLoading] = React.useState(false); 

    React.useEffect(() => {

        const loadLogin = async () => {
            setLoading(true)
      
            const carregarLogin = () => {
              // É necessário definir o tempo de atraso: (2.5 segundos = 2500 ms)
                setTimeout(() => {
                setLoading(false); // Atualiza o estado para indicar que o carregamento foi concluído
                }, 2500);
              };
        
              carregarLogin(); // Chama a função de carregamento
          };
      
          loadLogin();


        const unsubscribe = onAuthStateChanged(auth, (currentUser) => { 
          setUser(currentUser);
          
        });
        
        return unsubscribe;
      }, []);

    

    const login = async (e) => {
        e.preventDefault();
        setLoadingAuth(true); //define o estado carregando ao clicar no botão login
        try{
            const user = await signInWithEmailAndPassword(
                auth, 
                LoginEmail, 
                LoginPassword,
                );
                localStorage.setItem('uid', user.user.uid); // armazena o uid do objeto user no localStorage, iremos trazer ele de volta em outro componente para verificar se o usuário está logado
                //console.log(user.user.uid);
                localStorage.setItem('email', user.user.email); // armazena o email do user no localStorage, iremos trazer ele de volta no componente AppBody pra mostrar o email do usuário logado
                navigate('/App');
                
        } catch (error) {
            alert("Email ou senha incorretos. Tente novamente!");
            setLoginEmail(""); //Limpa o input do email quando da erro, nesse caso, é necessário usar o value={LoginEmail} no input
            setLoginPassword(""); //Limpa o input da senha quando da erro, nesse caso, é necessário usar o value={LoginPassword} no input
        } finally {
            setLoadingAuth(false); //define como falso o estado de carregando
            
          }
          
    };

    if(loading) {
        return(<div className='carregando'> <PencilAnimation /> </div>);
       
      }

  
    if(!uid){ 
    return(
        <div className="Login">

            <h1>To-do List</h1>
        
            <form>

    
                <div className='form-control'>
                    <label htmlFor='EmailLogin'>Email</label>
                    <input type="text" id="EmailLogin" placeholder="Digite seu email" aria-label="Digite seu email" value={LoginEmail} onChange={(e) => setLoginEmail(e.target.value)} required/>
                </div>

                <div className='form-control'>
                    <label htmlFor='PasswordLogin'>Senha</label>
                    <input type="password" id="PasswordLogin" placeholder="Digite sua senha" aria-label="Digite sua senha" value={LoginPassword} onChange={(e) => setLoginPassword(e.target.value)} required/>
                </div>

                <div className="btn-container">
                    <button aria-label="Login" onClick={login}> 
                        <div className="loading-container">
                            {loadingAuth ? <ReactLoading type="spin" color="#3b3b3b" height={"100%"} width={"100%"} /> : 'Entrar'}
                        </div>
                    </button>
                </div>

            </form>

            <div className="forgotPassword">
            <Link to={'/ForgotPassword'}>Esqueceu a senha? </Link>
            </div>

            <div className="createAccountLink">
            Não possui uma conta? <Link to={'/CreateAccount'}>Cadastre-se </Link>
            </div>
            
        
        </div>
        
    );
    } else {
        return(
            <Routes>
                <Route path="/App" element={<AppBody />} />
                <Route path="*" element={<Navigate to="/App" />} />
            </Routes> 
        );
    }
};