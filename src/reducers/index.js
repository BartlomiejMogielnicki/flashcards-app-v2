const initialState = {
  isShowModal: false,
  modalType: '',
  activeCard: 0,
  swapDirection: 'right',
};

const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'SHOW_MODAL':
      return {
        ...state,
        isShowModal: !state.isShowModal,
        modalType: action.payload.modalType,
        collectionID: action.payload.collectionID,
      };
    case 'HIDE_MODAL':
      return {
        ...state,
        isShowModal: false,
        modalType: '',
        authError: '',
      };
    case 'AUTHENTICATE_REQUEST':
      return {
        ...state,
        isLoading: true,
      };
    case 'AUTHENTICATION_SUCCESS':
      return {
        ...state,
        isShowModal: false,
        modalType: '',
        userName: action.payload.data.user.name,
        authToken: action.payload.data.token,
        authPasswordError: false,
        authError: '',
        isLoading: false,
      };
    case 'AUTHENTICATION_FAILURE':
      return {
        ...state,
        authError: 'Invalid login or password',
        isLoading: false,
      };
    case 'SET_TOKEN':
      return {
        ...state,
        authToken: action.payload.token,
      };
    case 'GETNAME_SUCCESS':
      return {
        ...state,
        userName: action.payload.data.user.name,
        authToken: action.authToken,
      };
    case 'LOGOUT':
      return {
        ...state,
        userName: '',
        userCollections: [],
        activeCollection: {},
        isShowModal: false,
        authToken: '',
        modalType: '',
        activeCard: 0,
      };
    case 'CREATEACCOUNT_REQUEST':
      return {
        ...state,
        isLoading: true,
      };
    case 'CREATEACCOUNT_SUCCESS':
      return {
        ...state,
        isShowModal: false,
        modalType: '',
        userName: action.payload.data.user.name,
        authToken: action.payload.data.token,
        authError: '',
        isLoading: false,
      };
    case 'CREATEACCOUNT_FAILURE':
      if (action.error.response.status === 409) {
        return {
          ...state,
          authError: 'Login is already taken',
          isLoading: false,
        };
      }
      return {
        ...state,
        authError: 'Something went wrong, please try again',
        isLoading: false,
      };
    case 'GETCOLLECTIONS_REQUEST':
      return {
        ...state,
        isLoading: true,
      };
    case 'GETCOLLECTIONS_SUCCESS':
      return {
        ...state,
        userCollections: action.payload.data.collections,
        isLoading: false,
      };
    case 'GETCOLLECTIONS_FAILURE':
      return {
        ...state,
        isLoading: false,
      };
    case 'SET_ACTIVECOLLECTION':
      return {
        ...state,
        activeCollection: {
          title: action.payload.title,
          cards: action.payload.cards,
        },
      };
    case 'RESET_ACTIVECOLLECTION':
      return {
        ...state,
        activeCollection: {},
      };
    case 'CREATECOLLECTION_REQUEST':
      return {
        ...state,
        isLoading: true,
      };
    case 'CREATECOLLECTION_SUCCESS':
      return {
        ...state,
        userCollections: action.payload.data.collections,
        isLoading: false,
      };
    case 'CREATECOLLECTION_FAILURE':
      return {
        ...state,
        authError: 'Collection name is already taken',
        isLoading: false,
      };
    case 'DELETECOLLECTION_REQUEST':
      return {
        ...state,
        isLoading: true,
      };
    case 'DELETECOLLECTION_SUCCESS':
      return {
        ...state,
        userCollections: action.payload.data.collections,
        collectionID: '',
        isShowModal: false,
        modalType: '',
        isLoading: false,
      };
    case 'CREATECARD_REQUEST':
      return {
        ...state,
        isLoading: true,
      };
    case 'CREATECARD_SUCCESS':
      return {
        ...state,
        activeCollection: {
          ...state.activeCollection,
          cards: [...state.activeCollection.cards, action.payload.data.card],
        },
        isLoading: false,
      };
    case 'CREATECARD_FAILURE':
      return {
        ...state,
        isLoading: false,
      };
    case 'DELETECARD_REQUEST':
      return {
        ...state,
        isLoading: true,
      };
    case 'DELETECARD_SUCCESS':
      return {
        ...state,
        activeCollection: {
          ...state.activeCollection,
          cards: [
            ...state.activeCollection.cards.filter((card) => {
              return card._id !== action.payload.data.id;
            }),
          ],
        },
        isLoading: false,
      };
    case 'DELETECARD_FAILURE':
      return {
        ...state,
        isLoading: false,
      };
    case 'CHANGE_CARD':
      return {
        ...state,
        activeCard: state.activeCard + action.payload.changeNum,
        swapDirection: action.payload.direction,
        cardAnimation: '',
      };
    case 'RANDOM_CARD':
      return {
        ...state,
        activeCard: action.payload.setCard,
        swapDirection: action.payload.direction,
      };
    case 'RESET_CARD':
      return {
        ...state,
        activeCard: 0,
        swapDirection: 'right',
      };
    case 'SET_FLIPANIMATION':
      return {
        ...state,
        cardAnimation: 'flip',
      };
    default:
      return state;
  }
};

export default rootReducer;
