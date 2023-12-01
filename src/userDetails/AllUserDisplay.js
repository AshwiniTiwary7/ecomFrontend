import React, { useEffect, useState } from "react";
import axios from "axios";
import toast, { Toaster } from 'react-hot-toast';

export default function AllUserDisplay() {
    let user = localStorage.getItem('userId');
    function getUserId() {
        user = localStorage.getItem('userId');
    }
    const [allUsers, setAllUsers] = useState([]);

    async function getAllUser() {
        const token = localStorage.getItem('tokenVal');
        try {
            const respAllUsers = await axios.get('https://ecombackend-ikrb.onrender.com/api/v7/allUsers', {
                headers: { "Authorization": "Bearer " + token }
            })
            if (respAllUsers.data) {
                setAllUsers(respAllUsers.data.allUser);
                console.log(respAllUsers.data.allUser);
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
    async function deleteSpecUser(userId) {
        const token = localStorage.getItem('tokenVal');
        try {
            const respDeleted = await axios.delete(`https://ecombackend-ikrb.onrender.com/api/v7/delete/${userId}`, {
                headers: { "Authorization": "Bearer " + token }
            })
            if (respDeleted.data) {
                toast.success(respDeleted.data.message);
            }
            getAllUser();
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
        getAllUser();
        getUserId();
    }, []);
    if (allUsers.length === 0) {
        return (
            <h2>No users avaliable right now</h2>
        )
    }
    else {
        return (
            <>
                <div className="container w-75">
                    <table className="table table-hover">
                        <thead>
                            <tr>
                                <th scope="col">Fullname</th>
                                <th scope="col">Mobile</th>
                                <th scope="col">Email</th>
                                <th scope="col">Queries</th>
                                <th scope="col">Admin</th>
                                <th scope="col">Delete</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                allUsers.map((singleUser) => {
                                    return (
                                        <>
                                            <tr>
                                                <th scope="row">{singleUser.fullName}</th>
                                                <td>{singleUser.mobile}</td>
                                                <td>{singleUser.userEmail}</td>
                                                <td>{singleUser.userQueries.length}</td>
                                                <td><div class="form-check form-switch">
                                                    {
                                                        singleUser.isAdmin === true ? (<input className="form-check-input border border-dark" type="checkbox" role="switch" id="flexSwitchCheckDisabled" disabled checked />) : (<input className="form-check-input border border-dark" type="checkbox" role="switch" id="flexSwitchCheckDisabled" disabled />)
                                                    }
                                                </div></td>
                                                <td>{singleUser._id === user ? ('') : (<button type="button" className="btn btn-danger" data-bs-toggle="modal" data-bs-target={`#${singleUser._id}`}><i className="fa-solid fa-user-minus text-light"></i></button>)}</td>
                                            </tr>
                                            <div className="modal fade" id={singleUser._id} tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                                                <div className="modal-dialog">
                                                    <div className="modal-content">
                                                        <div className="modal-header">
                                                            <h1 className="modal-title fs-5" id="exampleModalLabel">Are you sure you want to Delete <span className="text-danger">{singleUser.fullName}</span>?</h1>
                                                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                                        </div>
                                                        <div class="modal-footer">
                                                            <button type="button" className="btn btn-primary" data-bs-dismiss="modal">No</button>
                                                            <button type="button" className="btn btn-danger" data-bs-dismiss="modal" onClick={() => { deleteSpecUser(singleUser._id) }}>Yes</button>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </>
                                    )
                                })
                            }
                        </tbody>
                    </table>
                    <Toaster />
                </div>
            </>
        )
    }
}