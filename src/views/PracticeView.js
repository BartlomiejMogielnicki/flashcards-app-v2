import React, { useEffect } from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import Button from '../components/atoms/Button/Button';
import CardsCarousel from '../components/organisms/CardsCarousel/CardsCarousel';
import keysImage from '../assets/images/keys.png';

import { changeCard as changeCardAction, randomCard as randomCardAction } from '../actions/index';

const StyledWrapper = styled.div`
  perspective: 1000px;
  min-height: 100vh - 75px;
  height: 100%;
  padding-bottom: 150px;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
  background-color: ${({ theme }) => theme.primaryColor};

  @media (max-height: 600px) {
    min-height: 100vh - 50px;
    padding-bottom: 5px;
  }
`;

const StyledHeading = styled.h2`
  font-size: 1.8rem;
  color: white;
  letter-spacing: 2px;

  @media (max-height: 600px) {
    font-size: 1.1rem;
  }
`;

const StyledButtonsContainer = styled.div`
  width: 350px;
  display: flex;
  justify-content: space-evenly;
  align-items: center;

  @media (max-width: 550px) {
    width: 300px;
  }
`;

const StyledParagraph = styled.p`
  color: white;
`;

const StyledArrowsContainer = styled.div`
  width: 150px;
  display: flex;
  justify-content: space-around;
  align-items: center;
`;

const StyledInfo = styled.div`
  height: 140px;
  width: 220px;
  padding: 10px;
  position: fixed;
  right: 20px;
  bottom: 20px;
  border: 1px solid #777;
  color: #777;
  text-align: center;

  & img {
    margin-top: 10px;
    width: 90%;
  }

  & p > i {
    margin-right: 5px;
  }

  @media (max-width: 800px) {
    display: none;
  }
`;

const PracticeView = ({ activeCollection, activeCard, changeCard, randomCard }) => {
  const cardsNum = activeCollection.cards.length;

  const handleKeyPress = (e) => {
    if (e.keyCode === 39 && activeCard !== cardsNum - 1) {
      changeCard('right');
    } else if (e.keyCode === 37 && activeCard !== 0) {
      changeCard('left');
    } else if (e.keyCode === 17) {
      randomCard(cardsNum, activeCard);
    }
  };

  useEffect(() => {
    document.addEventListener('keydown', handleKeyPress);
    return function cleanup() {
      document.removeEventListener('keydown', handleKeyPress);
    };
  });

  return (
    <StyledWrapper>
      <StyledHeading>{activeCollection.title}</StyledHeading>
      <CardsCarousel />
      <StyledButtonsContainer>
        <StyledArrowsContainer>
          <Button disabled={activeCard === 0} icon="leftArrow" clicked={() => changeCard('left')} />
          <StyledParagraph>
            {activeCard + 1} / {cardsNum}
          </StyledParagraph>
          <Button
            disabled={activeCard + 1 === cardsNum}
            icon="rightArrow"
            clicked={() => changeCard('right')}
          />
        </StyledArrowsContainer>
        <div>
          <Button
            disabled={cardsNum === 1}
            icon="random"
            clicked={() => randomCard(cardsNum, activeCard)}
          />
        </div>
      </StyledButtonsContainer>
      <StyledInfo>
        <p>
          <i className="fas fa-info-circle" />
          Navigate with keyboard
        </p>
        <img src={keysImage} alt="Keyboard arrow buttons" />
      </StyledInfo>
    </StyledWrapper>
  );
};

PracticeView.propTypes = {
  activeCollection: PropTypes.object.isRequired,
  activeCard: PropTypes.number.isRequired,
  changeCard: PropTypes.func.isRequired,
  randomCard: PropTypes.func.isRequired,
};

const mapStateToProps = ({ activeCollection, activeCard }) => {
  return {
    activeCollection,
    activeCard,
  };
};

const mapDispatchToProps = (dispatch) => ({
  changeCard: (direction) => dispatch(changeCardAction(direction)),
  randomCard: (cardsNum, activeCard) => dispatch(randomCardAction(cardsNum, activeCard)),
});

export default connect(mapStateToProps, mapDispatchToProps)(PracticeView);