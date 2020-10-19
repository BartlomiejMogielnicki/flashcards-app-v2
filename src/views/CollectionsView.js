import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import {
  getCollections as getCollectionsAction,
  showModal as showModalAction,
  getUserName as getUserNameAction,
} from '../actions/index';

import Collection from '../components/organisms/Collection/Collection';
import EmptySlot from '../components/atoms/EmptySlot/EmptySlot';
import Modal from '../components/organisms/Modal/Modal';

const StyledWrapper = styled.div`
  perspective: 1000px;
  margin: 0 auto;
  padding: 75px 10px 10px;
  width: 100%;
  max-width: 1000px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  @media (max-width: 550px) {
    padding: 25px 10px 10px;
  }

  @media (max-height: 600px) {
    padding: 20px 10px;
  }
`;

const StyledCollectionsContainer = styled.div`
  height: 100%;
  width: 100%;
  display: grid;
  grid-template-columns: repeat(auto-fill, 250px);
  grid-template-rows: repeat(auto-fill, 300px);
  grid-gap: 20px;
  justify-items: center;
  justify-content: center;
  position: relative;

  @media (max-height: 600px) {
    grid-template-rows: repeat(auto-fill, 250px);
  }
`;

const CollectionsView = ({
  getCollections,
  userCollections,
  isShowModal,
  modalType,
  showModal,
  authToken,
  getUserName,
}) => {
  useEffect(() => {
    if (!authToken) {
      const savedToken = window.localStorage.getItem('authToken');
      getUserName(savedToken);
      getCollections(savedToken);
    } else {
      window.localStorage.setItem('authToken', authToken);
      getCollections(authToken);
    }
  }, []);

  const handleRandomId = () => {
    return Math.floor(Math.random() * 1000000);
  };

  let collections;
  if (userCollections) {
    collections = userCollections.map((collection) => (
      <Collection
        key={handleRandomId()}
        title={collection.title}
        cards={collection.cards}
        id={collection._id}
      />
    ));
  }

  return (
    <StyledWrapper>
      <StyledCollectionsContainer>
        {collections}
        <EmptySlot key={handleRandomId} clicked={() => showModal('createCollection')} />
      </StyledCollectionsContainer>
      {isShowModal && <Modal type={modalType} />}
    </StyledWrapper>
  );
};

CollectionsView.propTypes = {
  getCollections: PropTypes.func,
  userCollections: PropTypes.array,
  isShowModal: PropTypes.bool.isRequired,
  modalType: PropTypes.string,
  showModal: PropTypes.func,
  authToken: PropTypes.string,
  getUserName: PropTypes.func,
};

CollectionsView.defaultProps = {
  getCollections: null,
  userCollections: null,
  modalType: null,
  showModal: null,
  authToken: null,
  getUserName: null,
};

const mapStateToProps = ({ userCollections, isShowModal, modalType, authToken }) => {
  return { userCollections, isShowModal, modalType, authToken };
};

const mapDispatchToProps = (dispatch) => ({
  getCollections: (userID) => dispatch(getCollectionsAction(userID)),
  showModal: (modalType) => dispatch(showModalAction(modalType)),
  getUserName: (userID) => dispatch(getUserNameAction(userID)),
});

export default connect(mapStateToProps, mapDispatchToProps)(CollectionsView);
