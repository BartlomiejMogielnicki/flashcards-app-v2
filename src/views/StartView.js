import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { showModal as showModalAction } from '../actions/index';

import Button from '../components/atoms/Button/Button';
import Modal from '../components/organisms/Modal/Modal';

const StartView = ({ isShowModal, showModal }) => {
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
};

const mapStateToProps = ({ isShowModal }) => {
  return { isShowModal };
};

const mapDispatchToProps = (dispatch) => ({
  showModal: (modalType) => dispatch(showModalAction(modalType)),
});

export default connect(mapStateToProps, mapDispatchToProps)(StartView);
