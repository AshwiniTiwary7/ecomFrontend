import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import toast, { Toaster } from 'react-hot-toast';

export default function Register() {
    const navigate = useNavigate();
    const [registerData, setRegisterData] = useState({
        fullName: "",
        mobile: "",
        userEmail: "",
        userPass: ""
    })
    function monitorRegisterChange(event) {
        setRegisterData((prev) => ({
            ...prev, [event.target.id]: event.target.value
        }))
    }
    async function submitRegistered(event) {
        event.preventDefault();
        try {
            const respRegister = await axios.post('https://ecombackend-ikrb.onrender.com/api/v7/register',registerData);
            if(respRegister.data){
                toast.success(respRegister.data.message);
            }
            navigate("/login");
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
                            <h1 className="text-center">Registration form</h1>
                            <form onSubmit={submitRegistered}>
                                <label htmlFor="fullName" className="form-label loginlabel">Fullname:</label>
                                <input type="text" className="form-control" id="fullName" placeholder="Enter your Fullname" value={registerData.fullName} onChange={monitorRegisterChange} style={{ border: "1px solid #aaaaaa" }} />
                                <label htmlFor="mobile" className="form-label loginlabel">Mobile number:</label>
                                <input type="tel" className="form-control" id="mobile" placeholder="Enter your mobile number" value={registerData.mobile} onChange={monitorRegisterChange} style={{ border: "1px solid #aaaaaa" }} />
                                <label htmlFor="userEmail" className="form-label loginlabel">Email:</label>
                                <input type="email" className="form-control" id="userEmail" placeholder="Enter your email" value={registerData.userEmail} onChange={monitorRegisterChange} style={{ border: "1px solid #aaaaaa" }} />
                                <label htmlFor="userPass" className="form-label loginlabel">Password:</label>
                                <input type="password" className="form-control" id="userPass" placeholder="Enter your password" value={registerData.userPass} onChange={monitorRegisterChange} style={{ border: "1px solid #aaaaaa" }} />
                                <input type="submit" className="btn btn-primary" id="loginbtn"></input>
                            </form>
                            <p className='mt-4'>Already have a account?<Link to={"/login"}>Login here</Link></p>
                        </div>
                    </div>
                </div>
            </section>
            <Toaster/>
        </>
    )
}
