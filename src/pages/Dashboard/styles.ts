import styled from 'styled-components';

export const Container = styled.div``;

export const Header = styled.header`
  padding: 32px 0;
  background: #28262e;
`;

export const HeaderContent = styled.div`
  max-width: 1120px;
  margin: 0 auto;
  display: flex;
  align-items: center;
  justify-content: center;

  div {
    display: flex;
    flex-direction: row;

    line-height: 30px;

    a {
      text-decoration: none;
      color: #ffffff;
      font-size: 24px;

      &:hover {
        opacity: 0.6s;
      }
    }
    > a {
      margin-left: 20px;
    }
  }
`;

export const Content = styled.main`
  max-width: 1120px;
  margin: 64px auto;
  display: flex;
  justify-content: center;
`;

export const Table = styled.div``;
