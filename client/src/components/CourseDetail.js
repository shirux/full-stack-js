import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import  ReactMarkdown from 'react-markdown'
import Axios from 'axios';
import config from './Context/config';

const CourseDetail = ({ match, context, history }) => {

    const [course, setCourse] = useState({});
    const [isLoading, setIsLoading] = useState(true);

    const authUser = context.authenticatedUser;

    /**
     * Get course information with useEffect
     */
    useEffect(() => {
        const id = match.params.id;
        Axios.get(`${config.apiBaseUrl}/courses/${id}`)
            .then(response => {
                if (response) setCourse(response.data)
            })
            .catch(err => {
                console.log('Error fetching data course detail')
            })
            .finally(() => {
                setIsLoading(false)
            })
    }, [])

    /**
     * Render estimated Time section if property exists
     */
    const renderEstimatedTime = () => {
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
    const renderMaterialsNeeded = () => {
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
    const handleDeleteCourse = async () => {
        try {
            const response = await context.actions.deleteCourse(course)
            if (response.length) {
                console.log(response)
            } else {
                history.push('/')
            }
        } catch (err) {
            console.log('Error deleting a course')
        }
        
    }

    /**
     * Render course options (update, delete) if user is authenticated and its owner of course
     */
    const renderCourseOptions = () => {
        if ( authUser && authUser.id === course.User.id ) {
            return (
                <React.Fragment>
                    <span>
                        <Link className="button" to={`/courses/${match.params.id}/update`}>Update Course</Link>
                        <Link className="button" to="#" onClick={handleDeleteCourse}>Delete Course</Link>
                    </span>
                </React.Fragment>
            )
        }
        
    }

    /**
     * Render course detail
     */
    const renderCourseDetail = () => {
        return (
            <React.Fragment>
                <div>
                    <div className="actions--bar">
                        <div className="bounds">
                            <div className="grid-100">
                                {
                                    renderCourseOptions()
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
                                        renderEstimatedTime()
                                    }
                                    {
                                        renderMaterialsNeeded()
                                    }
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </React.Fragment>
        )
    }

    return(
        <div>
            {
                 isLoading ? 
                 <div></div>
                : renderCourseDetail() 
            }
        </div>
    )
}

export default CourseDetail