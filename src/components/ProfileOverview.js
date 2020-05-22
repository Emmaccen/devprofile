import React, {Component} from 'react'
import $ from 'jquery'

const firebase = require("firebase");
// Required for side-effects
require("firebase/firestore");

function viewProfile (id, props) {
    console.log(id)
    console.log(props)
}

function ProfileList (props) {
    return (
        <div className="card profileCard">
         <div style={{backgroundImage : `url(${props.url})`}} className='backgroundFix overviewImage'></div>
            <div className="card-body">
                <h5 className="card-title">{props.name}</h5>
                <p className="card-text">{props.summary}</p>
                 <a onClick={()=> viewProfile(props.id, props)} className="btn btn-outline-success">View Profile</a>
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