import React, { Component } from "react"
import {firebase} from "../config/firebaseConfig"


class LoggedIn extends Component {
    render() {
        return(
            <span>
                
                <div>Signed In!</div>
                <button onClick={() => firebase.auth().signOut()}>Sign out!</button>
                <h1>Welcome {firebase.auth().currentUser.displayName}</h1>
                <img
                    alt="profile picture"
                    src={firebase.auth().currentUser.photoURL}
                />
            </span>
            )
    }
}

export default LoggedIn