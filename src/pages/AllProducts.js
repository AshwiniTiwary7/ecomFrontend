import React, { useEffect, useState } from 'react'
import ProductCard from '../components/ProductCard'
import Header from '../components/header'
import Footer from '../components/Footer'
import axios from 'axios';
import toast, { Toaster } from 'react-hot-toast';

export default function AllProducts() {
    const [allProducts, setAllProducts] = useState([]);
    const [filterData, setFilterData] = useState(1);
    function filterChange(){
        if(filterData === 1){
            setFilterData(-1);
        }
        else{
            setFilterData(1)
        }
    }
    async function allProductFetch() {
        try {
            const respAllPro = await axios.get(`https://ecombackend-ikrb.onrender.com/api/v7/allProduct/${filterData}`);
            if (respAllPro.data) {
                setAllProducts(respAllPro.data.allProD);
                console.log("I am called");
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
        allProductFetch();
    }, [filterData]);
    return (
        <>
            <Header />
            <section className="sectionpadding sectioncolor">
                <div className="container-fluid" style={{ padding: "15px;" }}>
                    <h1 className="text-center productheading">All Products</h1>
                    <h5 className='text-center w-25'>Filter Price : <span className="badge bg-secondary" role='button' onClick={filterChange}>{filterData === 1 ? ("Low to High") : ("High to Low")}</span></h5>
                    <div className='d-flex flex-wrap'>
                        {
                            allProducts.length === 0 ? (<h3 style={{ height: "50vh" }} className='container text-center mt-5'>No Product Available Right Now!</h3 >) : (
                                allProducts.map((singlePrd) => {
                                    return (<ProductCard pId={singlePrd._id} pName={singlePrd.productName} pPrice={singlePrd.productPrice} pDesc={singlePrd.productDesc} pImg={singlePrd.productImage} />)
                                })
                            )
                        }
                    </div>
                </div>
            </section>
            <Footer />
            <Toaster />
        </>
    )
}
