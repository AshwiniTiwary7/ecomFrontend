import React, { useState } from 'react';
import logo from '../images/logo.png';
import Header from '../components/header';
import Footer from '../components/Footer';
import axios from 'axios';
import { toast , Toaster } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

export default function Contact() {
    const navigate = useNavigate();
    const [query,setQuery] = useState({
        fullName:"",
        userEmail:"",
        userMessage:""

    })
    function monitorQuery(event){
        setQuery((prev)=>({
            ...prev,[event.target.id]:event.target.value
        }))
    }

    async function submitQuery(event){
        event.preventDefault();
        const userId = localStorage.getItem('userId');
        const token = localStorage.getItem('tokenVal');
        try {
            const respQuery = await axios.post(`https://ecombackend-ikrb.onrender.com/api/v7/contactUs/${userId}`,query,{
                headers:{"Authorization" : "Bearer " + token}
            });
            if(respQuery.data){
                toast.success(respQuery.data.message);
            }
            navigate("/");
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
            <Header />
            <section className="contactsection sectioncolor">
                <h1 style={{ textAlign: "center" }}>Contact Us</h1>
                <hr className="container" />
                <div className="container">
                    <div className="row">
                        <div className="col contactcolumn1">
                            <img src={logo} alt="" id="contactlogo" />
                            <p id="contactbrandname">WILSBERG</p>
                        </div>
                        <div className="col" id="contactcolumn2">
                            <form onSubmit={submitQuery}>
                                <label className="form-label contactlabel" htmlFor='fullName'>Name:</label> <br />
                                <input type="text" className="form-control" id="fullName" placeholder="Enter your name" value={query.fullName} onChange={monitorQuery}/> <br />
                                <label className="form-label contactlabel" htmlFor='userEmail'>Email:</label> <br />
                                <input type="email" className="form-control" id="userEmail" placeholder="Enter your email" value={query.userEmail} onChange={monitorQuery} /> <br />
                                <label className="form-label contactlabel" htmlFor='userMessage'>Message:</label> <br />
                                <textarea cols="70" rows="5" placeholder="Enter your message" className="form-control" id="userMessage" value={query.userMessage} onChange={monitorQuery}></textarea> <br />
                                <input type='submit' className="btn btn-primary" id="contactbtn"></input>
                            </form>
                        </div>
                    </div>
                </div>
            </section>
            <Footer />
            <Toaster/>
        </>
    )
}
