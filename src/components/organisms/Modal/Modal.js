import React, { useState } from 'react';
import styled, { keyframes } from 'styled-components';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {
  hideModal as hideModalAction,
  authenticate as authenticateAction,
  createAccount as createAccountAction,
  createCollection as createCollectionAction,
  createCard as createCardAction,
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

const Modal = ({
  modalType,
  hideModal,
  authenticate,
  createAccount,
  createCollection,
  userID,
  activeCollection,
  createCard,
}) => {
  const [input1, setInput1] = useState('');
  const [input2, setInput2] = useState('');
  const [input1Error, setInput1Error] = useState(false);
  const [input2Error, setInput2Error] = useState(false);

  let acceptButton;
  let label1 = 'Login';
  let label2 = 'Password';
  let label1Placeholder = 'Enter a login...';
  let label2Placeholder = 'Enter a password...';
  let input1ErrorText = 'Login is invalid';
  let input2ErrorText = 'Password is invalid';
  if (modalType === 'login') {
    acceptButton = <Button>Login</Button>;
  } else if (modalType === 'register') {
    acceptButton = <Button>Register</Button>;
  } else if (modalType === 'createCollection') {
    acceptButton = <Button>Create</Button>;
    label1 = 'Name';
    label1Placeholder = 'Enter collection name...';
    input1ErrorText = 'Please enter collection name';
  } else if (modalType === 'createCard') {
    acceptButton = <Button>Create</Button>;
    label1 = 'Question';
    label2 = 'Answer';
    label1Placeholder = 'Enter a question...';
    label2Placeholder = 'Enter an answer...';
    input1ErrorText = 'Please enter a question';
    input2ErrorText = 'Please enter an answer';
  } else if (modalType === 'delete') {
    acceptButton = <Button>Delete</Button>;
  }

  const handleFormSubmit = (e) => {
    e.preventDefault();
    if (input1.length <= 0) {
      return setInput1Error(true);
    }
    setInput1Error(false);
    if (input2.length <= 0) {
      return setInput2Error(true);
    }
    setInput2Error(false);

    if (modalType === 'login') {
      authenticate(input1, input2);
    } else if (modalType === 'register') {
      createAccount(input1, input2);
    } else if (modalType === 'createCollection') {
      createCollection(userID, input1);
    } else if (modalType === 'createCard') {
      createCard(userID, activeCollection.title, input1, input2);
    }
  };

  const handleInputControl = (e, type) => {
    if (type === 'input1') {
      setInput1(e.target.value);
    } else if (type === 'input2') {
      setInput2(e.target.value);
    }
  };

  return (
    <StyledWrapper>
      <StyledForm onSubmit={(e) => handleFormSubmit(e)}>
        <StyledInputContainer>
          <label>
            {label1}
            <Input
              type="text"
              placeholder={label1Placeholder}
              value={input1}
              onChange={(e) => handleInputControl(e, 'input1')}
              autoFocus
            />
            {input1Error && <StyledErrorMessage>{input1ErrorText}</StyledErrorMessage>}
          </label>
          {modalType !== 'createCollection' && (
            <label>
              {label2}
              <Input
                type="text"
                placeholder={label2Placeholder}
                value={input2}
                onChange={(e) => handleInputControl(e, 'input2')}
              />
              {input2Error && <StyledErrorMessage>{input2ErrorText}</StyledErrorMessage>}
            </label>
          )}
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
  createCollection: PropTypes.func,
  userID: PropTypes.string,
  activeCollection: PropTypes.object,
  createCard: PropTypes.func,
};

Modal.defaultProps = {
  hideModal: null,
  authenticate: null,
  createAccount: null,
  createCollection: null,
  userID: null,
  activeCollection: null,
  createCard: null,
};

const mapStateToProps = ({ modalType, userID, activeCollection }) => {
  return { modalType, userID, activeCollection };
};

const mapDispatchToProps = (dispatch) => ({
  hideModal: () => dispatch(hideModalAction()),
  authenticate: (username, password) => dispatch(authenticateAction(username, password)),
  createAccount: (username, password) => dispatch(createAccountAction(username, password)),
  createCollection: (userID, title) => dispatch(createCollectionAction(userID, title)),
  createCard: (userID, title, question, answer) =>
    dispatch(createCardAction(userID, title, question, answer)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Modal);
