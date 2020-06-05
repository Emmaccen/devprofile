import React from 'react';
import './App.css';
import Application from './components/Application'
import {BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import Content from './components/ContentPage/Content'
<<<<<<< HEAD
import Profile from './components/Profile';
import Topic from './components/ContentPage/Topic';
import Deliverable from './components/ContentPage/Deliverable';
=======
>>>>>>> parent of f9f54cc... Merge branch 'master' into ContentPage

function App() {
  return (
    <Router>
      <div className="App">
        <switch>
          <Route path='/' exact component={Application}></Route>
          <Route path='/Content' exact component={Content}></Route>
<<<<<<< HEAD
          {/* <Route path='/ViewProfile' exact component={ViewProfile}></Route> */}
          <Route path='/CreateProfile' exact component={CreateProfile}></Route>
          <Route path='/Profile/:id' exact component={Profile}></Route>
          <Route path='/Content/Topic/:id' exact component={Topic}></Route>
          <Route path='/Content/Deliverable/:id' exact component={Deliverable}></Route>
        </Switch>
=======
        </switch>
>>>>>>> parent of f9f54cc... Merge branch 'master' into ContentPage
      </div>
    </Router>
  );
}

export default App;