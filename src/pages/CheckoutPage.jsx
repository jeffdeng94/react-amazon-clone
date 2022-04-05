import React from 'react'
import CheckoutProduct from '../components/CheckoutProduct'
import Subtotal from '../components/Subtotal'
import { useStateValue } from '../StateProvider'
import {CSSTransition, TransitionGroup} from 'react-transition-group'

export default function Checkout() {

  const [{basket,user},] = useStateValue()

  return (
    <div className='checkout'>
      <div className="checkout-left">
        <img className='checkout-ad' src="https://m.media-amazon.com/images/G/01/AmazonGo/Engagment/2021/NewLP2021/LPRound3August/Header_TakeIt_1500x300.jpg" alt="checkoutAD" />
      <div>
        <h3>Hello, {user? user.email :'Guest'}</h3>
        <h2 className='checkout-title'>
          <TransitionGroup>
            {basket.map((item)=>{
              return <CSSTransition timeout={500}
              classNames="item" key={item.id}><CheckoutProduct {...item}/></CSSTransition>
            }
            )}
          </TransitionGroup>
        </h2> 
      </div>
      </div> 
      <div className="checkout-right">
        <Subtotal/>
      </div>
    </div>
  )
}
