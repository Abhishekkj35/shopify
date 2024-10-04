import productModel from "../models/productModels.js"
import fs from "fs"

//add product item
const addProduct=async(req,res)=>{
    let image_filename=`${req.file.filename}`;

    let products=await productModel.find({});
    let id;
    if(products.length>0){
        let last_product= products[products.length - 1];
        id=last_product.id+1;
    }
    else{
        id=1;
    }

    const product=new productModel({
        id:id,
        name:req.body.name,
        image:image_filename,
        category:req.body.category,
        new_price:req.body.new_price,
        old_price:req.body.old_price,
    })
    try{
        await product.save();
        res.json({
            success:true,
            message:"Product Added",
        })
    }catch(error){
        console.log(error)
        res.json({success:false,
        message:"Error"+error.message,
    })
    }
}

//list all products
const listProduct=async(req,res)=>{
    try{
        const products= await productModel.find({});
        res.json({success:true,data:products});
    }catch(error){
        console.log(error);
        res.json({success:false,message:"error"})
    }
}

//remove products
const removeProduct=async(req,res)=>{
    try{
        const product = await productModel.findById(req.body.id);
        fs.unlink(`uploads/${product.image}`,()=>{})

        await productModel.findByIdAndDelete(req.body.id);
        res.json({
        success:true,
        message:"Product Removed"
    })
    }catch(error){
        console.log(error);
        res.json({success:false,message:"Error"})
    }
}

//creating endpoint for popular in women section
const popularInWomen=async (req,res)=>{
    try {
        let products=await productModel.find({category:"women"})
        let popular_in_women=products.slice(0,4);
        res.json({success:true,data:popular_in_women})
    } catch (error) {
        console.log(error);
        res.json({success:false,message:"Error"})
    }
}

//creating endpoint for newcollection data
const newCollection = async (req,res)=>{
    try {
        let products=await productModel.find({})
        let newcollection = products.slice(1).slice(-8);
        res.json({success:true,data:newcollection})
    } catch (error) {
        console.log(error);
        res.json({success:false,message:"Error"})
    }
}

export {addProduct ,listProduct,removeProduct,popularInWomen,newCollection}