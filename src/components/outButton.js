import React, { Component } from "react"
import {firebase, db} from "../config/firebaseConfig"



const OutButton =()=>{
    
  const imOut = ()=>{
    //go into user document and pull pairing_email(1) and email 
    var email = ""
    var pairing = ""
    var pairing_name = ""
    var docRef = db.collection("users").doc(firebase.auth().currentUser.uid);
    docRef.get().then((doc) => {
      if (doc.exists) {
        email = doc.data().email.replace(".edu","")
        pairing = doc.data().pairing
        pairing_name = doc.data().pairing
       

        db.collection('users').doc(doc.id).set({
          name: doc.data().name,
          email: doc.data().email,
          class: doc.data().class,
          uid: doc.data().uid,
          tags: doc.data().tags,
          out: true,
          pairing: "",
          pairing_name: ""
        })

      }
    })
    //search users for document with corrosponding email value in their pairing_email
   
    db.collection('users').get().then((snapshot) => {
      snapshot.docs.forEach(doc => {
        console.log(doc.data().pairing)
          if(doc.data().pairing == email){
            db.collection('users').doc(doc.id).set({
              name: doc.data().name,
              email: doc.data().email,
              class: doc.data().class,
              uid: doc.data().uid,
              tags: doc.data().tags + 1,
              out: doc.data().out,
              pairing: pairing,
              pairing_name: pairing_name
            })
          }
      })
  })
    //change the pairing email in that document with pairing_email(1)
    //add 1 to tags in this document

  }


        return(
        <button onClick={imOut}>I'm Out</button>
        )
  }


export default OutButton