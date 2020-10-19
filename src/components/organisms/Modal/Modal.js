import React, { useState } from 'react';
import styled, { keyframes, css } from 'styled-components';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {
  hideModal as hideModalAction,
  authenticate as authenticateAction,
  createAccount as createAccountAction,
  createCollection as createCollectionAction,
  createCard as createCardAction,
  deleteCollection as deleteCollectionAction,
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

const showBackground = keyframes`
  from {
    opacity: 0
  }

  to {
    opacity: 1
  }
`;

const StyledModalBackground = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: #eeeeee88;
  animation: ${showBackground} 0.1s linear forwards;

  ${({ startModal }) =>
    startModal &&
    css`
      background-color: ${({ theme }) => theme.quaternaryColor};
    `}
`;

const StyledWrapper = styled.div`
  width: 350px;
  height: 300px;
  padding: 10px;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  border-radius: 5px;
  background-color: white;
  box-shadow: 0 0 10px 2px rgba(0, 0, 0, 0.2);
  color: ${({ theme }) => theme.tertiaryColor};
  animation: ${flipIn} 0.2s linear forwards;

  ${({ startModal }) =>
    startModal &&
    css`
      top: 60%;
    `}

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

const StyledInputsContainer = styled.div`
  margin: 0 auto;
  min-height: 80px;
`;

const StyledInputSection = styled.div`
  min-height: 85px;
`;

const StyledButtonContainer = styled.div`
  width: 80%;
  margin-bottom: 10px;
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
  activeCollection,
  createCard,
  collectionID,
  deleteCollection,
  authError,
  authToken,
}) => {
  const [input1, setInput1] = useState('');
  const [input2, setInput2] = useState('');
  const [input1Error, setInput1Error] = useState(false);
  const [input2Error, setInput2Error] = useState(false);

  let title;
  let label1 = 'Login';
  let label2 = 'Password';
  let label1Placeholder = 'Enter a login...';
  let label2Placeholder = 'Enter a password...';
  let input1ErrorText = 'Please enter a login';
  let input2ErrorText = 'Please enter a password';
  if (modalType === 'login') {
    title = 'Log in user';
  } else if (modalType === 'register') {
    title = 'Register new user';
  } else if (modalType === 'createCollection') {
    title = 'Create new collection';
    label1 = 'Collection name';
    label1Placeholder = 'Enter collection name...';
    input1ErrorText = 'Please enter collection name';
  } else if (modalType === 'createCard') {
    title = 'Create new card';
    label1 = 'Question';
    label2 = 'Answer';
    label1Placeholder = 'Enter a question...';
    label2Placeholder = 'Enter an answer...';
    input1ErrorText = 'Please enter a question';
    input2ErrorText = 'Please enter an answer';
  } else if (modalType === 'delete') {
    title = 'Are you sure?';
  }

  const handleFormSubmit = (e) => {
    e.preventDefault();
    if (input1.length <= 0 && modalType !== 'delete') {
      return setInput1Error(true);
    }
    setInput1Error(false);
    if (input2.length <= 0 && modalType !== 'createCollection' && modalType !== 'delete') {
      return setInput2Error(true);
    }
    setInput2Error(false);

    if (modalType === 'login') {
      authenticate(input1, input2);
    } else if (modalType === 'register') {
      createAccount(input1, input2);
    } else if (modalType === 'createCollection') {
      createCollection(authToken, input1);
    } else if (modalType === 'createCard') {
      createCard(authToken, activeCollection.title, input1, input2);
    } else if (modalType === 'delete') {
      deleteCollection(authToken, collectionID);
    }
  };

  const handleInputControl = (e, type) => {
    if (type === 'input1') {
      setInput1(e.target.value);
    } else if (type === 'input2') {
      setInput2(e.target.value);
    }
  };

  const startModal = modalType === 'login' || modalType === 'register';
  return (
    <StyledModalBackground startModal={startModal}>
      <StyledWrapper startModal={startModal}>
        <StyledForm onSubmit={(e) => handleFormSubmit(e)}>
          <h2>{title}</h2>
          {modalType !== 'delete' && (
            <StyledInputsContainer>
              <StyledInputSection>
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
                  {authError && <StyledErrorMessage>{authError}</StyledErrorMessage>}
                </label>
              </StyledInputSection>
              {modalType !== 'createCollection' && (
                <StyledInputSection>
                  <label>
                    {label2}
                    <Input
                      type="text"
                      placeholder={label2Placeholder}
                      value={input2}
                      onChange={(e) => handleInputControl(e, 'input2')}
                    />
                    {input2Error && <StyledErrorMessage>{input2ErrorText}</StyledErrorMessage>}
                    {authError && <StyledErrorMessage>{authError}</StyledErrorMessage>}
                  </label>
                </StyledInputSection>
              )}
            </StyledInputsContainer>
          )}

          <StyledButtonContainer>
            <Button icon="apply" />
            <Button icon="cancel" clicked={hideModal} />
          </StyledButtonContainer>
        </StyledForm>
      </StyledWrapper>
    </StyledModalBackground>
  );
};

Modal.propTypes = {
  modalType: PropTypes.string.isRequired,
  hideModal: PropTypes.func,
  authenticate: PropTypes.func,
  createAccount: PropTypes.func,
  createCollection: PropTypes.func,
  activeCollection: PropTypes.object,
  createCard: PropTypes.func,
  collectionID: PropTypes.string,
  deleteCollection: PropTypes.func.isRequired,
  authError: PropTypes.string,
  authToken: PropTypes.string,
};

Modal.defaultProps = {
  hideModal: null,
  authenticate: null,
  createAccount: null,
  createCollection: null,
  activeCollection: null,
  createCard: null,
  collectionID: null,
  authError: null,
  authToken: null,
};

const mapStateToProps = ({
  modalType,
  activeCollection,
  collectionID,
  authPasswordError,
  authError,
  authToken,
}) => {
  return {
    modalType,
    activeCollection,
    collectionID,
    authPasswordError,
    authError,
    authToken,
  };
};

const mapDispatchToProps = (dispatch) => ({
  hideModal: () => dispatch(hideModalAction()),
  authenticate: (username, password) => dispatch(authenticateAction(username, password)),
  createAccount: (username, password) => dispatch(createAccountAction(username, password)),
  createCollection: (authToken, title) => dispatch(createCollectionAction(authToken, title)),
  createCard: (userID, title, question, answer) =>
    dispatch(createCardAction(userID, title, question, answer)),
  deleteCollection: (authToken, id) => dispatch(deleteCollectionAction(authToken, id)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Modal);
