import React, { useState } from 'react';
import styled, { keyframes } from 'styled-components';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {
  hideModal as hideModalAction,
  authenticate as authenticateAction,
  createAccount as createAccountAction,
  createCollection as createCollectionAction,
} from '../../../actions/index';

import Button from '../../atoms/Button/Button';
import Input from '../../atoms/Input/Input';

const flipIn = keyframes`
  from {
    transform: translate(-50%, -50%) rotateX(180deg);
  }

  to {
    transform: translate(-50%, -50%) rotateX(0);
  }
`;

const StyledWrapper = styled.div`
  width: 330px;
  height: 280px;
  padding: 10px;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: white;
  box-shadow: 0 0 10px 2px rgba(0, 0, 0, 0.2);
  color: ${({ theme }) => theme.tertiaryColor};
  animation: ${flipIn} 0.2s linear forwards;

  @media (max-width: 550px) {
    width: 250px;
    height: 250px;
  }

  @media (max-height: 600px) {
    width: 250px;
    height: 250px;
  }
`;

const showIn = keyframes`
0% {
  opacity: 0
}

60% {
  opacity: 0
}

100% {
  opacity: 1
}
`;

const StyledForm = styled.form`
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
  animation: ${showIn} 0.2s linear forwards;
`;

const StyledInputContainer = styled.div`
  margin: 0 auto;
  min-height: 80px;
`;

const StyledButtonContainer = styled.div`
  width: 80%;
  display: flex;
  justify-content: space-evenly;
`;

const StyledErrorMessage = styled.p`
  margin: 5px 0 0 2px;
  color: red;
  font-size: 0.8rem;
  font-weight: bold;
`;

const Modal = ({ modalType, hideModal, authenticate, createAccount, createCollection, userID }) => {
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [nameError, setNameError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);

  let acceptButton;
  if (modalType === 'login') {
    acceptButton = <Button>Login</Button>;
  } else if (modalType === 'register') {
    acceptButton = <Button>Register</Button>;
  } else if (modalType === 'createCollection') {
    acceptButton = <Button>Create</Button>;
  }

  const handleFormSubmit = (e) => {
    e.preventDefault();

    if (name.length <= 0) {
      return setNameError(true);
    }
    if (password.length <= 0) {
      return setPasswordError(true);
    }
    if (modalType === 'login') {
      authenticate(name, password);
    } else if (modalType === 'register') {
      createAccount(name, password);
    } else if (modalType === 'createCollection') {
      createCollection(userID, name);
    }
  };

  const handleInputControl = (e, type) => {
    if (type === 'name') {
      setName(e.target.value);
    } else if (type === 'password') {
      setPassword(e.target.value);
    }
  };

  return (
    <StyledWrapper>
      <StyledForm onSubmit={(e) => handleFormSubmit(e)}>
        <StyledInputContainer>
          <label>
            Login:
            <Input
              type="text"
              placeholder="Enter a login..."
              value={name}
              onChange={(e) => handleInputControl(e, 'name')}
              autoFocus
            />
            {nameError && <StyledErrorMessage>Login is invalid</StyledErrorMessage>}
          </label>
          <label>
            Password:
            <Input
              type="text"
              placeholder="Enter a password..."
              value={password}
              onChange={(e) => handleInputControl(e, 'password')}
              autoFocus
            />
            {passwordError && <StyledErrorMessage>Password is invalid</StyledErrorMessage>}
          </label>
        </StyledInputContainer>
        <StyledButtonContainer>
          {acceptButton}
          <Button clicked={hideModal}>Cancel</Button>
        </StyledButtonContainer>
      </StyledForm>
    </StyledWrapper>
  );
};

Modal.propTypes = {
  modalType: PropTypes.string.isRequired,
  hideModal: PropTypes.func,
  authenticate: PropTypes.func,
  createAccount: PropTypes.func,
};

Modal.defaultProps = {
  hideModal: null,
  authenticate: null,
  createAccount: null,
};

const mapStateToProps = ({ modalType, userID }) => {
  return { modalType, userID };
};

const mapDispatchToProps = (dispatch) => ({
  hideModal: () => dispatch(hideModalAction()),
  authenticate: (username, password) => dispatch(authenticateAction(username, password)),
  createAccount: (username, password) => dispatch(createAccountAction(username, password)),
  createCollection: (userID, title) => dispatch(createCollectionAction(userID, title)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Modal);
