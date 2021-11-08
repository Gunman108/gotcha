import React, { Component, useState, useEffect } from "react"
import {firebase, storage, database} from "../config/firebaseConfig"


function LoggedIn(props) {
    const [url, setUrl] = useState('');
    const [email,setEmail] = useState('')
    const [name, setName] = useState('')
    

    const rootref = database.ref("Users");

    useEffect(()=> {
        getPhoto(email);
        } ,[]);
        


    async function getPhoto(email){
        email = email.replace('.edu','');
        var url = "";
        console.log("photos/"+email+".png");
        var refer = await storage.ref("faces/photos/"+email+".png").getDownloadURL();
        console.log(refer);
        setUrl(refer);
        return refer;
      }


        return(
            
            <span>
                
                <div>Signed In!</div>
                <button onClick={() => firebase.auth().signOut()}>Sign out!</button>
                <h1>Welcome {name}</h1>
                <h1>Your email is {email}</h1>
                <img
                    alt="profile picture"
                    src={url}
                />
            </span>
            )
    }


export default LoggedIn