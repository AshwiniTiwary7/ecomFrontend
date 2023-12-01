import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import Header from "../components/header";
import Footer from "../components/Footer";

export default function EditSingleProduct() {
    const path = useLocation();
    const productId = path.pathname.split("/")[2];
    const [editProductD, setEditProductD] = useState({
        productName: "",
        productPrice: "",
        productDesc: ""
    })
    function monitorEditProduct(event) {
        setEditProductD((prev) => ({
            ...prev, [event.target.id]: event.target.value
        }))
    }
    async function specProductDetailsById() {
        try {
            const respProductDetailE = await axios.get(`https://ecombackend-ikrb.onrender.com/api/v7/productDetails/${productId}`);
            if (respProductDetailE.data) {
                setEditProductD({
                    productName: respProductDetailE.data.productData.productName,
                    productPrice: respProductDetailE.data.productData.productPrice,
                    productDesc: respProductDetailE.data.productData.productDesc
                })
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
    async function editProductDet(event) {
        event.preventDefault();
        const token = localStorage.getItem('tokenVal');
        try {
            const respEdited = await axios.post(`https://ecombackend-ikrb.onrender.com/api/v7/edit/${productId}`, editProductD, {
                headers: { "Authorization": "Bearer " + token }
            });
            if (respEdited.data) {
                toast.success(respEdited.data.message);
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
        specProductDetailsById();
    }, []);
    return (
        <>
            <Header />
            <div className="container checkout-container">
                <h3 className='container text-center'>Edit product details:</h3>
                <form onSubmit={editProductDet}>
                    <label htmlFor="productName" className="form-label loginlabel">Change Product Name:</label>
                    <input type="text" className="form-control" id="productName" placeholder="Enter Product Name" value={editProductD.productName} onChange={monitorEditProduct} style={{ border: "1px solid #aaaaaa" }} required />
                    <label htmlFor="productPrice" className="form-label loginlabel">Change Product Price:</label>
                    <input type="number" className="form-control" id="productPrice" placeholder="Enter Product Price" value={editProductD.productPrice} onChange={monitorEditProduct} style={{ border: "1px solid #aaaaaa" }} required />
                    <label htmlFor="productDesc" className="form-label loginlabel">Change Product Description:</label>
                    <input type="text" className="form-control" id="productDesc" placeholder="Enter Product Description" value={editProductD.productDesc} onChange={monitorEditProduct} style={{ border: "1px solid #aaaaaa" }} required />
                    <input type="submit" className="btn btn-primary" id="loginbtn"></input>
                </form>
            </div>
            <Toaster />
            <Footer />
        </>
    )
}