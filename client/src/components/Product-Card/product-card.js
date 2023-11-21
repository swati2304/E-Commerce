import React from "react";
import "./Product-Card.css";

function ProductCard({id, name, price, description, image}){
    return(
        <div className="product-card">
            <img src={image} alt={name} className="product-image"/>
            <h2>{name}</h2>
            <h2>₹ {price}</h2>
            <p>{description}</p>
            <button className="btn">Buy Now</button>
        </div>
    )
}
export default ProductCard;