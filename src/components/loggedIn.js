import React, { Component, useState, useEffect } from "react"
import {firebase, storage, database, db} from "../config/firebaseConfig"
import Out from './OutButton'
import '../stylesheets/Main.css'


function LoggedIn(props) {
    const [url, setUrl] = useState('');
    const [email,setEmail] = useState('')
    const [name, setName] = useState('Loading...')
    
    

    const rootref = database.ref("Users");

    useEffect(()=> {
        getName();
        } ,[]);
        


    

      async function getName(){
          var myemail = ''
        let exists = false
        while(!exists){
            // console.log("While")
        await db.collection('users').doc(firebase.auth().currentUser.uid).get().then((snapshot) => {
            if(snapshot.exists){
            console.log(snapshot.data().pairing)
            console.log(snapshot.data().pairing_name)
            setName(snapshot.data().pairing_name)
            setEmail(snapshot.data().pairing)
            myemail = snapshot.data().pairing
            console.log("before:",myemail)
            exists = snapshot.exists
            }
            })
                    }
    
            var url = "";
            var refer = await storage.ref("faces/photos/"+myemail+".png").getDownloadURL();
            setUrl(refer);
      }


        return(
            
            <span>
                
                <h1>Welcome {firebase.auth().currentUser.displayName}</h1>
                <img
                    className="person-picture"
                    alt="loading photo"
                    src={url}
                />
                <h2>Your target is {name}</h2>
                <div className="Signout-Div">
                    <button className="signout-button" onClick={() => firebase.auth().signOut()}>Sign out!</button>
                </div>
                <Out/>
            </span>
            )
    }


export default LoggedIn