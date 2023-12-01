import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function Protected(props){
    let token = localStorage.getItem('tokenVal');
    function fetchtoken(){
        token = localStorage.getItem('tokenVal');
    }
    const Comp = props.Comp;
    const navigate = useNavigate();
    useEffect(()=>{
        fetchtoken();
        if(!token){
            navigate("/login")
        }
    })
    if(token){
        return(
            <Comp></Comp>
        )
    }
}