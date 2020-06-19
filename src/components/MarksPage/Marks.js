import React from 'react'
import $, { extend } from 'jquery'
import {Notification} from '../Notification'
import {handleNotification} from '../Notification'
import { firestore } from 'firebase';
import { Link } from 'react-router-dom'


const firebase = require("firebase");
// Required for side-effects
require("firebase/firestore");

function TableHead (props) {
    let {point, date, title} = props
    return (
        <th title={`Title : ${title}\nDate : ${date}\nPoints : ${point}`}>
            <p className='tableDate'>{date}</p>
            <Link to={`/DeliverableSubmissions/${props.cid}/${props.uniqueId}`}>
                <p className='tableTitle'>{title.length > 10 ? title.toString().slice(0,10).concat('...') : title}</p>
            </Link>
            <p className='tablePoints'>{point} Points</p>
        </th>
    )
}
function Submits (props) {
    console.log(props)
    return (
            <td className='tableDropDown'>
                <form>
                    <div className='align'>
                            <input onSubmit={e => props.score(e, props.point, props.uid, props.assignmentId)} 
                            id='scoreInput' max={props.point} type='number' placeholder={`_/${props.point}`}></input>
                        {/* <i>{props.submissionDetails}</i> */}
                        <p>{props.mark}</p>
                        <div className='centered dropDown'>
                            <span title='Menu' className='dropBtn icon-list'></span>
                            <div id='myDrop' className='dropDownContent'>
                                    <button onClick={e => props.score(e, props.point, props.uid, props.assignmentId)}>Save</button>
                                    <hr></hr>
                                    <Link to={`/Submissions/${props.id}/${props.uid}`}>
                                        <p>View Details</p>
                                    </Link>
                            </div>
                        </div>
                    </div>
                </form>
            </td>
    )
}

class Marks extends React.Component {

    constructor (props) {
        super(props) 

        this.state = {
            ids : [],
            deliverables : [],
            studentList : [],
            submissionList : [],
            averages : []
        }
    }

    componentDidMount () {
        const db = firebase.firestore()
        const ids = []
        const deliverables = []
        const studentList = []
        const submissionList = []
        const averages = []
        db.collection('contents').get().then( doc => {
            doc.forEach( id => {
                ids.push(id.id)
            })
            this.setState({
                ids : ids
            })

            const delivs = this.state.ids
            delivs.forEach( (id, index) => {
                db.collection('deliverables').doc(id).collection(id).get()
                .then( querySnapshot =>  {
                    querySnapshot.forEach( doc => {
                        db.collection('submissions').doc(doc.id).collection('submitted').get()
                        .then(submissions => {
                            submissions.forEach(file => {
                                submissionList.push(file.data())
                            })
                            this.setState({
                                submissionList : submissionList
                            })
                        })
                        deliverables.push(doc.data().deliverables)
                        // console.log(doc.data().deliverables)
                    })
                    this.setState({
                        deliverables : deliverables
                    }, () => {
                    })
                    
                }).catch(function (e){console.log(e)})
            })
            db.collection('students').get().then(students => {
                students.forEach(student => {
                    studentList.push(student.data())
                })
                this.setState({
                    studentList
                })
            }).catch(e => {console.log(e)})

        })

    }

    score (e, point, uid, assignmentId) {
        e.preventDefault()
        console.log(e.target)
        console.log($('#scoreInput').val(), point, uid, assignmentId)
        if($(e.target).val() > point || $('#scoreInput').val() < 0){
            handleNotification('Score Must Be Greater Than Points Awarded Or Less Than 0')
        }else {
            const scoreValue = $('#scoreInput').val()
            const db = firebase.firestore()
            db.collection('submissions').doc(assignmentId).collection('submitted').doc(uid)
            .update({
                mark : scoreValue
            }).then(success => {
                handleNotification('Score Updated ...')
                // $('#scoreInput').val('')
            }).catch(error => {
                handleNotification(error)
            })

        }
    }


    render () {
        // console.log(this.state.studentList)
        console.log(this.state.submissionList)
        const headings = this.state.deliverables.map(delivs => {
            // console.log(delivs.id)
            return (
                <TableHead 
                    title = {delivs.title}
                    date = {delivs.date}
                    point = {delivs.point}
                    cid = {delivs.id}
                    uniqueId = {delivs.uniqueId}
                />
            )
        })

       const average = this.state.deliverables.map(deliv => {
               
       return this.state.submissionList.reduce((acc, current) => {
                if(deliv.uniqueId === current.assignmentId){
                    console.log(Math.ceil( (current.mark / current.point) * 100/1))
                    return acc += Math.ceil( (current.mark / current.point) * 100/1)
                }else {
                    return 0
                }

            },0) /2
        })
        const averageScores = average.map(scores => {
            return <td>{scores} %</td>
        })

        const scores = this.state.studentList.map(student => {
        const result = this.state.deliverables.map(deliv => {
            let foundMatch = false
              return this.state.submissionList.map((subs, index) => {
                    if(deliv.uniqueId === subs.assignmentId && student.uid === subs.uid){
                        foundMatch = true
                        return (
                            <Submits 
                                mark = {subs.mark}
                                id = {deliv.uniqueId}
                                uid = {student.uid}
                                submissionDetails = {'On Time'}
                                point = {deliv.point}
                                assignmentId = {subs.assignmentId}
                                score = {this.score}
                            />
                        )
                    }else if (!foundMatch && (this.state.submissionList.length -1) === index){
                        return(
                            <td><span title='No submission has been made' className='icon icon-spinner2'></span>Pending</td>
                        )
                    }
                })
            })
            return (
                <tr>
                    <th>{student.name}</th>
                    {result}
                </tr>
            )
        })
       

        const totalSubmissions = this.state.deliverables.map(deliv => {
            let total = 0
           return this.state.submissionList.map((list, index) => {
                    if(deliv.uniqueId === list.assignmentId){
                        total++
                    }
                    if((this.state.submissionList.length -1) === index){
                        return <td>{total} Submissions</td>
                    }else if( deliv.uniqueId !== list.assignmentId && (this.state.submissionList.length -1) === index) {
                        return <td>0 Submissions</td>
                    }
            })
        })
        console.log(totalSubmissions)

        return (
            <div>
                <nav className="navbar navbar-expand-sm navbar-dark bg-dark">
                    <a className="navbar-brand" href="#">
                        <img src='/Logo.svg' alt='Company Logo' ></img>
                    </a>
                    <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
                        <div className="navbar-nav mr-auto">
                            <a className="nav-item nav-link active" href="#">Home<span className="sr-only">(current)</span></a>
                            <a className="nav-item nav-link" href="#">Profiles</a>
                            <a className="nav-item nav-link" href="#">Admins</a>
                        </div>                
                    </div>
                </nav>
                <div className='tableHeading'>
                    <div>
                        <h1>Cumulative Student Scores</h1>
                        <p>nulla amet explicabo. Consequuntur tempore esse molestiae neque deleniti sequi nostrum aut obcaecati at sapiente.</p>
                    </div>
                </div>
                <table border='1' cellPadding='10'>
                    <caption>Some Vital Statistics</caption>
                    <thead>
                        <tr>
                            <th></th>
                            {headings}
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <th>Average Scores</th>
                            {averageScores}
                        </tr>
                    </tbody>
                    <tbody>
                        {scores}
                    </tbody>
                    <tfoot>
                        <tr>
                            <th>Total Submissions</th>
                            {totalSubmissions}
                        </tr>
                    </tfoot>
                    
                </table>
                <Notification />
            </div>
        )
    }
    
}

export default Marks