import styled from 'styled-components';

interface ButtonProps {
  danger?: boolean;
}

const Button = styled.button<ButtonProps>`
  border: 0;
  border-radius: 5px;
  padding: 0 2rem;
  height: 2.5rem;

  font-weight: 700;
  text-transform: lowercase;
  color: #fff;
  background: ${({ theme }) => theme.accentColor};
  box-shadow: 0px 0px 4px 1px #9c9c9c;

  ${({ danger, theme }) => danger && `background: ${theme.dangerTextColor};`}

  :hover {
    filter: brightness(1.1);
  }

  :disabled {
    filter: opacity(0.6);
  }
`;

export default Button;
