import React, { Component } from 'react';
import Data from './Data';

const UserContext = React.createContext(); 

export class Provider extends Component {

    // State to track authenticated User
    state = {
        authenticatedUser: null,
        courses: []
    }

    // Constructor
    constructor() {
        super();
        this.data = new Data()
    }

    /**
     * SignIn method
     */
    signIn = async (username, password) => {
        const user = await this.data.getUser(username, password);
    
        // If there is an user, set state
        if (user !== null) {
          user.password = password;
          this.setState(() => {
            return {
              authenticatedUser: user
            }
          });
          // Cookies.set('authenticatedUser', JSON.stringify(user), { expires: 1 });
        }
        return user;
      }

    /**
     * SignOut method
     */
    signOut = () => {
        this.setState(() => {
            return {
                authenticatedUser: null
            }
        })
    }

    /**
     * SignUp Method
     * If success, saves user in state
     */
    signUp = async (user) => {
      const response = await this.data.createUser(user);
      if (response.length === 0) {
        await this.signIn(user.emailAddress, user.password)
      }
      return response;
    }

    /**
     * Create course method
     */
    createCourse = async(course) => {
      const response = await this.data.createCourse(course, this.state.authenticatedUser)
      return response;
    }

    /**
     * Update course method
     */
    updateCourse = async(course) => {
      const response = await this.data.updateCourse(course, this.state.authenticatedUser)
      return response;
    }

    /**
     * Delete course method
     */
    deleteCourse = async(course) => {
      const response = await this.data.deleteCourse(course, this.state.authenticatedUser)
      return response;
    }
    
  render() {
    const { authenticatedUser, courses } = this.state

    // Props passed to other components
    const value = {
      authenticatedUser,
      courses,
      actions: {
        signIn: this.signIn,
        signOut: this.signOut,
        signUp: this.signUp,
        createCourse: this.createCourse,
        updateCourse: this.updateCourse,
        deleteCourse: this.deleteCourse
       }
    };

    return (
      <UserContext.Provider value={value}>
        {this.props.children}
      </UserContext.Provider>  
    );
  }

}

export const Consumer = UserContext.Consumer;

// Taken from react authentication tutorial from treehouse
export default function withContext(Component) {
    return function ContextComponent(props) {
      return (
        <UserContext.Consumer>
          {context => <Component {...props} context={context} />}
        </UserContext.Consumer>
      );
    }
  }