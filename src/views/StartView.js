import React from 'react';
import { Link, Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { showModal as showModalAction } from '../actions/index';

import Button from '../components/atoms/Button/Button';
import Modal from '../components/organisms/Modal/Modal';

const StartView = ({ isShowModal, showModal, userID }) => {
  if (userID) {
    return <Redirect to="/collections" />;
  }
  const modalType = 'login';
  return (
    <>
      <Button type="login" clicked={() => showModal('login')}>
        Login
      </Button>
      <Button type="register" clicked={() => showModal('register')}>
        Register
      </Button>
      <Link to="/collections">
        <Button type="test">Test</Button>
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

const mapStateToProps = ({ isShowModal, userID }) => {
  return { isShowModal, userID };
};

const mapDispatchToProps = (dispatch) => ({
  showModal: (modalType) => dispatch(showModalAction(modalType)),
});

export default connect(mapStateToProps, mapDispatchToProps)(StartView);
