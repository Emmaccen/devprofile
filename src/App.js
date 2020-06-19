import React from 'react';
import './App.css';
import Application from './components/Application'
import {BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import CreateProfile from './components/CreateProfile'
import Content from './components/ContentPage/Content'
import Profile from './components/Profile';
import Topic from './components/ContentPage/Topic';
import Deliverable from './components/ContentPage/Deliverable';
import Video from './components/ContentPage/Video';
import Marks from './components/MarksPage/Marks'
import Submissions from './components/MarksPage/Submissions'
import DeliverableSubmissions from './components/MarksPage/DeliverableSubmissions'

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
          <Route path='/Content/Video/:id' exact component={Video}></Route>
          <Route path='/Marks' exact component={Marks}></Route>
          <Route path='/Submissions/:id/:uid' exact component={Submissions}></Route>
          <Route path='/DeliverableSubmissions/:cid/:uid' exact component={DeliverableSubmissions}></Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;