import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import { logout as logoutAction } from '../../../actions/index';

import Button from '../../atoms/Button/Button';
import Spinner from '../../atoms/Spinner/Spinner';

const letters = ['F', 'L', 'A', 'S', 'H', 'C', 'A', 'R', 'D', 'S'];

const StyledNavWrapper = styled.div`
  width: 100%;
  height: 75px;
  position: relative;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: ${({ theme }) => theme.secondaryColor};
  border-bottom: 1px solid #999;

  @media (max-width: 550px) {
    height: 50px;
  }

  @media (max-height: 600px) {
    height: 50px;
  }
`;

const StyledUserContainer = styled.div`
  margin-right: 50px;
  height: 100%;
  display: flex;
  justify-content: space-evenly;
  align-items: center;

  @media (max-width: 550px) {
    margin-right: 10px;
  }

  @media (max-height: 600px) {
    padding: 2px;
    margin-right: 20px;
  }
`;

const StyledUserInfo = styled.div`
  margin-right: 20px;
  display: flex;
  color: white;

  i {
    margin-right: 5px;
  }

  @media (max-width: 550px) {
    display: none;
  }
`;

const StyledLogoContainer = styled.div`
  margin-left: 15px;
  display: flex;

  @media (max-width: 550px) {
    margin-left: 5px;
  }
`;

const StyledLetters = styled.div`
  margin: 3px;
  padding: 5px;
  background-color: white;
  border-radius: 2px;
  box-shadow: 3px 3px 5px 1px rgba(0, 0, 0, 1);
  font-weight: bold;
  font-size: 1.5rem;

  @media (max-width: 550px) {
    padding: 2px;
    font-size: 1.2rem;
  }

  @media (max-height: 600px) {
    padding: 2px;
    font-size: 1.2rem;
  }
`;

const StyledSpinnerContainer = styled.div`
  position: absolute;
  top: 50%;
  right: 50%;
  transform: translate(-50%, -50%);

  @media (max-width: 550px) {
    right: 80px;
  }
`;

const Navigation = ({ userName, logout, isLoading }) => {
  const lerrersEl = letters.map((letter, index) => (
    <StyledLetters key={index}>{letter}</StyledLetters>
  ));
  return (
    <StyledNavWrapper>
      <StyledLogoContainer>{lerrersEl}</StyledLogoContainer>
      <StyledUserContainer>
        <StyledUserInfo>
          <i className="fas fa-user" />
          <p>{userName}</p>
        </StyledUserInfo>
        <Link to="/">
          <Button big logout clicked={logout}>
            Log Out
          </Button>
        </Link>
      </StyledUserContainer>
      {isLoading && (
        <StyledSpinnerContainer>
          <Spinner />
        </StyledSpinnerContainer>
      )}
    </StyledNavWrapper>
  );
};

Navigation.propTypes = {
  userName: PropTypes.string,
  logout: PropTypes.func,
  isLoading: PropTypes.bool,
};

Navigation.defaultProps = {
  userName: null,
  logout: null,
  isLoading: false,
};

const mapStateToProps = ({ userName, isLoading }) => {
  return { userName, isLoading };
};

const mapDispatchToProps = (dispatch) => ({
  logout: () => dispatch(logoutAction()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Navigation);
