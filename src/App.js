import React, { Component } from 'react';
import {
  HashRouter as Router,
  Route,
  Redirect,
  Switch,
} from 'react-router-dom'

//import sass 
import './assets/App.scss'


//import components
import Home from './routes/Home';
import ErrorPage from './routes/ErrorPage';
import Header from './components/Header';
import Footer from './components/Footer';

//define route in the app component
class App extends Component {
  render() {
    return (
      <Router basename = {process.env.PUBLIC_URL}> 
        <div>
          <Header />
          <Switch>
            <Route exact path = '/' component = {()=> {
              return <Redirect to = '/home' /> 
            }} />
            <Route exact path = {'/home'} component = {Home}/>
            <Route path = {'*'} component = {Error}/>
          </Switch>
          <Footer/>
        </div>
      </Router>
    );
  }
}

export default App;
