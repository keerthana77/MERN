import Product from '../models/product.model.js';


export const getProducts = async(req, res) => {
    try {
        const products = await Product.find({});
        res.status(200).json({success: true, data: products});
    } catch (error) {
        console.log("Error in get all products:", error);
        res.status(500).json({success: false, message: 'Server error'});
    }
};

export const createProduct = async(req, res) => {
    const product = req.body;

    if(!product.name || !product.price || !product.image) {
        return res.status(400).json({success: false, message: 'Please provide all required fields'});
    }

    const newProduct = new Product(product);
    try {
        await newProduct.save();
        res.status(201).json({success: true, data: newProduct});
    } catch (error) {
        console.log("Error in create product:", error);
        res.status(500).json({success: false, message: 'Server error'});
    }
};

export const updateProduct = async(req, res) => {
    const productId = req.params.id;
    const updates = req.body;

    if(!updates.name || !updates.price || !updates.image) {
        return res.status(400).json({success: false, message: 'Please provide all required fields'});
    }

    try {
        const product = await Product.findByIdAndUpdate(productId, updates, {new: true, runValidators: true});
        if(!product) {
            return res.status(404).json({success: false, message: 'Product not found'});
        }
        res.status(200).json({success: true, data: product});
    } catch (error) {
        console.log("Error in update product:", error);
        res.status(500).json({success: false, message: 'Server error'});
    }
}

export const deleteProduct = async(req, res) => {
    const productId = req.params.id;
    try {
        const product = await Product.findByIdAndDelete(productId);
        if(!product) {
            return res.status(404).json({success: false, message: 'Product not found'});
        }
        res.status(200).json({success: true, data: product});
    } catch (error) {
        console.log("Error in get product by id:", error);
        res.status(500).json({success: false, message: 'Server error'});
    }
};
