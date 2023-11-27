import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { checkLogin } from "../../Utilis/auth";
import axios from "axios";
import "./Buy.css";

export default function Buy(){
    const {id} = useParams();
    const [product, setProduct] = useState('')

    const loadProduct = async () => {
        if (!id) {
          window.location.href = '/';
        }
    
        const response = await axios.get(`/product/${id}`)
    
        setProduct(response.data.data);
    };
    
    useEffect(()=>{
        checkLogin();
        loadProduct();
    }, []);
    return(
        <div>
            <div className="buy-container">
                <img src={product.image} className="buy-image"/>
            <div>
                <h1>{product.name}</h1>
                <p>{product.description}</p>
                <h1> ₹ {product.price}</h1>
            </div>
            </div>
        </div>
    )
}