import React, { useContext, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import "./Login.css"
import googleImg from "../../images/google.png"
import { AuthContext } from '../contexts/UserContext';

const Login = () => {
    const [error, setError] = useState(null)
    const { logInEmailPass, signUpGoogle } = useContext(AuthContext)
    const navigate = useNavigate()
    const location = useLocation();
    const from = location.state?.from?.pathname || "/";
    const handleSubmit = (event) => {
        event.preventDefault()
        const form = event.target;
        const email = form.email.value;
        const password = form.password.value;
        logInEmailPass(email, password)
            .then(result => {
                const user = result.user;
                console.log(user)
                form.reset()
                navigate(from, {replace:true})
            })
            .catch(error => setError(error.message))
        
    }
    const handleGoogleLogin = () => {
        signUpGoogle()
            .then(result => {
                const user = result.user;
                console.log(user)
                navigate(from, {replace:true})
            })
            .catch(error => setError(error.message))
    }
    return (
        <div>
            <div className='form-container'>
                <h2 className='form-title'>
                    Login
                </h2>
                <form onSubmit={handleSubmit}>
                    <div className='form-control'>
                        <label htmlFor='email'>Email</label>
                        <input name="email" type="email" required></input>
                    </div>
                    <div className='form-control'>
                        <label htmlFor='password'>Password</label>
                        <input name="password" type="password" required></input>
                        <p className={error ? "text-error" : "d-none"}>{error}</p>
                    </div>
                    <button className='btn-submit' type='submit'>Login</button>
                    <p className='create-account'>New to Ema-john? <Link to="/signup">Create New Account</Link></p>
                </form>
                <button onClick={handleGoogleLogin} className='google-login'><img className='google-img' src={googleImg} alt=''></img><span>Continue with Google</span></button>
            </div>
        </div>
    );
};

export default Login;