import React from "react";
import "./Product-Card.css";
import {Link} from "react-router-dom";

function ProductCard({id, name, price, description, image}){
    return(
        <div className="product-card">
            <img src={image} alt={name} className="product-image"/>
            <h2>{name}</h2>
            <h2>₹ {price}</h2>
            <p>{description}</p>
            <Link className="btn" to={`/buy/${id}`}>Buy Now</Link>
        </div>
    )
}
export default ProductCard;