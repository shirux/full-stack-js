import React from 'react';
import { Link } from 'react-router-dom';
import  ReactMarkdown from 'react-markdown'
import Axios from 'axios';
import config from './Context/config';

/**
 * Refactored to class
 */
class CourseDetail extends React.Component {

    constructor(props) {
        super(props);
        this.state = { 
            course: null,
            isLoading: true,
            errors:[] 
        };
    }

    /**
     * Get course information with useEffect
     */
    componentDidMount() {
        const id = this.props.match.params.id
        Axios.get(`${config.apiBaseUrl}/courses/${id}`)
        .then(response => {
            if (response) {
                this.setState((prevState) => {
                    return {
                        course: response.data
                    }
                })   
            }
        })
        .catch(err => {
            console.log('Error fetching data course detail')
        })
        .finally(() => {
            this.setState((prevState) => {
                return {
                    isLoading: false
                }
            })
        })
    }

    /**
     * Render estimated Time section if property exists
     */
    renderEstimatedTime = () => {
        const course = this.state.course;
        if (course.estimatedTime) {
            return (
                <React.Fragment>
                    <li className="course--stats--list--item">
                        <h4>Estimated Time</h4>
                        <h3>{`${course.estimatedTime}`}</h3>
                    </li>
                </React.Fragment>
            )
        }
    }

    /**
     * Render materials needed section if property exists
     */
    renderMaterialsNeeded = () => {
        const course = this.state.course;
        if (course.materialsNeeded) {
            return (
                <li className="course--stats--list--item">
                    <h4>Materials Needed</h4>
                    <ul>
                        <ReactMarkdown source={course.materialsNeeded} />
                    </ul>
                </li>
            )
        }
    }

    /**
     * Handle Delete Course
     */
    handleDeleteCourse = async () => {
        const course = this.state.course;
        try {
            const response = await this.props.context.actions.deleteCourse(course)
            if (response.length) {
                this.setState((prevState) => {
                    return {
                        errors: response
                    }
                })
                console.log(response)
            } else {
                this.props.history.push('/')
            }
        } catch (err) {
            console.log('Error deleting a course')
        }
        
    }

    /**
     * Render course options (update, delete) if user is authenticated and its owner of course
     */
    renderCourseOptions = () => {
        const authUser = this.props.context.authenticatedUser;
        const course = this.state.course;
        if ( authUser && authUser.id === course.User.id ) {
            return (
                <React.Fragment>
                    <span>
                        <Link className="button" to={`/courses/${this.props.match.params.id}/update`}>Update Course</Link>
                        <Link className="button" to="#" onClick={this.handleDeleteCourse}>Delete Course</Link>
                    </span>
                </React.Fragment>
            )
        }
        
    }

    /**
     * Render course detail
     */
    renderCourseDetail = () => {
        const course = this.state.course;
        return (
            <React.Fragment>
                <div>
                    <div className="actions--bar">
                        <div className="bounds">
                            <div className="grid-100">
                                {
                                    this.renderCourseOptions()
                                }
                                
                                <Link className="button button-secondary" to="/">Return to List</Link>
                            </div> 
                        </div>
                    </div>
                    <div className="bounds course--detail">
                        <div className="grid-66">
                            <div className="course--header">
                                <h4 className="course--label">Course</h4>
                                <h3 className="course--title">{`${course.title}`}</h3>
                                <p>{`By ${course.User.firstName} ${course.User.lastName}`}</p>
                            </div>
                            <div className="course--description">
                                <ReactMarkdown source={course.description} />
                            </div>
                        </div>
                        <div className="grid-25 grid-right">
                            <div className="course--stats">
                                <ul className="course--stats--list">
                                    {
                                        this.renderEstimatedTime()
                                    }
                                    {
                                        this.renderMaterialsNeeded()
                                    }
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </React.Fragment>
        )
    }

    render() {
        return(
            <div>
                {
                     this.state.isLoading ? 
                     <div></div>
                    : this.renderCourseDetail() 
                }
            </div>
        )
    }
}

export default CourseDetail