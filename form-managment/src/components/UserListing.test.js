import React from 'react';
import { render, cleanup, fireEvent } from '@testing-library/react'
import { Router } from 'react-router-dom'
import '@testing-library/jest-dom/extend-expect'
import { createMemoryHistory } from 'history'
import App from '../App'

afterEach(cleanup)

function renderWithRouter(
    ui,
    {
      route = '/',
      history = createMemoryHistory({ initialEntries: [route] }),
    } = {}
  ) {
    return {
      ...render(<Router history={history}>{ui}</Router>),
      // adding `history` to the returned utilities to allow us
      // to reference it in our tests (just try to avoid using
      // this to test implementation details).
      history,
    }
  }
  

describe('UserListing()', () => {
    it('Should render register title', () => {
        const wrapper = renderWithRouter(<App/>)
        const title = wrapper.getByTestId('registerTitle')
        expect(title).toHaveTextContent('Register')
    })

    it('Should fire register button', () => {
        const wrapper = renderWithRouter(<App/>)
        const btn = wrapper.getByTestId('registerBtn')
        expect(fireEvent.click(btn))
    })
})
