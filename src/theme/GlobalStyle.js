import { createGlobalStyle } from 'styled-components';
import './GlobalStyle.css';

const GlobalStyle = createGlobalStyle`

  *, *::before, *::after {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    -webkit-tap-highlight-color: rgba(0,0,0,0);
  }

  body {
    font-family: 'Roboto', sans-serif;
  }

  button {
    cursor:pointer;
  }

  button:focus, input:focus {
    outline: none;
  }

  li {
    list-style: none;
  }

  a {
    text-decoration: none;
  }
`;

export default GlobalStyle;
