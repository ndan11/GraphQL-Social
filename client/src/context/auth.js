import React, { useReducer, createContext } from 'react';
import { getJWT, getUser, isAuthenticated, setJWT, setUser, signOut } from '../utils/auth_helpers';

const initialState = {
  user: null
};

if(isAuthenticated()){
  initialState.user = {
    userName : getUser(),
    token : getJWT()
  }
}

const AuthContext = createContext({
  user: null,
  login: (userData) => {},
  logout: () => {}
});

function authReducer(state, action) {
  switch (action.type) {
    case 'LOGIN':
      return {
        ...state,
        user: action.payload
      };
    case 'LOGOUT':
      return {
        ...state,
        user: null
      };
    default:
      return state;
  }
}

function AuthProvider(props) {
  const [state, dispatch] = useReducer(authReducer, initialState);

  function login(user) {
    setUser(user.userName)
    setJWT(user.token)
    dispatch({
      type: 'LOGIN',
      payload: user
    });
  }

  function logout() {
    signOut()
    dispatch({ type: 'LOGOUT' });
  }

  return (
    <AuthContext.Provider
      value={{ user: state.user, login, logout }}
      {...props}
    />
  );
}

export { AuthContext, AuthProvider };