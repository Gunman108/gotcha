import React, { Component, useState, useEffect } from "react"
import {firebase, db, database} from "../config/firebaseConfig"
import OutPage from "./OutPage"
import { Link } from "react-router-dom";


const LeaderboardPage =()=>{
// setLeaders(leadersList.concat())
  const [leaders, setLeaders] = useState([])

  useEffect(()=> {
    
    getLeadersList();
    
    } ,[]);

  const getLeadersList = ()=>{
  
    db.collection('users').orderBy('tags', 'desc').limit(20).get().then((snapshot) => {
      snapshot.docs.forEach(doc => {
        setLeaders(oldArray => [...oldArray, [doc.data().name,doc.data().tags]]);
      })
    })
    console.log(leaders)
    
  }


        return(
            <div className="Leaderboard">
              <Link to="/">Home</Link>
              <table>
                <tr>
                  <th>Name</th>
                  <th>Tags</th>
                </tr>
        
                {leaders.map((lead) => ( 
                <tr>
                  <td>{lead[0]}</td>
                  <td>{lead[1]}</td>
                </tr>
                ))}
              </table>
            </div>
        )
  }


export default LeaderboardPage