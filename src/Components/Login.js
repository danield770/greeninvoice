import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../Hooks/useAuth.js';

import LoginFail from './LoginFail';
import ValidationMessage from './ValidationMessage';
import { ReactComponent as LoginSvg } from '../assets/login.svg';
import { ReactComponent as LogoSvg } from '../assets/logo.svg';
import { ReactComponent as GoogleSvg } from '../assets/google-icon.svg';

function Login() {
  const auth = useAuth();
  const ROOT_URL =
    'https://desolate-ridge-21792.herokuapp.com/https://jupiter.d.greeninvoice.co.il/api/v1/account/login';

  const [formField, setFormField] = useState({ email: '', password: '' });
  const [validation, setValidation] = useState({
    isFormValid: false,
    isEmailValid: null,
    isPasswordValid: null,
    hasLoginFailed: false,
  });

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
    <div>
      {auth && auth.state.isAuthenticated ? (
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
                auth.login(
                  ROOT_URL,
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
                  disabled={
                    !validation.isFormValid || (auth && auth?.state?.isLoading)
                  }
                  className='form-btn btn-primary'
                >
                  {auth && auth.state.isLoading ? (
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
          {/* <Switch>
            <Route exact path='/'>
              {auth.state.isAuthenticated && <Redirect to='/welcome' />}
            </Route>
            <Route exact path='/welcome'>
              <>
                {!auth.state.isAuthenticated && <Redirect to='/' />}
                <Welcome user={auth.state.user} />
              </>
            </Route>
            <Route exact path='/user-info'>
              {!auth.state.isAuthenticated && <Redirect to='/' />}
              <UserInfo user={auth.state.user} />
            </Route>
          </Switch> */}
        </div>
      )}
    </div>
  );
}

export default Login;
