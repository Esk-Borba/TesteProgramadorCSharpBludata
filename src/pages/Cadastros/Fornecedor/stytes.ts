import styled from 'styled-components';
import { shade } from 'polished';

export const Container = styled.div`
  > header {
    height: 94px;
    background: #468faf;

    display: flex;
    align-items: center;
    border-bottom: black 2px solid;

    div {
      width: 100%;
      max-width: 1120px;
      margin: 0 auto;

      svg {
        color: black;
        height: 35px;
        width: 35px;

        &:hover {
          color: ${shade(0.2, '#495057')};
        }
      }
    }
  }
`;

export const Content = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin: -73px 0 auto;

  width: 100%;
`;

export const Select = styled.select`
  background: #468faf;
  height: 56px;
  border-radius: 10px;
  border: 2px solid black;

  color: #fff;
  font-weight: 500;
  width: 100%;
  margin-top: 8px;
`;
