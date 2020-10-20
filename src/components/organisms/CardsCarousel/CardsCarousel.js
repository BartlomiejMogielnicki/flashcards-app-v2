import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import FlipCard from '../../molecules/FlipCard/FlipCard';

const StyledWrapper = styled.div`
  perspective: 1000px;
  width: 80%;
  max-width: 600px;
  height: 100%;
  max-height: 400px;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  background-color: white;
  box-shadow: 0 0 10px 10px white;
  overflow-x: hidden;

  @media (max-width: 550px) {
    max-height: 200px;
  }

  @media (max-height: 600px) {
    max-height: 175px;
    max-width: 400px;
  }
`;

const CardsCarousel = ({ activeCollection, activeCard }) => {
  const handleRandomId = () => {
    return Math.floor(Math.random() * 1000000);
  };

  const { cards } = activeCollection;
  return (
    <StyledWrapper>
      {cards[activeCard - 1] && (
        <FlipCard
          key={handleRandomId()}
          cardLeft
          card={cards[activeCard - 1]}
          activeCard={activeCard - 1}
        />
      )}
      <FlipCard key={handleRandomId()} card={cards[activeCard]} activeCard={activeCard} />
      {cards[activeCard + 1] && (
        <FlipCard
          key={handleRandomId()}
          cardRight
          card={cards[activeCard + 1]}
          activeCard={activeCard + 1}
        />
      )}
    </StyledWrapper>
  );
};

CardsCarousel.propTypes = {
  activeCollection: PropTypes.object.isRequired,
  activeCard: PropTypes.number.isRequired,
};

const mapStateToProps = ({ activeCollection, activeCard }) => {
  return {
    activeCollection,
    activeCard,
  };
};

export default connect(mapStateToProps)(CardsCarousel);
