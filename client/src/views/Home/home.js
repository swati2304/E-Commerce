import React, {useState, useEffect} from "react";
import "./home.css";
import axios from 'axios';
import ProductCard from "../../components/Product-Card/product-card";
import { checkLogin } from "../../Utilis/auth";

export default function Home(){
    const [product, setproduct] = useState([])
    const loadProduct = async()=>{
        const response = await axios.get("/product")
        setproduct(response?.data?.data);
    }         
    useEffect(()=>{
        checkLogin();
        loadProduct();
    }, []);

    return(
        <div>
            <h1 className="text-center">All Products</h1>
            <div className="parent">
            {
                product?.map((product, index)=>{
                    const {_id, name, price, description, image} = product;
                    return(<ProductCard keys={index} id={_id} name={name} price={price} description={description} image={image}/>)
                })
            }
            </div>
        </div>
    )
}