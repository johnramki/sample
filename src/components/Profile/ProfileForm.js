import {useContext,useRef} from 'react';
import AuthContext from '../../store/auth-context';
import classes from './ProfileForm.module.css';

const ProfileForm = () => {
  const AuthCtx = useContext(AuthContext);
  const password = useRef();

  const submitHandler = (event) => {
    event.preventDefault();
    const enteredPassword = password.current.value;

    const res = fetch('https://identitytoolkit.googleapis.com/v1/accounts:update?key=AIzaSyD79svSWzzlmwI76mdax_yvg-AhrwFG9IQ',{
        method : "POST",
        body : JSON.stringify({
          idToken: AuthCtx.token,
          password : enteredPassword,
          returnSecureToken : false
        }),
        headers:{
          'Content-Type' : 'Application/json'
        }
      }).then(res =>{
        console.log(res);
      })
  }
  return (
    <form onSubmit={submitHandler} className={classes.form}>
      <div className={classes.control}>
        <label htmlFor='new-password'>New Password</label>
        <input type='password' id='new-password' ref={password}/>
      </div>
      <div className={classes.action}>
        <button>Change Password</button>
      </div>
    </form>
  );
}

export default ProfileForm;

