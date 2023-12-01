import React, { useState, useEffect } from 'react';
import logo from '../images/logo.png';
import { Link, NavLink } from 'react-router-dom';

export default function Header() {
    let token = localStorage.getItem("tokenVal");
    function getTokenVal() {
        token = localStorage.getItem("tokenVal");
    }
    const [searchQuery, setSearchQuery] = useState("");
    useEffect(() => {
        getTokenVal();
    }, []);
    return (
        <div className="container-fluid">
            <div className="row">
                <nav className="navbar navbar-expand-lg">
                    <div className="container-fluid">
                        <NavLink className="navbar-brand col-md-2" to="/" id="headerbrandname">
                            <img src={logo} alt="Logo" className="d-inline-block" id="headerlogo" />
                            WILSBERG
                        </NavLink>
                        <div className="col-md-2"></div>
                        <button className="navbar-toggler" id="nav-toggle-button" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                            <span className="navbar-toggler-icon headerpadding"></span>
                        </button>
                        <div className="collapse navbar-collapse" id="navbarSupportedContent">
                            <form className="d-flex col-md-6 headerpadding" role="search">
                                <input className="form-control me-2" type="search" placeholder="Search for product, category, etc." aria-label="Search" onChange={(e) => { setSearchQuery(e.target.value) }} value={searchQuery} />
                                <Link to={{ pathname: `/search/${searchQuery}` }}><button className="btn btn-outline-primary" id="headerbtn" type="submit">Search</button></Link>
                            </form>
                            <div className="col headerpadding d-flex flex-column flex-lg-row justify-content-start justify-content-lg-end">
                                {
                                    !token ? (<NavLink to="/login"><button className="btn btn-primary" id="headerloginbtn">Login</button></NavLink>) : (<Link to="/userDetail"><i className="fa-solid fa-user fw-bold fs-3 mt-1 ms-2" id="headerloginbtn"></i></Link>)
                                }
                                <NavLink to="/cart">
                                    <i className="cart fa fa-shopping-cart mt-1" id="headercartlogo"></i>
                                </NavLink>
                            </div>
                        </div>
                    </div>
                </nav>
            </div>
            <div className="row">
                <ul className="nav justify-content-center">
                    <li className="nav-item">
                        <NavLink className="nav-link" to="/" style={{ color: "black" }}>Home</NavLink>
                    </li>
                    <li className="nav-item">
                        <NavLink className="nav-link" to="/allproducts" style={{ color: "black" }}>All Products</NavLink>
                    </li>
                    <li className="nav-item dropdown">
                        <NavLink className="nav-link dropdown-toggle" data-bs-toggle="dropdown" role="button" style={{ color: "black" }}>Women</NavLink>
                        <ul className="dropdown-menu">
                            <li><NavLink className="dropdown-item" to="/women">All Products</NavLink></li>
                            <li><NavLink className="dropdown-item" to="/womendresses">Dresses</NavLink></li>
                            <li><NavLink className="dropdown-item" to="/womenpants">Pants</NavLink></li>
                            <li><NavLink className="dropdown-item" to="/womenskirts">Skirts</NavLink></li>
                        </ul>
                    </li>
                    <li className="nav-item dropdown">
                        <NavLink className="nav-link dropdown-toggle" data-bs-toggle="dropdown" role="button" to="/" style={{ color: "black" }}>Men</NavLink>
                        <ul className="dropdown-menu">
                            <li><NavLink className="dropdown-item" to="/men">All Products</NavLink></li>
                            <li><NavLink className="dropdown-item" to="/menshirts">Shirts</NavLink></li>
                            <li><NavLink className="dropdown-item" to="/menpants">Pants</NavLink></li>
                            <li><NavLink className="dropdown-item" to="/menhoodies">Hoodies</NavLink></li>
                        </ul>
                    </li>
                    <li className="nav-item dropdown">
                        <NavLink className="nav-link dropdown-toggle" data-bs-toggle="dropdown" role="button" to="/" style={{ color: "black" }}>Kids</NavLink>
                        <ul className="dropdown-menu">
                            <li><NavLink className="dropdown-item" to="/kid">All Products</NavLink></li>
                            <li><NavLink className="dropdown-item" to="/kidshirts">Shirts</NavLink></li>
                            <li><NavLink className="dropdown-item" to="/kidpants">Pants</NavLink></li>
                        </ul>
                    </li>
                    <li className="nav-item">
                        <NavLink className="nav-link" to="/contact" style={{ color: "black" }}>Contact</NavLink>
                    </li>
                </ul>
            </div>
        </div>
    )
}
