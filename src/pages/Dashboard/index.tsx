import React, { useMemo, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Table from '../../components/Table';

import { Container, Header, HeaderContent, Content } from './styles';

const Dashboard: React.FC = () => {
  return (
    <Container>
      <Header>
        <HeaderContent>
          <div>
            <Link to="/cadastro_empresa">
              <strong>Cadastrar Empresa</strong>
            </Link>
            <Link to="/cadastro_fornecedor">
              <strong>Cadastrar Fornecedor</strong>
            </Link>
          </div>
        </HeaderContent>
      </Header>
      <Content>
        <h1>Tabela de Fornecedores</h1>
        <Table />
      </Content>
    </Container>
  );
};

export default Dashboard;
