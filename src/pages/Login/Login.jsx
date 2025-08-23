import React, { useState, useEffect } from "react";
import './Login.css';
import { login, signup } from '../../Nhost/nhost'; 
import netflix_spinner from '../../assets/netflix_spinner.gif';
import { toast } from "react-toastify";
import { useSearchParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";

export default function Login() {
    const [signState, setSignState] = useState("Sign In");
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [searchParams] = useSearchParams();
    const mode = searchParams.get("mode") || 'Sign In'
    const navigate = useNavigate();
    
    useEffect(()=>{
        setSignState(mode);
    },[mode])
    

    const user_auth = async (event) => {
        event.preventDefault();
        setLoading(true);
        try {
            if (signState === "Sign In") {
                await login(email, password);
            } else {
                await signup(name, email, password);
            }
        } catch (error) {
            toast.error(error.message || "Something went wrong");
        } finally {
            setLoading(false);
        }
    };

    return (
        loading ? (
            <div className="loading-spinner">
                <img src={netflix_spinner} alt="" />
            </div>
        ) : (
            <div className="login" >
                <div className="login-form">
                    <div className="cross" onClick={()=>navigate('/')}>X</div>
                    <h1>{signState}</h1>
                    <form onSubmit={user_auth}>
                        {signState === "Sign Up" && (
                            <input
                                type="text"
                                placeholder="User name"
                                onChange={(e) => setName(e.target.value)}
                                value={name}
                            />
                        )}
                        <input
                            type="text"
                            placeholder="Email"
                            onChange={(e) => setEmail(e.target.value)}
                            value={email}
                        />
                        <input
                            type="password"
                            placeholder="Password"
                            onChange={(e) => setPassword(e.target.value)}
                            value={password}
                        />
                        <button type="submit">{signState}</button>
                        <div className="form-help">
                            <div className="remember">
                                <input type="checkbox" />
                                <label>Remember Me</label>
                            </div>
                            <p>Need Help?</p>
                        </div>
                    </form>
                    <div className="form-switch">
                        {signState === "Sign In" ? (
                            <p>
                                New to Luma?{" "}
                                <span onClick={() => setSignState("Sign Up")}>Sign Up Now</span>
                            </p>
                        ) : (
                            <p>
                                Already have an account?{" "}
                                <span onClick={() => setSignState("Sign In")}>Sign In Now</span>
                            </p>
                        )}
                    </div>
                </div>
            </div>
        )
    );
}