import React, { useState } from "react";
import axios from "axios";
import { toast, Toaster } from 'react-hot-toast';
import { useNavigate } from "react-router-dom";

export default function RequestOtp() {
    const navigate = useNavigate();
    const [emailLoad,setEmailLoad] = useState(false);
    const [userReset, setUserReset] = useState({
        userEmail: "",
        otp: ""
    });
    function monitorUserReset(event) {
        setUserReset((prev) => ({
            ...prev, [event.target.id]: event.target.value
        }))
    }
    async function sendOtp(event) {
        event.preventDefault();
        setEmailLoad(true);
        try {
            const respOtp = await axios.get(`https://ecombackend-ikrb.onrender.com/api/v7/resetpassword/${userReset.userEmail}`);
            if (respOtp.status === 200) {
                toast.success(respOtp.data.message);
            }
        } catch (err) {
            if (err.response.data) {
                toast.error(err.response.data.message);
            }
            else {
                console.log(err);
            }
        }
        setEmailLoad(false);
    }
    async function otpValidate(event) {
        event.preventDefault();
        try {
            const respotpvalid = await axios.post('https://ecombackend-ikrb.onrender.com/api/v7/otpvalid', userReset);
            if (respotpvalid.status === 200) {
                toast.success(respotpvalid.data.message);
                localStorage.setItem("userTempId",respotpvalid.data.userId);
                navigate("/changepassword");
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
    return (
        <>
            <section className="sectionpadding sectioncolor">
                <div className="container logincontent">
                    <div className="row justify-content-center">
                        <div className="col-md-5 login-container">
                            <h1 className="text-center">Request OTP</h1>
                            <form>
                                <label htmlFor="userEmail" className="form-label loginlabel">Email:</label>
                                <div className="d-flex">
                                    <input type="email" className="form-control w-75" id="userEmail" placeholder="Enter your email to get OTP" style={{ border: "1px solid #aaaaaa;" }} value={userReset.userEmail} onChange={monitorUserReset} required />
                                    {
                                        emailLoad === true ? (<div className="spinner-border text-primary" role="status">
                                      </div>) : (<button className="btn btn-primary w-25" id="loginbtn" onClick={sendOtp}>Send OTP</button>)
                                    }
                                </div>
                                <label htmlFor="otp" className="form-label loginlabel">Enter OTP:</label>
                                <input type="number" className="form-control w-75" id="otp" placeholder="Enter OTP sent to your email" style={{ border: "1px solid #aaaaaa;" }} value={userReset.otp} onChange={monitorUserReset} required />
                                <button type="button" className="btn btn-primary" onClick={otpValidate}>
                                    Submit
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </section>
            <Toaster />
        </>
    )
}