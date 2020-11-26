import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Link, Redirect } from 'react-router-dom';
import styled from 'styled-components';

import Button from 'components/atoms/Button/Button';
import EmptySlot from 'components/atoms/EmptySlot/EmptySlot';
import Modal from 'components/organisms/Modal/Modal';
import {
  resetActiveCollection as resetActiveCollectionAction,
  showModal as showModalAction,
  deleteCard as deleteCardAction,
} from 'actions';

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
  color: ${({ theme }) => theme.tertiaryColor};
  text-align: center;

  @media (max-height: 600px) {
    margin-bottom: 5px;
    font-size: 1.2rem;
  }
`;

const StyledCardsList = styled.ul`
  margin: 10px;
  display: grid;
  grid-template-columns: repeat(auto-fill, 230px);
  grid-template-rows: repeat(auto-fill, 300px);
  grid-gap: 20px 40px;
  justify-content: center;
  justify-items: center;
`;

const StyledCardItem = styled.li`
  width: 250px;
  height: 300px;
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
  border: 2px solid ${({ theme }) => theme.quaternaryColor};
  border-radius: 10px;
`;

const StyledCard = styled.div`
  margin: 10px;
  padding: 5px;
  width: 90%;
  height: 45%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: white;
  text-align: center;
  font-size: 1rem;
  box-shadow: 0 0 5px 2px rgba(0, 0, 0, 0.2);
`;

const StyledCardNumber = styled.div`
  height: 20px;
  width: 20px;
  position: absolute;
  bottom: -10px;
  left: -10px;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: ${({ theme }) => theme.secondaryColor};
  border-radius: 50%;
  color: white;
  font-size: 0.8rem;
`;

const StyledDeleteButton = styled.div`
  height: 20px;
  width: 20px;
  position: absolute;
  top: -10px;
  right: -10px;
  display: flex;
  justify-content: center;
  background-color: rgba(255, 0, 0, 0.7);
  border-radius: 50%;
  border: none;
  color: white;
  font-size: 1rem;
  cursor: pointer;
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

const EditorsView = ({
  activeCollection,
  resetActiveCollection,
  isShowModal,
  modalType,
  showModal,
  deleteCard,
  authToken,
}) => {
  let cardsEl;

  if (!activeCollection) {
    return <Redirect to="/collections" />;
  }

  if (activeCollection.cards) {
    cardsEl = activeCollection.cards.map((card, index) => (
      <StyledCardItem key={card._id}>
        <StyledCard>{card.question}</StyledCard>
        <StyledCard>{card.answer}</StyledCard>
        <StyledCardNumber>{index + 1}</StyledCardNumber>
        <StyledDeleteButton onClick={() => deleteCard(authToken, activeCollection.title, card._id)}>
          x
        </StyledDeleteButton>
      </StyledCardItem>
    ));
  }

  return (
    <StyledWrapper>
      <StyledHeading>{activeCollection.title}</StyledHeading>
      <StyledCardsList>
        {cardsEl}
        <EmptySlot small clicked={() => showModal('createCard')} />
      </StyledCardsList>
      <StyledControlsContainer>
        <Link to="/collections">
          <Button icon="home" clicked={resetActiveCollection} />
        </Link>
      </StyledControlsContainer>
      {isShowModal && <Modal type={modalType} />}
    </StyledWrapper>
  );
};

EditorsView.propTypes = {
  activeCollection: PropTypes.object,
  resetActiveCollection: PropTypes.func.isRequired,
  isShowModal: PropTypes.bool.isRequired,
  modalType: PropTypes.string,
  showModal: PropTypes.func,
  deleteCard: PropTypes.func.isRequired,
  authToken: PropTypes.string,
};

EditorsView.defaultProps = {
  activeCollection: null,
  modalType: null,
  showModal: null,
  authToken: null,
};

const mapStateToProps = ({ activeCollection, isShowModal, modalType, authToken }) => {
  return {
    activeCollection,
    isShowModal,
    modalType,
    authToken,
  };
};

const mapDispatchToProps = (dispatch) => ({
  resetActiveCollection: () => dispatch(resetActiveCollectionAction()),
  showModal: (modalType) => dispatch(showModalAction(modalType)),
  deleteCard: (authToken, collectionTitle, id) =>
    dispatch(deleteCardAction(authToken, collectionTitle, id)),
});

export default connect(mapStateToProps, mapDispatchToProps)(EditorsView);
