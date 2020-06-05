import React from 'react';
import './App.css';
import Application from './components/Application'
import {BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import Content from './components/ContentPage/Content'

function App() {
  return (
    <Router>
      <div className="App">
        <switch>
          <Route path='/' exact component={Application}></Route>
          <Route path='/Content' exact component={Content}></Route>
        </switch>
      </div>
    </Router>
  );
}

export default App;