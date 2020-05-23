import React, {Component} from 'react'
import NavBar from './NavBar'
const firebase = require("firebase");

class HomePage extends Component {

    loginUser (button, loader) {
        const load = document.getElementById(loader)
        const btn = document.getElementById(button)
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

    render () {

        return (
            // className='backgroundFix homepageContainer'
            <div>
                <NavBar />
                {/* <div className="jumbotron">
                    <h1 className="display-4">Hello, world!</h1>
                    <p className="lead">This is a simple hero unit, a simple jumbotron-style component for calling extra attention to featured content or information.</p>
                    <p>It uses utility classNamees for typography and spacing to space content out within the larger container.</p>
                    <a className="btn btn-primary btn-lg" href="#" role="button">Get Started</a>
                </div> */}
                <div className="home">
                    <section className="subHead">
                        <div className="enroll">
                            <h3>Join the list of in-demand talents around the world</h3>
                        </div>
                        <button onClick={()=> this.loginUser('become', 'loading')} id='become' className="btn btn-outline-success my-2 my-sm-0 ml-5">
                        <span id='loading' className="spinner-grow-sm" role="status" aria-hidden="true"></span>
                        BECOME</button>
                    </section> 

                    <section className="mainHead">
                        <div className="inner">
                            <h2>Hot-spot for the best talents in the world.</h2>
                            <p>Are you a designer? Developer? or Product Manager? Unlock the possibilities of worldwide acknowledgement. </p>
                                
                            <div className="cards">
                                <div className="card1">
                                    <h3>EMMANUEL ORIOLA</h3>
                                    <p id="showcase">Fullstack Web Developer</p>                
                                </div>

                                <div className="card2">
                                    <h3>NINA KARMA</h3>
                                    <p id="showcase">Graphics Designer</p>                
                                </div>

                                <div className="card3">
                                    <h3>ADIGUN OLUWADAMILARE</h3>
                                    <p id="showcase">Product Designer</p>                
                                </div>
                                    <div className="card4">
                                        <h3>SANDRA NIOA</h3>
                                        <p id="showcase">Fullstack Web Developer</p>                
                                    </div>
                                </div>
                            </div>
                    </section> 

                </div>
            </div>
        )
    }
}

export default HomePage