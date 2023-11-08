import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();
import Product from './models/models.js';

const app = express();
app.use(express.json());

const mongooseConnect = async () => {
    const connection = await mongoose.connect(process.env.mongodbURI);
    if(connection){
        console.log('connected to MongoDB')
    }
}
mongooseConnect();

app.post("/product", async (req, res)=>{
    const {name, price, description} = req.body
    const product = new Product({
        name : name,
        price : price,
        description : description
    })

    const saveProduct = await product.save()

    res.json({
        success: "true",
        data : saveProduct,
        massage: 'product added successfully'
    })
})

app.get("/product", async (req, res)=>{
    const product = await Product.find();
    
    res.json({
        success: "true",
        data : product,
        massage: 'product retrived successfully'
    })
})

app.get("/product/:id", async (req, res)=>{
    const {id} = req.params;

    const product = await Product.find({_id:id});
    res.json({
        success: "true",
        data : product,
        massage: 'product retrived successfully'
    })
})
app.delete("/product/:id", async (req, res)=>{
    const {id} = req.params;

    await Product.deleteOne({_id:id});
    res.json({
        success: "true",
        data : "product",
        massage: 'product deleted successfully'
    })
})
app.put("/product/:id", async (req, res)=>{
    const {id} = req.params;
    const {name, price, description} = req.body

    await Product.updateOne({_id:id}, {$set:{
        name:name,
        price:price,
        description:description
    }})
    const updatedProduct = await Product.find({_id:id})
    res.json({
        success: "true",
        data : updatedProduct,
        massage: 'product Updated successfully'
    })
})

const port = 5000;
app.listen(port, ()=>{
    console.log(`Server is running on port ${port}`)
});