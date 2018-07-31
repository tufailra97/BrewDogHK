import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
class Header extends Component {
  state = {
    menuStatus : 'hide-menu'
  }

  render() {

    return (
      <header id = 'header'>
        <div className = 'wrapper'>
          <div className = 'res-wrapper'>
            <div id = 'logo'>
              <img src = {require('../assets/img/logo.png')} alt = 'Logo'/>
              <h1>BrewDog</h1>
            </div>
            
            <div className = 'res-button'>
              <button
                onClick = {() => {
                  if(this.state.menuStatus === 'hide-menu'){
                    this.setState({
                      menuStatus : 'show-menu'
                    });
                  }else{
                    this.setState({
                      menuStatus : 'hide-menu'
                    });
                  }
                }}
              ><span>=</span></button>
            </div>
          </div>
          <nav className = {this.state.menuStatus}>
            <ul>
              <li><NavLink to = '/'><span>Home</span></NavLink></li>
              <li><NavLink to = '#'><span>Our Clients</span></NavLink></li>
              <li><NavLink to = '#'><span>Contact Us</span></NavLink></li>
            </ul>
          </nav>
        </div>
      </header>
    );
  }
}

export default Header;