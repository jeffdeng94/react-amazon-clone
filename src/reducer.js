export const initialState = {
  basket: [],
  user: null,
}

//Selector
export const getBasketTotal = basket =>
  basket?.reduce((prev, curr) => prev + curr.price * curr.amount, 0).toFixed(2)

export const getBasketAmount = basket => basket?.reduce((prev, curr) => prev + curr.amount * 1, 0)

//Reducer
export const myReducer = (state, action) => {
  switch (action.type) {
    case 'ADD': {
      //get product index
      const existingProductIndex = state.basket.findIndex(product => product.id === action.item.id)
      //get the product
      const existingProduct = state.basket[existingProductIndex]

      let updatedProduct
      let updatedBasket
      //check if the product already in basket
      if (existingProduct) {
        //update amount
        updatedProduct = { ...existingProduct, amount: existingProduct.amount + 1 }
        updatedBasket = [...state.basket]
        updatedBasket[existingProductIndex] = updatedProduct
      } else {
        updatedProduct = action.item
        updatedBasket = state.basket.concat(updatedProduct)
      }

      return {
        ...state,
        basket: updatedBasket,
      }
    }

    case 'MINUS': {
      //get existing product index
      const existingProductIndex = state.basket.findIndex(product => product.id === action.id)
      //get the product
      const existingProduct = state.basket[existingProductIndex]

      let updatedProduct
      let updatedBasket = [...state.basket]

      //bug fix if click remove button to quick
      // if (updatedBasket.length === 0) {
      //   return {
      //     ...state,
      //     basket: updatedBasket,
      //   }
      // }

      if (existingProduct) {
        if (existingProduct.amount === 1) {
          updatedBasket = state.basket.filter(product => product.id !== action.id)
        } else {
          //update amount
          updatedProduct = { ...existingProduct, amount: existingProduct.amount - 1 }
          updatedBasket[existingProductIndex] = updatedProduct
        }
      } else {
        console.warn(`Can not remove product (id: ${action.id}) as its not in basket!`)
      }

      return {
        ...state,
        basket: updatedBasket,
      }
    }

    case 'REMOVE': {
      const index = state.basket.findIndex(item => item.id === action.id)
      let updatedBasket = [...state.basket]
      if (index >= 0) {
        updatedBasket.splice(index, 1)
      } else {
        console.warn(`Can not remove product (id: ${action.id}) as its not in basket!`)
      }
      return {
        ...state,
        basket: updatedBasket,
      }
    }

    case 'EMPTY': {
      return {
        ...state,
        basket: [],
      }
    }

    case 'SET_USER':
      return {
        ...state,
        user: action.user,
      }

    default:
      return {
        basket: [],
      }
  }
}
