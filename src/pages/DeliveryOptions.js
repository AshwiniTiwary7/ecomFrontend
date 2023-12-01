import React from "react";
import axios from "axios";
import toast, { Toaster } from 'react-hot-toast';
import { useNavigate } from "react-router-dom";
import Header from "../components/header";
import Footer from "../components/Footer";
import CartProgress from "./CartProgress";

export default function DeliveryOptions() {
    const navigate = useNavigate();
    async function checkMeOut() {
        const userId = localStorage.getItem('userId');
        const token = localStorage.getItem('tokenVal');
        try {
            const respCheckOut = await axios.get(`https://ecombackend-ikrb.onrender.com/api/v7/checkout/${userId}`, {
                headers: { "Authorization": "Bearer " + token }
            });
            if (respCheckOut.data) {
                toast.success(respCheckOut.data.message);
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
            <CartProgress progress={100} positionName={"Payment Option"}></CartProgress>
            <div className="container checkout-container">
                <h3 className='container text-center mt-4'>Payment options:</h3>
                <div class="form-check">
                    <input className="form-check-input" type="radio" name="payment" id="Cod" checked />
                    <label className="form-check-label" htmlFor="payment">
                        Cash On Delivery
                    </label>
                </div>
                <div class="form-check">
                    <input className="form-check-input" type="radio" name="payment" id="UPI" />
                    <label className="form-check-label" htmlFor="payment">
                        UPI
                    </label>
                </div>
                <div class="form-check">
                    <input className="form-check-input" type="radio" name="payment" id="Paytm" />
                    <label className="form-check-label" htmlFor="payment">
                        Paytm
                    </label>
                </div>
                <button className="btn btn-primary mt-4" onClick={checkMeOut}>CheckOut</button>
            </div>
            <Toaster />
            <Footer />
        </>
    )
}