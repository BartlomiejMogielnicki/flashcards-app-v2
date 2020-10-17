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
      };
    case 'AUTHENTICATION_SUCCESS':
      return {
        ...state,
        isShowModal: false,
        modalType: '',
        userID: action.payload.data.user._id,
        userName: action.payload.data.user.name,
        authPasswordError: false,
      };
    case 'AUTHENTICATION_FAILURE':
      return {
        ...state,
        authPasswordError: true,
      };
    case 'LOGOUT':
      return {
        ...state,
        userID: '',
        userName: '',
        userCollections: [],
        activeCollection: {},
      };
    case 'CREATEACCOUNT_SUCCESS':
      return {
        ...state,
        isShowModal: false,
        modalType: '',
        userID: action.payload.data.user._id,
      };
    case 'GETCOLLECTIONS_SUCCESS':
      return {
        ...state,
        userCollections: action.payload.data.collections,
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
    case 'CREATECOLLECTION_SUCCESS':
      return {
        ...state,
        userCollections: action.payload.data.collections,
      };
    case 'DELETECOLLECTION_SUCCESS':
      return {
        ...state,
        userCollections: action.payload.data.collections,
        collectionID: '',
        isShowModal: false,
        modalType: '',
      };
    case 'CREATECARD_SUCCESS':
      return {
        ...state,
        activeCollection: {
          ...state.activeCollection,
          cards: [...state.activeCollection.cards, action.payload.data.card],
        },
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
      };
    case 'CHANGE_CARD':
      return {
        ...state,
        activeCard: state.activeCard + action.payload.changeNum,
        swapDirection: action.payload.direction,
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
      };
    default:
      return state;
  }
};

export default rootReducer;
