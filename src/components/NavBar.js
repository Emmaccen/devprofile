import React, {Component} from 'react'

const firebase = require("firebase");

class NavBar extends Component {


    loginUser (button, loader) {
        const load = document.getElementById('loader')
        const btn = document.getElementById('button')
        // notify and restrict clicks while processing
        btn.setAttribute('disabled', 'disabled')
        // show progress animation
        load.classList.add('spinner-grow')
        // authenticate user
        firebase.auth().signInWithEmailAndPassword('oriolaemmanuel199@gmail.com', '12345678').then(function success() {
            // remove progress animation
            load.classList.remove('spinner-grow')
            // Seccessfully logged in
            btn.removeAttribute('disabled')
          
        }).catch(function(error) {
            // Handle Errors here.
            // remove progress animation
            load.classList.remove('spinner-grow')
            btn.removeAttribute('disabled')
            // ...
          });
    }
    render() {
        
        return (
            <div>
                <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
                    <a className="navbar-brand" href="#">
                        <img src='/Logo.svg' alt='Company Logo' ></img>
                    </a>
                    <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
                        <div className="navbar-nav mr-auto">
                            <a className="nav-item nav-link active" href="#">Home <span className="sr-only">(current)</span></a>
                            <a className="nav-item nav-link" href="#">Profiles</a>
                            <a className="nav-item nav-link" href="#">Admins</a>
                        </div>
                        <form onSubmit={e => e.preventDefault()} className="form-inline my-2 my-lg-0">
                            <input className="form-control mr-sm-2" type="search" placeholder="Search" aria-label="Search"></input>
                            <button className="btn btn-outline-success my-2 my-sm-0" type="submit">Search</button>
                        </form>
                        <button onClick={()=> this.loginUser('button', 'loader')} id='button' className="btn btn-outline-success my-2 my-sm-0 ml-5">
                        <span id='loader' className="spinner-grow-sm" role="status" aria-hidden="true"></span>
                        Login</button>    
                    </div>
                </nav>
            </div>
        )
    }
}


export default NavBar