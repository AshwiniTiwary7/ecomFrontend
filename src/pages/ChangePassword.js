import axios from "axios";
import React, { useState } from "react";
import toast, { Toaster } from 'react-hot-toast';
import { useNavigate } from "react-router-dom";

export default function ChangePassword(){
    const navigate = useNavigate();
    const [newPass,setNewPass] = useState({
        userPass:"",
        userPassConfirm:""
    });
    function monitorPassChange(event){
        setNewPass((prev)=>({
            ...prev,[event.target.id]:event.target.value
        }))
    }
    async function submitNewPass(event){
        event.preventDefault();
        const userId = localStorage.getItem('userTempId');
        try {
            const respNewPass = await axios.post(`https://ecombackend-ikrb.onrender.com/api/v7/changepassword/${userId}`,newPass);
            if(respNewPass.status === 200){
                toast.success(respNewPass.data.message);
                localStorage.removeItem('userTempId');
                navigate("/login");
            }
        } catch (err) {
            if (err.response.data) {
                toast.error(err.response.data.message);
            }
            else {
                console.log(err);
            }
        }
    }
    return(
        <>
            <section className="sectionpadding sectioncolor">
                <div className="container logincontent">
                    <div className="row justify-content-center">
                        <div className="col-md-5 login-container">
                            <h1 className="text-center">Change Password</h1>
                            <form onSubmit={submitNewPass}>
                                <label htmlFor="userPass" className="form-label loginlabel">New Password:</label>
                                <input type="password" className="form-control" id="userPass" placeholder="Enter your New password" value={newPass.userPass} onChange={monitorPassChange} style={{ border: "1px solid #aaaaaa;" }} required/>
                                <label htmlFor="userPassConfirm" className="form-label loginlabel">Confirm Password:</label>
                                <input type="password" className="form-control" id="userPassConfirm" placeholder="Enter your New password" value={newPass.userPassConfirm} onChange={monitorPassChange} style={{ border: "1px solid #aaaaaa;" }} required/>
                                <input type="submit" className="btn btn-primary" id="loginbtn"></input>
                            </form>
                        </div>
                    </div>
                </div>
            </section>
            <Toaster/>
        </>
    )
}