import React, {Component} from 'react'
import NavBar from './NavBar'


class HomePage extends Component {


    render () {

        return (
            
            <div className='backgroundFix homepageContainer'>
                <NavBar />
                <div className="jumbotron">
                    <h1 className="display-4">Hello, world!</h1>
                    <p className="lead">This is a simple hero unit, a simple jumbotron-style component for calling extra attention to featured content or information.</p>
                    <p>It uses utility classNamees for typography and spacing to space content out within the larger container.</p>
                    <a className="btn btn-primary btn-lg" href="#" role="button">Get Started</a>
                </div>
            </div>
        )
    }
}

export default HomePage