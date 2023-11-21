import express, { response } from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();
import Product from './models/models.js';
import User from './models/User.js';

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
    const {name, price, description, image} = req.body
    const product = new Product({
        name : name,
        price : price,
        description : description,
        image: image
    })
    try{
        const saveProduct = await product.save()

    res.json({
        success: "true",
        data : saveProduct,
        massage: 'product added successfully'
    })
    } catch {e}{
        res.json({
            success: "true",
            data : saveProduct,
            massage: 'product added successfully'
        })  
    }
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
    const {name, price, description, image} = req.body

    await Product.updateOne({_id:id}, {$set:{
        name:name,
        price:price,
        description:description,
        image:image
    }})
    const updatedProduct = await Product.find({_id:id})
    res.json({
        success: "true",
        data : updatedProduct,
        massage: 'product Updated successfully'
    })
})

app.post("/signup", async (req, res) => {
    const { name, email, password, mobile} = req.body;
  
    const user = new User({
      name: name,
      email: email,
      password: password,
      mobile: mobile
    });
  
    try {
      const savedUser = await user.save();
  
      res.json({
        success: true,
        data: savedUser,
        message: "signup successfully...",
      });
    } catch (err) {
      res.json({
        success: false,
        message: err.message,
      });
  }
  });

  app.post("/login", async (req, res)=>{
    const {email, password} = req.body

    const user = await User.findOne({email:email, password:password})
    if(user){
        return res.json({
            success: true,
            data: user,
            message: "User login successfully..."
        });
    }
    else{
        return res.json({
            success: false,
            message: "Invalid email or password"
        });
    }
  });

const port = 5000;
app.listen(port, ()=>{
    console.log(`Server is running on port ${port}`)
});