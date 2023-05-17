import { CLIENT_ID } from '../../../Config/Config'
import React, { useState, useEffect } from "react" ;
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";
import { useNavigate } from 'react-router-dom';
import '../cart.scss'


const PaypalCheckout = ({price}:any) => {
    const [success, setSuccess] = useState(false);
    const [orderID, setOrderID] = useState(false);
    const nav = useNavigate()

    const createOrder = (data:any, actions:any) => {
        return actions.order.create({
            purchase_units: [
                {
                    description: "ok",
                    amount: {
                        currency_code: "USD",
                        value: 25,
                    },
                },
            ],
        }).then((orderID:any) => {
                setOrderID(orderID);
                return orderID;
            });
    };

    const onApprove = (data:any, actions:any) => {
        return actions.order.capture().then(function (details:any) {
            // const { payer } = details;
            setSuccess(true);
        });
    };


    useEffect(() => {
        if (success) {
            nav("/Completion")
        }
    },[success, orderID, nav]);

    return (
        <PayPalScriptProvider options={{ "client-id": CLIENT_ID }}>
            <div className='formpay' id="payment-form" >
                <div className="wrapper">
                    <div className="product-img">
                      
                    </div>
                    <div className="product-info">
                        <div className="product-text">
                            <h1>Payment in PayPal</h1>
                        </div>
                        <div className="product-price-btn">
                            <p>Order price: 25 USD</p>
                            <br></br>
                            {price[0]?.provider && <p>Ship price: {price[0].amount} {price[0].currency}</p>}
                            
                        </div>
                    </div>
                </div>
                <br></br>
                    <PayPalButtons
                        style={{ layout: "vertical" }}
                        createOrder={createOrder}
                        onApprove={onApprove}
                        
                    />
            </div>
        </PayPalScriptProvider>
    );
}


export default PaypalCheckout