import React, { useEffect, useState } from "react";
import axios from "axios";
import toast, { Toaster } from 'react-hot-toast';

export default function AccountInfo() {
    const [loading, setloading] = useState(false);
    const [editUser, setEditUser] = useState({
        fullName: "",
        mobile: "",
        userEmail: "",
        userPass: ""
    })

    function monitorEditUser(event) {
        setEditUser((prev) => ({
            ...prev, [event.target.id]: event.target.value
        }))
    }

    async function fetchUserDetails() {
        const userId = localStorage.getItem('userId');
        const token = localStorage.getItem('tokenVal');
        try {
            const respUserDetails = await axios.get(`https://ecombackend-ikrb.onrender.com/api/v7/userDetail/${userId}`, {
                headers: { "Authorization": "Bearer " + token }
            });
            if (respUserDetails.data) {
                setEditUser({
                    fullName: respUserDetails.data.userDetails.fullName,
                    mobile: respUserDetails.data.userDetails.mobile,
                    userEmail: respUserDetails.data.userDetails.userEmail,
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

    async function updateUser(event) {
        setloading(true);
        event.preventDefault();
        const userId = localStorage.getItem('userId');
        const token = localStorage.getItem('tokenVal');
        try {
            const respUpdate = await axios.post(`https://ecombackend-ikrb.onrender.com/api/v7/editDetail/${userId}`, editUser, {
                headers: { "Authorization": "Bearer " + token }
            })
            if (respUpdate.data) {
                toast.success(respUpdate.data.message);
            }
        } catch (err) {
            if (err.response.data) {
                toast.error(err.response.data.message);
            }
            else {
                console.log(err);
            }
        }
        setloading(false);
    }
    useEffect(() => {
        fetchUserDetails();
    }, []);
    return (
        <>
            <section className="sectionpadding sectioncolor w-75">
                <div className="container logincontent">
                    <div className="row justify-content-center">
                        <div className="col-md-5 login-container">
                            <h1 className="text-center">Your Details</h1>
                            <form>
                                <label htmlFor="fullName" className="form-label loginlabel">Fullname:</label>
                                <input type="text" className="form-control" id="fullName" placeholder="Enter your Fullname" value={editUser.fullName} onChange={monitorEditUser} style={{ border: "1px solid #aaaaaa" }} />
                                <label htmlFor="mobile" className="form-label loginlabel">Mobile number:</label>
                                <input type="tel" className="form-control" id="mobile" placeholder="Enter your mobile number" value={editUser.mobile} onChange={monitorEditUser} style={{ border: "1px solid #aaaaaa" }} />
                                <label htmlFor="userEmail" className="form-label loginlabel">Email:</label>
                                <input type="email" className="form-control" id="userEmail" placeholder="Enter your email" value={editUser.userEmail} onChange={monitorEditUser} style={{ border: "1px solid #aaaaaa" }} />
                                <div className="d-grid gap-2"> 
                                    <button type="button" className="btn btn-primary mt-4" data-bs-toggle="modal" data-bs-target="#editUser">
                                        {loading === true ? "Updating..." : "Save"}
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </section>
            <div className="modal fade" id="editUser" tabindex="-1" aria-labelledby="editUserModal" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h1 className="modal-title fs-5" id="editUserModal">Enter your password to make changes</h1>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <div className="input-group input-group-sm mb-3">
                                <span className="input-group-text bg-dark text-light" id="inputGroup-sizing-sm">Password:</span>
                                <input type="password" className="form-control" aria-label="Sizing example input" aria-describedby="inputGroup-sizing-sm" id="userPass" value={editUser.userPass} onChange={monitorEditUser} />
                            </div>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-danger" data-bs-dismiss="modal">Cancel</button>
                            <button type="button" className="btn btn-primary" data-bs-dismiss="modal" onClick={updateUser}>{loading === true ? "Updating..." : "Change"}</button>
                        </div>
                    </div>
                </div>
            </div>
            <Toaster />
        </>
    )
}