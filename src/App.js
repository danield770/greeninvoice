import './App.css';
import React, { useState, useReducer } from 'react';
import ReactDOM from 'react-dom';
import {
  BrowserRouter as Router,
  Redirect,
  Switch,
  Route,
  Link,
} from 'react-router-dom';
import UserInfo from './Components/UserInfo';
import Welcome from './Components/Welcome';
import LoginFail from './Components/LoginFail';
import ValidationMessage from './Components/ValidationMessage';
import { ReactComponent as LoginSvg } from './assets/login.svg';
import { ReactComponent as LogoSvg } from './assets/logo.svg';
import { ReactComponent as GoogleSvg } from './assets/google-icon.svg';

function App() {
  const initialState = {
    isAuthenticated: false,
    isLoading: false,
    user: {},
  };
  const ROOT_URL =
    'https://desolate-ridge-21792.herokuapp.com/https://jupiter.d.greeninvoice.co.il/api/v1';

  const [formField, setFormField] = useState({ email: '', password: '' });
  const [validation, setValidation] = useState({
    isFormValid: false,
    isEmailValid: null,
    isPasswordValid: null,
    hasLoginFailed: false,
  });

  const [state, dispatch] = useReducer(reducer, initialState);

  function reducer(state, action) {
    switch (action.type) {
      case 'REQUEST_LOGIN':
        return {
          ...state,
          isLoading: true,
        };
      case 'LOGIN_SUCCESS':
        return {
          ...state,
          user: action.payload,
          isAuthenticated: true,
          isLoading: false,
        };
      case 'LOGOUT':
        return {
          ...state,
          isAuthenticated: false,
          user: {},
        };

      case 'LOGIN_ERROR':
        return {
          ...state,
          isLoading: false,
        };

      default:
        throw new Error(`Unhandled action type: ${action.type}`);
    }
  }

  async function handleLogin(loginPayload, e) {
    e.preventDefault();

    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(loginPayload),
    };

    try {
      dispatch({ type: 'REQUEST_LOGIN' });
      let response = await fetch(`${ROOT_URL}/account/login`, requestOptions);
      let data = await response.json();

      if (data.id) {
        dispatch({ type: 'LOGIN_SUCCESS', payload: data });

        return data;
      }

      dispatch({ type: 'LOGIN_ERROR', error: data.errors[0] });
      setValidation((validation) => ({ ...validation, hasLoginFailed: true }));
      return;
    } catch (error) {
      dispatch({ type: 'LOGIN_ERROR', error: error });
      setValidation((validation) => ({ ...validation, hasLoginFailed: true }));
    }
  }

  function handleLogout() {
    dispatch({ type: 'LOGOUT' });
  }

  function loginFailedReset() {
    setValidation((validation) => ({ ...validation, hasLoginFailed: false }));
  }

  function handleChange(type, e) {
    setFormField({ ...formField, [type]: e.target.value });
    validateInput(type, true, e);
  }

  function validateInput(type, isFocused, e) {
    const emailRegex = /\S+@\S+\.\S+/;
    if (type === 'email') {
      if (
        isFocused &&
        e.target.value.length > 0 &&
        emailRegex.test(e.target.value)
      ) {
        setValidation((validation) => ({
          ...validation,
          isEmailValid: true,
          isFormValid: validation.isPasswordValid,
        }));
      }
      if (
        !isFocused &&
        (e.target.value.length === 0 || !emailRegex.test(e.target.value))
      ) {
        setValidation((validation) => ({
          ...validation,
          isEmailValid: false,
          isFormValid: false,
        }));
      }
    }
    if (type === 'password') {
      if (isFocused && e.target.value.length >= 6) {
        setValidation((validation) => ({
          ...validation,
          isPasswordValid: true,
          isFormValid: validation.isEmailValid,
        }));
      }
      if (!isFocused && e.target.value.length < 6) {
        setValidation((validation) => ({
          ...validation,
          isPasswordValid: false,
          isFormValid: false,
        }));
      }
    }
  }

  return (
    <Router>
      {state.isAuthenticated ? (
        <div className='nav-wpr'>
          <nav>
            <ul>
              <li>
                <Link to='/welcome'>Welcome</Link>
              </li>
              <li>
                <Link to='/user-info'>User Info</Link>
              </li>
            </ul>
          </nav>
        </div>
      ) : (
        <div>
          <input className='theme-input' id='themToggle' type='checkbox' />
          <label className='theme-label' htmlFor='themToggle'></label>

          <LogoSvg className='logo-svg' />
          {validation.hasLoginFailed && (
            <LoginFail resetLoginFail={loginFailedReset} />
          )}

          <div className='login-grid'>
            <form
              autoComplete='off'
              onSubmit={(e) =>
                handleLogin(
                  { email: formField.email, password: formField.password },
                  e
                )
              }
            >
              <h1>היי, טוב לראות אותך</h1>
              <div className='form-groups'>
                <div
                  className={`form-group ${
                    validation.isEmailValid === false ? 'error' : ''
                  }`}
                >
                  <ValidationMessage
                    value={formField.email}
                    validation={validation}
                    inputType='email'
                  />
                  <input
                    className='form-input'
                    id='email'
                    type='email'
                    placeholder=' '
                    onBlur={(e) => validateInput('email', false, e)}
                    onChange={(e) => handleChange('email', e)}
                  />
                  <label className='form-label' htmlFor='email'>
                    מייל
                  </label>
                </div>
                <div
                  className={`form-group ${
                    validation.isPasswordValid === false ? 'error' : ''
                  }`}
                >
                  <ValidationMessage
                    value={formField.password}
                    validation={validation}
                    inputType='password'
                  />
                  <input
                    className='form-input'
                    id='password'
                    type='password'
                    placeholder=' '
                    onBlur={(e) => validateInput('password', false, e)}
                    onChange={(e) => handleChange('password', e)}
                  />
                  <label className='form-label' htmlFor='password'>
                    סיסמה
                  </label>
                </div>
              </div>
              <div className='btn-group'>
                <button
                  disabled={!validation.isFormValid || state.isLoading}
                  className='form-btn btn-primary'
                >
                  {state.isLoading ? (
                    <span className='spinner'></span>
                  ) : (
                    <span>כניסה</span>
                  )}
                </button>
                <button className='form-btn btn-secondary' type='button'>
                  <span>כניסה עם גוגל</span>
                  <GoogleSvg className='google-svg' />
                </button>
              </div>
            </form>
            <div className='login-svg-wpr'>
              <LoginSvg className='login-svg' />
            </div>
          </div>
        </div>
      )}
      <Switch>
        <Route exact path='/'>
          {state.isAuthenticated && <Redirect to='/welcome' />}
        </Route>
        <Route exact path='/welcome'>
          <>
            {!state.isAuthenticated && <Redirect to='/' />}
            <Welcome
              name={state.isAuthenticated && state.user.firstName}
              businessName={
                state.isAuthenticated && state.user.businesses[0]?.name
              }
              logout={handleLogout}
            />
          </>
        </Route>
        <Route exact path='/user-info'>
          {!state.isAuthenticated && <Redirect to='/' />}
          <UserInfo user={state.user} />
        </Route>
      </Switch>
    </Router>
  );
}

ReactDOM.render(<App />, document.getElementById('root'));

export default App;
