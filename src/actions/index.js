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
