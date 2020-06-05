import React, {Component} from 'react'
import NavBar from './NavBar'
import $ from 'jquery'
const firebase = require("firebase");

function openDialogu () {
    $('.blur').css('filter', 'blur(5px)')
    $('.loginWrapper').css('display', 'flex')
}

$(document).ready(function () {
    $('.formCloseBtn').click( function (e) {
        $('.loginWrapper').fadeOut()
        $('.blur').css('filter', 'blur(0px)')
    })
})


function  loginUser (button, loader) {
    const load = document.getElementById(loader)
    const btn = document.getElementById(button)
    const formMail = $('.formMail').val()
    const formPassword = $('.formPassword').val()
    // notify and restrict clicks while processing
    btn.setAttribute('disabled', 'disabled')
    // show progress animation
    load.classList.add('spinner-grow')
    // authenticate user
    firebase.auth().signInWithEmailAndPassword(formMail, formPassword).then(function success() {
        // remove progress animation
        load.classList.remove('spinner-grow')
        // Seccessfully logged in
        btn.removeAttribute('disabled')
      
    }).catch(function(error) {
        // Handle Errors here.
        $('.formError').text(error)
        // remove progress animation
        load.classList.remove('spinner-grow')
        btn.removeAttribute('disabled')
        // ...
      });
}

function LoginDialoge() {
    return (
        <div className='loginWrapper'>
            <p title='Close' className='formCloseBtn'>X</p>
            <div className='loginDialoge'>
                <div className='centered'><p className='formError'></p></div>
                <form className='loginForm'>
                    <label>Email</label>
                    <input required className='form-control formMail' type='email' placeholder='Email'></input>
                    <label>Password</label>
                    <input required className='form-control formPassword' type='password' placeholder='Password'></input>
                    <div className='centered'>
                        <button onClick={()=> loginUser('loginButton', 'loading')} type='submit' id='loginButton' className="btn btn-outline-success">
                            <span id='loading' className="spinner-grow-sm" role="status" aria-hidden="true"></span>Login
                        </button>                      
                    </div>              
                </form>
            </div>
        </div>
    )
}


class HomePage extends Component {

    render () {

        return (
            
            <div className='relative'>
                < LoginDialoge />
                <div className='blur'>
                    <NavBar />
                    <div className="backgroundFix homeBg">
                        <div className='introTextContainer'>
                            <div>
                                <h1>Hot-spot for the best talents in the world</h1>
                            </div>
                            <div>
                                <p className='fadeText'>Developer <span>|</span> Professionals</p>
                            </div>
                            <div>
                                <p className='descriptionText' style={{color : 'whitesmoke'}}>
                                Are you a designer? Developer? or Product Manager? Unlock the possibilities of worldwide acknowledgement.
                                </p>
                            </div>
                            <div>
                            <button type='button' onClick={()=> openDialogu()} className="btn btn-outline-success"> BECOME
                            </button>  
                            </div>
                        </div>                                        

                        </div>
                        <div class="container">
                                <div class="bosses">
                                    <div class="sideImg">
                                        <img src="/images/nina.jpg" alt="boss"></img>
                                    </div>
                                    <div class="bossContent">
                                        <div class="holder">
                                            <div class="bossHeader">
                                            <h2>
                                                Meet The
                                                <span class="highlight">Bosses</span>
                                            </h2>
                                            </div>
                                            <div class="">
                                            <p class="descriptionText"> Lorem ipsum dolor sit amet consectetur adipisicing elit. Minima, ratione molestias reprehenderit exercitationem debitis voluptas ipsam.
                                            </p>
                                            <p class="descriptionText">
                                            Lorem ipsum dolor sit amet consectetur adipisicing elit. Minima, ratione molestias reprehenderit exercitationem debitis voluptas ipsam quasi sint 
                                            quas odio non! Velit maxime, quae voluptatum ad exercitationem non voluptates explicabo.
                                            </p>
                                            <div className=''>
                                            <button onClick={() => openDialogu()} className="btn btn-outline-success">JOIN NOW</button>                                               
                                            </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>  
                            
                            {/* ======================================================== */}
                            
                            <div>
                                <div className='servicesHeader'>
                                    <center><h2>Explore Talents As You May</h2></center>
                                </div>
                                <div className='exploreContainer container'>

                                <div className='cardContainer'>
                                    <h3 className='fadeText'><span className='icon-search'></span>PREVIEW</h3>
                                    <p className='descriptionText2'>
                                    Some commone things that you wish to tell your customers
                                    about what you can do for them. Get it ?
                                    </p>
                                </div>

                                <div className='cardContainer'>
                                    <h3 className='fadeText'><span className='icon-documents2'></span>ANALIZE</h3>
                                    <p className='descriptionText2'>
                                    Some commone things that you wish to tell your customers
                                    about what you can do for them. Get it ?
                                    </p>
                                </div>

                                <div className='cardContainer'>
                                    <h3 className='fadeText'><span className='icon-thumbs-up'></span>DECIDE</h3>
                                    <p className='descriptionText2'>
                                    Some commone things that you wish to tell your customers
                                    about what you can do for them. Get it ?
                                    </p>
                                </div>

                                <div className='cardContainer'>
                                    <h3 className='fadeText'><span className='icon-checkmark2'></span>EMPLOY</h3>
                                    <p className='descriptionText2'>
                                    Some commone things that you wish to tell your customers
                                    about what you can do for them. Get it ?
                                    </p>
                                </div>

                                </div>
                            </div>


                            <div>
                                <div className='centered'>
                                    <h1 id='devHeader'>The Right Employee's Just A Click Away</h1>
                                </div>

                                <div className='devContainer container'>

                                <div className='devs'>
                                    <div style={{backgroundImage : `url(${'/images/em.jpg'})`}} className='blogsBg'></div>
                                    <div className='devTextContainer'>
                                    <h2>Oriola Emmanuel</h2>
                                    <small><span className='icon-spinner4 icon'></span>Full Stack Web Developer</small>
                                    <p className='devText'>
                                        Lorem ipsom dolor and some really shitty stuffs i don't care about
                                        Lorem ipsom dolor and some really shitty stuffs i don't care about
                                    </p>
                                    </div>
                                </div>

                                <div className='devs'>
                                    <div style={{backgroundImage : `url(${'/images/dreyy.jpg'})`}} className='blogsBg'></div>
                                    <div className='devTextContainer'>
                                    <h2>Precious Adigun</h2>
                                    <small><span className='icon-spinner4 icon'></span>React Developer</small>
                                    <p className='devText'>
                                        Lorem ipsom dolor and some really shitty stuffs i don't care about
                                        Lorem ipsom dolor and some really shitty stuffs i don't care about
                                    </p>
                                    </div>
                                </div>

                                <div className='devs'>
                                    <div style={{backgroundImage : `url(${'/images/nioa.jpg'})`}} className='blogsBg'></div>
                                    <div className='devTextContainer'>
                                    <h2>Jamie Spears</h2>
                                    <small><span className='icon-spinner4 icon'></span>Backend Developer</small>
                                    <p className='devText'>
                                        Lorem ipsom dolor and some really shitty stuffs i don't care about
                                        Lorem ipsom dolor and some really shitty stuffs i don't care about
                                    </p>
                                    </div>
                                </div>

                                </div>
                            </div>
                    </div>
            </div>
        )
    }
}

export { HomePage }
export { openDialogu }