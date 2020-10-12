import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import { getCollections as getCollectionsAction } from '../actions/index';

import Collection from '../components/organisms/Collection/Collection';
// import EmptySlot from '../components/atoms/EmptySlot/EmptySlot';
// import ItemModal from '../components/organisms/ItemModal/ItemModal';

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

const CollectionsView = ({ userID, getCollections, userCollections }) => {
  useEffect(() => {
    getCollections(userID);
  }, []);

  const handleRandomId = () => {
    return Math.floor(Math.random() * 1000000);
  };

  let collections;
  if (userCollections) {
    collections = userCollections.map((collection) => (
      <Collection key={handleRandomId()} title={collection.title} cards={collection.cards} />
    ));
  }

  return (
    <StyledWrapper>
      <StyledCollectionsContainer>{collections}</StyledCollectionsContainer>
    </StyledWrapper>
  );
};

CollectionsView.propTypes = {
  userID: PropTypes.string,
  getCollections: PropTypes.func,
  userCollections: PropTypes.array,
};

CollectionsView.defaultProps = {
  userID: null,
  getCollections: null,
  userCollections: null,
};

const mapStateToProps = ({ userID, userCollections }) => {
  return { userID, userCollections };
};

const mapDispatchToProps = (dispatch) => ({
  getCollections: (userID) => dispatch(getCollectionsAction(userID)),
});

export default connect(mapStateToProps, mapDispatchToProps)(CollectionsView);
