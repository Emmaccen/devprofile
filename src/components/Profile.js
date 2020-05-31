import React from 'react'
import $ from 'jquery'
import {Notification} from './Notification'
import {handleNotification} from './Notification'
import {logOutUser} from './AdminHeader'
import { Link } from 'react-router-dom'

const firebase = require("firebase");
// Required for side-effects
require("firebase/firestore");

class Profile extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            profile : {}
        }
        this.deleteProfile = this.deleteProfile.bind(this)
        this.updateProfile = this.updateProfile.bind(this)
    }

    FetchList (data,id) {
        // remove any initial list present
        $(id).children().remove()
        if(data.length === 0){
            let none = document.createElement('p')
            $(none).text('None')
            $(id).append(none)
        }else {
             // get the links 
         data.forEach( (links, index) => {
             let labels = ['TIME MANAGEMENT', 'TEAM WORK', 'COMMUNICATION', 'PERFORMANCE UNDER PRESSURE', 'CONFLICT RESOLUTION']
             if(id === '#popSoft' && links !== '') {
                 let label = document.createElement('label')
                 label.classList.add('progressHeading')
                 $(label).text(labels[index] + ` - ${links}`)
                 $(id).append(label)
                 let rating = document.createElement('progress')
                 const result = links.replace(/%/,'')
                 rating.setAttribute('value',result)
                 rating.setAttribute('max','100')
                 $(id).append(rating)
             }else if(id !== '#popSoft'){
                //  if we're not fetching soft skills
                if(id === '#popEducation' || id === '#popExperience'){
                 let list = document.createElement('li')
                 let resultLink = links.replace(/,/, ' : ')
                 $(list).text(resultLink)
                 $(id).append(list)
                }else {
                    let list = document.createElement('li')
                    let icon = document.createElement('span')
                    icon.classList = 'icon icon-link'
                    let anchor = document.createElement('a')
                    anchor.setAttribute('title', 'Open Link')
                    anchor.setAttribute('target', '_blank')
                   const link = links.split(',')
                    $(list).text(link[0])
                    $(anchor).text(link[1])
                    anchor.setAttribute('href', link[1])
                    list.append(icon)
                    list.append(anchor)
                    $(id).append(list)
                }

             }
        })
        }
        
    }
    
    viewProfile () {
    
        const data = this.state.profile.profileValues
        $('#popImg').css('backgroundImage', `url(${this.state.profile.imgUrl})`)
        $('#popName').text(data.name)
        $('#popTitle').text(data.title)
        $('#popSummary').text(data.summary)
        $('#popDo').text(data.aboutSummary)
        $('#popArchievement').text(data.archievementSummary)
        $('#popSkills').text(data.skillList)
        $('#popHobbies').text(data.hobbies)
    
        this.FetchList(data.media,'#popMedia');
        this.FetchList(data.education,'#popEducation');
        this.FetchList(data.experience,'#popExperience');
        this.FetchList(data.softSkills,'#popSoft');
        this.FetchList(data.projects,'#popProjects');
           
    }

    deleteProfile() {
        let db = firebase.firestore()
        let id = this.props.match.params.id
        db.collection('profiles').doc(id).delete().then( () => {
            handleNotification('Profile Deleted Successfuly ! :)')
        })
        
    }


    updateProfile () {
        let id = this.props.match.params.id
    }
    copyPublicLink () {
        let url = this.props.match.url
       console.log(this.props.match)
            var textArea = document.createElement("textarea");
            textArea.value = url;
            
            // Avoid scrolling to bottom
            textArea.style.top = "0";
            textArea.style.left = "0";
            textArea.style.position = "fixed";
          
            document.body.appendChild(textArea);
            textArea.focus();
            textArea.select();
        //   just in case we get errors
            try {
              var successful = document.execCommand('copy');
              if(successful){
                  handleNotification('Copied To Clipboard')
              }
            } catch (err) {
                handleNotification('Unable To Copy :(')
            }
          
            document.body.removeChild(textArea);
    }

    componentDidMount () {
       const id = this.props.match.params.id
       const data = firebase.firestore()
       data.collection('profiles').doc(id).get()
       .then( data => {
           console.log('Profile data is >>>>>> ', data.data())
           this.setState({profile : data.data()})
           console.log(this.state.profile.profileValues.name)
           this.viewProfile()
       })
  
    }

    render () {
        console.log(this.props.match.params.id)
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
                        <div className="navbar-nav mr-auto ml-5">
                            <Link to='/'>
                                <a onClick={this.props.updateState} className="nav-item nav-link active">Profiles <span className="sr-only">(current)</span></a>
                            </Link>
                            <a className="nav-item nav-link">Admins</a>
                            <Link to='/Content'>
                                <a className="nav-item nav-link">Content</a>
                            </Link>
                        </div>
                        {/* ================== */}
                        <button
                            onClick={()=> logOutUser('button', 'loader')}
                         id='logout' className="btn btn-outline-danger my-2 my-sm-0 ml-5">
                        <span id='loader' className="spinner-grow-sm" role="status" aria-hidden="true"></span>
                        Logout</button>
                    </div>
                </nav>
                <div className="profileWrapper">
                    <div>
                        <div className='profileTopSectionWrapper'>
                            <div id='popImg' className='backgroundFix popImage'>

                            </div>
                            <div className='centered'>
                                <h1 id='popName'></h1>
                                <h2 id='popTitle'></h2>
                                <p id='popSummary'></p>
                            </div>
                        </div>
                    </div>

                    <div className='grid2'>
                        <div className='floated'>
                            <h2 className='heading'>
                                <span className='icon icon-graduation-cap'></span>Education</h2>
                            <ul id='popEducation'>
                                
                            </ul>
                        </div>
                        <div className='floated'>
                            <h2 className='heading'>
                                <span className='icon icon-briefcase2'></span>Experience</h2>
                            <ul id='popExperience'>
                                    
                            </ul>
                        </div>
                    </div>
                    <div className='relative aboutSection'>
                        <div className='liner'></div>
                        <div>
                            <h2 className='newSection'>
                                <span className='icon icon-info'></span>About</h2>
                        </div>
                        <div className='spacer floated'>
                            <h4 className='subHeading'>
                            <span className='icon icon-laptop3'></span>What I Do</h4>
                            <p id='popDo'></p>
                        </div>
                        <div className='spacer floated'>
                            <h4 className='subHeading'>
                            <span className='icon icon-graduation-cap'></span>Archievements</h4>
                            <p id='popArchievement'></p>
                        </div>
                        <div className='spacer floated'>
                            <h4 className='subHeading'>
                            <span className='icon icon-spinner4'></span>Skills</h4>
                            <p id='popSkills'></p>
                        </div>
                        <div className='spacer floated'>
                            <h4 className='subHeading'>
                            <span className='icon icon-headphones'></span>Hobbies</h4>
                            <p id='popHobbies'></p>
                        </div>
                    </div>

                    <div className='relative'>
                        <div className='liner'></div>
                        <h2 className='newSection'>
                        <span className='icon icon-happy'></span>Soft Skils</h2>
                        <div className='spacer'>
                            <div id='popSoft'>
                                <label className='subHeading'></label>
                                <progress max="100"></progress>
                            </div>
                        </div>
                    </div>

                    <div className='projectSection relative'>
                        <div className='liner'></div>
                        <h2 className='newSection'>
                        <span className='icon icon-beaker'></span>Projects And Media
                        <span className='icon icon-link'></span></h2>
                        <div className='spacer'>
                            <h4 className='subHeading'>
                            <span className='icon icon-tool-2'></span>Projects</h4>
                            <ul id='popProjects'>

                            </ul>
                        </div>
                        <div className='spacer'>
                            <h4 className='subHeading'>
                            <span className='icon icon-link'></span>Media</h4>
                            <ul id='popMedia'>
                                
                            </ul>
                        </div>
                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn closeBtn btn-outline-dark" 
                        onClick={()=> this.copyPublicLink()} data-dismiss="modal">Copy Profile Link</button>
                        <button
                        onClick={this.deleteProfile} type="button"  className="btn btn-outline-danger">Delete Profile</button>
                        <button
                        type="button" className="btn btn-outline-success">Update Profile</button>
                    </div>
                </div>

                {/* notification handler right here  :) */}

                < Notification />
            </div>
        )
    }
}

export default Profile