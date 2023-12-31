import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { checkLogin } from "../../Utilis/auth";
import axios from "axios";
import "./Buy.css";

export default function Buy(){
    const {id} = useParams();
    const [product, setProduct] = useState('');
    const [quantity, setQuantity] = useState('1');
    const [shippingAddress, setShippingAddress] = useState('');
    const [user, setUser] = useState('');

    const loadProduct = async () => {
        if (!id) {
          window.location.href = '/';
        }
    
        const response = await axios.get(`/product/${id}`)
    
        setProduct(response.data.data);
    };
    const increaseQuantity = ()=>{
        setQuantity(quantity + 1);
    }
    const decreaseQuantity = ()=>{
        if(quantity>1){
            setQuantity(quantity-1);
        }
    }

    useEffect(()=>{
        checkLogin();
        loadProduct();
        const user = JSON.parse(localStorage.getItem('user'))
        setUser(user);
    }, []);

    const placeOrder = async () => {
        const response = await axios.post("/order",{
            product : id,
            quantity : quantity,
            shippingAddress : shippingAddress,
            user : id
        })
        alert(response.data.massage);
        window.location.href = "/myOrders"
    }
    return(
        <div>
            <div className="buy-container">
                <img src={product.image} className="buy-image"/>
            <div>
                <h1>{product.name}</h1>
                <p>{product.description}</p>
                <h1> ₹ {product.price}</h1>
                <div>
                  <span className="quantity-btn" onClick={decreaseQuantity}>-</span>
                  <span className="quantity-text">{quantity}</span>
                  <span className="quantity-btn" onClick={increaseQuantity}>+</span>
                </div>
                <input type="text"
                placeholder="Shipping Address" className="shipping-Address"
                value={shippingAddress}
                onChange={(e)=>{
                    setShippingAddress(e.target.value);
                }}/>
                <button type="button"
                className="buy-btn"
                onClick={placeOrder}>
                    Place Order
                </button>
            </div>
            </div>
        </div>
    )
}