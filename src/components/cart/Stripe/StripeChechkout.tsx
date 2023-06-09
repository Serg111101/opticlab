import React, {useState, useEffect} from 'react'
import { loadStripe } from '@stripe/stripe-js';
import Payment from "./Payment";
import Completion from "./Completion";
import { knopka } from "./checkoutForm";

const URL = process.env.REACT_APP_BASE_URL

const StripeChechkout = () => {

    const [stripePromise, setStripePromise] = useState<any>(null);
    const [mek, setMek]=useState<any>(false)

    useEffect(() => {
    fetch(URL + 'api/v1/stripe/config')
    .then(async (response) => {
      
      const { publishableKey }:any = await response.json();
      
      setStripePromise(loadStripe(publishableKey));
    })
    .catch((messages) => {console.log("messages");});
    
    setMek(knopka())
   
    }, []);

      
      
  return (
    <div>
        {mek ? <>
            {/* {price[0]?.provider && <p>Ship price: {price[0].amount} {price[0].currency}</p>} */}
          <Payment stripePromise={stripePromise} /></>
          :
          <Completion stripePromise={stripePromise}/>
        }
    </div>
  )
}

export default StripeChechkout