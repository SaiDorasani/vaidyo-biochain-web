import React, { Component } from 'react';
import './App.css';
import Home from './Home';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import ClientList from './ClientList';
import ClientEdit from "./ClientEdit";
import ScanBioid from './ScanBioid';

class App extends Component {
  render() {
    return (
        <Router>
          <Switch>
            <Route path='/' exact={true} component={Home}/>
            <Route path='/patients' exact={true} component={ClientList}/>
            <Route path='/patients/:id' component={ClientEdit}/>
            <Route path='/scanbioid' component={ScanBioid}/>
          </Switch>
        </Router>
    )
  }
}

export default App;