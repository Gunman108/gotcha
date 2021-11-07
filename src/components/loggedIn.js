import React, { Component, useState, useEffect } from "react"
import {firebase, storage, database} from "../config/firebaseConfig"


function LoggedIn() {
    const [url, setUrl] = useState('');
    const [email,setEmail] = useState('')
    const [name, setName] = useState('')

    const rootref = database.ref("Users");
    const rootchild = database.ref().child("Users")

    useEffect(()=> {
        createPair();
        } ,[]);
        
    function createPair(){
        
        console.log("Happened")
        var bound = 0
        rootref.orderByKey().on('value', snapshot => {
            console.log(typeof snapshot.val().keys());
            bound = Object.keys(snapshot.val()).length
            console.log("Bound:" + bound)
          })
        var index = parseInt((Math.random()*bound));
        console.log("index:" + index);
        var strindex = index.toString()
    
        rootref.orderByKey().equalTo(strindex).on("value", function(snapshot) {
            console.log(Object.values(snapshot.val())[0]['Names'])
            console.log("Emails:",Object.values(snapshot.val())[0]['Names'])
            setEmail(Object.values(snapshot.val())[0]['Emails'])
            setName(Object.values(snapshot.val())[0]['Names'])
            console.log(email)
            getPhoto(email);
            snapshot.forEach(function(data) {
                console.log("Data Key:" + data.key);   
            });
        });
        console.log("Yes",email);
        
    }

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
                <button onClick={() => createPair()}>TEST</button>
                <h1>Welcome {name}</h1>
                <img
                    alt="profile picture"
                    src={url}
                />
            </span>
            )
    }


export default LoggedIn