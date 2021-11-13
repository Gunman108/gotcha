import React, { Component, useState } from "react"
import {firebase, db} from "../config/firebaseConfig"
import OutPage from "./OutPage"
import '../stylesheets/Main.css'




const OutButton =()=>{
    
  const [isOut, setOut] = useState(false)
  const [text, setText] = useState('')
  const [name, setName] = useState('')
  const [clas, setClass] = useState(0)
  
  const imOut = ()=>{
    //go into user document and pull pairing_email(1) and email 
    if(window.confirm("Are you sure you are out?")){
    var email = ""
    var pairing = ""
    var pairing_name = ""
    var docRef = db.collection("users").doc(firebase.auth().currentUser.uid);
    docRef.get().then((doc) => {
      if (doc.exists) {
        email = doc.data().email.replace(".edu","")
        pairing = doc.data().pairing
        pairing_name = doc.data().pairing
       
        setName(doc.data().name)
        setClass(doc.data().class)


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
}
else{
  return
}
    //Display a your out/last words document
  }

  const onSubmit = () =>{
    let currentDate = new Date();
    let time = (currentDate.getHours()*3600) + (currentDate.getMinutes()*60) + currentDate.getSeconds();
    let cDay = currentDate.getDate()
    console.log(time);
    console.log(cDay)
    db.collection('lastwords').doc(firebase.auth().currentUser.uid).set({
      name: name,
      class: clas,
      words: text,
      date: cDay,
      time: time
    })
  }


        return(
          (isOut ? (
            <div>
              <OutPage />
              <form id="lastwords-form" onSubmit={ onSubmit }>
                <input className="txt-box" placeholder="Last Words?" value={text} onChange={(e)=> setText(e.target.value)}/>
                <div class="custom-pad"><input type="submit" className="conf-button" ></input></div>
              </form>
            </div>
            
          ) : (
            <div className = "logout-div">
              <button className="out-button" onClick={imOut}>I'm Out :(</button>
            </div>
            
          )
          )
        )
  }


export default OutButton