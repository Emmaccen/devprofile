import React from 'react'
import $, { extend } from 'jquery'
import {Notification} from '../Notification'
import {handleNotification} from '../Notification'
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
        <div className='container mt-5'>
            <div className='studentDetail'>
                <div>
                    <p>Name : {props.name}</p>
                    <p>Date : {props.time}</p>
                    <p>Email : {props.email}</p>
                </div>
                <div>
                    <p>{props.fileUrl}</p>
                </div>
                <div>
                    <p>Score : {props.mark}</p>
                    <form onSubmit={props.score}>
                        <input type='number' min='0' max={props.max} id='scoreInput'></input>
                        <button type='submit'>Score</button>
                    </form>
                </div>
            </div>
            <div className='card submissionComment'>
                        <div className='accImg backgroundFix'></div>
                        <input placeholder='Private Comment ...' id='privateComment'></input>
                        <div className='alignBase'>
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
        if($('#scoreInput').val() > `${this.state.document.point}` || $('#scoreInput').val() < 0){
            handleNotification('Score Must Be Greater Than Points Awarded Or Less Than 0')
        }else {
            const link = this.state.SubmissionDetails
            const scoreValue = $('#scoreInput').val()
            const db = firebase.firestore()
            db.collection('submissions').doc(link.assignmentId).collection('submitted').doc(link.uid)
            .update({
                mark : scoreValue
            }).then(success => {
                handleNotification('Score Updated ...')
                $('#scoreInput').val('')
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
                    score = {e => this.score(e)}
                    />

                    <Notification />
                </div>
        )
    }
}

export default Submissions