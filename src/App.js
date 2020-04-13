import React from 'react';
import Login from './components/auth/Login'
import Register from './components/auth/Register'
import Home from './components/forum/Home'

import {BrowserRouter as Router, Switch, Route} from 'react-router-dom'


function App() {

  

  return (
    <Router>
      <Switch>
        <Route exact path = "/" component={Login}></Route>
        <Route exact path = "/register" component={Register}></Route>
        <Route exact path = "/home" component={Home}></Route>
      </Switch>
    </Router>
  );
}

export default App;
