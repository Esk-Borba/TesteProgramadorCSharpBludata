import React, { useState, useEffect } from 'react';
import * as ReactBootstrap from 'react-bootstrap';
import api from '../../services/api';
import { Label, Div } from './styles';

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
  const [fornecedores, setFornecedores] = useState<Fornecedor[]>([]);
  const [checkCPF_CNPJ, setCheckCPF_CNPJ] = useState(false);
  const [checkNome, setCheckNome] = useState(false);
  const [checkHora, setCheckHora] = useState(false);

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

  function filterTableCPF_CNPJ() {
    if (checkCPF_CNPJ === false) {
      fornecedores.sort(function (a, b) {
        if (a.cpf_cnpj > b.cpf_cnpj) {
          return 1;
        }
        if (a.cpf_cnpj < b.cpf_cnpj) {
          return -1;
        }
        return 0;
      });
    }
    if (checkCPF_CNPJ === true) {
      api.get('/fornecedores').then(response => {
        const allFornecedores = response.data;
        setFornecedores(allFornecedores);
      });
    }
  }
  function filterTableNome() {
    if (checkNome === false) {
      fornecedores.sort(function (a, b) {
        if (a.nome_fornecedor > b.nome_fornecedor) {
          return 1;
        }
        if (a.nome_fornecedor < b.nome_fornecedor) {
          return -1;
        }
        return 0;
      });
    }
    if (checkNome === true) {
      api.get('/fornecedores').then(response => {
        const allFornecedores = response.data;
        setFornecedores(allFornecedores);
      });
    }
  }
  function filterTableHora() {
    if (checkHora === false) {
      fornecedores.sort(function (a, b) {
        if (a.data_hora_cadastro > b.data_hora_cadastro) {
          return 1;
        }
        if (a.nome_fornecedor < b.data_hora_cadastro) {
          return -1;
        }
        return 0;
      });
    }
    if (checkHora === true) {
      api.get('/fornecedores').then(response => {
        const allFornecedores = response.data;
        setFornecedores(allFornecedores);
      });
    }
  }

  return (
    <Div>
      <Label htmlFor="orderByNome">
        Ordernar por Fornecedor
        <input
          type="checkbox"
          name="orderByNome"
          id="orderByNome"
          onClick={filterTableNome}
          onChange={e => setCheckNome(e.target.checked)}
        />
      </Label>
      <Label htmlFor="orderByCPF/CNPJ">
        Ordernar por CPF/CNPJ
        <input
          type="checkbox"
          name="orderByCPF/CNPJ"
          id="orderByCPF/CNPJ"
          onClick={filterTableCPF_CNPJ}
          onChange={e => setCheckCPF_CNPJ(e.target.checked)}
        />
      </Label>
      <Label htmlFor="orderByHora">
        Ordernar por Data de Cadastro
        <input
          type="checkbox"
          name="orderByHora"
          id="orderByHora"
          onClick={filterTableHora}
          onChange={e => setCheckHora(e.target.checked)}
        />
      </Label>
      <div className="table-overflow">
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
    </Div>
  );
};

export default Table;
