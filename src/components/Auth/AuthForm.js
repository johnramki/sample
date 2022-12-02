import { useState,useRef,useContext } from 'react';
import AuthContext from '../../store/auth-context';
import classes from './AuthForm.module.css';

const AuthForm = () => {
  const [isLogin, setIsLogin] = useState(true);
  const AuthCtx = useContext(AuthContext);
  const emailRef = useRef();
  const passwordRef = useRef();


  const switchAuthModeHandler = () => {
    setIsLogin((prevState) => !prevState);
  };

  const submitHandler = event => {
    event.preventDefault();
    const enteredEmail = emailRef.current.value;
    const enteredPassword = passwordRef.current.value;

    if(isLogin){
      

      const res = fetch('https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyD79svSWzzlmwI76mdax_yvg-AhrwFG9IQ',{
        method : "POST",
        body : JSON.stringify({
          email: enteredEmail,
          password : enteredPassword,
          returnSecureToken : true
        }),
        headers:{
          'Content-Type' : 'Application/json'
        }
      }).then(res => {
        
        if(res.ok){
          res.json().then(data=>{
            AuthCtx.login(data.idToken)
            console.log('dataa',data);
          })
        }else{
          res.json().then(data=>{
            let error = "Authentication Error";
            error = data.error.message;
            alert(error);
          })
        }
       
      });

    }else{
      const res = fetch('https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyD79svSWzzlmwI76mdax_yvg-AhrwFG9IQ',{
        method : "POST",
        body : JSON.stringify({
          email: enteredEmail,
          password : enteredPassword,
          returnSecureToken : true
        }),
        headers:{
          'Content-Type' : 'Application/json'
        }
      }).then(res => {
        
        if(res.ok){

        }else{
          res.json().then(data=>{
            let error = "Authentication Error";
            error = data.error.message;
            alert(error);
          })
        }
       
      });

    }

  }

  return (
    <section className={classes.auth}>
      <h1>{isLogin ? 'Login' : 'Sign Up'}</h1>
      <form onSubmit={submitHandler}>
        <div className={classes.control}>
          <label htmlFor='email'>Your Email</label>
          <input type='email' id='email' ref={emailRef} required />
        </div>
        <div className={classes.control}>
          <label htmlFor='password'>Your Password</label>
          <input type='password' id='password' ref={passwordRef} required />
        </div>
        <div className={classes.actions}>
          <button>{isLogin ? 'Login' : 'Create Account'}</button>
          <button
            type='button'
            className={classes.toggle}
            onClick={switchAuthModeHandler}
          >
            {isLogin ? 'Create new account' : 'Login with existing account'}
          </button>
        </div>
      </form>
    </section>
  );
};

export default AuthForm;
