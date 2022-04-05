import React from 'react'
import ReactDOM from 'react-dom'
import { StateProvider } from './StateProvider'
import { initialState, myReducer } from './reducer'
import App from './App'
import reportWebVitals from './reportWebVitals'

ReactDOM.render(
  <StateProvider initialState={initialState} reducer={myReducer}>
    <App />
  </StateProvider>,
  document.getElementById('root'),
)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals()
