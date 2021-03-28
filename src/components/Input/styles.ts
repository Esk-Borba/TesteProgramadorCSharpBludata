import styled, { css } from 'styled-components';

import Tooltip from '../Tooltip/index';

interface ContainerProps {
  isFocused: boolean;
  isFilled: boolean;
  isErrored: boolean;
}

export const Container = styled.div<ContainerProps>`
  background: #468faf;
  border-radius: 10px;
  border: 2px solid #000;
  color: #fff;
  padding: 16px;
  width: 100%;

  margin-top: 40px;

  display: flex;
  align-items: center;

  & + div {
    margin-top: 8px;
  }

  ${props =>
    props.isErrored &&
    css`
      border-color: #000;
    `}
  ${props =>
    props.isFocused &&
    css`
      color: #000;
      border-color: #000;
    `}
  ${props =>
    props.isFilled &&
    css`
      color: #000;
    `}

  input {
    flex: 1;
    background: transparent;
    border: 0;
    color: #ffff;

    &::placeholder {
      color: #ffff;
    }
  }
  svg {
    margin-right: 16px;
  }
`;

export const Error = styled(Tooltip)`
  height: 20px;
  margin-left: 16px;
  svg {
    margin: 0;
  }
  span {
    background: red;
    color: #fff;

    &::before {
      border-color: red transparent;
    }
  }
`;
