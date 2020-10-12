import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const icons = {
  play: <i className="fas fa-play" />,
  edit: <i className="fas fa-cog" />,
  delete: <i className="fas fa-trash" />,
  apply: <i className="fas fa-check" />,
  cancel: <i className="fas fa-times" />,
  // leftArrow: <i className="fas fa-arrow-left" />,
  // rightArrow: <i className="fas fa-arrow-right" />,
  // random: <i className="fas fa-random" />,
  // plus: <i className="fas fa-plus" />,
  // home: <i className="fas fa-home" />,
};

const StyledButton = styled.button`
  width: 40px;
  height: 40px;
  display: block;
  background-color: ${({ theme }) => theme.tertiaryColor};
  color: #ddd;
  text-transform: capitalize;
  font-size: 1.2rem;
  transition: 0.2s;

  &:hover {
    background-color: ${({ theme }) => theme.secondaryColor};
    color: white;
    transform: scale(1.1);
  }

  &:disabled {
    background-color: #555;

    &:hover {
      color: #ddd;
      transform: scale(1);
    }
  }
`;

// const StylledStartButton = styled(StyledButton)`
//   width: 80px;
// `;

// const StylledHomeButton = styled(StyledButton)`
//   &:hover {
//     background-color: ${({ theme }) => theme.primaryColor};
//     color: white;
//   }
// `;

const Button = ({ icon, children, clicked, disabled }) => {
  return (
    <StyledButton disabled={disabled} onClick={clicked}>
      {children} {icons[icon]}
    </StyledButton>
  );
};

Button.propTypes = {
  icon: PropTypes.string,
  children: PropTypes.string,
  clicked: PropTypes.func,
  disabled: PropTypes.bool,
};

Button.defaultProps = {
  icon: null,
  children: null,
  clicked: null,
  disabled: false,
};

export default Button;
