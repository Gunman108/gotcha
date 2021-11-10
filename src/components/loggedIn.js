import React, { Component, useState, useEffect } from "react"
import {firebase, storage, database, db} from "../config/firebaseConfig"
import Out from './outButton'


function LoggedIn(props) {
    const [url, setUrl] = useState('');
    const [email,setEmail] = useState('')
    const [name, setName] = useState('')
    
    

    const rootref = database.ref("Users");

    useEffect(()=> {
        getName();
        } ,[]);
        


    

      async function getName(){
          var myemail = 'gunner_peterson22@milton'
        await db.collection('users').doc(firebase.auth().currentUser.uid).get().then((snapshot) => {
            console.log(snapshot.data().pairing)
            console.log(snapshot.data().pairing_name)
            setName(snapshot.data().pairing_name)
            setEmail(snapshot.data().pairing)
            myemail = snapshot.data().pairing
            console.log("before:",myemail)
        })
    
            var url = "";
            var refer = await storage.ref("faces/photos/"+myemail+".png").getDownloadURL();
            setUrl(refer);
      }


        return(
            
            <span>
                <h1>Welcome {firebase.auth().currentUser.displayName}</h1>
                <h2>Your person is {name}</h2>

                <img
                    alt="profile picture"
                    src={url}
                />
                <br/>
                <button onClick={() => firebase.auth().signOut()}>Sign out!</button>
                <Out/>
            </span>
            )
    }


export default LoggedIn