import axios from 'axios';

// action constants
export const GET_COMMENTS = 'GET_COMMENTS';
export const ADD_COMMENT = 'ADD_COMMENT';
export const UPDATE_COMMENT = 'UPDATE_COMMENT';
export const DELETE_COMMENT = 'DELETE_COMMENT';

// action creators
export const _getComments = comments => {
  return {
    type: GET_COMMENTS,
    comments
  }
}

export const _addComment = comment => {
  return {
    type: ADD_COMMENT,
    comment
  }
}

export const _updateComment = comment => {
  return {
    type: UPDATE_COMMENT,
    comment
  }
}

export const _deleteComment = comment => {
  return {
    type: DELETE_COMMENT,
    comment
  }
}


// thunks

const getComments = () => {
  return (dispatch) => {
    return axios.get(`/api/comments`)
      .then(res => res.data)
      .then(comments => dispatch(_getComments(comments)))
      .catch(error => console.log(error))
  };
}

const getCommentsForRecipe = (commentId) => {
  return (dispatch) => {
    return axios.get(`/api/comments/recipe/${commentId}`)
      .then(res => res.data)
      .then(comments => dispatch(_getComments(comments)))
      .catch(error => console.log(error))
  };
}

const getCommentsByUser = (userId) => {
    return (dispatch) => {
      return axios.get(`/api/comments/user/${userId}`)
        .then(res => res.data)
        .then(comments => dispatch(_getComments(comments)))
        .catch(error => console.log(error))
    };
  }

const addComment = (comment) => {
  return (dispatch) => {
    return axios.post(`/api/comments`, comment)
      .then(res => res.data)
      .then(comment => dispatch(_addComment(comment)))
      .catch(error => console.log(error))
  };
};

const updateComment = (comment) => {
  return (dispatch) => {
    return axios.put(`/api/comments/${comment.id}`, comment)
      .then(res => res.data)
      .then(comment => dispatch(_updateComment(comment)))
  };
};

const deleteComment = (comment, history) => {
  return (dispatch) => {
      return axios.delete(`/api/comments/${comment.id}`)
        .then(() => dispatch(_deleteComment(comment)))
        .then(() => history.back())
  }
};


// reducer
const commentReducer = (state = [], action) => {
  switch(action.type) {
    case GET_COMMENTS:
      state = action.comments
      break;
    case ADD_COMMENT:
      state = [...state, action.comment]
      break;
    case UPDATE_COMMENT:
      state = [...state.filter(comment => comment.id !== action.comment.id), action.comment]
      break;
    case DELETE_COMMENT:
      state = state.filter(comment => comment.id !== action.comment.id)
      break;
  }
  return state;
}



export {
  commentReducer,
  getComments,
  updateComment,
  deleteComment,
  addComment,
  getCommentsForRecipe
}
