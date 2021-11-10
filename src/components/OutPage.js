import React, { Component, useState, useEffect } from "react"
import {firebase, storage, database, db} from "../config/firebaseConfig"
import Out from './outButton'


function OutPage(props) {
    const [url, setUrl] = useState('');
    const [email,setEmail] = useState('')
    const [name, setName] = useState('')
    
    

    const rootref = database.ref("Users");

    
        return(
            
            <span>
                <h1>Sorry, {firebase.auth().currentUser.displayName}, you are out!</h1>
                <h2>Better Luck Next Year!</h2>
            </span>
            )
    }


export default OutPage