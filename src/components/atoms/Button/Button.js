import React from 'react';
import PropTypes from 'prop-types';
import styled, { css } from 'styled-components';

const icons = {
  play: <i className="fas fa-play" />,
  edit: <i className="fas fa-cog" />,
  delete: <i className="fas fa-trash" />,
  apply: <i className="fas fa-check" />,
  cancel: <i className="fas fa-times" />,
  leftArrow: <i className="fas fa-arrow-left" />,
  rightArrow: <i className="fas fa-arrow-right" />,
  random: <i className="fas fa-random" />,
  plus: <i className="fas fa-plus" />,
  home: <i className="fas fa-home" />,
};

const StyledButton = styled.button`
  width: 40px;
  height: 40px;
  display: block;
  background-color: ${({ theme }) => theme.tertiaryColor};
  border: none;
  border-radius: 5px;
  color: #fff;
  text-transform: capitalize;
  font-size: 1.2rem;
  transition: 0.2s;

  @media (max-width: 500px) {
    height: 35px;
    font-size: 1rem;

    ${({ big }) =>
      big &&
      css`
        width: 75px;
      `}
  }

  ${({ big }) =>
    big &&
    css`
      width: 90px;
    `}

  &:hover {
    background-color: ${({ theme }) => theme.secondaryColor};
    color: white;
    transform: scale(1.1);
  }

  ${({ logout }) =>
    logout &&
    css`
      width: 80px;
      height: 30px;
      background-color: ${({ theme }) => theme.secondaryColor};
      border: 2px solid white;

      &:hover {
        transform: scale(1.1);
      }
    `}

  ${({ white }) =>
    white &&
    css`
      background-color: white;
      color: #222;

      &:hover {
        border: 1px solid white;
      }
    `}

  &:disabled {
    background-color: #888;

    &:hover {
      color: #ddd;
      transform: scale(1);
    }
  }
`;

const Button = ({ icon, children, clicked, disabled, big, logout, white }) => {
  return (
    <StyledButton disabled={disabled} onClick={clicked} big={big} logout={logout} white={white}>
      {children} {icons[icon]}
    </StyledButton>
  );
};

Button.propTypes = {
  icon: PropTypes.string,
  children: PropTypes.string,
  clicked: PropTypes.func,
  disabled: PropTypes.bool,
  big: PropTypes.bool,
  logout: PropTypes.bool,
  white: PropTypes.bool,
};

Button.defaultProps = {
  icon: null,
  children: null,
  clicked: null,
  disabled: false,
  big: false,
  logout: false,
  white: false,
};

export default Button;
