const express = require('express')
const cors = require('cors')
const app = express()
const Razorpay = require('razorpay')

app.use(express.json());
app.use(cors());


const razorpay = new Razorpay({
    key_id: 'rzp_test_9selXw6bGldk59',
    key_secret: '6WHOQ7qarNiWiqBDhDEVKbBw'

})

app.post('/create-order', async (req, res) => {
    const options = {
        amount: req.body.amount,
        currency: 'INR',
        receipt: 'YOUR_RECEIPT_ID'
    };

    try {
        const order = await razorpay.orders.create(options);
        res.json(order);
    } catch (err) {
        res.status(500).json({ message: 'Error creating order' })
    }

})

app.listen(3002, () => console.log('App listening on port 3002'))