import React from 'react'
import { createContext, useState, useContext } from "react";
import axios from "axios";

const AuthContext = createContext();

export const AuthProvider = ({children}) => {
    const [token,setToken] = useState(null);
    const [user,setUser] = useState(null);

    const login = async (email,password) =>{
        const response = await axios.post("http://localhost:5000/auth/login",{
            email,
            password
        });
        setToken(response.data.token);
        setUser(response.data.user);

        axios.defaults.headers.common["Authorization"] = `Bearer ${response.data.token}`;
    };

    const register = async (name,email,password) => {
        const response = await axios.post("http://localhost:5000/auth/register",{
            name,email,password
        });
        setToken(response.data.token);
        setUser(response.data.user);
        axios.defaults.headers.common["Authorization"] = `Bearer ${response.data.token}`;
    };

    const logout = () =>{
        setToken(null);
        setUser(null);

        delete axios.defaults.headers.common["Authorization"];
    }
  return (
    <AuthContext.Provider value={{token,user,login,register,logout}}>
        {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);

export default AuthContext
