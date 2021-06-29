import React from 'react';
import { Spin } from 'antd';
import PokeIcon from 'images/icon.png';
import styled from 'styled-components';

const Container = styled.div`
  display: flex;
  justify-content: center;

  * {
    font-size: 1.75rem;
  }
`;

const StyledSpin = styled.img`
  @keyframes spin {
    from {
      transform: rotate(0);
    }

    to {
      transform: rotate(360deg);
    }
  }

  animation: spin 400ms linear infinite;
`;

const PokeSpin = () => {
  return (
    <Container>
      <Spin
        size="large"
        tip="Loading..."
        indicator={<StyledSpin src={PokeIcon} alt="poke spin" />}
      />
    </Container>
  );
};

export default PokeSpin;
