import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast, Toaster } from "react-hot-toast";
import { Link, useLocation } from "react-router-dom";

export default function SearchPage() {
    const location = useLocation();
    const searchQ = location.pathname.split("/")[2];
    const [searchedfor, setSearchedFor] = useState([]);
    async function searchFor() {
        try {
            const respSearch = await axios.get(`https://ecombackend-ikrb.onrender.com/api/v7/search/${searchQ}`);
            if (respSearch.data) {
                setSearchedFor(respSearch.data.searchedFor);
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
        searchFor();
    }, []);
    if (searchedfor.length === 0) {
        return (
            <>
                <div className="container mt-5 text-center">
                    <h2>Showing Results for : {searchQ} </h2>
                    <h4>No Product Available with this Category Right Now!</h4>
                    <Toaster />
                </div>
            </>
        )
    }
    else {

        return (
            <>
                <h2>Showing Results for : {searchQ}</h2>
                {
                    searchedfor.map((singleSearch) => {
                        return (
                            <div className="col-xs-12 col-sm-6 col-md-4 col-lg-2 d-flex justify-content-center align-items-center">
                                <div className="card productcards">
                                    <img src={singleSearch.productImage} className="card-img-top productimage" alt="images" />
                                    <div className="card-body text-center productcardbody" style={{ color: "black" }}>
                                        <Link to={{ pathname: `/productDetailed/${singleSearch._id}` }} target='_blank'><h5 className="card-title text-decoration-underline" role='button'>{singleSearch.productName}</h5></Link>
                                        <h6 className="card-title">{singleSearch.productPrice}</h6>
                                        <p className="card-text">{singleSearch.productDesc}</p>
                                        <button>Add cart</button>
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
}