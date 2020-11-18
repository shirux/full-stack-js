import Axios from 'axios';
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import config from './Context/config'

const Courses = ({ context }) => {

    const [courses, setCourses] = useState([]);
    const [isLoading, setIsLoading] = useState(true)

    // Grab user from context
    const authUser = context.authenticatedUser;

    /**
     * Grab data from API
     */
    useEffect(() => {
        Axios.get(`${config.apiBaseUrl}/courses`)
            .then(res => {
                setCourses(res.data)
            })
            .catch(err => {
                setCourses([]);
                console.log("Error fetching data from api")
            })
            .finally(setIsLoading(false))
    }, [])

    /**
     * Render Create Course button if user is authenticated
     */
    const renderCreateCourse = () => {
        if (authUser) {
            return (
                <div className="grid-33">
                <Link className="course--module course--add--module" to="/courses/create">
                    <h3 className="course--add--title">
                        <svg version="1.1" xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" viewBox="0 0 13 13" className="add">
                            <polygon points="7,6 7,0 6,0 6,6 0,6 0,7 6,7 6,13 7,13 7,7 13,7 13,6 "></polygon>
                        </svg>
                        New Course
                    </h3>
                </Link>
            </div>
            )
        }
    }


    return (
        <div className="bounds">
            {   isLoading 
                ? "isLoading..."
                : courses.map(course => {
                    return(
                        
                        <div className="grid-33" key={course.id}><Link className="course--module course--link" to={`courses/${course.id}`}>
                            <h4 className="course--label">Course</h4>
                            <h3 className="course--title">{course.title}</h3>
                        </Link></div>
                    )
                })  
            }
            {
                renderCreateCourse()
            }
            
        </div>
    )
}

export default Courses