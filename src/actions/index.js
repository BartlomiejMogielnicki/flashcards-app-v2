import axios from 'axios';

// const URL = 'http://localhost:3000';
const URL = 'https://bmogielnicki-flashcards-app.herokuapp.com';

export const showModal = (modalType, collectionID) => {
  return {
    type: 'SHOW_MODAL',
    payload: {
      modalType,
      collectionID,
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
    .post(`${URL}/users/login`, { name: username, password })
    .then((payload) => {
      dispatch({ type: 'AUTHENTICATION_SUCCESS', payload });
    })
    .catch((error) => {
      dispatch({ type: 'AUTHENTICATION_FAILURE', error });
    });
};

export const setToken = (token) => {
  return {
    type: 'SET_TOKEN',
    payload: {
      token,
    },
  };
};

export const getUserName = (authToken) => (dispatch) => {
  dispatch({ type: 'GETNAME_REQUEST' });

  return axios
    .get(`${URL}/users/name`, {
      headers: {
        Authorization: `Bearer ${authToken}`,
      },
    })
    .then((payload) => {
      dispatch({ type: 'GETNAME_SUCCESS', payload, authToken });
    })
    .catch((error) => {
      dispatch({ type: 'GETNAME_FAILURE', error });
    });
};

export const logout = () => {
  window.localStorage.removeItem('authToken');
  return {
    type: 'LOGOUT',
  };
};

export const createAccount = (username, password) => (dispatch) => {
  dispatch({ type: 'CREATEACCOUNT_REQUEST' });

  return axios
    .post(`${URL}/users`, { name: username, password })
    .then((payload) => {
      dispatch({ type: 'CREATEACCOUNT_SUCCESS', payload });
    })
    .catch((error) => {
      dispatch({ type: 'CREATEACCOUNT_FAILURE', error });
    });
};

export const getCollections = (authToken) => (dispatch) => {
  dispatch({ type: 'GETCOLLECTIONS_REQUEST' });

  return axios
    .get(`${URL}/collections`, {
      headers: {
        Authorization: `Bearer ${authToken}`,
      },
    })
    .then((payload) => {
      dispatch({ type: 'GETCOLLECTIONS_SUCCESS', payload });
    })
    .catch((error) => {
      dispatch({ type: 'GETCOLLECTIONS_FAILURE', error });
    });
};

export const createCollection = (authToken, title) => (dispatch) => {
  dispatch({ type: 'CREATECOLLECTION_REQUEST' });
  return axios
    .post(
      `${URL}/collections`,
      { title },
      {
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      },
    )
    .then((payload) => {
      dispatch({ type: 'CREATECOLLECTION_SUCCESS', payload });
      dispatch({ type: 'HIDE_MODAL' });
    })
    .catch((error) => {
      dispatch({ type: 'CREATECOLLECTION_FAILURE', error });
    });
};

export const deleteCollection = (authToken, id) => (dispatch) => {
  dispatch({ type: 'DELETECOLLECTION_REQUEST' });
  return axios
    .delete(`${URL}/collections`, {
      params: {
        id,
      },
      headers: {
        Authorization: `Bearer ${authToken}`,
      },
    })
    .then((payload) => {
      dispatch({ type: 'DELETECOLLECTION_SUCCESS', payload });
    })
    .catch((error) => {
      dispatch({ type: 'DELETECOLLECTION_FAILURE', error });
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

export const createCard = (authToken, title, question, answer) => (dispatch) => {
  dispatch({ type: 'CREATECARD_REQUEST' });
  return axios
    .post(
      `${URL}/cards`,
      { title, question, answer },
      {
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      },
    )
    .then((payload) => {
      dispatch({ type: 'CREATECARD_SUCCESS', payload });
      dispatch({ type: 'HIDE_MODAL' });
    })
    .catch((error) => {
      dispatch({ type: 'CREATECARD_FAILURE', error });
    });
};

export const deleteCard = (authToken, collectionTitle, id) => (dispatch) => {
  dispatch({ type: 'DELETECARD_REQUEST' });
  return axios
    .delete(`${URL}/cards`, {
      params: {
        collectionTitle,
        id,
      },
      headers: {
        Authorization: `Bearer ${authToken}`,
      },
    })
    .then((payload) => {
      dispatch({ type: 'DELETECARD_SUCCESS', payload });
    })
    .catch((error) => {
      dispatch({ type: 'DELETECARD_FAILURE', error });
    });
};

export const changeCard = (direction) => {
  let changeNum;
  if (direction === 'right') {
    changeNum = 1;
  } else if (direction === 'left') {
    changeNum = -1;
  }

  return {
    type: 'CHANGE_CARD',
    payload: {
      changeNum,
      direction,
    },
  };
};

export const randomCard = (cardsNum, activeCard) => {
  let setCard;
  do setCard = Math.floor(Math.random() * cardsNum);
  while (setCard === activeCard);

  let direction;
  if (setCard < activeCard) {
    direction = 'left';
  } else {
    direction = 'right';
  }

  return {
    type: 'RANDOM_CARD',
    payload: {
      setCard,
      direction,
    },
  };
};

export const resetCard = () => {
  return {
    type: 'RESET_CARD',
  };
};

export const setFlipAnimation = () => {
  return {
    type: 'SET_FLIPANIMATION',
  };
};
