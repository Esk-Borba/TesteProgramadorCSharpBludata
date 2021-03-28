import React, { useCallback, useRef, useState } from 'react';
import {
  FiArrowLeft,
  FiCalendar,
  FiCreditCard,
  FiPhone,
  FiUser,
  FiUsers,
} from 'react-icons/fi';
import { FormHandles } from '@unform/core';
import { Form } from '@unform/web';
import * as Yup from 'yup';
import { Link } from 'react-router-dom';
import Button from '../../../components/Button';
import { Container, Content } from './stytes';

import getValidationErrors from '../../../utils/getValidationErros';
import Input from '../../../components/Input';
import api from '../../../services/api';

interface FornecedorFormData {
  idEmpresa: number;
  nome_fornecedor: string;
  cpf_cnpj: string;
  data_hora_cadastrado: string;
  telefone: string;
  tipo_pessoa: string;
  rg?: string;
  data_nascimento?: string;
}

const CadastroFornecedor: React.FC = () => {
  const formRef = useRef<FormHandles>(null);
  const [empresa, setEmpresa] = useState([]);

  const saveEmpresa = useCallback(async (data: FornecedorFormData) => {
    try {
      formRef.current?.setErrors({});
      const schema = Yup.object().shape({
        idEmpresa: Yup.number()
          .positive()
          .required('O campo Empresa é obrigatório'),
        nome_fornecedor: Yup.string().required(
          'O Nome do Fornecedor é obrigatório',
        ),
        cpf_cnpj: Yup.string()
          .required('CPF ou CNPJ obrigatório')
          .min(9, 'O mínimo de digitos é de 9(CPF)')
          .max(14, 'O máximo de digitos é de 14(CNPJ)'),
        telefone: Yup.string()
          .required('O Telefone/Celular é obrigatório')
          .min(12, 'Deve conter no mínimo 12 caractéres')
          .max(13, 'Deve conter no mínimo 13 caractéres'),
        tipo_pessoa: Yup.string().required('O Tipo de Pessoa é obrigatório'),
        rg: Yup.string(),
        data_nascimento: Yup.string()
          .min(10, 'Deve conter no mínimo 10 caractéres')
          .max(10, 'Deve conter no máximo 10 caractéres'),
      });

      await schema.validate(data, {
        abortEarly: false,
      });

      const {
        idEmpresa,
        nome_fornecedor,
        cpf_cnpj,
        telefone,
        tipo_pessoa,
        rg,
        data_nascimento,
      } = data;

      const formData = {
        idEmpresa,
        nome_fornecedor,
        cpf_cnpj,
        data_hora_cadastrado: new Date(),
        telefone,
        tipo_pessoa,
        ...(rg && data_nascimento
          ? {
              rg,
              data_nascimento,
            }
          : {}),
      };
      console.log(formData);

      // const response = await api.put('/fornecedores', formData);
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
          <h1>Cadastro Fornecedor</h1>
          <Input name="idEmpresa" placeholder="Empresa" icon={FiUser} />
          <Input
            name="nome_fornecedor"
            placeholder="Nome do Fornecedor"
            icon={FiUser}
          />
          <Input name="cpf_cnpj" placeholder="CPF/CNPJ" icon={FiUser} />
          <Input
            name="telefone"
            placeholder="Telefone/Celular"
            icon={FiPhone}
          />
          <Input
            name="tipo_pessoa"
            placeholder="Tipo de Pessoa"
            icon={FiUsers}
          />
          <Input name="rg" placeholder="RG" icon={FiCreditCard} />
          <Input
            name="data_nascimento"
            placeholder="Data de Nascimento"
            icon={FiCalendar}
          />
          <Button type="submit">Salvar Fornecedor</Button>
        </Form>
      </Content>
    </Container>
  );
};

export default CadastroFornecedor;
