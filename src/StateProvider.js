import React, { createContext, useContext, useReducer } from 'react'

//create context
export const myContext = createContext()

//wrap all components
export const StateProvider = ({ reducer, initialState, children }) => {
  return <myContext.Provider value={useReducer(reducer, initialState)}>{children}</myContext.Provider>
}

//pull data from context
export const useStateValue = () => useContext(myContext)
