import React, {Component} from 'react'
import NavBar from './NavBar'


class HomePage extends Component {


    render () {

        return (
            
            <div className='backgroundFix homepageContainer'>
                <NavBar />
                <div class="jumbotron">
                    <h1 class="display-4">Hello, world!</h1>
                    <p class="lead">This is a simple hero unit, a simple jumbotron-style component for calling extra attention to featured content or information.</p>
                    <p>It uses utility classes for typography and spacing to space content out within the larger container.</p>
                    <a class="btn btn-primary btn-lg" href="#" role="button">Learn more</a>
                </div>
            </div>
        )
    }
}

export default HomePage