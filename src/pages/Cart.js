import React, { useEffect, useState } from 'react';
import Header from '../components/header';
import Footer from '../components/Footer';
import CartProgress from './CartProgress';
import axios from 'axios';
import toast, { Toaster } from 'react-hot-toast';
import CartShimeer from '../components/CartShimeer';
import { Link } from 'react-router-dom';

export default function Cart() {
    const [cartLoading, setCartLoading] = useState(false);
    const [cartData, setCartData] = useState([]);
    async function getCartItems() {
        const userId = localStorage.getItem('userId');
        const token = localStorage.getItem('tokenVal');
        try {
            const respCartItem = await axios.get(`https://ecombackend-ikrb.onrender.com/api/v7/cartDetail/${userId}`, {
                headers: { "Authorization": "Bearer " + token }
            });
            if (respCartItem.data) {
                setCartData(respCartItem.data.cartForUser);
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
    async function addInc(proId) {
        setCartLoading(true);
        const userId = localStorage.getItem('userId');
        const token = localStorage.getItem('tokenVal');
        try {
            const respInc = await axios.get(`https://ecombackend-ikrb.onrender.com/api/v7/addCart/${userId}/${proId}`, {
                headers: { "Authorization": "Bearer " + token }
            });
            if (respInc.data) {
                toast.success(respInc.data.message);
            }
            getCartItems();
        } catch (err) {
            if (err.response.data) {
                toast.error(err.response.data.message);
            }
            else {
                console.log(err);
            }
        }
        setCartLoading(false);
    }
    async function deleteCartItem(cartId) {
        const userId = localStorage.getItem('userId');
        const token = localStorage.getItem('tokenVal');
        try {
            const respDeleted = await axios.delete(`https://ecombackend-ikrb.onrender.com/api/v7/deletecart/${userId}/${cartId}`, {
                headers: { "Authorization": "Bearer " + token }
            });
            if (respDeleted.data) {
                toast.success(respDeleted.data.message);
            }
            getCartItems();
        } catch (err) {
            if (err.response.data) {
                toast.error(err.response.data.message);
            }
            else {
                console.log(err);
            }
        }
    }
    async function decCartItem(cartId) {
        const userId = localStorage.getItem('userId');
        const token = localStorage.getItem('tokenVal');
        try {
            const respDec = await axios.delete(`https://ecombackend-ikrb.onrender.com/api/v7/dec/${userId}/${cartId}`, {
                headers: { "Authorization": "Bearer " + token }
            });
            if (respDec.data) {
                toast.success(respDec.data.message);
            }
            getCartItems();
        } catch (err) {
            if (err.response.data) {
                toast.error(err.response.data.message);
            }
            else {
                console.log(err);
            }
        }
    }
    useEffect(() => {
        getCartItems();
    }, []);
    console.log(cartData)
    if (cartData.length === 0) {
        return (<>
            <Header />
            <h3 style={{ height: "80vh" }} className='container text-center mt-5'>No Product in cart! Start Shopping</h3>
            <Footer />
            <Toaster />
        </>)
    }
    else {
        return (
            <>
                <Header />
                <CartProgress progress={25} positionName={"Review Cart"} />
                <section className="sectioncolor sectionpadding ">
                    {
                        cartLoading === true ? (
                            <>
                                <CartShimeer />
                                <Toaster />
                            </>
                        ) : 
                        
                        (<><h3 className='container text-center mt-4'>Cart review:</h3 >{cartData.map((singleCart) => {
                            
                            return (
                                <div className="container">
                                    <div className="row">
                                        <div className="col" id="cartsection1">
                                            <div className="card">
                                                <div className="card-body">
                                                    <div className="row">
                                                        <div className="col-md">
                                                            <img className="card-img" id="cartimage" src={singleCart.productId.productImage} alt="images" />
                                                        </div>
                                                        <div className="col text-center" id="cartitemdetail">
                                                            <h5>{singleCart.productId.productName}</h5>
                                                            <h6>{singleCart.productId.productPrice}</h6>
                                                        </div>
                                                        <div className="col">
                                                            <div className="justify-content-center d-flex">
                                                                <button className="btn btn-primary" id="minus-btn" onClick={() => { decCartItem(singleCart._id) }}>-</button>
                                                                <span id="display-box">{singleCart.productCount}</span>
                                                                <button className="btn btn-primary" id="plus-btn" onClick={() => { addInc(singleCart.productId._id) }}>+</button>
                                                            </div>
                                                            <div className="text-center">
                                                                <button className="btn btn-primary" id="trashbtn" onClick={() => { deleteCartItem(singleCart._id) }}>
                                                                    <i className="fa-solid fa-trash-can"></i>
                                                                </button>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )
                        })}</>)

                    }
                    <Link to='/Summary'>
                        <div className='d-grid gap-2 container'>
                            <button className='btn btn-primary m-4'>Next<i class="fa-solid fa-circle-arrow-right ms-2"></i></button>
                        </div>
                    </Link>
                </section>
                <Footer />
                <Toaster />
            </>
        )
    }
}
