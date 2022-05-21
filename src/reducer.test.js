import { myReducer, getBasketAmount, getBasketTotal } from './reducer'

describe('reducer', () => {
  it('returns the initial state -- empty basket', () => {
    expect(myReducer(undefined, {})).toEqual({
      basket: [],
    })
  })

  it('should add item to basket when ADD action is dispatch, if item not exist', () => {
    const initialState = {
      basket: [],
    }

    const action = {
      type: 'ADD',
      item: {
        id: 1,
        price: 2.99,
        amount: 1,
      },
    }

    const updatedState = myReducer(initialState, action)

    expect(updatedState).toEqual({
      basket: [
        {
          id: 1,
          price: 2.99,
          amount: 1,
        },
      ],
    })
  })

  it('should add item amount when ADD action is dispatch, if item already exist', () => {
    const initialState = {
      basket: [
        {
          id: 1,
          price: 2.99,
          amount: 1,
        },
      ],
    }

    const action = {
      type: 'ADD',
      item: {
        id: 1,
        price: 2.99,
        amount: 1,
      },
    }

    const updatedState = myReducer(initialState, action)

    expect(updatedState).toEqual({
      basket: [
        {
          id: 1,
          price: 2.99,
          amount: 2,
        },
      ],
    })
  })

  it('should minus item amount by one when MINUS action is dispatch, if item already exist', () => {
    const initialState = {
      basket: [
        {
          id: 1,
          price: 2.99,
          amount: 1,
        },
      ],
    }

    const action = {
      type: 'MINUS',
      id: 1,
    }

    const updatedState = myReducer(initialState, action)

    expect(updatedState).toEqual({
      basket: [],
    })
  })

  it('should set user state when SET_USER action is dispatch', () => {
    const initialState = {
      basket: [],
      user: null,
    }

    const action = {
      type: 'SET_USER',
      user: {
        uid: 1,
        email: 'test@gmail.com',
      },
    }

    const updatedState = myReducer(initialState, action)

    expect(updatedState).toEqual({
      basket: [],
      user: {
        uid: 1,
        email: 'test@gmail.com',
      },
    })
  })
})
