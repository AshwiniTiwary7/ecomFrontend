import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function ProtectChangePass(props){
    let tokenTemp = localStorage.getItem('userTempId');
    const {Comp} = props;
    const navigate = useNavigate();
    useEffect(()=>{
        localStorage.getItem('userTempId');
        if(!tokenTemp){
            navigate("/");
        }
    },[]);
    if(tokenTemp){
        return(<Comp></Comp>);
    }
}