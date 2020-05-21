import React from 'react'
import AdminHeader from './AdminHeader'
import ProfileMaker from './ProfileMaker'
import $ from 'jquery'

const firebase = require("firebase");
// Required for side-effects
require("firebase/firestore");

class Admin extends React.Component {

    // handle form submission

handleSubmit () {


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

    if(name === '' || title === '' || summary === '' 
    || aboutSummary === '' || skillList === '' || hobbies === ''){
        // if any of the provided checks is empty ? alert user

        alert('Fields Marked Red Are Required !')
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

        // db.collection(name).add({
        //     profileValues
        // })
        // .then(function() {
        //     console.log("Document successfully written!");
        // })
        // .catch(function(error) {
        //     console.error("Error writing document: ", error);
        // });
    }

    
}
    render () {
        return (
            <div>
                <AdminHeader />
                <ProfileMaker 
                handleSubmit = {this.handleSubmit} 
                />
                
            </div>
        )
    }
}

export default Admin