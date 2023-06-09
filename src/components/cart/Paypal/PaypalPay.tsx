
import { useState } from "react";
import axios from "axios";
import {  PayPalScriptProvider,  PayPalButtons,} from "@paypal/react-paypal-js";
import { SuccesOrder } from "../../success/SuccesOrder";

const URL = process.env.REACT_APP_BASE_URL



export const PaypalPay = (props:any) => {
  const order:any = localStorage.getItem("fedexShip")
  const amount:any=localStorage.getItem("price1")
  const orders = JSON.parse(order)
  const [okey,setOkay] =useState(false)
//   useEffect(() => {
//     if (success) {
//     }
// },[success, orderID]);
    const createOrder = (data:any, actions:any) => {
        return actions.order.create({
            purchase_units: [
               { "reference_id": "d9f80740-38f0-11e8-b467-0ed5f89f718b", "amount": { "currency_code": "USD", "value": amount } , "payment_source": { "paypal": { "experience_context": { "payment_method_preference": "IMMEDIATE_PAYMENT_REQUIRED", "payment_method_selected": "PAYPAL", "brand_name": "EXAMPLE INC", "locale": "en-US", "landing_page": "LOGIN", "shipping_preference": "SET_PROVIDED_ADDRESS", "user_action": "PAY_NOW", "return_url": "https://example.com/returnUrl", "cancel_url": "https://example.com/cancelUrl" } } } }
            ],
        }).then((order:any) => {
                return order;
            });
    };


    const onApprove = (data:any, actions:any) => {
        return actions.order.capture().then((details:any)=> {setOkay(details); if(details) paypaldata(details)}
        )
    };
     const paypaldata = (details:any) => {
           axios({
            method: 'post',
            url: URL + 'api/v1/paypal/orders',
            data: details
      })
    }
  

    
  // const SubmitPayment = () => {
  //   // Here declare the variable containing the hostedField instance
  //   const { cardFields }:any = usePayPalHostedFields();
  //   const cardHolderName = useRef<any>(null);

  //   const submitHandler = () => {
  //     if (typeof cardFields.submit !== "function") return; // validate that `submit()` exists before using it
  //     if (errorMsg) showErrorMsg(false);
  //     showLoader(true);
  //     showSuccess(false);
  //     cardFields.submit({
  //       // The full name as shown in the card and billing addresss
  //       // These fields are optional for Sandbox but mandatory for production integration
  //       cardholderName: cardHolderName?.current?.value
  //     })
  //     .then((order:any) => {
  //       const { orderId } = order;

  //       fetch(`/api/orders/${orderId}/capture`, {method: "post"})
  //       .then((response) => response.json())
  //       .then((data) => {
  //         showLoader(false);
  //         showSuccess(true);
  //         setTransactionData(data);
  //         alert("Transaction Complete. Transaction ID - "+data.id)
  //         // Inside the data you can find all the information related to the payment
  //       })
  //       .catch((err) => {
  //         // Handle capture order error
  //         showLoader(false);
  //         showErrorMsg(true);
  //         setErrorMsg(err);
  //       });
  //     })
  //     .catch((err:any) => {
  //       // Handle validate card fields error
  //       showLoader(false);
  //       showErrorMsg(true);
  //       setErrorMsg(err);
  //     });
  //   };


 


  //   // return (
  //   //   <button
  //   //     onClick={submitHandler}
  //   //     className="btn btn-primary"
  //   //     style={{width:"320px", height:"50px", background:"#009c74", color:"white"}}
  //   //   >
  //   //     Payhhhhhhhhhhhhhhhhhhhhhhhhhhhhh
  //   //   </button>
  //   // );
  // };
  return (<div className="paypay">
  
   {okey ? 
      <SuccesOrder/>

    : <PayPalScriptProvider
    options={{
      "client-id": props.clientID,
      "data-client-token": props.clientToken,
      components: "hosted-fields,buttons,funding-eligibility",
      // "enable-funding":"paypal",
      "enable-funding":"card",
      "currency": "USD",
      "buyer-country": "US",
      intent: "capture",
    }}
    >
      <div className="row"  style={{marginTop:"20px", alignItems:"center", marginBottom:"20px"}}>
        <PayPalButtons 
        createOrder={createOrder}
        onApprove={onApprove}
        style={{
          layout: "vertical", 
          shape: "rect",

        }} />
      </div>
      
      {/*
      <PayPalHostedFieldsProvider
        createOrder={() => {
          // Here define the call to create and order
          return fetch("/api/orders", {method: "post"})
            .then((response) => response.json())
            .then((order) => order.id)
            .catch((err) => {
              // Handle order creation error
              showLoader(false);
              showErrorMsg(true);
              setErrorMsg(err);
            });
        }}
      >
      
        <div id="paypal-button-container">
        </div>
        <section className='container'>
          <div className='card_container'>
            <PayPalHostedField
              id="card-number"
              className='card_field'
              hostedFieldType="number"
              options={{
                selector: "#card-number",
                placeholder: "Card Number"
              }}
            />

            <section style={{ display: "flex" }}>
              <div style={{ flexDirection: "column" }}>
                <PayPalHostedField
                  id="expiration-date"
                  hostedFieldType="expirationDate"
                  className='card_field'
                  options={{
                    selector: "#expiration-date",
                    placeholder: "Expiration Date"
                  }}
                />
              </div>
              <div >
                <PayPalHostedField
                  id="cvv"
                  hostedFieldType="cvv"
                  options={{
                    selector: "#cvv",
                    placeholder: "CVV"
                  }}
                  className='card_field'
                />
              </div>
            </section>
              
            <input
              id="card-holder"
              className='card_field'
              type="text"
              placeholder="Name on Card"
            />

            <input
              id="card-billing-address-country"
              className='card_field'
              type="text"
              placeholder="Country Code"
            />
            
            {loader && <TailSpin height="50" width="50" color="#0d6efd" />}
            {!loader && <SubmitPayment />}
          </div>
        </section>
      </PayPalHostedFieldsProvider> */}
    </PayPalScriptProvider>}
  
  </div>
 
    
  );
};