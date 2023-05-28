import React, { useState} from "react";
import GoogleCheckout from "../../components/cart/GooglePay/GoogleCheckout";
import PaypalCheckout from "../../components/cart/Paypal/PaypalPayment";
import StripeChechkout from "../../components/cart/Stripe/StripeChechkout";
import { useNavigate } from "react-router-dom";
import { fetchUspsorder } from '../../store/action/OrderShipActions';
import { useAppSelector, useAppDispatch } from '../../hooks/redux'
import { useEffect } from "react";
import { fetchFedexShip, fetchUspsShip } from "../../store/action/ShipAction";
import axios from "axios"
import './payment.scss'


const Pay = () => {

const ShipIds:any=localStorage.getItem('shipId')
const ShipId=JSON.parse(ShipIds)
const navigate = useNavigate()
const { uspsorder }:any = useAppSelector(state => state.uspsorder)
const { UspsShip, error1 }:any = useAppSelector(state => state.UspsShip)
const {loading, FedexShip, error}:any=useAppSelector((state:any)=>state.FedexShip)
const dispatch = useAppDispatch()
const [price, setPrice]=useState<any>()
const [pricetrue, setPricetrue]=useState(false)
const [uspsShip,setUspsShip]=useState<any>()
const [fedexShip,setFedexShip]=useState<any>()
const [errors,setError] = useState<any>()
const [loadings, setLoading]=useState<any>()
// const [payMethod,setPayMethod]= useState<any>()

const [Paymethod, setPaymethod] = useState<any>()
const [post, setPost]=useState(false)
const [Paying, setPaying] = useState(true)
const [Paysee, setPaysee] = useState(false)
const [payseetrue, setPayseetrue]=useState(true)

useEffect(()=>{
  setUspsShip(UspsShip)
  setFedexShip(FedexShip)
  setError(error)
  setLoading(loading)
  },[UspsShip,FedexShip])


useEffect(()=>{
dispatch(fetchUspsorder(ShipId));
name()
},[dispatch])

useEffect(()=>{
  setPrice(uspsorder)
  setPricetrue(true)
},[uspsorder])


async function name() {
  const response = await axios.get('http://localhost:3000/api/v1/users/paymentMethods');
 console.log(response.data);
 setPaymethod(response.data)
 
}

async function Ship(){

  // if(price[0]?.provider){
  //  await dispatch(fetchUspsShip(price))


  // }else{

  //  await dispatch(fetchFedexShip())

   

  // }
    

    setPayseetrue(false)
 
    setPaying(!Paying)

   
}


 async function doneTodo(id: number) {
    setLoading(true)
   await Ship()
    if(!error || !error1){
      setLoading(false)
      console.log(fedexShip);
      
      const newMethod = Paymethod.map((method: any) => {
        if (method.id === id) method.done = !method.done
        return method
      })
      for(let item of Paymethod){
        if(item.done===true){
          setPaysee(!Paysee)
        }}
      setPaymethod(newMethod)
    }else{
      setError('xndirner kan')
    }
}
   
     
      



  return (<div className="container">

  {Paying && payseetrue &&  price !== undefined &&
    <div className="modaling" >
      <h1>Choose a payment method</h1>
      {loadings && <div>loading....</div>}
       <div  className="total">{pricetrue && price !== undefined && price[0]?.provider ? <p>Ship price: {price[0]?.amount} {price[0]?.currency}</p>:""
      // pricetrue  && <p>Ship price: {price[0]?.ratedShipmentDetails[0]?.totalNetFedExCharge} {price[0]?.ratedShipmentDetails[0]?.currency}</p> 
   } </div>
        {
          Paymethod?.map((item:any)=>{
            if(item.status === true){
            return  <div className="modesta" onClick={() => {doneTodo(item.id)}} key={item.id}>
              <img src={item.icon} alt="PayIcon"/>
            <span className="spantitle">{item.title}</span>
            </div>
            }
          
})
        }
    </div>} 
   {error || error1 ? <div>{error}</div>:
    <main className='mainpay' >
      
      {Paysee && Paymethod[0]?.done &&
        <div>
             <PaypalCheckout   />
         
        </div>
      }
      {Paysee && Paymethod[1]?.done && 
        <div className='cart' id="payment-form">
            <StripeChechkout/>
    
      
        </div>}
      {Paysee && Paymethod[2]?.done && <div className='cart' id="payment-form">
      <GoogleCheckout price={price} />
      </div>
      }
    {
      Paysee &&   <button onClick={()=>navigate(0)}>Back to Choose payment method</button>
    }
    </main>}
  </div>
  )
}

export default Pay