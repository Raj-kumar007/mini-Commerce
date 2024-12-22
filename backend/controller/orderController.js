const orderModel = require('../model/orderModel');
const productModel = require('../model/productModel');


exports.createOrder = async (req, res, next) => {

    const cartItem = req.body;


    const amount = Number(cartItem.reduce((acc, item) => (acc + item.products.price * item.qty), 0));
    const status = "pending";



    const order = await orderModel.create({ cartItem, amount, status });

    cartItem.forEach(async (item) => {

        const product = await productModel.findById(item.products._id);
        product.stock = product.stock - item.qty
       await product.save();
    });


    res.json({
        success: true,
        order
    })
}