import React from 'react';
import styled from 'styled-components';
import { NavLink } from 'react-router-dom';
import Button from '../../atoms/Button/Button';

const letters = ['F', 'L', 'A', 'S', 'H', 'C', 'A', 'R', 'D', 'S'];

const StyledNavWrapper = styled.div`
  width: 100%;
  height: 75px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: ${({ theme }) => theme.secondaryColor};

  @media (max-width: 550px) {
    height: 50px;
  }

  @media (max-height: 600px) {
    height: 50px;
  }
`;

const StyledLinksList = styled.div`
  margin-right: 20px;
  height: 100%;
  display: flex;
  justify-content: space-evenly;
  align-items: center;
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

const Navigation = () => {
  const lerrersEl = letters.map((letter, index) => (
    <StyledLetters key={index}>{letter}</StyledLetters>
  ));
  return (
    <StyledNavWrapper>
      <StyledLogoContainer>{lerrersEl}</StyledLogoContainer>
      <StyledLinksList>
        <li>
          <NavLink to="/collections">
            <Button icon="home" />
          </NavLink>
        </li>
      </StyledLinksList>
    </StyledNavWrapper>
  );
};

export default Navigation;
