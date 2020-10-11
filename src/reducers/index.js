const initialState = {
  isShowModal: false,
  modalType: '',
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
    default:
      return state;
  }
};

export default rootReducer;
