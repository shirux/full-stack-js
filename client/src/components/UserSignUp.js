import React from 'react';
import { Link } from 'react-router-dom'
import Form from './Form';

export default class UserSignUp extends React.Component {

    state = {
        errors: []
    }

    firstName = React.createRef();
    lastName = React.createRef();
    email = React.createRef();
    password = React.createRef();
    confirmPassword = React.createRef();

    submit = async () => {

        const user = {
            firstName: this.firstName.current.value,
            lastName: this.lastName.current.value,
            emailAddress: this.email.current.value,
            password: this.password.current.value,
            confirmPassword: this.confirmPassword.current.value
        }

        if (user.password === user.confirmPassword) {
            const { context } = this.props;
            const { from } = this.props.location.state || { from: { pathname: '/'}}
            try {
                const response = await context.actions.signUp(user);
                if (response.length) {
                    this.setState((prevState) => {
                        return {
                            errors: response
                        }
                    })
                } else {
                    this.props.history.push(from)
                }
            } catch (err) {
                console.log('There has been an error registering your user')
            }
            

        } else {
            this.setState((prevState) => {
                return {
                    errors: [<li>Your password does not match.</li>]
                }
            })
        }
        
    }

    cancel = () => {
        this.props.history.push('/')
    }


    render() {
        return(
            <div className="bounds">
                <div className="grid-33 centered signin">
                    <h1>Sign Up</h1>
                <div>
                    <Form
                        cancel={this.cancel}
                        submit={this.submit}
                        submitButtonText="Sign Up"
                        errors={this.state.errors}
                        elements={() => (
                            <React.Fragment>
                                <div>
                                    <input 
                                        id="firstName" 
                                        name="firstName" 
                                        type="text" 
                                        className="" 
                                        placeholder="First Name" 
                                        ref={this.firstName}
                                    />
                                </div>
                                <div>
                                    <input 
                                        id="lastName" 
                                        name="lastName" 
                                        type="text" 
                                        className="" 
                                        placeholder="Last Name" 
                                        ref={this.lastName}
                                    />
                                </div>
                                <div>
                                    <input 
                                        id="emailAddress" 
                                        name="emailAddress" 
                                        type="text" 
                                        className="" 
                                        placeholder="Email Address" 
                                        ref={this.email}
                                    />
                                </div>
                                <div>
                                    <input 
                                        id="password" 
                                        name="password" 
                                        type="password" 
                                        className="" 
                                        placeholder="Password" 
                                        ref={this.password}
                                    />
                                </div>
                                <div>
                                    <input 
                                        id="confirmPassword" 
                                        name="confirmPassword" 
                                        type="password" 
                                        className="" 
                                        placeholder="Confirm Password" 
                                        ref={this.confirmPassword}
                                    />
                                </div>
                            </React.Fragment>
                        )}
                    />
                </div>
                <p>&nbsp;</p>
                <p>Already have a user account? <Link to="signin">Click here</Link> to sign in!</p>
                </div>
            </div>
        );
    }


}