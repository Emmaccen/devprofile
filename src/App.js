import React from 'react';
import './App.css';
import Application from './components/Application'
import {BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import CreateProfile from './components/CreateProfile'
import Content from './components/ContentPage/Content'
import Profile from './components/Profile';
import Topic from './components/ContentPage/Topic';
import Deliverable from './components/ContentPage/Deliverable';

function App() {
  return (
    <Router>
      <div className="App">
        <Switch>
          <Route path='/' exact component={Application}></Route>
          <Route path='/Content' exact component={Content}></Route>
          <Route path='/CreateProfile' exact component={CreateProfile}></Route>
          <Route path='/Profile/:id' exact component={Profile}></Route>
          <Route path='/Content/Topic/:id' exact component={Topic}></Route>
          <Route path='/Content/Deliverable/:id' exact component={Deliverable}></Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;