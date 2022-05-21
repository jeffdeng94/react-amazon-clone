import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { createUser, signInUser } from '../firebase'

export default function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const navigate = useNavigate()

  const signIn = e => {
    e.preventDefault()
    signInUser(email, password)
      .then(auth => {
        if (auth) {
          navigate('/')
        }
      })
      .catch(error => alert(error.message))
  }

  const register = e => {
    e.preventDefault()
    createUser(email, password)
      .then(auth => {
        if (auth) {
          navigate('/')
        }
      })
      .catch(error => alert(error.message))
  }

  return (
    <div className='login'>
      <Link to='/'>
        <img
          className='login-logo'
          src='https://upload.wikimedia.org/wikipedia/commons/thumb/a/a9/Amazon_logo.svg/1024px-Amazon_logo.svg.png'
          alt='amazon'
        />
      </Link>
      <div className='login-container'>
        <h1>Sign-in</h1>
        <form>
          <h5>E-mail</h5>
          <input
            type='text'
            placeholder='email'
            onChange={e => setEmail(e.target.value)}
          />
          <h5>Password</h5>
          <input
            type='password'
            placeholder='password'
            onChange={e => setPassword(e.target.value)}
          />
          <button className='btn btn-full' type='submit' onClick={signIn}>
            Sign In
          </button>
        </form>
        <p>
          By signing-in you agree to the AMAZON FAKE CLONE Conditions of Use &
          Sale. Please see our Privacy Notice, our Cookies Notice and our
          Interest-Based Ads Notice.
        </p>
        <button className='btn btn-full btn-register' onClick={register}>
          Create your Amazon account
        </button>
      </div>
    </div>
  )
}
