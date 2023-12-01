import React from 'react';
import { toast, Toaster } from 'react-hot-toast';
import { Link } from 'react-router-dom';
import axios from 'axios';

export default function ProductCard(props) {
    const { pId, pName, pPrice, pDesc, pImg } = props;
    async function addProductCart() {
        const userId = localStorage.getItem('userId');
        const token = localStorage.getItem('tokenVal');
        try {
            const respCart = await axios.get(`https://ecombackend-ikrb.onrender.com/api/v7/addCart/${userId}/${pId}`, {
                headers: { "Authorization": "Bearer " + token }
            });
            if (respCart.data) {
                toast.success(respCart.data.message);
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
    return (
        <>
            <div className="col-xs-12 col-sm-6 col-md-4 col-lg-2 d-flex justify-content-center align-items-center">
                <div className="card productcards">
                    <img src={pImg} className="card-img-top productimage" alt="images" />
                    <div className="card-body text-center productcardbody" style={{ color: "black" }}>
                        <Link to={{ pathname: `/productDetailed/${pId}` }} target='_blank'><h5 className="card-title text-decoration-underline" role='button'>{pName}</h5></Link>
                        <h6 className="card-title">Rs. {pPrice}</h6>
                        <p className="card-text">{pDesc}</p>
                        <button onClick={addProductCart} className="btn btn-primary productcardbtn">
                            <i className="cart fa fa-shopping-cart productcarticon"></i>Add to cart
                        </button>
                    </div>
                </div>
            </div>
            <Toaster />
        </>
    )
}
