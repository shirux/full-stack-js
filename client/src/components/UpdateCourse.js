import React, { useState, useEffect } from 'react';
import Form from './Form';
import Axios from 'axios';
import config from './Context/config'


const UpdateCourse  = ({ match, context, history }) => {

    const [course, setCourse] = useState({});
    const [isLoading, setIsLoading] = useState(true)
    const [errors, setErrors] = useState([]);

    const handleChange = (e) => {
        const name = e.target.name;
        setCourse({...course, [name]: e.target.value})
        
    }

    const authUser = context.authenticatedUser;

    useEffect(() => {
        const id = match.params.id
        Axios.get(`${config.apiBaseUrl}/courses/${id}`)
            .then(response => {
                if (response) {
                    setCourse(response.data)
                }
            })
            .catch(err => {
                console.log('Error fetching data course detail')
            })
            .finally(() => {
                setIsLoading(false)
            })
    }, [])

    const cancel = () => {
        history.push('/')
    }

    const submit = async() => {
        try {
            let response = await context.actions.updateCourse(course)
            if (response.length) {
                setErrors(response)
            } else {
                history.push('/')
            }
        } catch(err) {
            console.log('Error updating course')
        }
    }

    const renderUpdateCourseForm = () => {
        return (
            <div className="bounds course--detail">
                <h1>Update Course</h1>
                <div>
                    <Form 
                        cancel={cancel}
                        submit={submit}
                        submitButtonText="Update Course"
                        errors={errors}
                        elements={() => (
                            <React.Fragment>
                                <div className="grid-66">
                                    <div className="course--header">
                                        <h4 className="course--label">Course</h4>
                                        <div>
                                            <input 
                                                id="title" 
                                                name="title" 
                                                type="text" 
                                                className="input-title course--title--input" 
                                                placeholder="Course title..."
                                                value={course.title}
                                                onChange={handleChange}
                                            />
                                        </div>
                                        <p>{`By ${authUser.firstName} ${authUser.lastName}`}</p>
                                    </div>
                                    <div className="course--description">
                                        <div>
                                            <textarea 
                                                id="description" 
                                                name="description" 
                                                className="" 
                                                placeholder="Course description..."
                                                value={course.description}
                                                onChange={handleChange}
                                            />
                                        </div>
                                    </div>
                                </div>
                                <div className="grid-25 grid-right">
                                    <div className="course--stats">
                                        <ul className="course--stats--list">
                                            <li className="course--stats--list--item">
                                                <h4>Estimated Time</h4>
                                                <div>
                                                    <input 
                                                        id="estimatedTime" 
                                                        name="estimatedTime" 
                                                        type="text" 
                                                        className="course--time--input" 
                                                        placeholder="Hours" 
                                                        value={course.estimatedTime}
                                                        onChange={handleChange}
                                                    />
                                                </div>
                                            </li>
                                            <li className="course--stats--list--item">
                                                <h4>Materials Needed</h4>
                                                <div>
                                                    <textarea 
                                                        id="materialsNeeded" 
                                                        name="materialsNeeded" 
                                                        className="" 
                                                        placeholder="List materials..."
                                                        value={course.materialsNeeded}
                                                        onChange={handleChange}
                                                    />
                                                </div>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                            </React.Fragment>
                        )}
                    />
                </div>
            </div>
        )
    }

    return(
        <div>
            {
                 isLoading ? 
                 <div></div>
                : renderUpdateCourseForm() 
            }
        </div>
    )
    
}

export default UpdateCourse