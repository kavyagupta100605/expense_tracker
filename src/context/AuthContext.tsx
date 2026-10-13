
import { createContext, useState, useContext,ReactNode } from "react";
import axios from "axios";
import {UserType} from "../types/Users";

interface Auth{
    token:string | null,
    user:UserType | null,
    login:(email:string,password:string) => Promise<void>,
    register:(name:string,email:string,password:string) => Promise<void>,
    logout:() => void
}

const AuthContext = createContext<Auth | undefined>(undefined);



interface AuthProviderProps{
    children : ReactNode
}

export const AuthProvider = ({children} : AuthProviderProps) => {
    const [token,setToken] = useState<string | null>(null);
    const [user,setUser] = useState<UserType | null>(null);

    const login = async (email:string,password:string) =>{
        const response = await axios.post("http://localhost:5000/auth/login",{
            email,
            password
        });
        setToken(response.data.token);
        setUser(response.data.user);

        axios.defaults.headers.common["Authorization"] = `Bearer ${response.data.token}`;
    };

    const register = async (name:string,email:string,password:string) => {
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

export const useAuth = () =>{
    const context = useContext(AuthContext)
    if(!context)
    {
        throw new Error("useAuth must be used within an AuthProvider")
    }
    return context;
}

export default AuthContext
