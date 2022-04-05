import React,{useState,useEffect} from 'react'
import {query,orderBy,onSnapshot, collection} from 'firebase/firestore'
import Order from '../components/Order'
import { useStateValue } from '../StateProvider'
import { db } from '../firebase'
export default function OrdersPage() {

  const [{user},] = useStateValue()
  const [orders,setOrders] = useState([])

  useEffect(()=>{
    
    if(user){
          onSnapshot(query(collection(db,'users',user?.uid,'orders'),orderBy('created','desc')),snapshot=>{
            setOrders(snapshot.docs.map(doc=>({
              id:doc.id,
              data:doc.data()
            })))

          })
    }else{
      setOrders([])
    }
 
  },[user])
   



  return (
    <div className='orders'>
      <h1>Your Orders</h1>
      <div className="orders-order">
        {orders?.map(order=><Order key={order.id} order={order}/>)}
      </div>
    </div>
  )
}
