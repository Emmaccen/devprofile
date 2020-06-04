import React from 'react'


class ProfilePopUp extends React.Component {

    constructor(props) {
        super(props)
    }

    render () {
        
        return (
            <div>
                <div className="modal fade bd-example-modal-lg" tabindex="-1" role="dialog" aria-labelledby="myLargeModalLabel" aria-hidden="true">
                <div className="modal-dialog modal-lg" role="document">
                    <div className="modal-content profileWrapper">
                        <div>
                            <div className='profileTopSectionWrapper'>
                                <div id='popImg' className='backgroundFix popImage'>

                                </div>
                                <div>
                                    <h1 id='popName'></h1>
                                    <h2 id='popTitle'></h2>
                                    <p id='popSummary'></p>
                                </div>
                            </div>
                        </div>

                        <div className='grid2 spacer'>
                            <div className='headingSection'>
                                <h2>Education</h2>
                                <ul id='popEducation'>
                                    
                                </ul>
                            </div>
                            <div>
                                <h2>Experience</h2>
                                <ul id='popExperience'>
                                        
                                </ul>
                            </div>
                        </div>
                        <div className='spacer'>
                            <div>
                                <h2>About</h2>
                            </div>
                            <div className='spacer2' >
                                <h4>What I Do</h4>
                                <p id='popDo'></p>
                            </div>
                            <div className='spacer2'>
                                <h4>Archievements</h4>
                                <p id='popArchievement'></p>
                            </div>
                            <div>
                                <h4>Skills</h4>
                                <p id='popSkills'></p>
                            </div>
                            <div>
                                <h4>Hobbies</h4>
                                <p id='popHobbies'></p>
                            </div>
                        </div>

                        <div className='spacer2'>
                            <h2>Soft Skils</h2>
                            <div>
                                <div id='popSoft'>
                                    <label>Photography 85%</label>
                                    <progress value="85" max="100"></progress>
                                </div>
                            </div>
                        </div>

                        <div className='spacer'>
                            <h2>Projects And Media</h2>
                            <div className='spacer2'>
                                <h4>Projects</h4>
                                <ul id='popProjects'>

                                </ul>
                            </div>
                            <div className='spacer2'>
                                <h4>Media</h4>
                                <ul id='popMedia'>
                                    
                                </ul>
                            </div>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn closeBtn btn-outline-dark" data-dismiss="modal">Close</button>
                            <button
                            onClick={this.props.delete} type="button"  className="btn deleteProfileButton btn-outline-danger">Delete Profile</button>
                            <button
                            onClick={this.props.update} type="button" className="btn updateProfileButton btn-outline-success">Update Profile</button>
                        </div>
                    </div>
                </div>
                </div> 
            </div>
        )
    }
}

export default ProfilePopUp