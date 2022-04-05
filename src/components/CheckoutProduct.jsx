import React, { Fragment } from 'react'
import { useStateValue } from '../StateProvider'
export default function CheckoutProduct ({id, image, title, rating, price, amount, hideButton}) {
  const [,dispatch] = useStateValue()
  const removeFromBasket=()=>{
      dispatch({
        type:'REMOVE',
        id
      })
  }

  const addOne = ()=>{
    dispatch({
      type:'ADD',
      item:{
        id,
        title,
        price,
        image,
        rating,
        amount:1
    }
    })

  }

  const minusOne = ()=>{
    dispatch({
      type:'MINUS',
      id
    })
  }

  const buttonEl = <Fragment>
                    <div>        
                      <span className='addRemoveIcon' onClick={addOne}>+</span>
                      <span className='checkoutProduct-amount'>{amount}</span>
                      <span className='addRemoveIcon' onClick={minusOne}>-</span>
                    </div>
                    <button className="btn" onClick={removeFromBasket}>Remove from Basket</button>
                  </Fragment>

  return (
    <div className='checkoutProduct'>
      <div className="checkoutProduct-info">
      <img className='checkoutProduct-image' src={image} alt={title} />
        <div>
        <p className='checkoutProduct-title'>{title}</p>
        <p className='checkoutProduct-price'>        
          <small>$</small>
          <strong>{price}</strong>
        </p>
        <div className="checkoutProduct-rating">
        {
            Array(rating).fill().map((_,i)=><p key={i+Date.now()}>⭐</p>)
          }
        </div>
      </div>
      </div>
      <div className="checkoutProduct-adjust">
          {!hideButton &&  buttonEl}
          {hideButton && <div>x<span className='checkoutProduct-amount'> {amount}</span></div> }
      </div>
    </div>
  )
}
