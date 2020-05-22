import React from 'react'
import AdminHeader from './AdminHeader'
import ProfileMaker from './ProfileMaker'
import ProfileOverview from './ProfileOverview'
import ProfilePopUp from './ProfilePopUp'
import $ from 'jquery'

var file = ''
const firebase = require("firebase");
// Required for side-effects
require("firebase/firestore");

class Admin extends React.Component {

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
    // ============================

    // let collegeName = $('#collegeName').val()
    // let discipline = $('#discipline').val()
    // let graduationYear = $('#graduationYear').val()

    // =============================

    // let companyName = $('#companyName').val()
    // let jobRole = $('#jobRole').val()
    // let employmentYear = $('#employmentYear').val()

    // let jobSummary = $('#jobSummary').val()
 

    // let projectName = $('#projectName').val()
    // let projectUrl = $('#projectUrl').val()
    // let mediaHandles = $('#mediaHandles').val()
    // let mediaUrl = $('#mediaUrl').val()

    // console.log(name,title,summary,collegeName,discipline,graduationYear,companyName
    //     ,jobRole,employmentYear,jobSummary, aboutSummary,archievementSummary,skillList,
    //     hobbies,timeManagement,teamWork,communication,conflictResolution,performance,
    //     projectName,projectUrl,mediaHandles,mediaUrl)

    
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
        .then(function(result) {
            // upload image
            storageRef.child(result.id).put(file).then(function () {
                console.log('file uploaded....')
                storageRef.child(result.id).getDownloadURL().then(function (url) {
                const merge =  db.collection('profiles').doc(result.id).set({
                        imgUrl: url
                    }, { merge: true });
                })
            })
            console.log("Document successfully written!");
        })
        .catch(function(error) {
            console.error("Error writing document: ", error);
        });
    }

    
}


    render () {
        return (
            <div>
                <AdminHeader />
                <ProfileMaker 
                handleSubmit = {this.handleSubmit} 
                handleUpload = {this.handleImageUpload}/>
                <div className='container profileOverviewWrapper'>
                    <ProfileOverview />
                    {/* <ProfilePopUp />                                   */}
                </div>
            </div>
        )
    }
}

export default Admin