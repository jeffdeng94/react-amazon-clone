import React from 'react'
import moment from 'moment'
import CurrencyFormat from 'react-currency-format'
import CheckoutProduct from './CheckoutProduct'
export default function Order({order}) {
  const {name,street,city} = order.data.delivery
  return (
    <div className='order'>
      <h2>Order</h2>
      <p>{moment.unix(order.data.created).format('MMMMM Do YYYY, h:mma')}</p>
      <br />
      <h4>Deliver To</h4>
      <p>{name?name:''}</p>
      <p>{street?street:''}</p>
      <p>{city?city:''}</p>
      <p className='order-id'>
        <small>{order.id}</small>
      </p>
      {order.data.basket?.map(item=>(<CheckoutProduct 
                                        key={item.id}
                                        id={item.id}
                                        title={item.title}
                                        image={item.image}
                                        price={item.price}
                                        rating={item.rating}
                                        amount={item.amount}
                                        hideButton
                                      />))}
          <CurrencyFormat 
              renderText={(value) => (
                <h3 className='order-total'>
                    Order Total: {value}
                </h3>
              )}
              decimalScale={2}
              value={order.data.amount / 100} 
              displayType={"text"}
              thousandSeparator={true}
              prefix={"$"}
           />
    </div>
  )
}
