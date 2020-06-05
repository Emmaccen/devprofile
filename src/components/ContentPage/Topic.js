import React from 'react'
import $ from 'jquery'
import { firestore } from 'firebase';
import {Notification} from '../Notification'
import {handleNotification} from '../Notification'

const firebase = require("firebase");
// Required for side-effects
require("firebase/firestore");

class Topic extends React.Component {


    constructor () {
        super ()
        this.state = {

        }
        this.handleClick = this.handleClick.bind(this)
        this.redirectDeliverable = this.redirectDeliverable.bind(this)
    }

    redirectDeliverable () {
        let id = this.props.match.params.id
        this.props.history.push(`/Content/Deliverable/${id}`)
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
                    desc
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
                            <button>Add</button>
                            <button onClick={this.redirectDeliverable}>Create</button>
                        </div>

                        <div className="thumbNail">
                            
                        </div>
                    </div>
                    <Notification />
                </div>
            </div>
        )
    }
}

export default Topic