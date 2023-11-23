import React from 'react'
import './Subscription.css'

const Subscription = () => {
    const razorpay = new window.Razorpay({
        key: 'rzp_test_9selXw6bGldk59',
        amount: 99900,
        currency: 'INR',
        name: 'TARBESAR HEALTHCARE PVT. LTD.',
        description: 'Bronze Plan (Yearly)',
        image: 'https://static.vecteezy.com/system/resources/previews/002/896/807/non_2x/female-doctor-using-her-digital-tablet-free-vector.jpg',
        handler: function (response) {
            // Handle successful payment here
            console.log('Payment successful:', response);
        },
        prefill: {
            name: 'CUSTOMER_NAME',
            email: 'CUSTOMER_EMAIL',
            contact: 'CUSTOMER_CONTACT',
        },
        theme: {
            color: '#F37254',
        },
    });

    const handlePayment = async (amount) => {
        try {
            // Fetch the order details from your server
            const response = await fetch('http://localhost:3001/create-order', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ amount }), // Adjust the amount as needed
            });

            if (!response.ok) {
                console.error('Error creating order');
                return;
            }

            // Parse the JSON response to get the Razorpay order details
            const order = await response.json();
            console.log(order)

            // Open Razorpay payment form with the order details
            razorpay.open({
                key: order.key,
                amount: order.amount,
                currency: order.currency,
                name: order.merchant_name,
                description: order.description,
                image: order.logo,
                order_id: order.id,
                handler: function (response) {
                    // Handle successful payment here
                    console.log('Payment successful:', response);
                },
                prefill: {
                    name: order.customer_name,
                    email: order.customer_email,
                    contact: order.customer_contact,
                },
                theme: {
                    color: '#F37254',
                },
            });
        } catch (error) {
            console.error('Error initiating payment:', error);
        }
    };

    const handleClick = (amount) => {
        return () => {
            handlePayment(amount)
        }
    }


    return (
        <>
            <div className='box'>

                <div className='box-section-1'>
                    <div className='box-part1'>DOC Search Plans</div>
                    <div className='box-part2'>Become a DOC search members and
                        Reduce your medical Expenses</div>
                    <div className='box-part3'>Save the things that makes you happy</div>
                    <button className='box-part4'>Explore Now</button>
                </div>

                <div className='box-section-2'>
                    <img className='box-image' src={process.env.PUBLIC_URL + '/assets/family.png'} alt='unable to show' />

                </div>

            </div>

            <div className='plan-box'>
                <h3> Bronze Plan (Yearly) </h3>
                <ol>

                    <li>  Experience continuous care with unlimited consultations </li>
                    <li>No shipping charges on order above Rs 149 </li>
                    <li>24/7 access to doctors across all specialities </li>
                    <li>Video consultations for clinic-like experience </li>
                    <li>ame day delivery on the available medicine (Within 1 Hour) </li>

                </ol>

                <button className='price-container' >₹999/Year</button>
                <h6>Billed every 1 year*</h6>
                <button className='price-btn' onClick={handleClick(999)}>Continue with Bronze</button>
            </div>

            <div className='plan-box'>
                <h3> Silver Plan (Yearly) </h3>
                <ol>

                    <li>  Experience continuous care with unlimited consultations </li>
                    <li>No shipping charges on order above Rs 149 </li>
                    <li>24/7 access to doctors across all specialities </li>
                    <li>Video consultations for clinic-like experience </li>
                    <li>ame day delivery on the available medicine (Within 1 Hour) </li>

                </ol>

                <button className='price-container' >₹1599/Year</button>
                <h6>Billed every 1 year*</h6>
                <button className='price-btn' onClick={handleClick(1599)}>Continue with Bronze</button>
            </div>
        </>
    )
}

export default Subscription;