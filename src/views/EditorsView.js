import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

import Button from '../components/atoms/Button/Button';
import EmptySlot from '../components/atoms/EmptySlot/EmptySlot';
import { resetActiveCollection as resetActiveCollectionAction } from '../actions';

const StyledWrapper = styled.div`
  perspective: 1000px;
  margin: 0 auto;
  padding: 20px;
  width: 100%;
  max-width: 1200px;
  display: flex;
  flex-direction: column;

  @media (max-height: 600px) {
    padding: 5px;
  }
`;

const StyledHeading = styled.h2`
  margin-bottom: 10px;
  color: white;
  text-align: center;

  @media (max-height: 600px) {
    margin-bottom: 5px;
    font-size: 1.2rem;
  }
`;

const StyledCardsList = styled.ul`
  margin: 10px;
  display: grid;
  grid-template-columns: repeat(auto-fill, 150px);
  grid-template-rows: repeat(auto-fill, 210px);
  grid-gap: 20px 40px;
  justify-content: center;
  justify-items: center;
`;

const StyledCardItem = styled.li`
  width: 170px;
  height: 210px;
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
  border: 2px solid #555;
`;

const StyledCard = styled.div`
  margin: 10px;
  padding: 5px;
  width: 150px;
  height: 100px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: white;
  text-align: center;
  font-size: 0.7rem;
  box-shadow: 0 0 5px 2px rgba(0, 0, 0, 0.2);
`;

const StyledCardNumber = styled.div`
  height: 20px;
  width: 20px;
  position: absolute;
  top: -10px;
  left: -10px;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: ${({ theme }) => theme.secondaryColor};
  border-radius: 50%;
  color: white;
  font-weight: bold;
  font-size: 0.8rem;
`;

const StyledDeleteButton = styled.button`
  height: 20px;
  width: 20px;
  position: absolute;
  bottom: -10px;
  right: -10px;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: rgba(255, 0, 0, 0.7);
  border-radius: 50%;
  border: none;
  color: white;
  font-size: 1rem;
  font-weight: bold;
  transition: 0.3s;

  :hover {
    background-color: rgba(255, 0, 0, 1);
  }
`;

const StyledControlsContainer = styled.div`
  margin: 20px auto;
  width: 200px;
  display: flex;
  justify-content: space-around;
`;

const EditorsView = ({ activeCollection, resetActiveCollection }) => {
  let cardsEl;
  if (activeCollection.cards) {
    cardsEl = activeCollection.cards.map((card, index) => (
      <StyledCardItem key={card.id}>
        <StyledCard>{card.question}</StyledCard>
        <StyledCard>{card.answer}</StyledCard>
        <StyledCardNumber>{index + 1}</StyledCardNumber>
        <StyledDeleteButton>x</StyledDeleteButton>
      </StyledCardItem>
    ));
  }

  return (
    <StyledWrapper>
      <StyledHeading>{activeCollection.title}</StyledHeading>
      <StyledCardsList>
        {cardsEl}
        <EmptySlot small />
      </StyledCardsList>
      <StyledControlsContainer>
        <Link to="/collections">
          <Button icon="apply" clicked={resetActiveCollection} />
        </Link>
        <Link to="/collections">
          <Button icon="cancel" clicked={resetActiveCollection} />
        </Link>
      </StyledControlsContainer>
    </StyledWrapper>
  );
};

EditorsView.propTypes = {
  activeCollection: PropTypes.object.isRequired,
};

const mapStateToProps = ({ activeCollection }) => {
  return {
    activeCollection,
  };
};

const mapDispatchToProps = (dispatch) => ({
  resetActiveCollection: () => dispatch(resetActiveCollectionAction()),
});

export default connect(mapStateToProps, mapDispatchToProps)(EditorsView);
