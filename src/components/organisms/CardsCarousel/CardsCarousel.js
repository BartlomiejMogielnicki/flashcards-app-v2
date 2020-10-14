import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
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
    max-height: 150px;
    max-width: 500px;
  }
`;

const CardsCarousel = () => {
  return <h1>Carousel</h1>;
};

export default CardsCarousel;
