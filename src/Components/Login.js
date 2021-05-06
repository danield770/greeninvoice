import React, { useState, useReducer } from 'react';

function Login(props) {
  //     const ROOT_URL =
  //     'https://desolate-ridge-21792.herokuapp.com/https://jupiter.d.greeninvoice.co.il/api/v1';
  //   //const ROOT_URL = 'https://jupiter.d.greeninvoice.co.il/api/v1';
  //   // const [email, setEmail] = useState('');
  //   // const [password, setPassword] = useState('');

  //   // const [validation, setValidation] = useState({});

  //   const initialState = {
  //     //email: "",
  //     //password: "",
  //     isAuthenticated: false,
  //     isLoading: false,
  //     loginFailedMessage: '',
  //     user: {},
  //     // location: '',
  //     //isFormValid: false,
  //     //isEmailValid: null,
  //     //isPasswordValid: null
  //   };

  //   const [state, dispatch] = useReducer(reducer, initialState);

  //   //const { location } = useLocation();
  //   //console.log({ location });

  //   async function handleLogin(loginPayload, e) {
  //     e.preventDefault();
  //     //console.log({ formField });

  //     const requestOptions = {
  //       method: 'POST',
  //       headers: { 'Content-Type': 'application/json' },
  //       body: JSON.stringify(loginPayload),
  //     };

  //     try {
  //       dispatch({ type: 'REQUEST_LOGIN' });
  //       let response = await fetch(`${ROOT_URL}/account/login`, requestOptions);
  //       let data = await response.json();

  //       if (data.id) {
  //         console.log({ data });
  //         dispatch({ type: 'LOGIN_SUCCESS', payload: data });
  //         // localStorage.setItem("currentUser", JSON.stringify(data));
  //         //data.then(() => history.push('/welcome'));
  //         // console.log('history2', history);
  //         // history.push('/welcome');
  //         return data;
  //       }

  //       dispatch({ type: 'LOGIN_ERROR', error: data.errors[0] });
  //       console.log('error', data);
  //       return;
  //     } catch (error) {
  //       dispatch({ type: 'LOGIN_ERROR', error: error });
  //       console.log({ error });
  //     }
  //   }

  //   function reducer(state, action) {
  //     switch (action.type) {
  //       case 'REQUEST_LOGIN':
  //         return {
  //           ...state,
  //           isLoading: true,
  //         };
  //       case 'LOGIN_SUCCESS':
  //         return {
  //           ...state,
  //           user: action.payload,
  //           isAuthenticated: true,
  //           isLoading: false,
  //         };
  //       case 'LOGOUT':
  //         return {
  //           ...state,
  //           //email: "",
  //           //password: "",
  //           isAuthenticated: false,
  //           user: {},
  //         };

  //       case 'LOGIN_ERROR':
  //         return {
  //           ...state,
  //           loading: false,
  //           errorMessage: action.error,
  //         };

  //       default:
  //         throw new Error(`Unhandled action type: ${action.type}`);
  //     }
  //   }

  //   const [formField, setFormField] = useState({ email: '', password: '' });

  //   function handleChange(type, e) {
  //     setFormField({ ...formField, [type]: e.target.value });
  //   }

  return (
    <div />
    // <form
    //   onSubmit={(e) =>
    //     handleLogin({ email: formField.email, password: formField.password }, e)
    //   }
    // >
    //   <div>
    //     <label>Email</label>
    //     <input type='email' onChange={(e) => handleChange('email', e)} />
    //   </div>
    //   <div>
    //     <label>Password</label>
    //     <input type='password' onChange={(e) => handleChange('password', e)} />
    //   </div>
    //   <button>Login</button>
    // </form>
  );
}
