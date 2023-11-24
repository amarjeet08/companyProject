import React from 'react'
import './Subscription.css'

const Subscription = () => {

    const handlePayment = async (amount) => {
        const orderTotal = amount * 100;

        console.log('Button clicked');
        console.log('Order Total:', orderTotal);

        try {
            const response = await fetch('http://localhost:3002/create-order', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ amount: orderTotal })
            });

            console.log('Response status:', response.status); // Log the HTTP response status

            if (response.ok) {
                console.log('Order placed successfully');

                // Parse the JSON response to get the Razorpay order details
                const order = await response.json();

                // Create a Razorpay instance and open the payment form
                const options = {
                    key: 'rzp_test_9selXw6bGldk59',
                    amount: order.amount,
                    currency: order.currency,
                    name: 'Terbesar Healthcare Pvt. Ltd.',
                    description: 'We Provide the best HealthCare Facility in your city.',
                    image: 'https://static.vecteezy.com/system/resources/previews/002/896/807/non_2x/female-doctor-using-her-digital-tablet-free-vector.jpg',
                    order_id: order.id,
                    handler: function (response) {
                        // Handle successful payment here
                        console.log('Payment successful:', response);
                    },
                    prefill: {
                        name: 'CUSTOMER_NAME',
                        email: 'CUSTOMER_EMAIL',
                        contact: 'CUSTOMER_CONTACT'
                    },
                    notes: {
                        address: 'CUSTOMER_ADDRESS'
                    },
                    theme: {
                        color: '#F37254'
                    }
                };

                const rzp = new window.Razorpay(options);
                rzp.open();
            } else {
                console.error('Order placement failed');
            }
        } catch (error) {
            console.error('Error placing order:', error);
        }
    };




    return (
        <>
            <div className='box'>

                <div className='box-section-1' >
                    <div className='box-part1'>DOC Search Plans</div>
                    <div className='box-part2'>Become a DOC search members and
                        Reduce your medical Expenses</div>
                    <div className='box-part3'>Save the things that makes you happy</div>
                    <div className='box-part4'>Explore Now</div>
                </div>

                <div className='box-section-2' >
                    <img className='box-image' src={process.env.PUBLIC_URL + '/assets/family.png'} alt='unable to show' />

                </div>

            </div>
            <div className='plan-box'>

                <div className='plan-box-1'>
                    <h3 style={{ color: 'white', marginLeft: '50px' }}> Bronze Plan (Yearly) </h3>
                    <ol style={{ color: 'white', fontWeight: 600, marginLeft: '25px', padding: '25px' }}>

                        <li>Experience continuous care with unlimited consultations </li>
                        <li>No shipping charges on order above Rs 149 </li>
                        <li>24/7 access to doctors across all specialities </li>
                        <li>Video consultations for clinic-like experience </li>
                        <li>Same day delivery on the available medicine (Within 1 Hour) </li>

                    </ol>

                    <button className='price-container' >₹999/Year</button>
                    <h6 style={{ color: 'white', marginLeft: '55px', fontSize: '12px' }}>Billed every 1 year*</h6>
                    <button className='price-btn' onClick={() => handlePayment(999)}>Continue with Bronze</button>
                </div>

                <div className='plan-box-2'>
                    <h3 style={{ color: 'white', marginLeft: '50px' }}> Silver Plan (Yearly) </h3>
                    <ol style={{ color: 'white', fontWeight: 600, marginLeft: '25px', padding: '25px' }}>

                        <li>  Experience continuous care with unlimited consultations </li>
                        <li>No shipping charges on order above Rs 149 </li>
                        <li>24/7 access to doctors across all specialities </li>
                        <li>Video consultations for clinic-like experience </li>
                        <li>Same day delivery on the available medicine (Within 1 Hour) </li>

                    </ol>

                    <button className='price-container' >₹1999/Year</button>
                    <h6 style={{ color: 'white', marginLeft: '55px', fontSize: '12px' }}>Billed every 1 year*</h6>
                    <button className='price-btn' onClick={() => handlePayment(1999)}>Continue with Silver</button>
                </div>

                <div className='plan-box-3'>
                    <h3 style={{ color: 'white', marginLeft: '50px' }}> Gold Plan (Yearly) </h3>
                    <ol style={{ color: 'white', fontWeight: 600, marginLeft: '25px', padding: '25px' }}>

                        <li>Experience continuous care with unlimited consultations </li>
                        <li>No shipping charges on order above Rs 149 </li>
                        <li>24/7 access to doctors across all specialities </li>
                        <li>Video consultations for clinic-like experience </li>
                        <li>Same day delivery on the available medicine (Within 1 Hour) </li>

                    </ol>

                    <button className='price-container' >₹2999/Year</button>
                    <h6 style={{ color: 'white', marginLeft: '55px', fontSize: '12px' }}>Billed every 1 year*</h6>
                    <button className='price-btn' onClick={() => handlePayment(2999)}>Continue with Gold</button>
                </div>

                <div className='plan-box-4'>
                    <h3 style={{ color: 'white', marginLeft: '50px' }}> Platinum Plan (Yearly) </h3>
                    <ol style={{ color: 'white', fontWeight: 600, marginLeft: '25px', padding: '25px' }}>

                        <li>Experience continuous care with unlimited consultations </li>
                        <li>No shipping charges on order above Rs 149 </li>
                        <li>24/7 access to doctors across all specialities </li>
                        <li>Video consultations for clinic-like experience </li>
                        <li>Same day delivery on the available medicine (Within 1 Hour) </li>

                    </ol>

                    <button className='price-container' >₹3999/Year</button>
                    <h6 style={{ color: 'white', marginLeft: '55px', fontSize: '12px' }}>Billed every 1 year*</h6>
                    <button className='price-btn' onClick={() => handlePayment(3999)}>Continue with Platinum</button>
                </div>

            </div>
        </>
    )
}

export default Subscription;