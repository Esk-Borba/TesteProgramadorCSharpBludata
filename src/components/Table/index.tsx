import axios from 'axios';
import React, { useState, useEffect } from 'react';
import * as ReactBootstrap from 'react-bootstrap';
import api from '../../services/api';

interface Fornecedor {
  id: number;
  nomeEmpresa: string;
  nome_fornecedor: string;
  cpf_cnpj: string;
  data_hora_cadastro: string;
  telefone: string;
  tipo_pessoa: string;
  rg: string;
  data_nascimento: string;
}

const Table: React.FC = () => {
  const [fornecedores, setFornecedores] = useState([]);

  useEffect(() => {
    api.get('/fornecedores').then(response => {
      const allFornecedores = response.data;
      setFornecedores(allFornecedores);
    });
  }, []);

  const renderFornecedores = (fornecedor: Fornecedor) => {
    return (
      <tr key={fornecedor.id}>
        <td>{fornecedor.nomeEmpresa}</td>
        <td>{fornecedor.nome_fornecedor}</td>
        <td>{fornecedor.cpf_cnpj}</td>
        <td>{fornecedor.data_hora_cadastro}</td>
        <td>{fornecedor.telefone}</td>
        <td>{fornecedor.tipo_pessoa}</td>
        <td>{fornecedor.rg}</td>
        <td>{fornecedor.data_nascimento}</td>
      </tr>
    );
  };

  return (
    <div className="table-responsive">
      <ReactBootstrap.Table hover>
        <thead className="thead-light">
          <tr>
            <th>Empresa</th>
            <th>Fornecedor</th>
            <th>CPF/CNPJ</th>
            <th>Data e Hora de Cadastramento</th>
            <th>Telefone</th>
            <th>Tipo de Pessoa</th>
            <th>RG</th>
            <th>Data de Nascimento</th>
          </tr>
        </thead>
        <tbody>{fornecedores.map(renderFornecedores)}</tbody>
      </ReactBootstrap.Table>
    </div>
  );
};

export default Table;
