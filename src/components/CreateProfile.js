import React from 'react'
import $ from 'jquery'
import { Link } from 'react-router-dom'
import { logOutUser } from './AdminHeader'
import {Notification} from './Notification'
import {handleNotification} from './Notification'

var file = ''
const firebase = require("firebase");
// Required for side-effects
require("firebase/firestore");


class CreateProfile extends React.Component {


// handle form submission

handleSubmit (event) {
    event.preventDefault()

    const storageRef = firebase.storage().ref()

    // function to grab all lists in the form
   function getListValues (element, target){
    // grab the list values
    let elem = $(element).children()
// check if there's actually a list
    if(elem.length > 0) {
        for(let i = 0; i <elem.length; i++){
            // add list values to target variable
            target.push(elem[i].textContent)
        }
    }else {
        console.log('no child bro !')
    }
    
    }


    // form values
    /* i use let keyword here cuz i wanna get a fresh variable each time 
    this function is invoked */
    let profileImage = $('#profileImage')
    let name = $('#name').val()
    let title = $('#title').val()
    let summary = $('#summary').val()
    let education = []
    let experience = []
    let projectList = []
    let mediaList = []
    let aboutSummary = $('#aboutSummary').val()
    let archievementSummary = $('#archievementSummary').val()
    let skillList = $('#skillList').val()
    let hobbies = $('#hobbies').val()
    let timeManagement = $('#timeManagement').val()
    let teamWork = $('#teamWork').val()
    let communication = $('#communication').val()
    let performance = $('#performance').val()
    let conflictResolution = $('#conflictResolution').val()

    
    /* some fields are required like name and tittle 
    so here we wanna first validate and make sure those inputs are provided  */

    if(event.target.type === 'file'){
        // && event.target.files[0].name === ''
         file = event.target.files[0]
         console.log(file)
    }else if(name === '' || title === '' || summary === '' 
    || aboutSummary === '' || skillList === '' || hobbies === '' || file === ''){
        // if any of the provided checks is empty ? alert user
        console.log(file)
        alert('Fields Marked Red And Profile Picture Are Required !')
    }else {
        // everything looks good so, go ahead and try to upload the profile

        // lets grab all the list values from the form

    getListValues('#eduList', education)
    getListValues('#experience', experience)
    getListValues('#projectList', projectList)
    getListValues('#mediaList', mediaList)

    console.log(education,experience,projectList,mediaList)
    
    const profileValues = {
            name : name,
            title : title,
            summary : summary,
            education : education,
            experience : experience,
            aboutSummary : aboutSummary,
            archievementSummary : archievementSummary,
            skillList : skillList,
            hobbies : hobbies,
            softSkills : [timeManagement,teamWork,communication,conflictResolution,performance],
            projects : projectList,
            media : mediaList
        }

        console.log(profileValues)
        
        const db = firebase.firestore()
        // write profile to database

        db.collection('profiles').add({
            profileValues
        })
        .then( result => {
            // upload image
            storageRef.child(result.id).put(file).then(() => {
                handleNotification('Profile Picture Uploaded')
                storageRef.child(result.id).getDownloadURL().then( url => {
                const merge =  db.collection('profiles').doc(result.id).set({
                        imgUrl: url
                    }, { merge: true });
                })
            })
            handleNotification('Document successfully written!')
        })
        .catch(function(error) {
            handleNotification('Error writing document: ' + error)
        });
    }

    
}
    
    /* Create a super method that takes any number of argument */
    
    addSection (...args) {
        // again, we use let keyword as we want all variables garbaged collected as func completes
       let passed =  args.map(elements => {
        //    retrieve the values of the elements passed as argument
            return $(elements).val()
        })
        // destructure / remove the first element (since we won't be using its value)
        let [ ,...values] = passed

        // now check if we have any empty value 
        let isEmpty = null

       for(let i = 0; i < values.length; i++){
           if(values[i] === ''){
               console.log('empty...')
               isEmpty = true
               break
           }
       }

       if(!isEmpty){
           // get the first element so we can populate it with lists
           let newSection = $(args[0])
           let newLists = document.createElement('li');
           newLists.setAttribute('title', 'Remove')
           newLists.addEventListener('click', event => {
               $(event.target).remove()
           })
           // add the values to the new list
           newLists.innerHTML = values
           newSection.append(newLists)
           args.forEach(elem => {
               $(elem).val('')
           })
           
       }
        
    }



