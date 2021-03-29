import React, { useState, useEffect } from 'react';
import api from '../../services/api';
import { Select } from './styles';

interface Empresa {
  id: number;
  nome_fantasia: string;
}

const Combobox: React.FC = () => {
  const [empresa, setEmpresa] = useState<Empresa[]>([]);

  useEffect(() => {
    api.get('/empresas').then(response => {
      const empresas = response.data;
      setEmpresa(empresas);
    });
  }, []);

  const optionItems = empresa.map(item => {
    return (
      <option key={item.id} value={item.id}>
        {item.nome_fantasia}
      </option>
    );
  });

  return (
    <div>
      <Select>{optionItems}</Select>
    </div>
  );
};

export default Combobox;
