import React, { Component } from 'react';
import styled, { keyframes } from 'styled-components';
import { Link, Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { showModal as showModalAction } from '../actions/index';

import Button from '../components/atoms/Button/Button';
import Modal from '../components/organisms/Modal/Modal';

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
  margin-bottom: 100px;
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
  align-items: center;
  animation: ${showButtons} 1.5s linear forwards;
`;

class StartView extends Component {
  state = {
    cards: [
      { cardText: 'F', cardFlipped: false, cardShowed: false, id: 0 },
      { cardText: 'L', cardFlipped: false, cardShowed: false, id: 1 },
      { cardText: 'A', cardFlipped: false, cardShowed: false, id: 2 },
      { cardText: 'S', cardFlipped: false, cardShowed: false, id: 3 },
      { cardText: 'H', cardFlipped: false, cardShowed: false, id: 5 },
      { cardText: 'C', cardFlipped: false, cardShowed: false, id: 6 },
      { cardText: 'A', cardFlipped: false, cardShowed: false, id: 7 },
      { cardText: 'R', cardFlipped: false, cardShowed: false, id: 8 },
      { cardText: 'D', cardFlipped: false, cardShowed: false, id: 9 },
      { cardText: 'S', cardFlipped: false, cardShowed: false, id: 10 },
    ],
    startCard: {
      isFlipped: false,
      isHidden: false,
    },
  };

  componentDidMount() {
    const { cards } = this.state;
    for (let i = 0; i < cards.length; i++) {
      setTimeout(() => {
        cards[i].cardFlipped = true;
        this.setState({
          cards,
        });
      }, i * 100);
      setTimeout(() => {
        cards[i].cardShowed = true;
        this.setState({
          cards,
        });
      }, i * 100 + 80);
    }
  }

  handleStartCardFlip = () => {
    const { cards, startCard, cardsFlipped } = this.state;
    startCard.isFlipped = true;
    cards[13].cardFlipped = false;
    this.setState({
      cardsFlipped,
      startCard,
    });
    setTimeout(() => {
      startCard.isHidden = true;
      this.setState({
        startCard,
      });
    }, 80);
  };

  render() {
    const { cards } = this.state;
    const { isShowModal, modalType, showModal, userID } = this.props;
    const letterCards = cards.slice(0, 10).map((card) => {
      return (
        <StyledLetterCard className={card.cardFlipped ? 'flipped' : null} key={card.id}>
          <StyledCardFront className={card.cardShowed ? 'showed' : null} />
          <StyledCardBack className={card.cardShowed ? 'showed' : null}>
            {card.cardText}
          </StyledCardBack>
        </StyledLetterCard>
      );
    });

    if (userID) {
      return <Redirect to="/collections" />;
    }
    return (
      <StyledWrapper>
        <StyledTitleWrapper>{letterCards}</StyledTitleWrapper>
        <StyledButtonsContainer>
          <Button white big clicked={() => showModal('login')}>
            Login
          </Button>
          <Button white big clicked={() => showModal('register')}>
            Register
          </Button>
          <Link to="/collections">
            <Button white big>
              Test
            </Button>
          </Link>
          {isShowModal && <Modal type={modalType} />}
        </StyledButtonsContainer>
      </StyledWrapper>
    );
  }
}

StartView.propTypes = {
  isShowModal: PropTypes.bool.isRequired,
  showModal: PropTypes.func.isRequired,
  modalType: PropTypes.string,
  userID: PropTypes.string,
};

StartView.defaultProps = {
  modalType: null,
  userID: null,
};

const mapStateToProps = ({ isShowModal, modalType, userID }) => {
  return { isShowModal, modalType, userID };
};

const mapDispatchToProps = (dispatch) => ({
  showModal: (modalType) => dispatch(showModalAction(modalType)),
});

export default connect(mapStateToProps, mapDispatchToProps)(StartView);
