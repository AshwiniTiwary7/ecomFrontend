import React from 'react'
import Header from '../components/header'
import Footer from '../components/Footer'
import CardCarousel from '../components/CardCarousel'
import logo from '../images/logo.png'

export default function Home() {
    return (
        <>
            <Header />
            <div
                style={{
                    // eslint-disable-next-line
                    backgroundImage: "url(" + "https://images.unsplash.com/photo-1505228395891-9a51e7e86bf6?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NTJ8fGJlYWNofGVufDB8fDB8fHww&auto=format&fit=crop&w=500&q=60" + ")",
                    backgroundRepeat: 'no-repeat',
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                    backgroundAttachment: 'fixed',
                    height: "83vh"
                }}
                className="d-flex flex-column justify-content-center align-items-center"
            >
                <div className="h-50" style={{ filter: "contrast(1.8)" }}>
                    <img src={logo} className="h-100" alt='images' />
                </div>
                <p
                    className="text-light fs-3 fw-bolder text-center text-sm-start"
                    style={{ fontFamily: "'Ubuntu Condensed', sans-serif" }}
                >
                    Enjoy Vacations with our Brand New Collections
                </p>
                <hr className="w-50 border-0 bg-light opacity-100" style={{ height: "0.2rem" }} />
            </div>
            <CardCarousel />
            <Footer />
        </>
    )
}
