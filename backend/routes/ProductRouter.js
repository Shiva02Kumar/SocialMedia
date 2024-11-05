const express = require('express');
const productRouter = express.Router();


productRouter.get('/product', (req, res) => {
    try {
        res.status(200)
            .json([
                {
                    name: "mobile",
                    price: 10000
                },
                {
                    name: "TV",
                    price: 50000
                },
                {
                    name: "laptop",
                    price: 40000
                },
                {
                    user: req.user
                }
            ])
    } catch (err) {
        return res.status(401)
            .json({ message: 'Unautharized, JWT token Wrong or Expired' , error:err});
    }
})

module.exports = productRouter