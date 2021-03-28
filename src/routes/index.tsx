import React from 'react';
import { Switch } from 'react-router-dom';

import Dashboard from '../pages/Dashboard';
import CadastroEmpresa from '../pages/Cadastros/Empresa';
import CadastroFornecedor from '../pages/Cadastros/Fornecedor';

import Route from './Route';

const Routes: React.FC = () => (
  <Switch>
    <Route path="/" exact component={Dashboard} />
    <Route path="/cadastro_empresa" component={CadastroEmpresa} />
    <Route path="/cadastro_fornecedor" component={CadastroFornecedor} />
  </Switch>
);
export default Routes;
