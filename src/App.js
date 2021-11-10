import logo from './logo.svg';
import './App.css';
import React, { Component } from "react";
import Login from './components/GoogleLogin'
import LeaderboardPage from './components/LeaderboardPage';
import { BrowserRouter, Switch, Route} from 'react-router-dom';



class App extends Component{
  
render(){
  return (
    <div className="App">
      <header className="App-header">

        <BrowserRouter>
        <img src={logo} className="App-logo" alt="logo" />
      
          <Switch>
           <Route exact path="/" component={Login}/>
           <Route path="/leaderboard" component={LeaderboardPage} exact/>
         </Switch>
       
        </BrowserRouter>
      </header>
    </div>
  );
}
}

export default App;
