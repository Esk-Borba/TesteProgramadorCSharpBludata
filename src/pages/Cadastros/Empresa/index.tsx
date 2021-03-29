import React, { useCallback, useEffect, useRef, useState } from 'react';
import { FiArrowLeft, FiCompass, FiCreditCard, FiUser } from 'react-icons/fi';
import { FormHandles } from '@unform/core';
import { Form } from '@unform/web';
import * as Yup from 'yup';
import { Link } from 'react-router-dom';
import { Container, Content } from './styles';

import getValidationErrors from '../../../utils/getValidationErros';
import Input from '../../../components/Input';
import api from '../../../services/api';

interface EmpresaFormData {
  uf: string;
  nome_fantasia: string;
  cnpj: string;
}

const CadastroEmpresa: React.FC = () => {
  const formRef = useRef<FormHandles>(null);
  const [empresa, setEmpresa] = useState([]);

  const saveEmpresa = useCallback(async (data: EmpresaFormData) => {
    try {
      formRef.current?.setErrors({});
      const schema = Yup.object().shape({
        uf: Yup.string()
          .required('A Unidade Federal é obrigatória')
          .max(2, 'O máximo de caracteres é 2')
          .min(2, 'O minimo de caracteres é 2'),
        nome_fantasia: Yup.string()
          .required('O Noma Fantasia da empresa é obrigatório')
          .min(2, 'O mínimmo de caractéres é 2'),
        cpf_cnpj: Yup.string()
          .required('CPF ou CNPJ obrigatório')
          .min(9, 'O mínimo de digitos é de 9(CPF)')
          .max(14, 'O máximo de digitos é de 14(CNPJ)'),
      });

      await schema.validate(data, {
        abortEarly: false,
      });

      const { uf, nome_fantasia, cnpj } = data;

      const formData = {
        uf,
        nome_fantasia,
        cnpj,
      };

      const response = await api.put('/empresas', formData);
    } catch (err) {
      if (err instanceof Yup.ValidationError) {
        const errors = getValidationErrors(err);
        formRef.current?.setErrors(errors);
      }
    }
  }, []);

  return (
    <Container>
      <header>
        <div>
          <Link to="/">
            <FiArrowLeft />
          </Link>
        </div>
      </header>
      <Content>
        <Form ref={formRef} onSubmit={saveEmpresa}>
          <h1>Cadastro Empresa</h1>
          <Input name="uf" placeholder="Unidade Federativa" icon={FiCompass} />
          <Input
            name="nome_fantasia"
            placeholder="Nome Fantasia"
            icon={FiUser}
          />
          <Input name="cnpj" placeholder="CNPJ" icon={FiCreditCard} />
        </Form>
      </Content>
    </Container>
  );
};

export default CadastroEmpresa;
