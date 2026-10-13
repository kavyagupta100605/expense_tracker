import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import "../css/auth.css";

const LoginForm = () => {
    const { login } = useAuth();
    const navigate = useNavigate();
    const [email,setEmail] = useState<string>("");
    const [password,setPassword] = useState<string>("");
    const [error,setError] = useState <string>("");

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try{
            await login(email,password);
            console.log("login done navigating");
            navigate("/");
        } catch(err){
            const message = err instanceof Error ? err.message : "Unknown error";
            console.log("err is",error)
            setError(message);
        }
    };
  return (
      <div className="auth-container">
    <div className="auth-card">
      <h2>Login</h2>

      {error && <p className="error">{error}</p>}

      <form onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)}
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e:React.ChangeEvent<HTMLInputElement>) => setPassword(e.target.value)}
        />

        <button type="submit">Login</button>
      </form>

      <p>
        No account? <a href="/register">Register</a>
      </p>
    </div>
  </div>
  )
}

export default LoginForm
