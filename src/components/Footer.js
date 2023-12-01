import React from 'react'

export default function Footer() {
    return (
        <footer>
            <div className="footer-content row">
                <div className="footer-section col-sm-3">
                    <h5>Women</h5>
                    <ul>
                        <li><a href="/womendresses">Dresses</a></li>
                        <li><a href="/womenpants">Pants</a></li>
                        <li><a href="/womenskirts">Skirts</a></li>
                    </ul>
                </div>
                <div className="footer-section col-sm-3">
                    <h5>Men</h5>
                    <ul>
                        <li><a href="/menshirts">Shirts</a></li>
                        <li><a href="/menpants">Pants</a></li>
                        <li><a href="/menhoodies">Hoodies</a></li>
                    </ul>
                </div>
                <div className="footer-section col-sm-3">
                    <h5>Kids</h5>
                    <ul>
                        <li><a href="/kidshirts">Shirts</a></li>
                        <li><a href="/kidpants">Pants</a></li>
                    </ul>
                </div>
                <div className="footer-section col-sm-3">
                    <h5>Links</h5>
                    <ul>
                        <li><a href="/">Home</a></li>
                        <li><a href="/login">Login</a></li>
                        <li><a href="/contact">Contact</a></li>
                    </ul>
                </div>
            </div>
            <hr className="footer-line" />
            <div className="footer-content row">
                <div className="footer-section col">
                    <p>Copyright &copy;WILSBERG 2022-23</p>
                </div>
            </div>
        </footer>
    )
}
