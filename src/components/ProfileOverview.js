import React, {Component} from 'react'
import $ from 'jquery'
import { Link } from 'react-router-dom'

const firebase = require("firebase");
// Required for side-effects
require("firebase/firestore");

function ProfileList (props) {
    return (
        <div className="card profileCard">
         <div style={{backgroundImage : `url(${props.url})`}} className='backgroundFix overviewImage'></div>
            <div className="card-body">
                <h5 className="card-title">{props.name}</h5>
                <p className="card-text">{props.summary}</p>
                 <Link to={`/Profile/${props.id}`}>
                    <p className="btn btn-outline-success">View Profile</p>
                </Link>
             </div>
        </div> 
    )
}

class ProfileOverview extends Component {

    constructor(props) {
        super(props) 
       
    }


    render () {
        console.log('profile >>>>>>>>>>> ', this.props.data)
        const grabValues = this.props.data
        const profiles = grabValues.map(details => {
            return < ProfileList 
                name = {details.name}
                summary = {details.summary}
                id = {details.id}
                url = {details.url}
                data = {details}
                text = {this.props.text}
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
