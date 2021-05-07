import './App.css';
import React from 'react';
import ReactDOM from 'react-dom';
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from 'react-router-dom';
import { ProvideAuth } from './Hooks/useAuth.js';
import Login from './Components/Login';
import UserInfo from './Components/UserInfo';
import Welcome from './Components/Welcome';

function App() {
  return (
    <ProvideAuth>
      <Router>
        <Login />
        <Switch>
          <Route exact path='/'>
            {/* {auth.state.isAuthenticated && <Redirect to='/welcome' />} */}
          </Route>
          <Route exact path='/welcome'>
            <>
              {/* {!auth.state.isAuthenticated && <Redirect to='/' />} */}
              <Welcome />
            </>
          </Route>
          <Route exact path='/user-info'>
            {/* {!auth.state.isAuthenticated && <Redirect to='/' />} */}
            <UserInfo />
          </Route>
        </Switch>
      </Router>
    </ProvideAuth>
  );
}

ReactDOM.render(<App />, document.getElementById('root'));

export default App;
