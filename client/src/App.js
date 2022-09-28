import React from 'react';
import './App.css';
import { Route, Switch } from 'react-router-dom';
import Home from './Components/Home';
import LandingPage from './Components/LandingPage';
import DogCreate from './Components/DogCreate';
import DogDetail from './Components/DogDetail';

function App() {
  return (
    <div className="App">
      <Switch>
        <Route exact path='/'>
          <LandingPage/>
        </Route>
        <Route path='/home'>
          <Home/>
        </Route>
        <Route path='/details/:id'>
          <DogDetail/>
        </Route>
        <Route path='/createdogs'>
          <DogCreate/>
        </Route>
      </Switch>
    </div>
  );
}

export default App;
