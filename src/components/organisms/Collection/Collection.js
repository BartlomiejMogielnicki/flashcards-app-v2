import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

import Button from 'components/atoms/Button/Button';
import Paragraph from 'components/atoms/Paragraph/Paragraph';
import cardsImage from 'assets/images/cardsOrange.png';
import {
  setActiveCollection as setActiveCollectionAction,
  deleteCollection as deleteCollectionAction,
  showModal as showModalAction,
} from 'actions';

const StyledWrapper = styled.div`
  padding-bottom: 20px;
  width: 250px;
  height: 300px;
  display: grid;
  grid-template-rows: 1fr 4fr 1fr;
  align-items: center;
  justify-content: center;
  border: 2px solid ${({ theme }) => theme.quaternaryColor};
  border-radius: 10px;
  text-align: center;
  color: #222;

  @media (max-height: 600px) {
    height: 250px;
  }
`;

const StyledTitle = styled.h2`
  width: 250px;
  margin-bottom: 15px;
  line-height: 1.5;
  color: #eee;
  background-color: ${({ theme }) => theme.tertiaryColor};
  border-top-right-radius: 10px;
  border-top-left-radius: 10px;
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
  justify-self: center;
  justify-content: space-evenly;
`;

const Collection = ({ title, cards, id, setActiveCollection, showModal }) => {
  return (
    <StyledWrapper>
      <div>
        <StyledTitle>{title}</StyledTitle>
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
            <Button icon="play" clicked={() => setActiveCollection(title, cards)} />
          </Link>
        )}
        <Link to="/edit">
          <Button
            icon={cards.length === 0 ? 'plus' : 'edit'}
            clicked={() => setActiveCollection(title, cards)}
          />
        </Link>
        <Button icon="delete" clicked={() => showModal('delete', id)} />
      </StyledButtonsContainer>
    </StyledWrapper>
  );
};
Collection.propTypes = {
  title: PropTypes.string.isRequired,
  cards: PropTypes.array.isRequired,
  id: PropTypes.string.isRequired,
  setActiveCollection: PropTypes.func,
  showModal: PropTypes.func.isRequired,
};

Collection.defaultProps = {
  setActiveCollection: null,
};

const mapDispatchToProps = (dispatch) => ({
  setActiveCollection: (title, cards) => dispatch(setActiveCollectionAction(title, cards)),
  deleteCollection: (id) => dispatch(deleteCollectionAction(id)),
  showModal: (modalType, id) => dispatch(showModalAction(modalType, id)),
});

export default connect(null, mapDispatchToProps)(Collection);
