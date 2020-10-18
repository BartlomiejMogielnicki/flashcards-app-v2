import styled from 'styled-components';

const Paragraph = styled.p`
  margin-top: 5px;
  color: ${({ theme }) => theme.tertiaryColor};
  font-weight: bold;
  text-align: center;
`;

export default Paragraph;
