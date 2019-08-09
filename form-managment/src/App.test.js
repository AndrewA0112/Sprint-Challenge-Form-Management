import React from 'react';
import { render } from '@testing-library/react'
import { Router } from 'react-router-dom'
import '@testing-library/jest-dom/extend-expect'
import { createMemoryHistory } from 'history'
import App from './App'

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

it('renders without crashing', () => {
  const wrapper = renderWithRouter(<App/>)
  expect(wrapper)
});

// it('renders without crashing', () => {
//   const div = document.createElement('div');
//   ReactDOM.render(<App />, div);
//   ReactDOM.unmountComponentAtNode(div);
// });
