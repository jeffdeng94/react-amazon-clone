import React,{useState, useEffect, useRef} from 'react'
import {Link,useNavigate} from 'react-router-dom'
import CurrencyFormat from 'react-currency-format'
import {CardElement, useStripe, useElements} from '@stripe/react-stripe-js'
import axios from '../axios'
import {useStateValue} from '../StateProvider'
import {getBasketAmount,getBasketTotal} from '../reducer'
//import components
import CheckoutProduct from '../components/CheckoutProduct'
import {db} from '../firebase'
import { doc, setDoc } from "firebase/firestore"; 

export default function PaymentPage() {

  const [{basket,user},dispatch] = useStateValue()

  const navigate = useNavigate()

  const stripe = useStripe()
  const elements = useElements()

  const [processing,setProcessing] = useState(false)
  const [succeeded,setSucceeded] = useState(false)
  const [error,setError] = useState(null)
  const [disabled,setDisabled] = useState(true)
  const [clientSecret,setClientSecret] = useState(null)
  const [delivery,setDelivery]=useState({name:'',
                                         street:'',
                                         city:''   
                                            })

  const nameRef = useRef()
  const streetRef = useRef()
  const cityRef = useRef()

  useEffect(()=>{
    //generate special stripe secret whenever basket changes
    //allow us to charge a customer
    const getCilentSecret = async()=>{
      //bug fixed---dont create client secret if the basket is empty
      if(basket.length!==0){
        const response = await axios({
        method:'POST',
        //stripe expects in a currencies subunits
        //e.g. $1 should be 100 cents
        url:`/payments/create?total=${(getBasketTotal(basket)*100).toFixed(0)}`
      })
      setClientSecret(response.data.clientSecret)
    }else{
      setClientSecret(null)
    }
      }  
    getCilentSecret()
  },[basket])

  console.log('THE SECRET IS >>>', clientSecret);

  const handleSubmit = e => {
    e.preventDefault()
    setProcessing(true)

      stripe.confirmCardPayment(clientSecret,{
        payment_method:{
          card: elements.getElement(CardElement)
        }
      }).then(({paymentIntent})=>{
        //add orders to database
        const addToDatabase = async ()=>{
          //db->users->orders
          await setDoc(doc(db,'users',user?.uid,'orders',paymentIntent.id),{
            basket,
            amount:paymentIntent.amount,
            created:paymentIntent.created,
            delivery,
          })
        }
        addToDatabase()

          setSucceeded(true)
          setError(null)
          setProcessing(false)

          dispatch({
            type:'EMPTY'
          })

          navigate('/orders',{replace:true})
      })

      }
    // .then(({paymentIntent})=>{
      // paymentIntent = payment confirmation
      // const addToDatabase = async ()=>{
      //   await addDoc(collection(db,'users',user?.id,'orders',paymentIntent.id),{
      //     basket,
      //     amount:paymentIntent.amount,
      //     created:paymentIntent.created
      //   })
      // }
      // addToDatabase()


    // })

  const handleChange = e => {
    //listen for changes in CardElement
    //display any errors
    setDisabled(e.empty)
    setError(e.error ? e.error.message : '')
  }

  const handleNameChange = ()=>{
    setDelivery({...delivery,name:nameRef.current.value})
  }

  const handleStreetChange = ()=>{
    setDelivery({...delivery,street:streetRef.current.value})
  }

  const handleCityChange = ()=>{
    setDelivery({...delivery,city:cityRef.current.value})
  }

  return (
  
    <div className='payment'>
      <div className="payment-container">
        <h1>
          Checkout (<Link to='/checkout'>{getBasketAmount(basket)} items</Link>)
        </h1>
        {/* delivery */}
        <div className="payment-section">
          <div className="payment-title">
            <h3>Delivery Address</h3>
          </div>
          <div className="payment-delivery">
            <div>
              <label htmlFor="name">Name:</label>
              <input onChange={handleNameChange} ref={nameRef} id='name' placeholder='Name'/>
            </div>
             <div>
               <label htmlFor="name">Street:</label>
               <input onChange={handleStreetChange} ref={streetRef}  id='street' placeholder='Street'/>
            </div>
             <div> 
               <label htmlFor="name">City:</label>
               <input onChange={handleCityChange} ref={cityRef}  id='city' placeholder='City'/>
            </div>
            
          </div>
        </div>
        {/* review items */}
        <div className="payment-section">
          <div className="payment-title">
            <h3>Review items and delivery</h3>
          </div>
          <div className="payment-items">
            {basket.map(item=><CheckoutProduct
                                key={item.id}
                                id={item.id}
                                title={item.title}
                                image={item.image}
                                price={item.price}
                                rating={item.rating}
                                amount={item.amount}
                              />)}
          </div>
        </div>
        {/* payment method */}
        <div className="payment-section">
          <div className="payment-title">
            <h3>Payment Method</h3>
          </div>
          <div className="payment-details">
            {/* stripe */}
            <form onSubmit={handleSubmit} >
              <CardElement onChange={handleChange}/>
              <div className="payment-priceContainer">
              <CurrencyFormat
              renderText={(value) => (
                <h3>
                    Order Total: {value}
                </h3>
              )}
              decimalScale={2}
              value={getBasketTotal(basket)} 
              displayType={"text"}
              thousandSeparator={true}
              prefix={"$"}
           />
           <button className='btn btn-full' disabled={processing || disabled || succeeded || clientSecret === null}>
             <span>{processing? <p>Processing</p> : 'Buy Now'}</span>
           </button>
              </div>
              {/* error */}
              {error && <div>{error}</div>}
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}
