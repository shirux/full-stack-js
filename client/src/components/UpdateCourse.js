import React from 'react';
import Form from './Form';
import Axios from 'axios';
import config from './Context/config'

// = ({ match, context, history }) =>
class UpdateCourse extends React.Component {

    // const [course, setCourse] = useState({});
    // const [isLoading, setIsLoading] = useState(true)
    // const [errors, setErrors] = useState([]);

    constructor(props) {
        super(props);
        this.state = { 
            course: null,
            isLoading: true,
            errors:[] 
        };
    }

    handleChange = (e) => {
        const name = e.target.name;
        this.setState((prevState) => {
            return {
                course: {
                    ...this.state.course,
                    [name]: e.target.value,
                }
            }
        })
    }

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


    cancel = () => {
        this.props.history.push('/')
    }

    submit = async() => {
        try {
            let response = await this.props.context.actions.updateCourse(this.state.course)
            if (response.length) {
                this.setState((prevState) => {
                    return {
                        errors: response
                    }
                })
            } else {
                this.props.history.push('/')
            }
        } catch(err) {
            console.log('Error updating course')
        }
    }

    renderUpdateCourseForm = () => {
        const course = this.state.course;
        const authUser = this.props.context.authenticatedUser;
        return (
            <div className="bounds course--detail">
                <h1>Update Course</h1>
                <div>
                    <Form 
                        cancel={this.cancel}
                        submit={this.submit}
                        submitButtonText="Update Course"
                        errors={this.state.errors}
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
                                                onChange={this.handleChange}
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
                                                onChange={this.handleChange}
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
                                                        onChange={this.handleChange}
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
                                                        onChange={this.handleChange}
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

    render() {
        return(
            <div>
                {
                     this.state.isLoading ? 
                     <div></div>
                    : this.renderUpdateCourseForm() 
                }
            </div>
        )
    }
    
    
}

export default UpdateCourse