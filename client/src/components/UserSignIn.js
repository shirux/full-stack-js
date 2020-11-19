import React from 'react';
import { Link } from 'react-router-dom';
import Form from './Form';

export default class UserSignIn extends React.Component {

    state = {
        errors: []
    }

    email = React.createRef();
    password = React.createRef();

    submit = () => {
        const { context } = this.props;
        const { from } = this.props.location.state || { from: { pathname: '/'}}
        context.actions.signIn(this.email.current.value, this.password.current.value)
            .then(user => {
                if (user === null) {
                    this.setState(() => {
                        return{ errors: ['Sign in was unsuccessful']};
                    })
                } else {
                    this.props.history.push(from);
                }
            })
            .catch(err => {
                console.log(err);
                this.props.history.push('/error');
            })
    }
    
    cancel = () => {
        this.props.history.push('/')
    }

    render() {
        return (
            <div className="bounds">
                <div className="grid-33 centered signin">
                    <h1>Sign In</h1>
                    <div>
                        <Form
                            cancel={this.cancel}
                            submit={this.submit}
                            submitButtonText="Sign In"
                            errors={this.state.errors}
                            elements={()=> (
                                <React.Fragment>
                                    <div>
                                        <input 
                                            id="emailAddress" 
                                            name="emailAddress" 
                                            type="text" className="" 
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
                                            ref={this.password} />
                                    </div>
                                </React.Fragment>
                            )}
                        />
                    </div>
                    <p>&nbsp;</p>
                    <p>Don't have a user account? <Link to="signup">Click here</Link> to sign up!</p>
                </div>   
            </div>
        )
    }
}