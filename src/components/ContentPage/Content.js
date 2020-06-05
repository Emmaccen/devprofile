import React from 'react'
<<<<<<< HEAD
import $ from 'jquery'
import {AdminHeader} from '../../components/AdminHeader'
=======
import AdminHeader from '../../components/AdminHeader'
>>>>>>> parent of f9f54cc... Merge branch 'master' into ContentPage

const firebase = require("firebase");
// Required for side-effects
require("firebase/firestore");


function Render (props) {
    const deli = props.values.deliverables
    const titles = props.values.title
    let subs = []
   const details =  titles.map(title =>{
       subs = []
        const titleText = title.title
        deli.forEach(deli => {
            
            
            if(title.titleId === deli.deliverables.id){
                subs.push(deli)
                
            }else {}
        })
        
        return <Populate 
        title = {titleText}
        deliverables = {subs}
        jump = {titleText}
        />
    })
    
    
    return details


}

function Populate (props) {
        return (
            <div className='wrapper'>
                <div>
                    <div className='titleWrapper'>
                        <p className='title'>{props.title}</p>
                        <div className='dropDown'>
                            <span title='Menu' className='dropBtn icon-menu'></span>
                            <div id='myDrop' className='dropDownContent'>
                                    <p>Edit</p>
                                    <hr></hr>
                                    <p>Delete</p>
                            </div>
                        </div>
                    </div>
                    <hr></hr>
                    <div className='titleContent'>
                        {props.deliverables.map(deliverables => {
                            return (
                                <div>
                                    <p id={props.jump}><span className='icon icon-bookmarks'></span>{deliverables.deliverables.title}</p>
                                    <hr></hr>
                                </div>
                            )
                        })}
                    </div>
                </div>
            </div>
        )
}
class Content extends React.Component {

    constructor (props) {
        super(props)
        this.state = {
            title : [],
            deliverables : []
        }
        this.handleClick = this.handleClick.bind(this)
        this.populate = this.populate.bind(this)
    }

    handleClick() {
        const id =''
        const db = firebase.firestore()
        db.collection('contents').add(
            {
                title : '',
                desc : '',
                deliverables : []
            }
        ).then((doc)=> {
            this.props.history.push(`/Content/Topic/${doc.id}`)
        })
    }
    

    populate () {
        
        const deli = this.state.deliverables
        const titles = this.state.title
        titles.forEach((titles, i)=>{
                const div = document.createElement('div')
                div.setAttribute('class', 'sideSection')
                const p = document.createElement('p')
                $(p).text(titles.title)
                div.append(p)

            deli.forEach((deliv) => {
                    if(titles.titleId === deliv.deliverables.id){
                        const a = document.createElement('a')
                        a.setAttribute('href', `#${titles.title}`)
                        const p = document.createElement('p')
                        const span = document.createElement('span')
                        $(a).text(deliv.deliverables.title)
                        div.append(a)
                    }                
                    $('.sticky').append(div)
                })
        })
    }

    componentDidMount () {
        let id = ''
        const titles = []
        const books = []

        const db = firebase.firestore()
        db.collection('contents').get()
        .then((snapshot) => {
            snapshot.forEach((data) =>{
                const value = data.data()
                value.titleId = data.id
                titles.push(value)
                
            })
            this.setState({
                title : titles
            },this.populate)            
        })
        db.collection('deliverables').get()
        .then((deliverables) =>{
            deliverables.forEach(deliv =>{
                const value = deliv.data()
                    books.push(value)
                    
            })
            this.setState({
                deliverables : books
            },this.populate)
        })
        
    }
/**
 * 
 */
    render() {
        
        return(
            <div>
                <AdminHeader />
                <div className='relative'>
                    <div className='sticky'>
                       
                    </div>
                    <div className='content'>
                        <button onClick={this.handleClick}><span className='icon icon-plus'></span>Create</button>
                        <Render
                            values = {this.state} 
                        />
                    </div>
                </div>
            </div>
        )
    }
}


export default Content