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
    default:
      return state;
  }
};

export default rootReducer;
