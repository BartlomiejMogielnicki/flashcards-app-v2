import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import Button from '../components/atoms/Button/Button';
import Modal from '../components/organisms/Modal/Modal';

class StartView extends Component {
  state = {
    showModal: false,
    modalType: '',
  };

  handleShowModal = (type) => {
    let { showModal, modalType } = this.state;
    showModal = true;
    modalType = type;
    this.setState({
      showModal,
      modalType,
    });
  };

  render() {
    const { showModal, modalType } = this.state;
    return (
      <>
        <Button type="login" clicked={() => this.handleShowModal('login')}>
          Login
        </Button>
        <Button type="register" clicked={() => this.handleShowModal('register')}>
          Register
        </Button>
        <Link to="/collections">
          <Button type="test">Test</Button>
        </Link>
        {showModal && <Modal type={modalType} />}
      </>
    );
  }
}

export default StartView;
