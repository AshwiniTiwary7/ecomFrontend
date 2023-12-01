import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";
import toast, { Toaster } from 'react-hot-toast';
import Header from "../components/header";
import Footer from "../components/Footer";

export default function CategoriesProduct() {
    const location = useLocation();
    const catType = location.pathname.split("/")[1];
    const [catPro, setCatPro] = useState([]);
    async function getCatProducts() {
        try {
            const respCatPro = await axios.get(`https://ecombackend-ikrb.onrender.com/api/v7/catProduct/${catType}`);
            if (respCatPro.data) {
                setCatPro(respCatPro.data.catProductDet);
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
    useEffect(() => {
        getCatProducts();
    }, []);
    if (catPro.length === 0) {
        return (
            <>
            <Header />
                <h3 style={{ height: "80vh" }} className='container text-center mt-5'>No Product for {catType}</h3>
            <Footer />
            </>
        )
    }
    else {
        return (
            <>
                <Header />
                <div className="d-flex flex-wrap sectionpadding">
                    {
                        catPro.map((singleCat) => {
                            return (
                                <div className="card productcards m-5" key={singleCat._id}>
                                    <img src={singleCat.productImage} className="card-img-top productimage" alt="images" />
                                    <div className="card-body text-center productcardbody" style={{ color: "black" }}>
                                        <h5 className="card-title">{singleCat.productName}</h5>
                                        <h6 className="card-title">Rs. {singleCat.productPrice}</h6>
                                        <p className="card-text">{singleCat.productDesc}</p>
                                        <a href="/" className="btn btn-primary productcardbtn">
                                            <i className="cart fa fa-shopping-cart productcarticon"></i>Add to cart
                                        </a>
                                    </div>
                                </div>
                            )
                        })
                    }
                    <Toaster />
                </div>
                <Footer />
            </>
        )
    }
}