import React from 'react';
import { Route } from 'react-router-dom'

import UserListing from './components/UserListings'
import RegisterForm from './components/RegisterForm'

import './App.css';

function App() {
  return (
      <div className="App">
        <Route exact path='/' component={UserListing}/>
        <Route path='/register' component={RegisterForm}/>
      </div>
  );
}

export default App;
