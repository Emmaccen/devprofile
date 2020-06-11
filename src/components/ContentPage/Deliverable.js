import React from 'react'
import $ from 'jquery'
import {Notification} from '../Notification'
import {handleNotification} from '../Notification'
import { firestore } from 'firebase';

const firebase = require("firebase");
// Required for side-effects
require("firebase/firestore");

class Deliverable extends React.Component {

    constructor () {
        super()
        this.state = {}

        this.handleSubmit = this.handleSubmit.bind(this)
    }

    handleSubmit () {
        let id = this.props.match.params.id
        const db = firebase.firestore()
        const delivTitle = $('#delivTitle').val()
        const delivInstruction = $('#delivInstruction').val()
        const delivPoint = $('#delivPoint').val()
        const delivDate = $('#delivDate').val()
        const deliverables = {
            title : delivTitle,
            instruction : delivInstruction,
            point : delivPoint,
            date : delivDate,
            id : id
        }
        console.log(deliverables)

        db.collection('deliverables').doc(id).collection(id).doc(new Date().toString()).set(
            {
                deliverables
            }
        ).then(()=> {
            $('#delivTitle').val('')
            $('#delivInstruction').val('')
            $('#delivPoint').val('')
            $('#delivDate').val('')
            handleNotification('Successful !')
            
            
            
            
        }).catch(error => {
            Notification(error)
        })
    }

    render () {
        return (
            <div className='deliv'>
                <div className='deliverableWrapper'>
                    <div className='topTitle'>
                        <p><span className='icon icon-bookmark'></span>Deliverable</p>
                        <button onClick={this.handleSubmit}>Save</button>
                    </div>
                        <hr></hr>
                        <div className='deliverableContent'>
                        <div className="createTitleWrapper">
                            <div className='create'>
                                <span className='icon icon-clipboard3'></span>
                                <input id='delivTitle' type="text" placeholder="Title"></input>
                            </div>
                            <div className='create'>
                                <span className='icon icon-text'></span>
                                <textarea id='delivInstruction' type="text" placeholder="Instruction"></textarea>
                            </div>
                            <hr></hr>
                        </div>
                    </div>
                </div>
                <div className='sticky'>
                    <div>
                        <label>Points</label>
                        <input id='delivPoint' type='number'></input>
                    </div>
                    <div>
                        <label>Due Date</label>
                        <input id='delivDate' type='date'></input>
                    </div>
                </div>
                < Notification />
            </div>
        )
    }
}

export default Deliverable