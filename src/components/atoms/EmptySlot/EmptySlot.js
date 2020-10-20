import React from 'react';
import styled, { css } from 'styled-components';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

const StyledWrapper = styled.div`
  width: 250px;
  height: 300px;
  display: flex;
  justify-content: center;
  align-items: center;
  border: 1px solid #aaa;
  border-radius: 10px;
  cursor: pointer;

  ${({ active }) =>
    active &&
    css`
      border: 2px solid ${({ theme }) => theme.quaternaryColor};

      div {
        background-color: ${({ theme }) => theme.tertiaryColor};
      }

      div::after {
        background-color: ${({ theme }) => theme.tertiaryColor};
      }
    `}

  @media (max-height: 600px) {
    height: 250px;
  }

  &:hover {
    border: 2px solid ${({ theme }) => theme.quaternaryColor};
  }

  &:hover > div {
    background-color: ${({ theme }) => theme.tertiaryColor};
  }

  &:hover > div::after {
    background-color: ${({ theme }) => theme.tertiaryColor};
  }

  ${({ small }) =>
    small &&
    css`
      height: 100%;
      min-height: 210px;
      width: 100%;
      min-width: 170px;

      @media (max-height: 600px) {
        height: 210px;
      }
    `}
`;

const StyledSlotContent = styled.div`
  height: 150px;
  width: 5px;
  position: relative;
  background-color: #888;
  border-radius: 10px;

  ${({ small }) =>
    small &&
    css`
      height: 100px;
    `}

  ::after {
    content: '';
    height: 5px;
    width: 150px;
    position: absolute;
    top: 50%;
    left: -70px;
    background-color: #888;
    border-radius: 10px;

    ${({ small }) =>
      small &&
      css`
        left: -45px;
        width: 100px;
      `}
  }
`;

const EmptySlot = ({ clicked, small, isShowModal, modalType }) => (
  <StyledWrapper
    active={isShowModal && (modalType === 'createCollection' || modalType === 'createCard')}
    small={small}
    onClick={clicked}
  >
    <StyledSlotContent small={small} />
  </StyledWrapper>
);

EmptySlot.propTypes = {
  clicked: PropTypes.func,
  small: PropTypes.bool,
  isShowModal: PropTypes.bool,
  modalType: PropTypes.string,
};

EmptySlot.defaultProps = {
  clicked: null,
  small: false,
  isShowModal: false,
  modalType: null,
};

const mapStateToProps = ({ isShowModal, modalType }) => {
  return {
    isShowModal,
    modalType,
  };
};

export default connect(mapStateToProps)(EmptySlot);
