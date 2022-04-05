import React, {useState,useEffect} from 'react'
import { Link } from 'react-router-dom'
import {getBasketAmount} from '../reducer'
import SearchIcon from '@material-ui/icons/Search'
import ShoppingBasketIcon from '@material-ui/icons/ShoppingBasket'
import { useStateValue } from '../StateProvider'
import { auth } from '../firebase'
import { signOut } from 'firebase/auth'

export default function Header() {
  
  const [{basket,user}, ] = useStateValue()

  const handleAuth = ()=>{
    signOut(auth)
  }

  const [hasBumpEffect, setHasBumpEffect] = useState(false)
  //create bump effect for the cart icon everytime the cart list changes
useEffect(()=>{
    if(basket.length === 0) {
      return
    }else{
      setHasBumpEffect(true)
      const timer = setTimeout(() => {
        setHasBumpEffect(false)
      }, 300);
      //clear timeout once effect is applied
      return ()=> {clearTimeout(timer)}
    }
  }, [basket])

  return (
    <div className='header'>
      <Link to='/'>
        <img  src="https://pngimg.com/uploads/amazon/amazon_PNG11.png" alt="amazon" className="header-logo" />
      </Link>
      <div className="header-search">
        <input type="text" className="header-search-input" />
        <SearchIcon className='header-search-icon'/>
      </div>
      <div className="header-nav" >
        <Link to={!user && '/login'}>
          <div onClick={handleAuth} className="header-nav-option">      
              <span className="header-nav-option-lineOne">
                Hello, {user? user.email:'Guest'} 
              </span>
                <span className="header-nav-option-lineTwo">
                  {user?'Sign Out':'Sign In'}
                </span>
            </div> 
           </Link>
           <Link to='/orders'>
              <div className="header-nav-option">
                <span className="header-nav-option-lineOne">
                    Returns
                  </span>
                  <span className="header-nav-option-lineTwo">
                    & Orders
                  </span>
               </div>
           </Link>
        <div className="header-nav-option">
        <span className="header-nav-option-lineOne">
            Your
          </span>
          <span className="header-nav-option-lineTwo">
            Prime
          </span>
        </div>
      <Link to='/checkout'>
        <div className="header-nav-basket">
          <ShoppingBasketIcon className={hasBumpEffect?'bump':''}/>
          <span className="header-option-lineTwo header-nav-basket-count">{getBasketAmount(basket)}</span>
        </div>
      </Link>
      </div>
    </div>
  )
}
