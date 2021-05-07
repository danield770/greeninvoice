import React, { useReducer, useContext, createContext } from 'react';

const authContext = createContext();
// Provider component that wraps your app and makes auth object ...
// ... available to any child component that calls useAuth().
export function ProvideAuth({ children }) {
  const auth = useProvideAuth();
  console.log({ auth });
  return <authContext.Provider value={auth}>{children}</authContext.Provider>;
}
// Hook for child components to get the auth object ...
// ... and re-render when it changes.
export const useAuth = () => {
  return useContext(authContext);
};
// Provider hook that creates auth object and handles state
function useProvideAuth() {
  const initialState = {
    isAuthenticated: false,
    isLoading: false,
    user: {},
  };

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

  const login = async (url, loginPayload, e) => {
    e.preventDefault();

    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(loginPayload),
    };

    try {
      dispatch({ type: 'REQUEST_LOGIN' });
      let response = await fetch(url, requestOptions);
      let data = await response.json();

      if (data.id) {
        dispatch({ type: 'LOGIN_SUCCESS', payload: data });

        return data;
      }

      dispatch({ type: 'LOGIN_ERROR', error: data.errors[0] });
      // setValidation((validation) => ({ ...validation, hasLoginFailed: true }));
      return;
    } catch (error) {
      dispatch({ type: 'LOGIN_ERROR', error: error });
      // setValidation((validation) => ({ ...validation, hasLoginFailed: true }));
    }
  };

  function logout() {
    dispatch({ type: 'LOGOUT' });
  }

  // Return the state and auth methods
  return {
    state,
    login,
    logout,
  };
}
