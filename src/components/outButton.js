import React, { Component, useState } from "react"
import {firebase, db} from "../config/firebaseConfig"
import OutPage from "./OutPage"



const OutButton =()=>{
    
  const [isOut, setOut] = useState(false)
  const [text, setText] = useState('')

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
    //Add rank to db here when tag updates
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

    setOut(true)
    //Display a your out/last words document
  }

  const onSubmit = () =>{
  
  }


        return(
          (isOut ? (
            <div>
              <OutPage />
              <form id="lastwords-form" onSubmit={ onSubmit }>
                <input placeholder="Last Words?" className="txt-Box2"  value={text} onChange={(e)=> setText(e.target.value)}/>
                <div class="custom-pad"><input type="submit" className="conf-button" ></input></div>
              </form>
            </div>
            
          ) : (
            <button className="logout-button" onClick={imOut}>Logout</button>
          )
          )
        )
  }


export default OutButton