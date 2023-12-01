import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import toast, { Toaster } from 'react-hot-toast';

export default function Login() {
    const navigate = useNavigate();
    const [loginData, setLoginData] = useState({
        userEmail: "",
        userPass: ""
    })

    function monitorLoginChange(event) {
        setLoginData((prev) => ({
            ...prev, [event.target.id]: event.target.value
        }))
    }

    async function submitLoginForm(event){
        event.preventDefault();
        try {
            const respLogin = await axios.post('https://ecombackend-ikrb.onrender.com/api/v7/login',loginData);
            if(respLogin.data){
                toast.success(respLogin.data.message);
                localStorage.setItem('userId',respLogin.data.userId);
                localStorage.setItem('tokenVal',respLogin.data.userToken);
            }
            navigate("/");
        } catch (err) {
            if(err.response.data){
                toast.error(err.response.data.message);
            }
            else{
                console.log(err);
            }
        }
    }
    return (
        <>
            <section className="sectionpadding sectioncolor">
                <div className="container logincontent">
                    <div className="row justify-content-center">
                        <div className="col-md-5 login-container">
                            <h1 className="text-center">Login</h1>
                            <form onSubmit={submitLoginForm}>
                                <label htmlFor="userEmail" className="form-label loginlabel">Email:</label>
                                <input type="email" className="form-control" id="userEmail" placeholder="Enter your email" value={loginData.userEmail} onChange={monitorLoginChange} style={{ border: "1px solid #aaaaaa;" }} />
                                <label htmlFor="userPass" className="form-label loginlabel">Password:</label>
                                <input type="password" className="form-control" id="userPass" placeholder="Enter your password" value={loginData.userPass} onChange={monitorLoginChange} style={{ border: "1px solid #aaaaaa;" }} />
                                <input type="submit" className="btn btn-primary" id="loginbtn"></input>
                            </form>
                            <p className='mt-4'>Don't have a account? <Link to={"/register"}>Signup here</Link></p>
                            <p className='mt-4'>Forgot Password? <Link to={"/forgotpassword"}>Request OTP</Link></p>
                            <hr/>
                            <p className='mt-4'><Link to={"/"}>May Be Later! Back to Home</Link></p>
                        </div>
                    </div>
                </div>
            </section>
            <Toaster/>
        </>
    )
}
