import React, {Component} from 'react'
import $ from 'jquery'

const firebase = require("firebase");
// Required for side-effects
require("firebase/firestore");


function FetchList (data,id) {
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
             $(label).text(labels[index])
             $(id).append(label)
             let rating = document.createElement('progress')
             const result = links.replace(/%/,'')
             rating.setAttribute('value',result)
             rating.setAttribute('max','100')
             $(id).append(rating)
         }else if(id !== '#popSoft'){
             let linkTag = document.createElement('li')
             let resultLink = links.replace(/,/, ' : ')
             $(linkTag).text(resultLink)
             $(id).append(linkTag)
         }
    })
    }
    // console.log(data)
}
function viewProfile (props) {

    const {data} = props
    $('#popImg').css('backgroundImage', `url(${props.url})`)
    $('#popName').text(props.name)
    $('#popTitle').text(props.title)
    $('#popSummary').text(props.summary)
    $('#popDo').text(data.aboutSummary)
    $('#popArchievement').text(data.archievementSummary)
    $('#popSkills').text(data.skillList)
    $('#popHobbies').text(data.hobbies)

    FetchList(data.media,'#popMedia');
    FetchList(data.education,'#popEducation');
    FetchList(data.experience,'#popExperience');
    FetchList(data.softSkills,'#popSoft');
    FetchList(data.projects,'#popProjects');
    console.log('>>>>>', data)

    /*
    {aboutSummary: "Am a Front-End developer making his way to Full-St…cript, HTML5, CSS3, JQuery and UI/UX using Figma.", media: Array(1), 
    summary: "Am a software developer with a thriving passion for technology and its use cases in the real world.", 
    softSkills: Array(5), education: Array(2), …}aboutSummary: "Am a Front-End developer making his way to Full-Stack and Currently growing my career in the echo system. I currently build web applications using Frameworks like React.js, and am experienced with JavaScript, HTML5, CSS3, JQuery and UI/UX using Figma."archievementSummary: "While Going through my journey as software developer, I've engaged and made a habit of working on real world projects, such as building applications for neighbors, nearby companies and startups.↵Am always driven to create values and improve the lives of people around me."education: (2) ["Harvard,Computer Science,2020", "oxford,medicine,2024"]experience: (2) ["ArtCab,Web Developer,2020", "Echo Digital,Web Developer,2020"]
    hobbies: "Music Blogging"id: "K0nKPqGfwDYi8DquGk6e"media: ["GitHub,http://github.com/"]name: "Emmanuel Oriola"projects: []skillList: "React, java"softSkills: (5) ["80%", "90%", "80%", "70%", "80%"]summary: "Am a software developer with a thriving passion for technology and its use cases in the real world."title: "Full stack Web Developer"url: "https://firebasestorage.googleapis.com/v0/b/devlookup.appspot.com/o/K0nKPqGfwDYi8DquGk6e?alt=media&token=e69da338-b5c8-40db-a8d8-74d683e2c461"__proto__: Object
     */
}

function ProfileList (props) {
    return (
        <div className="card profileCard">
         <div style={{backgroundImage : `url(${props.url})`}} className='backgroundFix overviewImage'></div>
            <div className="card-body">
                <h5 className="card-title">{props.name}</h5>
                <p className="card-text">{props.summary}</p>
                 <a onClick={()=> viewProfile(props)} className="btn btn-outline-success"
                 data-toggle="modal" data-target=".bd-example-modal-lg">View Profile</a>
             </div>
        </div> 
    )
}

class ProfileOverview extends Component {

    constructor() {
        super() 
        this.state = {
            values : []
        }
    }
    
// get all database's profiles 

    componentDidMount () {
        // const storageRef = firebase.storage()
        const db = firebase.firestore()
        const  result = []
       db.collection("profiles").get()
        .then(querySnapshot => {
            querySnapshot.forEach(function(doc) {
                let val = doc.data().profileValues
                let url = doc.data().imgUrl
                // add the unique id to the object
                val.id = doc.id
                // add link to url
                val.url = url
                result.push(val)
                console.log(val)
            });
            // pull values out
            this.setState({values : result})
            // db.collection("profiles").doc().onSnapshot(function(data) {
            //     console.log(data.data())
            // })
        });
    }

    render () {
        const grabValues = this.state.values
        const profiles = grabValues.map(details => {
            return < ProfileList 
                name = {details.name}
                summary = {details.summary}
                id = {details.id}
                url = {details.url}
                data = {details}
            />
        })
        // console.log('profiles.........',grabValues)
        return (
            <div className='createdProfiles'>
               {profiles}
            </div>
        )
    }
}


export default ProfileOverview