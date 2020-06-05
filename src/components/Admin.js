import React from 'react'
import { AdminHeader } from './AdminHeader'
import ProfileOverview from './ProfileOverview'
import {Notification} from './Notification'
import {handleNotification} from './Notification'
import $ from 'jquery'

const firebase = require("firebase");
// Required for side-effects
require("firebase/firestore");

class Admin extends React.Component {

    constructor () {
        super ()
        this.state = {
            values : []
        }
        this.updateState = this.updateState.bind(this)
        this.searchProfile = this.searchProfile.bind(this)
    }

        // get all database's profiles 
    updateState (){
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

searchProfile () {
    const  result = []
    let searchQuery = $('.search').val()
    let db = firebase.firestore()
    db.collection('profiles').get().then( docs => {
        docs.forEach( doc => {
            let value = doc.data().profileValues
            let url = doc.data().imgUrl
            if(value.name.toLowerCase().trim() === searchQuery.toLowerCase().trim()){
                // found a matching name
                 // add the unique id to the object
            value.id = doc.id
            // add link to url
            value.url = url
            result.push(value)
            }else {
                // no match bruver ! :)
                if(searchQuery.toLowerCase().trim() + '' === ''){
                    handleNotification('Empty Search : No Match Found !')
                }else {
                    handleNotification('No Match Found !')
                }
            }
            // only set state if we actually get something from database
            if(result.length !== 0){
                this.setState({values : result})
            }
         })
    })

}

    componentDidMount () {
        this.updateState()
     }

    render () {
        return (
            <div>
                <AdminHeader 
                search = {this.searchProfile}
                updateState = {this.updateState}
                />
                <div className='container profileOverviewWrapper'>
                    <ProfileOverview 
                    data = {this.state.values}
                    />
                </div>
                  {/* Notification popUp */}
                  <Notification />
            </div>
        )
    }
}

export default Admin