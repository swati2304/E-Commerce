import React, {useState} from "react";
import "./login.css";
import axios from "axios";

export default function Login(){
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const Login = async ()=> {
        const response = await axios.post("/login", {
            email:email,
            password:password
        });
        alert(response.data.massage);
        
        if(response.data.success){
            localStorage.setItem("user", JSON.stringify(response.data.data));
            window.location.href = "/";
        }
    }

    return(
        <div>
            <div className="login-container">
                <h1 className="login-title">Login</h1>

                <div className="input-container">
                    <label className="input-label">Email</label>
                    <input type="email" 
                    placeholder="Enter your Email"
                    className="input-field"
                    value={email}
                    onChange={(e)=>{
                        setEmail(e.target.value)
                    }}/>
                </div>

                <div className="input-container">
                    <label className="input-label">Password</label>
                    <input type="password" 
                    placeholder="Enter your password" 
                    className="input-field"
                    value={password}
                    onChange={(e)=>{
                        setPassword(e.target.value)
                    }}/>
                </div>
                <button type="button" className="login-btn" onClick={Login}>
                Login</button>
            </div>
        </div>
    )
}