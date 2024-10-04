import express from "express"
import multer from "multer";
import { addProduct, listProduct, newCollection, popularInWomen, removeProduct } from "../controllers/productControllers.js";


const productRouter=express.Router();

//image storage engine

const storage = multer.diskStorage({
    destination:"uploads",
    filename:(req,file,cb)=>{
        return cb(null,`${Date.now()}${file.originalname}`)
    }
})

const upload = multer({storage:storage})

productRouter.post("/add",upload.single("image"),addProduct)
productRouter.get("/list",listProduct)
productRouter.post("/remove",removeProduct)
productRouter.get("/popular",popularInWomen)
productRouter.get("/new",newCollection)


export default productRouter;