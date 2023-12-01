import React, { useEffect, useState } from "react";
import Header from "../components/header";
import Footer from "../components/Footer";
import CartProgress from "./CartProgress";
import { Link } from "react-router-dom";
import toast, { Toaster } from 'react-hot-toast';
import axios from "axios";

export default function CartSummary() {
    const [myTotal,setMyTotal] = useState(0);
    async function getTotal(){
        const userId = localStorage.getItem('userId');
        const token = localStorage.getItem('tokenVal');
        try {
            const respTotal = await axios.get(`https://ecombackend-ikrb.onrender.com/api/v7/summary/${userId}`,{
                headers:{"Authorization" : "Bearer " + token}
            });
            if(respTotal.data){
                setMyTotal(respTotal.data.grandTotal);
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
    useEffect(()=>{
        getTotal();
    },[]);
    return (
        <>
            <Header />
            <CartProgress progress={50} positionName={"Summary"}></CartProgress>
            <div className="col container" id="cartsection2">
                <div className="card">
                    <div className="card-header text-center">
                        <h1>Summary</h1>
                    </div>
                    <div className="card-body text-center">
                        <div className="row">
                            <table className="table table-borderless">
                                <tr>
                                    <td className="text-start">Cost</td>
                                    <td className="text-end">Rs. {myTotal}</td>
                                </tr>
                                <tr>
                                    <td className="text-start">Shipping</td>
                                    <td className="text-end">Rs. 100</td>
                                </tr>
                            </table>
                            <hr />
                            <table className="table table-borderless">
                                <thead>
                                    <tr>
                                        <th className="text-start">Total</th>
                                        <th className="text-end">Rs. {myTotal + 100}</th>
                                    </tr>
                                </thead>
                            </table>
                        </div>
                        <div className="container">
                            <div className="row">
                                <Link to="/Addaddress">
                                    <div className='d-grid gap-2'>
                                        <button className="btn btn-primary" id="cartbtn">Checkout</button>
                                    </div>
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <Toaster/>
            <Footer />
        </>
    )
}