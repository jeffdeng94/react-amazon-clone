import { render } from '@testing-library/react'
import PaymentPage from './PaymentPage'
import { StateProvider } from '../StateProvider'
import { BrowserRouter } from 'react-router-dom'
import { Elements } from '@stripe/react-stripe-js'
import * as mocks from '../../mock'
import { useStripe } from '@stripe/react-stripe-js'
describe('Payment page', () => {
  let mockStripe
  let mockStripePromise
  let mockElements
  let consoleError
  let consoleWarn

  beforeEach(() => {
    mockStripe = mocks.mockStripe()
    mockStripePromise = Promise.resolve(mockStripe)
    mockElements = mocks.mockElements()
    mockStripe.elements.mockReturnValue(mockElements)

    jest.spyOn(console, 'error')
    jest.spyOn(console, 'warn')
    consoleError = console.error
    consoleWarn = console.warn
  })

  afterEach(() => {
    jest.restoreAllMocks()
  })

  it('only creates elements once', async () => {
    render(
      <BrowserRouter>
        <StateProvider initialState={{ basket: [], user: null }}>
          <Elements stripe={mockStripe}>
            <PaymentPage />
          </Elements>
        </StateProvider>
      </BrowserRouter>,
    )

    expect(mockStripe.elements).toHaveBeenCalledTimes(1)
  })

  it('provides given stripe instance on mount', () => {
    const TestComponent = () => {
      const stripe = useStripe()

      if (!stripe) {
        throw new Error('Stripe instance is null')
      }

      return null
    }

    expect(() => {
      render(
        <Elements stripe={mockStripe}>
          <TestComponent />
        </Elements>,
      )
    }).not.toThrow('Stripe instance is null')
  })
})
