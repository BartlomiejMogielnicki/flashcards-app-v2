import React, { Component } from 'react';
import styled, { keyframes } from 'styled-components';
import { Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {
  showModal as showModalAction,
  setToken as setTokenAction,
  authenticate as authenticateAction,
} from 'actions';

import Button from 'components/atoms/Button/Button';
import Modal from 'components/organisms/Modal/Modal';
import Spinner from 'components/atoms/Spinner/Spinner';

const StyledWrapper = styled.div`
  padding: 10px;
  min-height: 100vh;
  height: 100%;
  width: 100%;
  position: fixed;
  top: 0;
  left: 0;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: ${({ theme }) => theme.quaternaryColor};
`;

const StyledTitleWrapper = styled.div`
  perspective: 1000px;
  margin: 30px 30px 100px;
  width: 90%;
  max-width: 1000px;
  display: flex;
  justify-content: space-evenly;
  position: relative;
  text-align: center;
  color: white;
  z-index: 1;

  @media (max-height: 600px) {
    margin: 10px auto;
  }
`;

const StyledLetterCard = styled.div`
  margin: 8px;
  width: 75px;
  height: 125px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  transition: 0.3s ease;

  @media (max-width: 1000px) {
    height: 80px;
  }

  @media (max-width: 550px) {
    height: 50px;
    margin: 2px;
  }

  @media (max-height: 600px) {
    height: 50px;
    width: 30px;
  }

  &.flipped {
    transform: rotateX(180deg);
    box-shadow: 3px -3px 5px 1px rgba(0, 0, 0, 1);
  }
`;

const StyledCardFront = styled.div`
  width: 100%;
  height: 100%;

  &.showed {
    display: none;
  }
`;

const StyledCardBack = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  transform: scaleY(-1);
  display: none;
  background: white;
  color: black;
  font-size: 4rem;
  border-radius: 5px;

  @media (max-width: 1000px) {
    font-size: 3rem;
  }

  @media (max-width: 500px) {
    font-size: 2rem;
  }

  @media (max-height: 600px) {
    font-size: 2rem;
  }

  &.showed {
    display: flex;
  }
`;

const showText = keyframes`
0% {
  opacity: 0
}

50% {
  opacity: 0
}

100% {
  opacity: 1
}
`;

const StyledCardText = styled.p`
  animation: ${showText} 0.1s linear forwards;
`;

const showButtons = keyframes`
0% {
  opacity: 0
}

70% {
  opacity: 0
}

100% {
  opacity: 1
}
`;

const StyledButtonsContainer = styled.div`
  height: 100px;
  width: 400px;
  margin-bottom: 20px;
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
  align-items: center;
  animation: ${showButtons} 1.9s linear forwards;

  @media (max-width: 500px) {
    max-width: 90%;
  }
`;

const StyledServerMessage = styled.div`
  margin-bottom: 50px;
  display: flex;
  align-items: center;
  text-align: center;
  animation: ${showButtons} 2.2s linear forwards;

  p {
    margin-left: 5px;
    font-size: 0.9rem;
  }

  @media (max-width: 500px) {
    max-width: 80%;
    flex-direction: column;
    p {
      margin-top: 5px;
      font-size: 0.8rem;
    }
  }
`;

const StyledSpinnerContainer = styled.div`
  position: absolute;
  top: 78%;
`;

class StartView extends Component {
  state = {
    cards: [
      { cardText: 'F', cardShowed: false, id: 0 },
      { cardText: 'L', cardShowed: false, id: 1 },
      { cardText: 'A', cardShowed: false, id: 2 },
      { cardText: 'S', cardShowed: false, id: 3 },
      { cardText: 'H', cardShowed: false, id: 5 },
      { cardText: 'C', cardShowed: false, id: 6 },
      { cardText: 'A', cardShowed: false, id: 7 },
      { cardText: 'R', cardShowed: false, id: 8 },
      { cardText: 'D', cardShowed: false, id: 9 },
      { cardText: 'S', cardShowed: false, id: 10 },
    ],
  };

  componentDidMount() {
    const { setToken } = this.props;
    const savedToken = window.localStorage.getItem('authToken');
    if (savedToken) {
      setToken(savedToken);
    } else {
      const { cards } = this.state;
      setTimeout(() => {
        for (let i = 1; i <= cards.length; i++) {
          setTimeout(() => {
            cards[i - 1].cardShowed = true;
            this.setState({
              cards,
            });
          }, i * 120);
        }
      }, 300);
    }
  }

  render() {
    const { cards } = this.state;
    const { isShowModal, modalType, showModal, authToken, authenticate, isLoading } = this.props;
    const letterCards = cards.slice(0, 10).map((card) => {
      return (
        <StyledLetterCard className={card.cardShowed ? 'flipped' : null} key={card.id}>
          <StyledCardFront className={card.cardShowed ? 'showed' : null} />
          <StyledCardBack className={card.cardShowed ? 'showed' : null}>
            <StyledCardText>{card.cardText}</StyledCardText>
          </StyledCardBack>
        </StyledLetterCard>
      );
    });

    if (authToken) {
      return <Redirect to="/collections" />;
    }
    return (
      <StyledWrapper>
        <StyledTitleWrapper>{letterCards}</StyledTitleWrapper>
        <StyledButtonsContainer>
          <Button white big clicked={() => showModal('login')}>
            Log In
          </Button>
          <Button white big clicked={() => showModal('register')}>
            Sign Up
          </Button>
          <Button white big clicked={() => authenticate('TestUser', 'TestUserPassword')}>
            Try It
          </Button>
          {isShowModal && <Modal type={modalType} />}
        </StyledButtonsContainer>
        <StyledServerMessage>
          <i className="fas fa-info-circle" />
          <p>First attempt may take few seconds due to wake up the free server.</p>
        </StyledServerMessage>
        {isLoading && (
          <StyledSpinnerContainer>
            <Spinner />
          </StyledSpinnerContainer>
        )}
      </StyledWrapper>
    );
  }
}

StartView.propTypes = {
  isShowModal: PropTypes.bool,
  showModal: PropTypes.func.isRequired,
  modalType: PropTypes.string,
  authToken: PropTypes.string,
  setToken: PropTypes.func.isRequired,
  authenticate: PropTypes.func.isRequired,
  isLoading: PropTypes.bool,
};

StartView.defaultProps = {
  isShowModal: false,
  modalType: null,
  authToken: null,
  isLoading: false,
};

const mapStateToProps = ({ isShowModal, modalType, authToken, isLoading }) => {
  return { isShowModal, modalType, authToken, isLoading };
};

const mapDispatchToProps = (dispatch) => ({
  showModal: (modalType) => dispatch(showModalAction(modalType)),
  setToken: (token) => dispatch(setTokenAction(token)),
  authenticate: (username, password) => dispatch(authenticateAction(username, password)),
});

export default connect(mapStateToProps, mapDispatchToProps)(StartView);
