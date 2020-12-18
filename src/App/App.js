import React, { Component } from 'react';
import './App.css';

class App extends Component {
  constructor() {
    super();
    this.state = {
      movies: []
    }
  }

  render() {
    return(
      <main>
        <header>
          <h1>underrated</h1>
          <nav>
            <p>all movies</p>
            <p>watchlist</p>
            <p>account</p>
          </nav>
        </header>
      </main>
    ) 
  }
}

export default App;
