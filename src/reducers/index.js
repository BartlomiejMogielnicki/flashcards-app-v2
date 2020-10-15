const initialState = {
  isShowModal: false,
  modalType: '',
  activeCard: 0,
  swapDirection: 'right',
  // userID for tests - remember to delete!
  userID: '5f804e65b5343724f459dc00',
};

const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'SHOW_MODAL':
      return {
        ...state,
        isShowModal: !state.isShowModal,
        modalType: action.payload.modalType,
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
      };
    case 'LOGOUT':
      return {
        ...state,
        userID: '',
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
    default:
      return state;
  }
};

export default rootReducer;
