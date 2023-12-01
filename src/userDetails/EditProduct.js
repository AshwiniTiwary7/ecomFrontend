import React, { useState, useEffect } from "react";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import { Link } from "react-router-dom";

export default function EditProduct() {
    const [editProducts, setEditProducts] = useState([]);
    async function allEProductFetch() {
        try {
            const respAllPro = await axios.get('https://ecombackend-ikrb.onrender.com/api/v7/allProduct/1');
            if (respAllPro.data) {
                setEditProducts(respAllPro.data.allProD);
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
    async function deleteSingleProduct(productId){
        const token = localStorage.getItem('tokenVal');
        try {
            const respDeleteP = await axios.delete(`https://ecombackend-ikrb.onrender.com/api/v7/d/${productId}`,{
                headers:{"Authorization" : "Bearer " + token}
            });
            if(respDeleteP.data){
                toast.success(respDeleteP.data.message);
            }
            allEProductFetch();
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
        allEProductFetch();
    }, []);
    return (
        <>
            {
                editProducts.map((singleEdit) => {
                    return (
                        <div className="col-xs-12 col-sm-6 col-md-4 col-lg-2 d-flex justify-content-center align-items-center order-history">
                            <div className="card productcards">
                                <img src={singleEdit.productImage} className="card-img-top productimage" alt="images" />
                                <div className="card-body text-center productcardbody" style={{ color: "black" }}>
                                    <h5 className="card-title">{singleEdit.productName}</h5>
                                    <h6 className="card-title">{singleEdit.productPrice}</h6>
                                    <p className="card-text">{singleEdit.productDesc}</p>
                                    <Link to={{pathname:`/e/${singleEdit._id}`}} target="_blank"><button className="btn btn-primary">Edit</button></Link>
                                    <button className="btn btn-danger m-2" onClick={()=>{deleteSingleProduct(singleEdit._id)}}>Delete</button>
                                </div>
                            </div>
                        </div>
                    )
                })
            }
            <Toaster />
        </>
    )
}