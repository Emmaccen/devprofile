import React from 'react'
import $, { extend } from 'jquery'
import {Notification} from '../Notification'
import {handleNotification} from '../Notification'
import {AdminHeader} from '../AdminHeader'
import {logOutUser} from '../AdminHeader'
import { firestore } from 'firebase';


const firebase = require("firebase");
// Required for side-effects
require("firebase/firestore");

function DeliverableInfo (props) {
    return (
        <div className='container submissionsContainer'>
            <div className='SubmissionHeader'>
                <h1>{props.title}</h1>
                <h3><span className='icon icon-star-full'></span>
                {props.point} Points</h3>
            </div>
            <div>
                <p>Due Date : {props.date}</p>
                <p id='vidDescToggle'><h2>Instructions</h2>{props.instruction}</p>
                <button onClick={ e => this.toggle(e,'#vidDescToggle')}>Hide Description</button>
            </div>
        </div>
    )
}

function StudentInfo (props) {
    return (
        <div className='studentInfo container mt-5'>
            <div className='studentDetail'>
                <div>
                    <h5>Name</h5>
                    <p>{props.name}</p>
                    <h5>Time</h5>
                    <p> {props.time}</p>
                    <h5>Email</h5>
                    <p> {props.email}</p>
                </div>
                <div>
                <div className='downloadLink'>
                    <h4>Download Link</h4>
                    <span className='icon link icon-link'></span>
                    <a href={props.fileUrl}>{props.fileUrl.length > 70 ? props.fileUrl.slice(0, 70).concat('...') : props.fileUrl}</a>
                    <h5>
                        <span className={`icon ${props.completed ? 'icon-checkmark' : 'icon-cross2'}`}></span>
                        <span>Completed : {props.completed ? 'true' : 'false'}</span>
                    </h5>
                    <h5>Private Comment : </h5>
                    <p>{props.privateComment}</p>
                </div>
                    <div className='flex'>
                        <p className='icon icon-star'></p>
                        <p className='score'>Score {props.mark}</p>
                    </div>
                    <form onSubmit={props.score}>
                        <input type='number' min='0' max={props.max} id='scoreInput'></input>
                        <button type='submit'>Score</button>
                    </form>
                </div>
            </div>
            <div className='submissionComment'>
                        <div className='accImg backgroundFix'></div>
                        <input placeholder='Send A Reply ...' id='privateComment'></input>
                        <div className='centered'>
                            <span id='privateBtn' disabled className='icon icon-share'></span>
                        </div>
            </div>
        </div>
    )
}

class Submissions extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            SubmissionDetails : {assignmentId : '',completed : '',email : '',fileUrl : '',mark : '',
            name : '',privateComment : '',profileUrl : '',time : '',uid : ''},
            document : {title : '', point : '', date : '', instruction : '' }
        }
    }


    componentDidMount () {
        let id = this.props.match.params.id
        let uid = this.props.match.params.uid
        const db = firebase.firestore()
        db.collection('submissions').doc(id).collection('submitted').doc(uid)
        .get().then(data => {
            if(data.exists){
                console.log(data.data())
            this.setState({
                SubmissionDetails : data.data()
            })
            db.collection('deliverables').doc(data.data().contentId).collection(data.data().contentId).doc(id).get()
            .then(data => {
             if(data.exists){
                this.setState({
                    document : data.data().deliverables
                })
                console.log(data.data())
             }else {console.log(data.data())}
            })
            }
        })


    }

    score (e) {
        e.preventDefault()
        let score = parseInt($('#scoreInput').val())
        let point = parseInt(`${this.state.document.point}`)
        if( score > point || score < 0){
            handleNotification('Score Must Be Greater Than Points Awarded Or Less Than 0')
        }else {
            const link = this.state.SubmissionDetails
            const db = firebase.firestore()
            db.collection('submissions').doc(link.assignmentId).collection('submitted').doc(link.uid)
            .update({
                mark : score
            }).then(success => {
                handleNotification('Score Updated ...')
                $('#scoreInput').val('')
                $('.score').text('Score ' + score)
            }).catch(error => {
                handleNotification(error)
            })

        }
    }

    render () {
        const values = this.state.SubmissionDetails
        const doc = this.state.document
        return (
                <div>
                    <AdminHeader />
                    <DeliverableInfo 
                        title = {doc.title}
                        point = {doc.point}
                        date = {doc.date}
                        instruction = {doc.instruction}
                    />
                    <StudentInfo 
                    email = {values.email}
                    fileUrl = {values.fileUrl}
                    mark = {values.mark}
                    name = {values.name}
                    privateComment = {values.privateComment}
                    profileUrl = {values.fileUrl}
                    time = {values.time}
                    max = {this.state.document.point}
                    completed = {values.completed}
                    score = {e => this.score(e)}
                    />

                    <Notification />
                </div>
        )
    }
}

export default Submissions