import Header from './components/Header';
import Courses from './components/Courses';
import CreateCourse from './components/CreateCourse';
import CourseDetail from './components/CourseDetail';
import UpdateCourse from './components/UpdateCourse';
import UserSignUp from './components/UserSignUp'; 
import UserSignIn from './components/UserSignIn'; 
import UserSignOut from './components/UserSignOut';
import withContext from './components/Context';
import PrivateRoute from './PrivateRoute';

import { BrowserRouter, Route, Switch } from 'react-router-dom';
import './styles/global.css'

const HeaderWithContext = withContext(Header);
const SignInWithContext = withContext(UserSignIn);
const SignOutWithContext = withContext(UserSignOut);
const SignUpWithContext = withContext(UserSignUp);
const CourseDetailWithContext = withContext(CourseDetail);
const CoursesWithContext = withContext(Courses);
const CreateCourseWithContext = withContext(CreateCourse);
const UpdateCourseWithContext = withContext(UpdateCourse)

function App() {
  return (
    <BrowserRouter>
      <div>
        <HeaderWithContext />
        <hr />
        <Switch>
          <Route exact path="/" component={CoursesWithContext} />
          <Route path="/signup" component={SignUpWithContext} />
          <Route path="/signin" component={SignInWithContext} />
          <Route path="/signout" component={SignOutWithContext} />
          <PrivateRoute path="/courses/create" component={CreateCourseWithContext} />
          <PrivateRoute path="/courses/:id/update" component={UpdateCourseWithContext} />
          <Route path="/courses/:id" component={CourseDetailWithContext} />
        </Switch>
      </div>
    </BrowserRouter>
  )
}

export default App;
