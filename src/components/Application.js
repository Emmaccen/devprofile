import React, {Component} from 'react'
import HomePage from './HomePage'
import Admin from './Admin'

const firebase = require("firebase");
// Required for side-effects
require("firebase/firestore");

 // Your web app's Firebase configuration
 var firebaseConfig = {
  apiKey: "AIzaSyAp-SRKzgn00MHLuKUcVmW0ZQh7y6d1CQM",
  authDomain: "devlookup.firebaseapp.com",
  databaseURL: "https://devlookup.firebaseio.com",
  projectId: "devlookup",
  storageBucket: "devlookup.appspot.com",
  messagingSenderId: "678115646940",
  appId: "1:678115646940:web:c583dc9441375a21eb8319",
  measurementId: "G-XR9291PGMY"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
firebase.analytics();



// firebase.auth().onAuthStateChanged((user) =>  {
//     if (user) {
//       // User is signed in.
//     //   this.setState({ isLoggedIn : true })
//       alert('isLoggedIn')
//     } else {
//       // User is signed out.
//     //   this.setState({ isLoggedIn : false })
//       console.log('logged out')
//     }
//   })

class Application extends Component {

    constructor(props) {
        super(props)

        this.state = {
            isLoggedIn : false
        }
    }

     componentDidMount() {
            firebase.auth().onAuthStateChanged((user) =>  {
                // console.log(user)
                if (user) {
                  // User is signed in.
                  this.setState({ isLoggedIn : true })
                } else {
                  // User is signed out.
                  this.setState({ isLoggedIn : false })
                }
              })
     }
    
 
    render () {
        
        return (
           this.state.isLoggedIn ?  <Admin /> : <HomePage />
        )
    }
}

export default Application