    render () {

        return (
                <div>
                     <div>
                        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
                            <a className="navbar-brand" href="#">
                                <img src='/Logo.svg' alt='Company Logo' ></img>
                            </a>
                            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
                                <span className="navbar-toggler-icon"></span>
                            </button>
                            <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
                                <div className="navbar-nav mr-auto ml-5">
                                    <Link to='/'>
                                        <a className="nav-item nav-link active">Profiles <span className="sr-only">(current)</span></a>
                                    </Link>
                                    <a className="nav-item nav-link">Admins</a>
                                    <Link to='/Content'>
                                        <a className="nav-item nav-link">Content</a>
                                    </Link>
                                </div>
                                {/* <button
                                    onClick={()=> logOutUser('button', 'loader')}
                                id='logout' className="btn btn-outline-danger my-2 my-sm-0 ml-5">
                                <span id='loader' className="spinner-grow-sm" role="status" aria-hidden="true"></span>
                                Logout</button> */}
                            </div>
                        </nav>
                    </div >
                    <div  className='container2'>
                        <form  onSubmit={this.handleSubmit} encType="multipart/form-data" className='formGroup'>
                                <div className='centered'>
                                <div className='backgroundFix profileImage'>

                                </div>
                                <input onChange={this.handleSubmit} id='profileImage' type='file'
                                accept='.jpg, .jpeg, .png'></input>
                            </div>

                            <hr></hr>

                            <div className='section2'>
                                <div className='grid2'>
                                    <div>
                                        <label className='required' htmlFor='name'>Full Name</label>
                                        <input required placeholder='John Doe' className='form-control' type='name' id='name'></input>
                                    </div>
                                    <div>
                                        <label className='required' htmlFor='title'>Title</label>
                                        <input required className='form-control' type='text' id='title' placeholder='Full Stack Web Developer....'></input>
                                    </div>
                                </div>
                                <label className='required'>Professional Summary</label>
                                <textarea required id='summary' placeholder='Am a software developer with a thriving passion for technology and its use cases in the real world.'
                                maxLength='150' className='form-control'></textarea>

                                <p>Education</p>

                                <div className='educationWrapper'>
                                    <label>Add Education</label>

                                    <div className='populateAble'>
                                        <div className='fluidGrid'>
                                            <input id='collegeName' className='form-control' placeholder='College Name'></input>
                                            <input id='discipline' className='form-control' placeholder='Discipline'></input>
                                            <select name="" id="graduationYear">
                                                <option value="">Graduation Year</option>
                                                <option value="2028">2028</option>
                                                <option value="2027">2027</option>
                                                <option value="2026">2026</option>
                                                <option value="2025">2025</option>
                                                <option value="2024">2024</option>
                                                <option value="2023">2023</option>
                                                <option value="2022">2022</option>
                                                <option value="2021">2021</option>
                                                <option value="2020">2020</option>
                                                <option value="2019">2019</option>
                                                <option value="2018">2018</option>
                                                <option value="2017">2017</option>
                                                <option value="2016">2016</option>
                                                <option value="2015">2015</option>
                                                <option value="2014">2014</option>
                                                <option value="2013">2013</option>
                                                <option value="2012">2012</option>
                                                <option value="2011">2011</option>
                                                <option value="2010">2010</option>
                                                <option value="2009">2009</option>
                                                <option value="2008">2008</option>
                                                <option value="2007">2007</option>
                                                <option value="2006">2006</option>
                                                <option value="2005">2005</option>
                                                <option value="2004">2004</option>
                                                <option value="2003">2003</option>
                                                <option value="2002">2002</option>
                                                <option value="2001">2001</option>
                                                <option value="2000">2000</option>
                                                <option value="1999">1999</option>
                                                <option value="1998">1998</option>
                                                <option value="1997">1997</option>
                                                <option value="1996">1996</option>
                                                <option value="1995">1995</option>
                                                <option value="1994">1994</option>
                                                <option value="1993">1993</option>
                                                <option value="1992">1992</option>
                                                <option value="1991">1991</option>
                                                <option value="1990">1990</option>
                                                <option value="1989">1989</option>
                                                <option value="1988">1988</option>
                                                <option value="1987">1987</option>
                                                <option value="1986">1986</option>
                                                <option value="1985">1985</option>
                                                <option value="1984">1984</option>
                                                <option value="1983">1983</option>
                                                <option value="1982">1982</option>
                                                <option value="1981">1981</option>
                                                <option value="1980">1980</option>
                                                <option value="1979">1979</option>
                                                <option value="1978">1978</option>
                                                <option value="1977">1977</option>
                                                <option value="1976">1976</option>
                                                <option value="1975">1975</option>
                                                <option value="1974">1974</option>
                                                <option value="1973">1973</option>
                                                <option value="1972">1972</option>
                                                <option value="1971">1971</option>
                                                <option value="1970">1970</option>
                                                <option value="1969">1969</option>
                                                <option value="1968">1968</option>
                                                <option value="1967">1967</option>
                                                <option value="1966">1966</option>
                                                <option value="1965">1965</option>
                                                <option value="1964">1964</option>
                                                <option value="1963">1963</option>
                                                <option value="1962">1962</option>
                                                <option value="1961">1961</option>
                                                <option value="1960">1960</option>
                                            </select>
                                            <button onClick={ () => this.addSection('#eduList','#collegeName','#discipline','#graduationYear')} id='addEducationBtn' type='button' className='btn btn-outline-success'>Add</button>
                                        </div>
                                        <ul id='eduList'>
                                            {/* new list goes here */}
                                        </ul>
                                    </div>

                                    <label>Add Experience</label>

                                    <div>
                                        <div className='fluidGrid'>
                                            <input id='companyName' className='form-control' placeholder='Company Name'></input>
                                            <input id='jobRole' className='form-control' placeholder='Job Role'></input>
                                            <input id='employmentYear' min='1970' className='form-control' placeholder='Year Of Employment' type='number'></input>
                                            <button onClick={ () => this.addSection('#experience','#companyName','#jobRole','#employmentYear')} type='button' className='btn btn-outline-success'>Add</button>
                                        </div>
                                        <ul id='experience'>
                                            {/* new list goes here */}
                                        </ul>

                                        {/* <textarea id='jobSummary' placeholder='Job Summary' className='form-control'></textarea> */}
                                    </div>
                                </div>
                            </div>

                            <hr></hr>

                            <div className='section3'>
                                <p>About</p>
                                <div className='aboutWrapper'>
                                    <label className='required'>WHAT I DO</label>
                                    <textarea required id='aboutSummary' placeholder='Discribe what you have done, what you are doing and the kind of 
                                    things that you are interested'
                                    maxLength='300' className='form-control'>
                                    </textarea>
                                    <label>ACHIEVEMENTS</label>
                                    <textarea id='archievementSummary' placeholder='Describe the great and impressive things you have done and what you are working on. Feel freee to boast and express your strenghts.'
                                    maxLength='300' className='form-control'>
                                    </textarea>
                                    <label className='required'>SKILLS</label>
                                    <input required id='skillList' placeholder='React.js, Firebase, Nodejs, PHP, HTML5, CSS3 ...' className='form-control'></input>
                                    <label className='required'>HOBBIES</label>
                                    <input required id='hobbies' placeholder='Music, Blogging, ....' className='form-control'></input>
                                </div>
                                <div className='softSkills'>
                                    <label>SOFT SKILLS</label>
                                    <div className='softSkillsWrapper'>
                                        <div className='rating'>
                                            <label>TIME MANAGEMENT</label>
                                            <select id='timeManagement' className='form-control'>
                                                <option></option>
                                                <option>10%</option>
                                                <option>20%</option>
                                                <option>30%</option>
                                                <option>40%</option>
                                                <option>50%</option>
                                                <option>60%</option>
                                                <option>70%</option>
                                                <option>80%</option>
                                                <option>90%</option>
                                            </select>
                                        </div>

                                        <div className='rating'>
                                            <label>TEAM WORK</label>
                                            <select id='teamWork' className='form-control'>
                                                <option></option>
                                                <option>10%</option>
                                                <option>20%</option>
                                                <option>30%</option>
                                                <option>40%</option>
                                                <option>50%</option>
                                                <option>60%</option>
                                                <option>70%</option>
                                                <option>80%</option>
                                                <option>90%</option>
                                            </select>
                                        </div>

                                        <div className='rating'>
                                            <label>COMMUNICATION</label>
                                            <select id='communication' className='form-control'>
                                                <option></option>
                                                <option>10%</option>
                                                <option>20%</option>
                                                <option>30%</option>
                                                <option>40%</option>
                                                <option>50%</option>
                                                <option>60%</option>
                                                <option>70%</option>
                                                <option>80%</option>
                                                <option>90%</option>
                                            </select>
                                        </div>

                                        <div className='rating'>
                                            <label>PERFORMANCE UNDER PRESSURE</label>
                                            <select id='performance' className='form-control'>
                                                <option></option>
                                                <option>10%</option>
                                                <option>20%</option>
                                                <option>30%</option>
                                                <option>40%</option>
                                                <option>50%</option>
                                                <option>60%</option>
                                                <option>70%</option>
                                                <option>80%</option>
                                                <option>90%</option>
                                            </select>
                                        </div>

                                        <div className='rating'>
                                            <label>CONFLICT RESOLUTION</label>
                                            <select id='conflictResolution' className='form-control'>
                                                <option></option>
                                                <option>10%</option>
                                                <option>20%</option>
                                                <option>30%</option>
                                                <option>40%</option>
                                                <option>50%</option>
                                                <option>60%</option>
                                                <option>70%</option>
                                                <option>80%</option>
                                                <option>90%</option>
                                            </select>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className='section4'>
                                <p>PROJECTS</p>
                                <div className='projectsWrapper'>
                                    <div className='fluidGrid'>
                                        <input id='projectName' className='form-control' placeholder='Project Name'></input>
                                        <input id='projectUrl' type='url' className='form-control' placeholder='Project URL'></input>
                                        <button onClick={ () => this.addSection('#projectList','#projectName','#projectUrl')} type='button' className='btn btn-outline-success'>Add Project</button>
                                    </div>
                                    
                                    <ul id='projectList'>
                                            {/* new list goes here */}
                                    </ul> 

                                    <hr></hr>
                                    <p>MEDIA</p>
                                    <div className='fluidGrid'>
                                        <input id='mediaHandles' className='form-control' placeholder='GitHub, Mail, Twitter ...'></input>
                                        <input id='mediaUrl' type='url' className='form-control' placeholder='Media URL'></input>
                                        <button onClick={ () => this.addSection('#mediaList','#mediaHandles','#mediaUrl')} type='button' className='btn btn-outline-success'>Add Link</button>
                                    </div>
                                    
                                    <ul id='mediaList'>
                                            {/* new list goes here */}
                                    </ul> 
                                    
                                </div>
                            </div>
                            <div className="modal-footer">
                            <button type="button" className="closeBtn btn btn-danger" data-dismiss="modal">Cancel</button>
                            <button type="submit" className="btn btn-outline-success">Create Profile</button>
                            </div>                                        
                        </form>
                    </div>
                    <Notification />
                </div>
        )
    }
}


export default CreateProfile