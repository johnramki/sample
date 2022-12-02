import React,{useState} from 'react';

const AuthContext = React.createContext({
    token :'',
    isLoggedIn: false,
    login : (token) => {},
    logout : () => {}
});

export const AuthContextProvider = (props) => {
    const [token,SetToken] = useState(null);

    const userIsLoggedIn = !!token;

    const loginHandler = (token) => {
        SetToken(token);
    }

    const logoutHandler = () => {
        SetToken(null)
    }

    const contextValue = {
        token : token,
        isLoggedIn : userIsLoggedIn,
        login : loginHandler,
        logout : logoutHandler
    }
    return <AuthContext.Provider value = {contextValue}>{props.children}</AuthContext.Provider>
}

export default AuthContext;