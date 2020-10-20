import React from 'react';
import styled, { keyframes } from 'styled-components';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

const StyledCard = styled.div`
  width: 100%;
  height: 100%;
  padding: 5px 10px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  position: absolute;
  box-shadow: 0 0 10px 2px rgba(0, 0, 0, 0.2);
  transition: 0.3s ease;

  &.flipped {
    transform: rotateX(180deg);
  }
`;

const FadeIn = keyframes`
from {
  opacity: 0;
}

to {
  opacity: 1
}
`;

const StyledCardFront = styled(StyledCard)`
  -webkit-backface-visibility: hidden;
  &.flipped {
    display: none;
  }

  :after {
    content: '\f2f1  Flip';
    position: absolute;
    bottom: 15px;
    right: 15px;
    font-family: 'FontAwesome', 'Roboto Condensed', sans-serif;
    font-size: 0.9em;
    color: rgba(0, 0, 0, 0.5);
    animation: ${FadeIn} 0.2s linear forwards;
  }
`;

const StyledCardBack = styled(StyledCard)`
  display: none;

  &.flipped {
    display: flex;
  }

  :after {
    content: '\f2f1  Flip';
    position: absolute;
    bottom: 15px;
    right: 15px;
    font-family: 'FontAwesome', 'Roboto Condensed', sans-serif;
    font-size: 0.9em;
    color: rgba(0, 0, 0, 0.5);
    animation: ${FadeIn} 0.2s linear forwards;
  }
`;

const StyledCardText = styled.p`
  font-size: 1.3rem;

  &.flip {
    animation: ${FadeIn} 0.2s linear forwards;
  }

  @media (max-width: 550px) {
    font-size: 1rem;
  }

  @media (max-height: 600px) {
    font-size: 1rem;
  }
`;

const Card = ({ isFlipped, card, cardAnimation }) => {
  const { question, answer } = card;
  return (
    <StyledCard className={`${isFlipped ? 'flipped' : ''}`}>
      <StyledCardFront className={`${isFlipped ? 'flipped' : ''}`}>
        <StyledCardText className={`${cardAnimation}`}>{question}</StyledCardText>
      </StyledCardFront>
      <StyledCardBack className={`${isFlipped ? 'flipped' : ''}`}>
        <StyledCardText className={`${cardAnimation}`}>{answer}</StyledCardText>
      </StyledCardBack>
    </StyledCard>
  );
};

Card.propTypes = {
  isFlipped: PropTypes.bool,
  card: PropTypes.object,
  cardAnimation: PropTypes.string,
};

Card.defaultProps = {
  isFlipped: null,
  card: null,
  cardAnimation: null,
};

const mapStateToProps = ({ cardAnimation }) => {
  return {
    cardAnimation,
  };
};

export default connect(mapStateToProps)(Card);
