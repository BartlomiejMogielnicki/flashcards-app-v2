import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

import Button from '../../atoms/Button/Button';
import Paragraph from '../../atoms/Paragraph/Paragraph';
import cardsImage from '../../../assets/images/cards.png';
import {
  setActiveCollection as setActiveCollectionAction,
  deleteCollection as deleteCollectionAction,
} from '../../../actions';

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

const Collection = ({ title, cards, id, setActiveCollection, deleteCollection }) => {
  return (
    <StyledWrapper>
      <div>
        <h2>{title}</h2>
        <Paragraph>
          {cards.length} {cards.length === 1 ? 'Card' : 'Cards'}
        </Paragraph>
      </div>
      <StyledCollectionImage />
      <StyledButtonsContainer>
        {cards.length === 0 ? (
          <Button icon="play" disabled />
        ) : (
          <Link to="/practice">
            <Button icon="play" />
          </Link>
        )}
        <Link to="/edit">
          <Button icon="edit" clicked={() => setActiveCollection(title, cards)} />
        </Link>
        <Button icon="delete" clicked={() => deleteCollection(id)} />
      </StyledButtonsContainer>
    </StyledWrapper>
  );
};
Collection.propTypes = {
  title: PropTypes.string.isRequired,
  cards: PropTypes.array.isRequired,
  id: PropTypes.string.isRequired,
  setActiveCollection: PropTypes.func,
  deleteCollection: PropTypes.func.isRequired,
};

Collection.defaultProps = {
  setActiveCollection: null,
};

const mapDispatchToProps = (dispatch) => ({
  setActiveCollection: (title, cards) => dispatch(setActiveCollectionAction(title, cards)),
  deleteCollection: (id) => dispatch(deleteCollectionAction(id)),
});

export default connect(null, mapDispatchToProps)(Collection);
