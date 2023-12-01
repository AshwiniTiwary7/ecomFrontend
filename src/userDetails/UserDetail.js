import React, { useEffect, useState } from "react";
import { NavLink, Outlet, useNavigate } from "react-router-dom";
import toast, { Toaster } from 'react-hot-toast';
import axios from "axios";

export default function UserDetails() {
    const navigate = useNavigate();
    function logMeOut() {
        localStorage.clear();
        navigate("/");
        toast.success("Logged Out Successfully");
    }
    const [admin, setAdmin] = useState(false);
    async function checkAdminorNot() {
        const userId = localStorage.getItem('userId');
        const token = localStorage.getItem('tokenVal');
        try {
            const respAdmin = await axios.get(`https://ecombackend-ikrb.onrender.com/api/v7/userDetail/${userId}`, {
                headers: { "Authorization": "Bearer " + token }
            });
            if (respAdmin.data) {
                setAdmin(respAdmin.data.userDetails.isAdmin);
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
        checkAdminorNot();
    }, []);
    return (
        <div className="d-flex">
            <div className="list-group border-end border-dark sidebar">
                <NavLink to="/" className="menu-item" aria-current="true">
                    <i className="fa-solid fa-house me-2 fs-6 mt-2"></i>
                    <p className="menu-item-label">Home</p>
                </NavLink>
                <NavLink to="accountinfo" className="menu-item" aria-current="true">
                    <i className="fa-solid fa-circle-info me-2 fs-6 mt-2"></i>
                    <p className="menu-item-label">Account Detail</p>
                </NavLink>
                <NavLink to="orderhistory" className="menu-item" aria-current="true">
                    <i className="fa-solid fa-clock-rotate-left me-2 fs-6 mt-2"></i>
                    <p className="menu-item-label">Order History</p>
                </NavLink>
                <NavLink to="addProduct" className={admin === true ? "menu-item" : "d-none"} aria-current="true">
                    <i className="fa-solid fa-shirt me-2 fs-6 mt-2"></i>
                    <p className="menu-item-label">Add Product</p>
                </NavLink>
                <NavLink to="editproduct" className={admin === true ? "menu-item" : "d-none"} aria-current="true">
                    <i className="fa-solid fa-pen-to-square me-2 fs-6 mt-2"></i>
                    <p className="menu-item-label">Edit Product</p>
                </NavLink>
                <NavLink to="allUserDisplay" className={admin === true ? "menu-item" : "d-none"} aria-current="true">
                    <i className="fa-solid fa-user-pen me-2 fs-6 mt-2"></i>
                    <p className="menu-item-label">All Users</p>
                </NavLink>
                <button type="button" className="btn btn-danger border border-dark mt-5 d-flex flex-row justify-content-center" data-bs-toggle="modal" data-bs-target="#exampleModal">
                    <i className="fa-solid fa-right-from-bracket me-2 fs-6 mt-1"></i>
                    <p className="menu-item-label">Logout</p>
                </button>
            </div>
            <div className="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h1 className="modal-title fs-5" id="exampleModalLabel">Are you sure you want to Log out?</h1>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-primary" data-bs-dismiss="modal">No</button>
                            <button type="button" className="btn btn-danger" data-bs-dismiss="modal" onClick={logMeOut}>Yes</button>
                        </div>
                    </div>
                </div>
            </div>
            <Outlet />
            <Toaster />
        </div>
    )
}