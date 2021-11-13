
import './App.css';
import React, { Component } from "react";
import Login from './components/GoogleLogin'
import LeaderboardPage from './components/LeaderboardPage';
import Developers from './components/Developers'
import Showcase from './components/Showcase'
import { BrowserRouter, Switch, Route} from 'react-router-dom';
import logo from "./resources/logo.png" 



class App extends Component{
  
render(){
  return (
    <div className="App">
      
      
        <BrowserRouter>
        <div className="header-div">
        <img src={logo} className="App-logo" alt="logo" /> 
        </div>
        <header className="App-header">
          <Switch>
           <Route exact path="/" component={Login}/>
           <Route path="/leaderboard" component={LeaderboardPage} exact/>
           <Route path="/showcase" component={Showcase} exact/>
         </Switch>
         </header>
         <Developers />
        </BrowserRouter>
      
    </div>
  );
}
}

export default App;
