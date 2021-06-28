import { createGlobalStyle } from 'styled-components';
import reset from './reset';
import typography from './typography';
import 'antd/dist/antd.css';

const GlobalStyle = createGlobalStyle`
  ${reset}
  ${typography}
`;

export default GlobalStyle;
