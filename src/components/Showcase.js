import React, { Component, useState, useEffect } from "react"
import {firebase, storage, database, db} from "../config/firebaseConfig"
import { Link } from "react-router-dom";
import '../stylesheets/Main.css'
import abby from "../resources/abby.png" 
import andy from "../resources/andy.png" 
import gunner from "../resources/Gunner.png" 
import ian from "../resources/ian.png" 
import jackson from "../resources/jackson.jpeg" 
import liam from "../resources/liam.png" 
import sam from "../resources/sam.PNG"
import sophia from "../resources/sophia.jpg" 
import valerie from "../resources/valerie.jpeg" 

function Showcase() {

        return(
            
            <div className="showcase-wrapper">
                <h1>Gotcha Logo Showcase</h1>
                <div><img src={abby} className="App-logo" alt="logo" /> 
                <p>Abby Rochelle (Class III)</p>
                </div>
                
                <div>
                    <img src={andy} className="App-logo" alt="logo" /> 
                    <p>Andy Zhang (Class I)</p>
                </div>
                <div>
                    <img src={ian} className="App-logo" alt="logo" /> 
                    <p>Ian Terell (Class I)</p>
                </div>
                <div>
                    <img src={jackson} className="App-logo" alt="logo" />
                    <p>Jackson Landy (Class II)</p>
                </div>
                <div>
                    <img src={liam} className="App-logo" alt="logo" /> 
                    <p>Liam Kralik (Class III)</p>
                </div>
                <div>
                    <img src={sam} className="App-logo" alt="logo" />
                    <p>Sam Yu (Class III)</p>
                </div>
                <div>
                    <img src={sophia} className="App-logo" alt="logo" /> 
                    <p>Sophia Xie (Class II)</p>
                </div>
                <div>
                    <img src={valerie} className="App-logo" alt="logo" />
                    <p>Valerie Gu (Class IV)</p>
                </div>
                <div>
                <Link className="page-link" to="/">Back Home</Link>
                <br/><br/>
                </div>
            </div>
            )
    }


export default Showcase