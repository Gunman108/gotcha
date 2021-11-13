import React, { Component, useState, useEffect } from "react"
import {firebase, db, database} from "../config/firebaseConfig"
import OutPage from "./OutPage"
import { Link } from "react-router-dom";
import "../stylesheets/Main.css"


const LeaderboardPage =()=>{
// setLeaders(leadersList.concat())
  const [leaders, setLeaders] = useState([])

  const [lastwords, setLastwords] = useState([])

  useEffect(()=> {
    
    getLeadersList();
    getLastwords();
    
    } ,[]);

  const getLeadersList = ()=>{
  
    db.collection('users').orderBy('tags', 'desc').limit(20).get().then((snapshot) => {
      snapshot.docs.forEach(doc => {
        setLeaders(oldArray => [...oldArray, [doc.data().name,doc.data().tags]]);
      })
    })
    console.log(leaders)
    
  }

  const getLastwords = ()=>{
    let currentDate = new Date();

    db.collection('lastwords').orderBy('date','desc').orderBy('time', 'desc').limit(30).get().then((snapshot) => {
      snapshot.docs.forEach(doc => {
        setLastwords(oldArray => [...oldArray, [doc.data().name,doc.data().words,doc.data().class]]);
      })
    })
    console.log(lastwords)
  }


        return(
            <div className="Leaderboard">
              <br/><br/>
              <Link className="page-link" to="/">Home</Link>
              <h1>Leaderboard</h1>
              <div className="table-div">
              <table className="leaderboard-tablewrap">
                <thead>
                <tr className="leaderboard-header">
                  <th>Name</th>
                  <th>Tags</th>
                </tr>
                </thead>
                <tbody>
                {leaders.map((lead) => ( 
                <tr>
                  <td>{lead[0]}</td>
                  <td>{lead[1]}</td>
                </tr>
                ))}
                </tbody>
              </table>
              </div>
              
              <h2>Last Words</h2>
  
                
                {lastwords.map((lw) => ( 
                  <div className = "lastword-wrapper">
                  <div className="lastword-div">
                    <p className="lw-text">{lw[1]} <br/></p><p className="quote-text">- {lw[0]} (Class {lw[2]})</p>
                  </div>
                  </div>
                ))}
                
         
            </div>
        )
  }


export default LeaderboardPage