import axios from 'axios'

const initialState = {
  auth: {}
}

const SET_AUTH = 'SET_AUTH'

const _setAuth = (auth) => ({
  type: SET_AUTH,
  auth
})

//grabs the token and then calls the api for the user
//once it receives the user it will dispatch setAuth to set the user
export const exchangeTokenForAuth = () => {
  return dispatch => {
    const token = window.localStorage.getItem('token');
    if(!token) {
      return
    }
    return axios.get('/api/auth', {
      headers : {
        authorization : token
      }
    })
    .then( response => response.data )
    .then( auth => dispatch(_setAuth(auth)))
    //if there is an error, we just remove the token
    .catch ( ex => window.localStorage.removeItem('token'))
  }
};

export const login = credentials => {
  return dispatch => {
    console.log('thunk:', credentials)
    return axios.post('/api/auth', credentials)
      .then(response => response.data)
      //sets the token on localStorage and then calls exchangeTokenForAuth
      .then(data => window.localStorage.setItem('token', data.token))
      .then(() => dispatch(exchangeTokenForAuth()))
  };
};

export const logout = () => {
  window.localStorage.removeItem('token');
  return _setAuth({});
}

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_AUTH:
      state = action.auth;
      return state
    default:
      return state
  }
}

export default authReducer
