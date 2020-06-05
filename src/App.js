import React from 'react';
import './App.css';
import Application from './components/Application'
import {BrowserRouter as Router, Switch, Route } from 'react-router-dom'
// import ViewProfile from './components/ViewProfile'
import CreateProfile from './components/CreateProfile'
import Content from './components/ContentPage/Content'
import Profile from './components/Profile';

function App() {
  return (
    <Router>
      <div className="App">
        <Switch>
          <Route path='/' exact component={Application}></Route>
          <Route path='/Content' exact component={Content}></Route>
          {/* <Route path='/ViewProfile' exact component={ViewProfile}></Route> */}
          <Route path='/CreateProfile' exact component={CreateProfile}></Route>
          <Route path='/Profile/:id' exact component={Profile}></Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;