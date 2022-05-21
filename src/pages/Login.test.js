import { screen, waitFor, render } from '@testing-library/react'
import Login from './Login'
import userEvent from '@testing-library/user-event'
import { BrowserRouter } from 'react-router-dom'

const testCredential = {
  email: 'test2@gmail.com',
  password: '123456',
}

const mockedUsedNavigate = jest.fn()

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockedUsedNavigate,
}))

describe('sigin in', () => {
  window.alert = jest.fn()

  it('sign in success then redirect to home page', async () => {
    render(
      <BrowserRouter>
        <Login />
      </BrowserRouter>,
    )

    userEvent.type(screen.getByPlaceholderText('email'), testCredential.email)
    userEvent.type(
      screen.getByPlaceholderText('password'),
      testCredential.password,
    )

    userEvent.click(screen.getByRole('button', { name: /Sign In/ }))

    await waitFor(() => expect(mockedUsedNavigate).toHaveBeenCalledWith('/'), {
      timeout: 4000,
    })
  })

  it('sign in fail then no redirect', async () => {
    render(
      <BrowserRouter>
        <Login />
      </BrowserRouter>,
    )

    const invalidCredential = {
      ...testCredential,
      password: 'invalid password',
    }

    userEvent.type(
      screen.getByPlaceholderText('email'),
      invalidCredential.email,
    )
    userEvent.type(
      screen.getByPlaceholderText('password'),
      invalidCredential.password,
    )

    userEvent.click(screen.getByRole('button', { name: /Sign In/ }))

    await waitFor(() => expect(mockedUsedNavigate).toHaveBeenCalledTimes(0), {
      timeout: 4000,
    })
  })
})
