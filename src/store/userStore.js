import axios from 'axios'

//create a new user
//update a user
//get user
//delete user

const initialState = {
  users : [],
  user : {}
};

const GET_ALL_USERS = 'GET_ALL_USERS'
const GET_USER = 'GET_USER'
const UPDATE_USER = 'UPDATE_USER'
const CREATE_USER = 'CREATE_USER'
const DELETE_USER = 'DELETE_USER'

const _getAllUsers = users => ({
  type : GET_ALL_USERS,
  users
});


const _getUser = user => ({
  type : GET_USER,
  user
});

const _updateUser = user => ({
  type : UPDATE_USER,
  user
});

const _createUser = user => ({
  type : CREATE_USER,
  user
});

const _deleteUser = user => ({
  type : DELETE_USER,
  user
});

//thunks go here
export const getAllUsers = () => {
  return dispatch => {
    return axios.get('/api/users')
      .then(response => response.data)
      .then(users => dispatch(_getAllUsers(users)));
  }
};

export const getUser = user => {
  return dispatch => {
    return axios.get(`/api/users/${user.id}`)
      .then(response => response.data)
      .then(user => dispatch(_getUser(user)))
  }
};

export const createUser = user => {
  return dispatch => {
    return axios.post('/api/users', user)
      .then(response => response.data)
      .then(user => dispatch(_createUser(user)))
  }
};

export const updateUser = user => {
  return dispatch => {
    return axios.put(`/api/users/${user.id}`, user)
    .then(response => response.data)
    .then(user => dispatch(_updateUser(user)))
  }
};

export const deleteUser = user => {
  return dispatch => {
    return axios.delete(`/api/users/${user.id}`)
      .then(() => dispatch(_deleteUser(user)))
  }
};

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_ALL_USERS:
      return {...state, users : action.users}
    case GET_USER:
      return {...state, user : action.user}
    case CREATE_USER:
      return {...state, user : action.user}
    case UPDATE_USER:
      return {...state, user : action.user}
    case DELETE_USER:
      return {...state, user : {}}
    default:
      return state
  }
};

export default userReducer
