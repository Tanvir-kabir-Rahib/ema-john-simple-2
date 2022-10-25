import React, { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import "./SignUp.css"
import googleImg from "../../images/google.png"
import { AuthContext } from '../contexts/UserContext';

const SignUp = () => {
    const [error, setError] = useState(null)
    const { signUpEmailPass, signUpGoogle } = useContext(AuthContext)
    const handleSubmit = (event) => {
        event.preventDefault();
        const form = event.target;
        const email = form.email.value;
        const password = form.password.value;
        const confirmPassword = form.confirm.value;
        if (password !== confirmPassword) {
            setError("Password didn't match")
            return
        }
        signUpEmailPass(email, password)
            .then(result => {
                const user = result.user;
                console.log(user)
                form.reset()
            })
            .catch(error => setError(error))
    }
    const handleGoogleSignUp = () => {
        signUpGoogle()
            .then(result => {
                const user = result.user;
                console.log(user)
            })
            .catch(error => setError(error))
    }
    return (
        <div>
            <div className='form-container'>
                <h2 className='form-title'>
                    SignUp
                </h2>
                <form onSubmit={handleSubmit}>
                    <div className='form-control'>
                        <label htmlFor='email'>Email</label>
                        <input name="email" type="email" required></input>
                    </div>
                    <div className='form-control'>
                        <label htmlFor='password'>Password</label>
                        <input name="password" type="password" required></input>
                    </div>
                    <div className='form-control'>
                        <label htmlFor='comfirm'>Confirm Password</label>
                        <input name="confirm" type="password" required></input>
                        <p className={error ? "text-error" : "d-none"}>{error}</p>
                    </div>
                    <button className='btn-submit' type="submit">Sign Up</button>
                    <p className='create-account'>Already have an account? <Link to="/login">Login</Link></p>
                </form>
                <div onClick={handleGoogleSignUp} className='google-login'><img className='google-img' src={googleImg} alt=''></img><span>Continue with Google</span></div>
            </div>
        </div>
    );
};

export default SignUp;