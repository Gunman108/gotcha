import React, { Component } from "react"
import firebase from "firebase"
import LoggedIn from './loggedIn'
import LoginButton from './loginButton'
import '../App.css'



class googleLogin extends Component {
  state = { isSignedIn: false }
  

  componentDidMount = () => {
    firebase.auth().onAuthStateChanged(user => {
      this.setState({ isSignedIn: !!user })
      console.log("user", user)
    })
  }

  render() {
    return (
   
      <div className="App-bg">
        {this.state.isSignedIn ? (

          <LoggedIn />

        ) : (

          <LoginButton />

        )}
        
      </div>
    )
  }
}

export default googleLogin