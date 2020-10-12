import React from 'react';
import { Link, Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { showModal as showModalAction } from '../actions/index';

import Button from '../components/atoms/Button/Button';
import Modal from '../components/organisms/Modal/Modal';

const StartView = ({ isShowModal, modalType, showModal, userID }) => {
  if (userID) {
    return <Redirect to="/collections" />;
  }
  return (
    <>
      <Button clicked={() => showModal('login')}>Login</Button>
      <Button clicked={() => showModal('register')}>Register</Button>
      <Link to="/collections">
        <Button>Test</Button>
      </Link>
      {isShowModal && <Modal type={modalType} />}
    </>
  );
};

StartView.propTypes = {
  isShowModal: PropTypes.bool.isRequired,
  showModal: PropTypes.func.isRequired,
  userID: PropTypes.string,
};

StartView.defaultProps = {
  userID: null,
};

const mapStateToProps = ({ isShowModal, modalType, userID }) => {
  return { isShowModal, modalType, userID };
};

const mapDispatchToProps = (dispatch) => ({
  showModal: (modalType) => dispatch(showModalAction(modalType)),
});

export default connect(mapStateToProps, mapDispatchToProps)(StartView);
