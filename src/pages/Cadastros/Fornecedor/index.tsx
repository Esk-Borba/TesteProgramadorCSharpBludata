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
import { format, parseISO } from 'date-fns';
import Button from '../../../components/Button';
import { Container, Content, Select } from './stytes';

import getValidationErrors from '../../../utils/getValidationErros';
import Input from '../../../components/Input';
import api from '../../../services/api';
import Combobox from '../../../components/Combobox';

interface FornecedorFormData {
  empresa: number;
  nome_fornecedor: string;
  cpf_cnpj: string;
  data_hora_cadastro: string;
  telefone: string;
  tipo_pessoa: string;
  rg?: string;
  data_nascimento?: string;
}

const CadastroFornecedor: React.FC = () => {
  const formRef = useRef<FormHandles>(null);
  const [eempresa, setEmpresa] = useState([]);
  const [valueSelect, selValueSelect] = useState(0);
  const [selectErrorPessoa, setSelectErrorPessoa] = useState(false);

  console.log(valueSelect);

  const listTipoPessoas = [
    {
      id: 1,
      tipo: 'Juridica',
    },
    {
      id: 2,
      tipo: 'Fisica',
    },
  ];

  const saveEmpresa = useCallback(
    async (data: FornecedorFormData) => {
      if (valueSelect !== 0) {
        setSelectErrorPessoa(false);
      } else {
        setSelectErrorPessoa(true);
      }
      try {
        formRef.current?.setErrors({});
        const schema = Yup.object().shape({
          empresa: Yup.number()
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
          tipo_pessoa: Yup.number()
            .required()
            .min(1, 'É necessário selecionar uma das opções contidas '),
          rg: Yup.string(),
          data_nascimento: Yup.string(),
          // .min(10, 'Deve conter no mínimo 10 caractéres')
          // .max(10, 'Deve conter no máximo 10 caractéres'),
        });

        await schema.validate(data, {
          abortEarly: false,
        });

        const {
          empresa,
          nome_fornecedor,
          cpf_cnpj,
          telefone,
          tipo_pessoa,
          rg,
          data_nascimento,
        } = data;

        const now = new Date();
        let { data_hora_cadastro } = data;

        data_hora_cadastro = `${now.getDate()}/0${
          now.getMonth() + 1
        }/${now.getFullYear()} | ${now.getHours()}:${now.getMinutes()}:${now.getSeconds()}`;

        const formData = {
          empresa,
          nome_fornecedor,
          cpf_cnpj,
          data_hora_cadastro,
          telefone,
          tipo_pessoa,
          ...(rg && data_nascimento
            ? {
                rg,
                data_nascimento,
              }
            : {}),
        };

        const response = await api.post('/fornecedores', formData);
      } catch (err) {
        if (err instanceof Yup.ValidationError) {
          const errors = getValidationErrors(err);
          formRef.current?.setErrors(errors);
        }
      }
    },
    [valueSelect],
  );

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
          <Combobox />
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
          <Select onChange={e => selValueSelect(Number(e.target.value))}>
            <option value={0} key="tipoPessoa">
              Tipo de Pessoa
            </option>
            <option value={1} key="pessoaJuridica">
              Juridica
            </option>
            <option value={2} key="pessoaFisica">
              Fisica
            </option>
          </Select>
          {selectErrorPessoa && <p>Selecione uma das opções acima</p>}
          {valueSelect === 2 ? (
            <>
              <Input name="rg" placeholder="RG" icon={FiCreditCard} />
              <Input
                name="data_nascimento"
                placeholder="Data de Nascimento"
                icon={FiCalendar}
              />
            </>
          ) : null}
          <Button type="submit">Salvar Fornecedor</Button>
        </Form>
      </Content>
    </Container>
  );
};

export default CadastroFornecedor;
