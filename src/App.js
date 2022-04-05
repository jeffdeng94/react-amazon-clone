import React, { useEffect } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { useStateValue } from './StateProvider'
import { loadStripe } from '@stripe/stripe-js'
import { Elements } from '@stripe/react-stripe-js'
import HomePage from './pages/HomePage'
import CheckoutPage from './pages/CheckoutPage'
import PaymentPage from './pages/PaymentPage'
import OrdersPage from './pages/OrdersPage'
import Login from './pages/Login'
import Header from './components/Header'
import { auth } from './firebase'
import { onAuthStateChanged } from 'firebase/auth'
import './css/main.css'

const stripePromise = loadStripe(
  'pk_test_51KjiMTDF2LniEX2mt9pCtcvYgr2JHYt9LZdTeS9iGGvDZgrQhsxBnFzaUbyBnMEvq3TNmqpNRpqMjKGJaId3qHvA00QhOCeUkY',
)

function App() {
  const [, dispatch] = useStateValue()
  useEffect(() => {
    onAuthStateChanged(auth, user => {
      if (user) {
        dispatch({
          type: 'SET_USER',
          user,
        })
      } else {
        dispatch({
          type: 'SET_USER',
          user: null,
        })
        //signed out
      }
    })
  }, [dispatch])

  return (
    <div className="app">
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/checkout" element={<CheckoutPage />} />
          <Route path="/login" element={<Login />} />
          <Route
            path="/payment"
            element={
              <Elements stripe={stripePromise}>
                <PaymentPage />
              </Elements>
            }
          />
          <Route path="/orders" element={<OrdersPage />}></Route>
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App
