import React, { Component, useState } from "react"
import {firebase, storage} from "../config/firebaseConfig"


function LoggedIn() {
    const [url, setUrl] = useState('');

    async function getPhoto(email){
        email = email.replace('.edu','');
        var url = "";
        console.log("photos/"+email+".png");
        var refer = await storage.ref("faces/photos/"+email+".png").getDownloadURL();
        console.log(refer);
        setUrl(refer);
        return refer

      }



        return(
            <span>
                
                <div>Signed In!</div>
                <button onClick={() => firebase.auth().signOut()}>Sign out!</button>
                <button onClick={() => getPhoto(firebase.auth().currentUser.email)}>Get Photo</button>
                <h1>Welcome {firebase.auth().currentUser.displayName}</h1>
                <img
                    alt="profile picture"
                    src={url}
                />
            </span>
            )
    }


export default LoggedIn