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
updateState(){
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
        
    });
    // pull values out
    this.setState({values : result})
});
}
    componentDidMount () {
       this.updateState()
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
        return (
            <div className='createdProfiles'>
               {profiles}
            </div>
        )
    }
}


export default ProfileOverview
