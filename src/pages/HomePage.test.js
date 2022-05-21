import { render, screen } from '@testing-library/react'
import Product from '../components/Product'
import { StateProvider } from '../StateProvider'
import '@testing-library/jest-dom'
describe('HomePage', () => {
  it('Product component renders the product info inside it', async () => {
    render(
      <StateProvider>
        <Product
          id={1111}
          title='render test title'
          price={1.99}
          image='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQYpYRhOVZ64ARQlp96ri6pem3QD1YSP7YGWrHuExDtUT2nmOyMrI39xouY1qPlGcfD874&usqp=CAU'
          rating={4}
        />
      </StateProvider>,
    )

    const title = await screen.findByText('render test title')

    expect(title).toBeInTheDocument()
  })
})
