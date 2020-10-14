import React from 'react';
import styled, { keyframes, css } from 'styled-components';

const slideInLeft = keyframes`
from {
  transform: translateX(120%) rotateY(-20deg);
}

to {
  transform: translateX(0) rotateY(0);
}
`;

const slideInRight = keyframes`
from {
  transform: translateX(-120%) rotateY(20deg);
}

to {
  transform: translateX(0) rotateY(0);
}
`;

const slideOutLeft = keyframes`
from {
  transform: translateX(0) rotateY(0);
}

to {
  transform: translateX(-120%) rotateY(20deg);
}
`;

const slideOutRight = keyframes`
from {
  transform: translateX(0) rotateY(0);
}

to {
  transform: translateX(120%) rotateY(-20deg);
}
`;

const StyledCardContainer = styled.div`
  perspective: 1000px;
  width: 90%;
  max-width: 500px;
  height: calc(100vw * 0.9 * 0.6);
  max-height: 300px;
  position: relative;
  background-color: white;
  text-align: center;
  transition: 0.3s;
  cursor: pointer;

  @media (max-width: 550px) {
    max-height: 180px;
  }

  @media (max-height: 600px) {
    height: 90%;
    max-width: 400px;
  }

  ${({ cardLeft }) =>
    cardLeft &&
    css`
      position: absolute;
      transform: translateX(-120%) rotateY(20deg);
    `};

  ${({ cardRight }) =>
    cardRight &&
    css`
      position: absolute;
      transform: translateX(120%) rotateY(-20deg);
    `};

  &.slideInLeft {
    animation: ${slideInLeft} 0.5s ease forwards;
  }

  &.slideInRight {
    animation: ${slideInRight} 0.5s ease forwards;
  }

  &.slideOutLeft {
    animation: ${slideOutLeft} 0.5s ease forwards;
  }

  &.slideOutRight {
    animation: ${slideOutRight} 0.5s ease forwards;
  }
`;

const FlipCard = () => {
  return <h1>FlipCard</h1>;
};

export default FlipCard;
