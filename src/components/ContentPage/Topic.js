import React from 'react'
import $ from 'jquery'
import { firestore } from 'firebase';
import {Notification} from '../Notification'
import {handleNotification} from '../Notification'

const firebase = require("firebase");
// Required for side-effects
require("firebase/firestore");

function Videos (props) {
    // console.log('Vids >>>>>>>', props)
    return (
        <div className='AddedContent'>
            <img src='/images/em.jpg' className=''></img>
            <p>{props.title}</p>
        </div>
    )
}

function Deliverables (props) {
    console.log('Deliv >>>>>>>', props)
    return (
        <div className='AddedContent'>
            <img src='/images/em.jpg' className=''></img>
            <p>{props.title} here</p>
        </div>
    )
}

class Topic extends React.Component {


    constructor () {
        super ()
        this.state = {
            videos : [{title : '', description : '', id : ''}],
            deliverables : [{title : '', date : '', id : '', instruction : '', point : ''}]
        }
        this.handleClick = this.handleClick.bind(this)
        this.redirectDeliverable = this.redirectDeliverable.bind(this)
    }

    componentDidMount() {
        let deliverable = []
        let videos = []
        const db = firebase.firestore()
        let id = this.props.match.params.id
        db.collection('videos').doc(id).collection(id).get()
        .then(snapShot => {
            snapShot.forEach(video => {
                videos.push(video.data())
            })
            this.setState({
                videos : videos
            })
        })


        db.collection('deliverables').doc(id).collection(id).get()
        .then(snapShot => {
            snapShot.forEach(data => {
                // console.log(data.data().deliverables)
                deliverable.push(data.data().deliverables)
            })
            this.setState({
                deliverables : deliverable
            })
        })
    }

    redirectDeliverable (target) {
        let id = this.props.match.params.id
        this.props.history.push(`/Content/${target}/${id}`)
    }
    handleClick () {
        let id = this.props.match.params.id
        const db = firebase.firestore()
        let title = $('#title').val()
        let desc = $('#desc').val()
        if(title !== '' && desc !== '') {
            db.collection('contents').doc(id).set(
                {
                    title,
                    desc,
                    uniqueId : id
                }
            ).then(()=> {
                $('#title').val('')
                $('#desc').val('')
                handleNotification('Successful')
            }).catch(error => {
                handleNotification(error)
            })
        }else {
            handleNotification('Please Fill all inputs !')
        }


    }


    render () {
        const deliverableState = this.state.deliverables
        const delivContent = deliverableState.map(data => {
            console.log(data)
            return (
                < Deliverables 
                title = {data.title}/>
            )
        })
        const vidState = this.state.videos
        const vidContent = vidState.map(data => {
            return (
                <Videos 
                title = {data.title}
                />
            )
        })
        
        return (
            <div>
                <div>
                    <div className="createContents">
                        <div className='topTitle'>
                            <p>Title</p>
                            <button onClick={this.handleClick}>Save</button>
                        </div>
                        <hr></hr>
                        <div className="createTitleWrapper">
                            <div className='create'>
                                <span className='icon icon-clipboard3'></span>
                                <input id='title' type="text" placeholder="Title"></input>
                            </div>
                            <div className='create'>
                                <span className='icon icon-text'></span>
                                <textarea id='desc' type="text" placeholder="Description"></textarea>
                            </div>
                            <hr></hr>
                        </div>
                        <div className="btnTopic">
                            <button onClick={()=>this.redirectDeliverable('Video')}><span className='icon icon-video2'></span>Add</button>
                            <button onClick={()=>this.redirectDeliverable('Deliverable')}><span className='icon icon-plus'></span>Create</button>
                        </div>

                        <div className="newContent">
                            <div>
                               {vidContent}
                            </div>
                            <div>
                                {delivContent}
                            </div>
                        </div>
                    </div>
                    <Notification />
                </div>
            </div>
        )
    }
}

export default Topic