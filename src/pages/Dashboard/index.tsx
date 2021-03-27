import React, { useMemo, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Table from '../../components/Table';
import api from '../../services/api';

import { Container, Header, HeaderContent, Content } from './styles';

const Genres = ({ values }: any) => {
  // Loop through the array and create a badge-like component instead of a comma-separated string
  return (
    <>
      {values.map((empresa: any) => {
        return (
          <span key={empresa.id} className="badge">
            {empresa}
          </span>
        );
      })}
    </>
  );
};

const Dashboard: React.FC = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    api.get('/fornecedores').then(response => {
      setData(response.data);
    });
  }, [setData]);

  const columns = useMemo(
    () => [
      {
        Header: 'Fornecedores',

        columns: [
          {
            Header: 'Empresa',
            accessor: 'show.empresa',
            Cell: ({ cell: { value } }: any) => <Genres values={value} />,
          },
          {
            Header: 'Nome',
            accessor: 'show.name',
          },
          {
            Header: 'CPF ou CNPJ',
            accessor: 'show.cpf_cnpj',
          },
          {
            Header: 'Data e Hora de Cadastro',
            accessor: 'show.date_hour',
            Cell: ({ cell: { value } }) => {
              const hour = Math.floor(value / 60);
              const min = Math.floor(value % 60);
              return (
                <>
                  {hour > 0 ? `${hour} hr${hour > 1 ? 's' : ''} ` : ''}
                  {min > 0 ? `${min} min${min > 1 ? 's' : ''}` : ''}
                </>
              );
            },
          },
          {
            Header: 'Telefones',
            accessor: 'show.number',
          },
        ],
      },
    ],
    [],
  );

  return (
    <Container>
      <Header>
        <HeaderContent>
          <div>
            <Link to="/cadastro_empresa">
              <strong>Cadastro Empresa</strong>
            </Link>
            <Link to="/cadastro_fornecedor">
              <strong>Cadastro Fornecedor</strong>
            </Link>
          </div>
        </HeaderContent>
      </Header>
      <Content>
        <Table columns={columns} data={data} />
      </Content>
    </Container>
  );
};

export default Dashboard;
