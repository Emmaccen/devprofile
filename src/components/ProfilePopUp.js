import React from 'react'


class ProfilePopUp extends React.Component {


    render () {
        
        return (
            <div>
                <div class="modal fade bd-example-modal-lg" tabindex="-1" role="dialog" aria-labelledby="myLargeModalLabel" aria-hidden="true">
                <div class="modal-dialog modal-lg" role="document">
                    <div class="modal-content">
                        <div className='grid2'>
                            <div style={{backgroundImage : `url(${'/images/home.jpg'})`}} className = 'backgroundFix profileImage'>

                            </div>
                            <div>
                                <h2>Oriola Emmanuel Kehinde</h2>
                                <h3>Full Stack Web Developer</h3>
                                <p>
                                Life won't always go as planned, and you'll encounter lots of challenges along the way, but never give up on your dreams.
                                Life won't always go as planned.
                                </p>

                            </div>
                        </div>
                        {/* <hr></hr> */}

                        <div className='grid2'>
                            <div>
                                Education here
                            </div>
                            <div>
                                Experience here
                            </div>
                        </div>
                        <div>
                            
                        </div>
                        <div className='grid2'>
                            <div>
                                Skilss here
                            </div>
                            <div>
                                Hobbies here
                            </div>
                        </div>

                    </div>
                </div>
                </div> 
            </div>
        )
    }
}

export default ProfilePopUp