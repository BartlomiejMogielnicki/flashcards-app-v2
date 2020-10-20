import React from 'react';
import styled, { keyframes } from 'styled-components';

const loading = keyframes`
0% {
  transform: rotateZ(0)
}

100% {
  transform: rotateZ(360deg)
}
`;

const StyledWrapper = styled.div`
  i {
    color: white;
    font-size: 2rem;
    animation: ${loading} 2s linear infinite;
  }
`;

const Spinner = () => {
  return (
    <StyledWrapper>
      <i className="fas fa-spinner" />
    </StyledWrapper>
  );
};

export default Spinner;
