import axios from 'axios';

export const showModal = (modalType) => {
  return {
    type: 'SHOW_MODAL',
    payload: {
      modalType,
    },
  };
};

export const hideModal = () => {
  return {
    type: 'HIDE_MODAL',
  };
};

export const authenticate = (username, password) => (dispatch) => {
  dispatch({ type: 'AUTHENTICATE_REQUEST' });

  return axios
    .post('http://localhost:3000/users/login', { name: username, password })
    .then((payload) => {
      dispatch({ type: 'AUTHENTICATION_SUCCESS', payload });
    })
    .catch((error) => {
      dispatch({ type: 'AUTHENTICATION_FAILURE', error });
    });
};

export const logout = () => {
  return {
    type: 'LOGOUT',
  };
};

export const createAccount = (username, password) => (dispatch) => {
  dispatch({ type: 'CREATEACCOUNT_REQUEST' });

  return axios
    .post('http://localhost:3000/users', { name: username, password })
    .then((payload) => {
      dispatch({ type: 'CREATEACCOUNT_SUCCESS', payload });
    })
    .catch((error) => {
      dispatch({ type: 'CREATEACCOUNT_FAILURE', error });
    });
};

export const getCollections = (userID) => (dispatch) => {
  dispatch({ type: 'GETCOLLECTIONS_REQUEST' });

  return axios
    .get('http://localhost:3000/collections', {
      params: {
        _id: userID,
      },
    })
    .then((payload) => {
      dispatch({ type: 'GETCOLLECTIONS_SUCCESS', payload });
    })
    .catch((error) => {
      dispatch({ type: 'GETCOLLECTIONS_FAILURE', error });
    });
};

export const createCollection = (userID, title) => (dispatch) => {
  dispatch({ type: 'CREATECOLLECTION_REQUEST' });
  return axios
    .post('http://localhost:3000/collections', { userID, title })
    .then((payload) => {
      dispatch({ type: 'CREATECOLLECTION_SUCCESS', payload });
      dispatch({ type: 'HIDE_MODAL' });
    })
    .catch((error) => {
      dispatch({ type: 'CREATECOLLECTION_FAILURE', error });
    });
};

// NOT TESTED YET
export const deleteCollection = (id) => (dispatch) => {
  dispatch({ type: 'DELETECOLLECTION_REQUEST' });
  return axios
    .delete('http://localhost:3000/collections', { id })
    .then((payload) => {
      dispatch({ type: 'CREATECOLLECTION_SUCCESS', payload });
      dispatch({ type: 'HIDE_MODAL' });
    })
    .catch((error) => {
      dispatch({ type: 'CREATECOLLECTION_FAILURE', error });
    });
};

export const setActiveCollection = (title, cards) => {
  return {
    type: 'SET_ACTIVECOLLECTION',
    payload: {
      title,
      cards,
    },
  };
};

export const resetActiveCollection = () => {
  return {
    type: 'RESET_ACTIVECOLLECTION',
  };
};
