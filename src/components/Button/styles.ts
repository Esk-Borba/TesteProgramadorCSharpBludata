import styled from 'styled-components';
import { shade } from 'polished';

export const Container = styled.button`
  background: #468faf;
  height: 56px;
  border-radius: 10px;
  border: 2px solid black;
  padding: 0 16px;
  color: #fff;
  font-weight: 500;
  width: 100%;
  margin-top: 16px;
  transition: background-color 0.2s;

  &:hover {
    background: ${shade(0.08, '#468faf')};
  }
`;
