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
      console.log(payload);
      dispatch({ type: 'AUTHENTICATION_SUCCESS', payload });
    })
    .catch((error) => {
      console.log(error);
      dispatch({ type: 'AUTHENTICATION_FAILURE', error });
    });
};
