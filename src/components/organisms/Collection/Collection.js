import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

import Button from '../../atoms/Button/Button';
import Paragraph from '../../atoms/Paragraph/Paragraph';
import cardsImage from '../../../assets/images/cards.png';

const StyledWrapper = styled.div`
  padding: 20px 10px;
  width: 250px;
  height: 300px;
  display: grid;
  grid-template-rows: 1fr 4fr 1fr;
  align-items: center;
  justify-content: center;
  border: 1px solid #ccc;
  text-align: center;
  color: white;

  @media (max-height: 600px) {
    height: 250px;
  }
`;

const StyledCollectionImage = styled.div`
  margin: 0 auto;
  height: 100px;
  width: 150px;
  background: url(${cardsImage});
  background-size: contain;
  background-position: center;
  background-repeat: no-repeat;

  @media (max-height: 600px) {
    height: 80px;
  }
`;

const StyledButtonsContainer = styled.div`
  width: 200px;
  display: flex;
  justify-content: space-evenly;
`;

const Collection = ({ title, cardsNum, cards }) => {
  return (
    <StyledWrapper>
      <div>
        <h2>{title}</h2>
        <Paragraph>
          {cardsNum} {cardsNum === 1 ? 'Card' : 'Cards'}
        </Paragraph>
      </div>
      <StyledCollectionImage />
      <StyledButtonsContainer>
        {cardsNum === 0 ? (
          <Button icon="play-disabled" />
        ) : (
          <Link
            to={{
              pathname: '/practice',
            }}
          >
            <Button icon="play" />
          </Link>
        )}
        <Link
          to={{
            pathname: '/edit',
          }}
        >
          <Button icon="edit" cardsNum={cardsNum} />
        </Link>
        <Button icon="delete" title={title} />
      </StyledButtonsContainer>
    </StyledWrapper>
  );
};
Collection.propTypes = {
  title: PropTypes.string.isRequired,
  cardsNum: PropTypes.number.isRequired,
};

export default Collection;
