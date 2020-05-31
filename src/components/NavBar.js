import React, {Component} from 'react'
import {openDialogu} from './HomePage'
import $ from 'jquery'

const firebase = require("firebase");

class NavBar extends Component {

    constructor (props) {
        super(props)
    }
    render() {
        
        return (
            <div>
                <nav className="navbar navbar-expand-sm navbar-dark bg-dark">
                    <a className="navbar-brand" href="#">
                        <img src='/Logo.svg' alt='Company Logo' ></img>
                    </a>
                    <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
                        <div className="navbar-nav mr-auto">
                            <a className="nav-item nav-link active" href="#">Home<span className="sr-only">(current)</span></a>
                            <a className="nav-item nav-link" href="#">Profiles</a>
                            <a className="nav-item nav-link" href="#">Admins</a>
                        </div>                
                        <button onClick={()=> openDialogu()} className="btn btn-outline-success my-2 my-sm-0 ml-0">Login</button>    
                    </div>
                </nav>
            </div>
        )
    }
}


export default NavBar