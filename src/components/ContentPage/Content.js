import React from 'react'
import AdminHeader from '../../components/AdminHeader'


class Content extends React.Component {


    render() {

        return(
            <div>
                <AdminHeader />
                <div className='relative'>
                    <div className='sticky'>
                        <p>Welcome !</p>
                        <ul>
                            <li><a href='#id'>Intro To Internship</a></li>
                            <li><a href='#id'>Learn How To Fuck Like A Pro</a></li>
                        </ul>
                        <p><a href='#id'>Deleverables</a></p>
                    </div>
                    <div className='content'>
                        <button><span className='icon icon-plus'></span>Create</button>
                    </div>
                </div>
            </div>
        )
    }
}


export default Content