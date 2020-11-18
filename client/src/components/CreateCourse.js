import React, {useState } from 'react';
import Form from './Form';

const CreateCourse = ({ context, history }) => {

    const authUser = context.authenticatedUser
    const title = React.createRef();
    const estimatedTime = React.createRef();
    const description = React.createRef();
    const materialsNeeded = React.createRef();

    const [errors, setErrors] = useState([]);

    const cancel = () => {
        history.push('/')
    }

    const submit = async (event) => {
        const newCourse = {
            title: title.current.value,
            description: description.current.value,
            estimatedTime: estimatedTime.current.value,
            materialsNeeded: materialsNeeded.current.value,
            userId: authUser.id
        }

        try {
            const response = await context.actions.createCourse(newCourse);
            if (response.length) {
                setErrors(response)
            } else {
                history.push('/')
            }
        } catch(err) {
            console.log('There has been an error creating a course')
        }


    }

    return (
        <div className="bounds course--detail">
        <h1>Create Course</h1>
          <Form 
            submit={submit}
            cancel={cancel}
            submitButtonText="Create Course"
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
                                    ref={title}
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
                                    ref={description}
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
                                            ref={estimatedTime} 
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
                                            ref={materialsNeeded}
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
    )
}

export default CreateCourse