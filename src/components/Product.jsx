import React from 'react'
import { useStateValue } from '../StateProvider'

export default function Product({ id, title, price, image, rating }) {
  const [, dispatch] = useStateValue()
  const addToBasket = () => {
    dispatch({
      type: 'ADD',
      item: {
        id,
        title,
        price,
        image,
        rating,
        amount: 1,
      },
    })
  }

  return (
    <div className='product'>
      <div className='product-info'>
        <p>{title}</p>
        <p className='product-price'>
          <small>$</small>
          <strong>{price}</strong>
        </p>
        <div className='product-rating'>
          {Array(rating)
            .fill()
            .map((_, i) => (
              <p key={i + Date.now()}>⭐</p>
            ))}
        </div>
      </div>
      <img src={image} alt={title} />
      <button onClick={addToBasket} className='btn'>
        Add to Basket
      </button>
    </div>
  )
}
