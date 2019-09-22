import React, { Component } from 'react';
import Home from './containers/Home';
import {   BrowserRouter as Router,
  Route,
} from 'react-router-dom'

class App extends Component {

  render() {
    return (
      <div className="App">
        <Router>
         <Route path="/" component={Home} />
        </Router>
      </div>
    )
  }
}

export default App;

