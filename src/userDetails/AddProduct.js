import React, { useEffect, useState } from "react";
import axios from "axios";
import toast, { Toaster } from 'react-hot-toast';
import Spinner from "../components/Spinner";

export default function AddProduct() {
    const [loading, setLoading] = useState(false);
    const [isOnline, setIsOnline] = useState(true);
    function setOnlineStatus() {
        if (navigator.onLine === true) {
            setIsOnline(true);
        }
        else {
            setIsOnline(false);
        }
    }
    const [productDetailed, setProductDetailed] = useState({
        productName: "",
        productPrice: "",
        productDesc: "",
        productCategory: "women",
        productSubCategory: "womendresses",
        imageProduct: ""
    });
    function montiorProductDetails(event) {
        const { id, value, type, files } = event.target;
        if (files) {
            console.log(files[0])
        }
        setProductDetailed((prev) => ({
            ...prev, [id]: type === "file" ? files[0] : value
        }))
    }

    async function addProductDetails(event) {
        event.preventDefault();
        const token = localStorage.getItem('tokenVal');
        setOnlineStatus();
        setLoading(true);
        try {
            let formData = new FormData();
            formData.append("productName", productDetailed.productName);
            formData.append("productPrice", productDetailed.productPrice);
            formData.append("productDesc", productDetailed.productDesc);
            formData.append("productCategory", productDetailed.productCategory);
            formData.append("productSubCategory", productDetailed.productSubCategory);
            formData.append("imageFile", productDetailed.imageProduct);
            const respProducts = await axios.post('https://ecombackend-ikrb.onrender.com/api/v7/addProduct', formData, {
                headers: { "Content-Type": "multipart/form-data", "Authorization": "Bearer " + token }
            });
            if (respProducts.data) {
                toast.success(respProducts.data.message);
            }
        } catch (err) {
            if (err.response.data) {
                toast.error(err.response.data.message);
            }
            else {
                console.log(err);
            }
        }
        setLoading(false);
    }
    useEffect(() => {
        const interval = setInterval(setOnlineStatus, 6000);
        return () => {
            clearInterval(interval);
        }
    }, []);
    if (loading === true) {
        return (
            <>
                <Spinner />
                <Toaster />
            </>
        )
    }
    else {
        return (
            <>
                <div className="row w-75">
                    <div className="col-11">
                        <div className="container addproduct">
                            <div className="row justify-content-center">
                                <div className="col-md-5 login-container">
                                    <h1 className="text-center">Add Product</h1>
                                    <form onSubmit={addProductDetails}>
                                        <label htmlFor="productName" className="form-label loginlabel">Product Name:</label>
                                        <input type="text" className="form-control" id="productName" placeholder="Enter Product Name" value={productDetailed.productName} onChange={montiorProductDetails} style={{ border: "1px solid #aaaaaa" }} />
                                        <label htmlFor="productPrice" className="form-label loginlabel">Product Price:</label>
                                        <input type="number" className="form-control" id="productPrice" placeholder="Enter Product Price" value={productDetailed.productPrice} onChange={montiorProductDetails} style={{ border: "1px solid #aaaaaa" }} />
                                        <label htmlFor="productDesc" className="form-label loginlabel">Product Description:</label>
                                        <input type="text" className="form-control" id="productDesc" placeholder="Enter Product Descritption" value={productDetailed.productDesc} onChange={montiorProductDetails} style={{ border: "1px solid #aaaaaa" }} />
                                        <label htmlFor="productCategory" className="form-label loginlabel">Product Category:</label>
                                        <select className="form-select" aria-label="Default select example" id="productCategory" onChange={montiorProductDetails}>
                                            <option value="women" selected>Women</option>
                                            <option value="men">Men</option>
                                            <option value="kid">Kid</option>
                                        </select>
                                        <div className={productDetailed.productCategory === "women" ? "d-flex flex-column" : "d-none"}>
                                            <div className="form-check">
                                                <input className="form-check-input" type="radio" name="women" id="productSubCategory" value="womendresses" onChange={montiorProductDetails} />
                                                <label className="form-check-label" htmlFor="womendresses">
                                                    Women Dresses
                                                </label>
                                            </div>
                                            <div className="form-check">
                                                <input className="form-check-input" type="radio" name="women" id="productSubCategory" value="womenskirts" onChange={montiorProductDetails} />
                                                <label className="form-check-label" htmlFor="womenskirts">
                                                    Women Skirts
                                                </label>
                                            </div>
                                            <div className="form-check">
                                                <input className="form-check-input" type="radio" name="women" id="productSubCategory" value="womenpants" onChange={montiorProductDetails} />
                                                <label className="form-check-label" htmlFor="womenpants">
                                                    Women Pants
                                                </label>
                                            </div>

                                        </div>
                                        <div className={productDetailed.productCategory === "men" ? "d-flex flex-column" : "d-none"}>
                                            <div className="form-check">
                                                <input className="form-check-input" type="radio" name="men" id="productSubCategory" value="menshirts" onChange={montiorProductDetails} />
                                                <label className="form-check-label" htmlFor="menshirts">
                                                    Men Shirts
                                                </label>
                                            </div>
                                            <div className="form-check">
                                                <input className="form-check-input" type="radio" name="men" id="productSubCategory" value="menpants" onChange={montiorProductDetails} />
                                                <label className="form-check-label" htmlFor="menpants">
                                                    Men Pants
                                                </label>
                                            </div>
                                            <div className="form-check">
                                                <input className="form-check-input" type="radio" name="men" id="productSubCategory" value="menhoodies" onChange={montiorProductDetails} />
                                                <label className="form-check-label" htmlFor="menhoodies">
                                                    Men Hoodies
                                                </label>
                                            </div>
                                        </div>
                                        <div className={productDetailed.productCategory === "kid" ? "d-flex flex-column" : "d-none"}>
                                            <div className="form-check">
                                                <input className="form-check-input" type="radio" name="kid" id="productSubCategory" value="kidshirts" onChange={montiorProductDetails} />
                                                <label className="form-check-label" htmlFor="kidshirts">
                                                    Kid Shirts
                                                </label>
                                            </div>
                                            <div className="form-check">
                                                <input className="form-check-input" type="radio" name="kid" id="productSubCategory" value="kidpants" onChange={montiorProductDetails} />
                                                <label className="form-check-label" htmlFor="kidpants">
                                                    Kid Pants
                                                </label>
                                            </div>
                                        </div>
                                        <div className="input-group mb-3">
                                            <input type="file" className="form-control" id="imageProduct" onChange={montiorProductDetails} />
                                            <label className="input-group-text" htmlFor="imageProduct">Upload</label>
                                        </div>
                                        {
                                            isOnline === true ? (<input type="submit" className="btn btn-primary" id="loginbtn"></input>) : (<input type="submit" className="btn btn-primary" id="loginbtn" value="No Internet Connection!" disabled></input>)
                                        }
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-1">
                        <button type="button" className={isOnline === true ? "btn btn-success m-5 online-btn" : "btn btn-warning m-5 online-btn"}>{isOnline === true ? "Online" : "Connecting..."}</button>
                    </div>
                </div>
                <Toaster />
            </>
        )
    }
}