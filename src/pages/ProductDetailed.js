import React, { useEffect, useState } from "react";
import axios from "axios";
import toast, { Toaster } from 'react-hot-toast';
import { useLocation } from "react-router-dom";
import { Rating } from 'react-simple-star-rating';
import AllRatings from "./AllRatings";
import Header from "../components/header";
import Footer from "../components/Footer";

export default function ProductDetailed() {
    const location = useLocation();
    const productId = location.pathname.split("/")[2];
    const [productDetailById, setProductDetailById] = useState({});
    const [ratingDetails, setRatingDetails] = useState({
        percentageRating: 0,
        userRated: 0
    })
    const [ratingNum, setRatingNum] = useState(0);
    const [ratingBody, setRatingBody] = useState("");
    async function getProductDetailsById() {
        try {
            const respProductDetailById = await axios.get(`https://ecombackend-ikrb.onrender.com/api/v7/productDetails/${productId}`);
            if (respProductDetailById.data) {
                setProductDetailById(respProductDetailById.data.productData);
                setRatingDetails({
                    percentageRating: respProductDetailById.data.productPerRated,
                    userRated: respProductDetailById.data.productData.productRating.length
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

    async function ratedTheProduct() {
        const userId = localStorage.getItem('userId');
        const token = localStorage.getItem("tokenVal");
        try {
            const respRated = await axios.post(`https://ecombackend-ikrb.onrender.com/api/v7/rateProduct/${productId}/${userId}`, {
                ratingUser: ratingNum,
                messageRating: ratingBody
            }, {
                headers: { "Authorization": "Bearer " + token }
            });
            if (respRated.status == 200) {
                toast.success(respRated.data.message);
                setRatingDetails({
                    percentageRating: respRated.data.percentageRating,
                    userRated: respRated.data.userRated
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
    useEffect(() => {
        getProductDetailsById();
    }, []);
    return (
        <>
            <Header />
            {/* <div className="d-flex justify-content-center align-items-center" style={{ height: "50vh" }}>
                <div className="card mb-3" style={{ width: "50vw" }}>
                    <div className="row g-0">
                        <div className="col-md-4">
                            <img src={productDetailById.productImage} className="img-fluid" alt="Product Image" />
                        </div>
                        <div className="col-md-8">
                            <div className="card-body">
                                <h5 className="card-title">{productDetailById.productName}</h5>
                                <p className="card-text">{productDetailById.productPrice}</p>
                                <p className="card-text">{productDetailById.productDesc}</p>
                            </div>
                        </div>
                    </div>
                    {
                        ratingDetails.percentageRating <= 20 ? (<><Rating initialValue={1} readonly></Rating><span>Based on: {ratingDetails.userRated} Reviews</span></>) :
                            ratingDetails.percentageRating > 20 && ratingDetails.percentageRating <= 40 ? (<><Rating initialValue={2} readonly></Rating><span>Based on: {ratingDetails.userRated} Reviews</span></>) :
                                ratingDetails.percentageRating > 40 && ratingDetails.percentageRating <= 60 ? (<><Rating initialValue={3} readonly></Rating><span>Based on: {ratingDetails.userRated} Reviews</span></>) :
                                    ratingDetails.percentageRating > 60 && ratingDetails.percentageRating <= 80 ? (<><Rating initialValue={4} readonly></Rating><span>Based on: {ratingDetails.userRated} Reviews</span></>) :
                                        (<><Rating initialValue={5} readonly></Rating><span>Based on: {ratingDetails.userRated} Reviews</span></>)
                    }
                </div>
            </div> */}
            <div className="container row m-5">
                <div className="col col-lg-2"></div>
                <div className="col col-sm-12 col-md-6 col-lg-4 d-flex flex-column">
                    <img src={productDetailById.productImage} className="img-fluid border" alt="Product Image" style={{ width: "40vw", borderRadius: "10px" }} />
                    {
                        ratingDetails.percentageRating <= 20 ? (<><Rating initialValue={1} readonly></Rating><span>Based on: {ratingDetails.userRated} Reviews</span></>) :
                            ratingDetails.percentageRating > 20 && ratingDetails.percentageRating <= 40 ? (<><Rating initialValue={2} readonly></Rating><span>Based on: {ratingDetails.userRated} Reviews</span></>) :
                                ratingDetails.percentageRating > 40 && ratingDetails.percentageRating <= 60 ? (<><Rating initialValue={3} readonly></Rating><span>Based on: {ratingDetails.userRated} Reviews</span></>) :
                                    ratingDetails.percentageRating > 60 && ratingDetails.percentageRating <= 80 ? (<><Rating initialValue={4} readonly></Rating><span>Based on: {ratingDetails.userRated} Reviews</span></>) :
                                        (<><Rating initialValue={5} readonly></Rating><span>Based on: {ratingDetails.userRated} Reviews</span></>)
                    }
                </div>
                <div className="col col-sm-12 col-md-6 col-lg-4">
                    <h5 className="card-title">{productDetailById.productName}</h5>
                    <div className="d-flex flex-row mt-2">
                        <p className="form-label contactlabel me-2">Price:</p>
                        <p className="card-text">{productDetailById.productPrice}</p>
                    </div>
                    <div className="d-flex flex-row">
                        <p className="form-label contactlabel me-2">Description:</p>
                        <p className="card-text">{productDetailById.productDesc}</p>
                    </div>
                </div>
            </div>
            <div className="container rating-container">
                <div className="d-flex flex-row my-4">
                    <p className="form-label contactlabel mt-2 me-2">Rate product:</p>
                    <Rating onClick={(rate) => { setRatingNum(rate) }}></Rating>
                </div>
                <div className="input-group mb-4">
                    <span className="input-group-text">Your Message:</span>
                    <textarea className="form-control" aria-label="With textarea" value={ratingBody} onChange={(e) => { setRatingBody(e.target.value) }}></textarea>
                </div>
                <div className='d-grid container mb-5'>
                    <button type="button" className="btn btn-primary" onClick={ratedTheProduct}>Rate Product</button>
                </div>
            </div>
            <AllRatings />
            <Toaster />
            <Footer />
        </>
    )
}