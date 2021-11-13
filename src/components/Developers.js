import React, { Component, useState, useEffect } from "react"
import {firebase, storage, database, db} from "../config/firebaseConfig"
import { Link } from "react-router-dom";
import Out from './outButton'
import '../stylesheets/Main.css'


function Developers() {

        return(
            
            <div className="developers">
                Developed by Gunner Peterson, Calvin Bonomo, and Dina Sara Custo. <br/>
                A special thanks to logo makers, who can be found at this <Link className="showcase-link" to="/showcase">showcase</Link>!
            </div>
            )
    }


export default Developers