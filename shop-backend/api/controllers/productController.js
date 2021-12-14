const Product = require("../models/productModel")

let getAllProduct = async (req, res) => {
    try {
        let products = await Product.find({});
        return res.status(200).json({
            msg: "success",
            data: products,
        });
    } catch (error) {
        return res.status(500).json({
            msg: error,
        });
    }
}


    let newProduct = async (req, res) => {
        let newProduct = new Product(req.body);
        await newProduct.save();
        return res.status(200).json({
            msg: "Success"
        })
    }

    let deleteProduct = async (req, res) => {
        await Product.findByIdAndDelete(req.params.id);
        return res.status(200).json({
            msg: success
        })
    }


module.exports = {
    getAllProduct,newProduct,deleteProduct
};



