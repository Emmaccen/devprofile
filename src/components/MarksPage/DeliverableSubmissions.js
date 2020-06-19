import React from 'react'
import $, { extend } from 'jquery'
import {Notification} from '../Notification'
import {handleNotification} from '../Notification'
import { firestore } from 'firebase';
import { Link } from 'react-router-dom'


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

class DeliverableSubmissions extends React.Component {

    constructor() {
        super()
        this.state = {
            deliverable : {id : '', title : '', point : '', date : '', instruction : '', uniqueId : '' },
            submissions : [],
            studentList : [],
            data : [],
            onScreen : []
        }
        this.all = this.all.bind(this)
        this.marked = this.marked.bind(this)
        this.unMarked = this.unMarked.bind(this)
        this.notSubmitted = this.notSubmitted.bind(this)
    }

    // filter functions

    all (){
        this.setState(
            {onScreen : this.state.data}
        )
    }
    marked () {
        let newData = []
        this.state.data.forEach(student => {
            if(student.uid && student.mark !== ''){
                newData.push(student)
            }
        })
        this.setState(
            {onScreen : newData}
        )
    }
    unMarked () {
        let newData = []
        this.state.data.forEach(student => {
            if(student.uid && student.mark === ''){
                newData.push(student)
            }
        })
        this.setState(
            {onScreen : newData}
        )
    }
    notSubmitted () {
        let newData = []
        this.state.data.forEach(student => {
            if(!student.uid){
                newData.push(student)
            }
        })
        this.setState(
            {onScreen : newData}
        )
    }

    numericSort () {
        
    }

    componentDidMount (){
        let id = this.props.match.params.cid
        let uid = this.props.match.params.uid
        const submissionList = []
        const studentList = []
        console.log(id,uid)
        const db = firebase.firestore()
        db.collection('deliverables').doc(id).collection(id).doc(uid).get()
        .then(data => {
            this.setState({
                deliverable : data.data().deliverables
            })
            db.collection('submissions').doc(uid).collection('submitted').get().then(students => {
                students.forEach(student => {
                    submissionList.push(student.data())
                })
                this.setState({
                    submissions : submissionList
                })
                db.collection('students').get().then( students => {
                    students.forEach( student => {
                        studentList.push(student.data())
                    })
                    this.setState({
                        studentList
                    })

                    // pupulate the onScreen
                    let data = []
                    this.state.studentList.forEach(student => {
                        let foundMatch = false
                       this.state.submissions.forEach((list, index) => {
                            if(student.uid === list.uid){
                                foundMatch = true
                               data.push(list)
                           }else if(!foundMatch && (this.state.submissions.length -1) === index) {
                              data.push({
                                  name : student.name,
                                  mark : false
                              })
                           }
            
                        })
                    })
                    this.setState({data,onScreen : data})

                }).catch( e =>{console.log(e)})

            }).catch( e =>{console.log(e)})

        }).catch( e =>{console.log(e)})
    }

    render () {
        console.log(this.state.data)
        // console.log(this.state.submissions)

        // const scores = this.state.studentList.map(student => {
        //     let foundMatch = false
        //    return this.state.submissions.map((list, index) => {
        //         console.log(student.uid, list.uid)
        //         if(student.uid === list.uid){
        //             foundMatch = true
        //            return <tbody>
        //                     <th>{list.name}</th>
        //                     <td>{list.mark}</td>
        //                 </tbody>
        //        }else if(!foundMatch && (this.state.submissions.length -1) === index) {
        //           return  <tbody>
        //                     <th>{student.name}</th>
        //                     <td><span title='No submission has been made' className='icon icon-spinner2'></span>Pending</td>
        //                 </tbody>
        //        }

        //     })
        // })

        const scores = this.state.onScreen.map(scores => {
            console.log(scores.name)
            if(scores.uid){
                if(scores.mark === ''){
                return <tbody>
                        <th>{scores.name}</th>
                        <td>Unmarked</td>
                     </tbody>

                }else{
                return <tbody>
                        <th>{scores.name}</th>
                        <td>{scores.mark}</td>
                     </tbody>
                }
            }else {
                return  <tbody>
                            <th>{scores.name}</th>
                            <td><span title='No submission has been made' className='icon icon-spinner2'></span>Pending</td>
                        </tbody>
            }
        })

        const doc = this.state.deliverable
        return(
            <div>
                <DeliverableInfo 
                    title = {doc.title}
                    point = {doc.point}
                    date = {doc.date}
                    instruction = {doc.instruction}
                />
                <div className='container'>
                   <div className='filterSection'>
                        <div>
                            <h4>Numberic Filters</h4>
                            <div>
                                <div>
                                    <p>Greater Than</p>
                                    <input name='1' type='number'></input>
                                    <label for='1'>Sort</label>
                                </div>
                                <div>
                                    <p>Less Than</p>
                                    <input name='2' type='number'></input>
                                    <label for='2'>Sort</label>
                                </div>
                                <div>
                                    <p>Greater Than Or Equal To</p>
                                    <input name='3' type='number'></input>
                                    <label for='3'>Sort</label>
                                </div>
                                <div>
                                    <p>Less Than Or Equal To</p>
                                    <input name='4' type='number'></input>
                                    <label for='4'>Sort</label>
                                </div>
                                <div>
                                    <p>Is Equal To</p>
                                    <input name='5' type='number'></input>
                                    <label for='5'>Sort</label>
                                </div>
                                <div>
                                    <p>Is Not Equal To</p>
                                    <input name='6' type='number'></input>
                                    <label for='6'>Sort</label>
                                </div>
                            </div>
                        </div>
                        <div>
                            <h3>Quick Filters</h3>
                            <button onClick={()=> this.all()}>All</button>
                            <button onClick={()=> this.marked()}>Marked</button>
                            <button onClick={()=> this.unMarked()}>Unmarked</button>
                            <button onClick={()=> this.notSubmitted()}>Not submitted</button>
                            <table border='1'>
                                <thead>
                                    <th>Average</th>
                                    <td>100</td>
                                </thead>
                                {scores}
                                <tfoot>
                                    <th>Total Submittions</th>
                                    <td>{this.state.submissions.length}</td>
                                </tfoot>
                            </table>
                        </div>
                   </div>
                </div>
            </div>
        )
    }
}

export default DeliverableSubmissions