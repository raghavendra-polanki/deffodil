import React, { Component } from 'react';
import './App.css';
import Routes from './routes'
import Home from './views/Home/Home';
import {BrowserRouter} from 'react-router-dom';
class App extends Component {
  render() {
    return (
      <div>
        <BrowserRouter>
          <Home/>
        </BrowserRouter>
      </div>
    );
  }
}

export default App;
