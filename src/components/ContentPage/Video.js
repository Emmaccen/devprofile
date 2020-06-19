import React from 'react'
import $ from 'jquery'
import {Notification} from '../Notification'
import {handleNotification} from '../Notification'
import { firestore } from 'firebase';

let file =''

const firebase = require("firebase");
// Required for side-effects
require("firebase/firestore");

class Video extends React.Component {

    constructor (props) {
        super (props)
        this.state = {

        }

        this.handleUpload = this.handleUpload.bind(this)
    }

    // componentDidMount() {
    //     let deliverable = []
    //     let videos = []
    //     const db = firebase.firestore()
    //     let id = this.props.match.params.id
    //     db.collection('videos').doc(id).collection(id).get()
    //     .then(snapShot => {
    //         snapShot.forEach(video => {
    //             videos.push(video.data())
    //         })
    //         this.setState({
    //             videos : videos
    //         })
    //     })


    //     db.collection('deliverables').doc(id).collection(id).get()
    //     .then(snapShot => {
    //         snapShot.forEach(data => {
    //             console.log(data.data().deliverables)
    //             deliverable.push(data.data().deliverables)
    //         })
    //         this.setState({
    //             deliverables : deliverable
    //         })
    //     })
    // }

    handleUpload(event) {
        const storageRef = firebase.storage().ref()
        const db = firebase.firestore()
        let id = this.props.match.params.id
        file = event.target.files[0]
        const vidTitle = $('#vidTitle').val()
        const vidDesc = $('#vidDesc').val()
       console.log(file)

        // upload video
        storageRef.child(`${id}/${file.name}`).put(file).then(() => {
            handleNotification('Video Uploaded')
            console.log('uploaded ......>>>')
            storageRef.child(`${id}/${file.name}`).getDownloadURL().then( url => {
                const unique = new Date().toString()
            db.collection('videos').doc(id).collection(id).doc(unique).set({
                title : vidTitle,
                description : vidDesc,
                url,
                uniqueId : unique

                 
            }).then(()=>{
                handleNotification('Video Link Updated')
            })
        })
    })
}
    render () {
        console.log(this.state)

        return (
            <div className='container uploadVideo'>
                <div className='videoHeader'>
                    <span className='icon icon-folder-video'></span>
                    <h3>Add | Upload Videos</h3>
                    <p>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Velit, assumenda odio! Eos 
                    laboriosam perspiciatis delectus voluptatibus alias minus est quasi dolore, autem id vitae dolorum velit deleniti, debitis odio voluptatem.
                    </p>
                </div>
                <div className='videoUploadSection'>
                    <div className='videoSection'>
                        <div className='videoHeader2'>
                            <span className='icon icon-info'></span>
                            <h3>Details</h3>
                        </div>

                        <textarea id='vidTitle' placeholder='Title' className='vidTitle'></textarea>
                        <textarea id='vidDesc' placeholder='Description' className='vidDescription'>
                        </textarea>
                        <input onChange={this.handleUpload} type='file'
                        name="file" id="file" class="inputfile"></input>
                        <label for="file"><span className='icon icon-upload'></span>Choose a file</label>
                    </div>
                    <div>

                    </div>
                </div>
                < Notification />
            </div>
        ) 
    }
}

export default Video