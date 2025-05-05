import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  Button,
  Container,
  Divider,
  Icon,
  Table,
  Modal,
  ModalHeader,
  ModalDescription,
  ModalContent,
  ModalActions,
  Header,
} from 'semantic-ui-react';
import axios from 'axios';
import MenuSistema from '../../MenuSistema';

export default function Listentregador() {
  const [lista, setLista] = useState([]);
  const [open, setOpen] = useState(false);
  const [entregadorSelecionado, setEntregadorSelecionado] = useState(null);

  useEffect(() => {
    carregarLista();
  }, []);

  function carregarLista() {
    axios.get("http://localhost:8080/api/entregador")
      .then((response) => {
        setLista(response.data);
      });
  }

  function formatarData(dataParam) {
    if (!dataParam) return '';
    let arrayData = dataParam.split('-');
    return `${arrayData[2]}/${arrayData[1]}/${arrayData[0]}`;
  }

  function abrirModal(entregador) {
    setEntregadorSelecionado(entregador);
    setOpen(true);
  }

  return (
    <div>
      <MenuSistema tela={'entregador'} />

      <div style={{ marginTop: '3%' }}>
        <Container textAlign='justified'>
          <h2>Entregador</h2>
          <Divider />

          <div style={{ marginTop: '4%' }}>
            <Button
              label='Novo'
              circular
              color='orange'
              icon='clipboard outline'
              floated='right'
              as={Link}
              to='/form-entregador'
            />
            <br /><br /><br />

            <Table color='orange' sortable celled>
              <Table.Header>
                <Table.Row>
                  <Table.HeaderCell>Nome</Table.HeaderCell>
                  <Table.HeaderCell>CPF</Table.HeaderCell>
                  <Table.HeaderCell>Data de Nascimento</Table.HeaderCell>
                  <Table.HeaderCell>Fone Celular</Table.HeaderCell>
                  <Table.HeaderCell>Fone Fixo</Table.HeaderCell>
                  <Table.HeaderCell textAlign='center'>Ações</Table.HeaderCell>
                </Table.Row>
              </Table.Header>

              <Table.Body>
                {lista.map(entregador => (
                  <Table.Row key={entregador.id}>
                    <Table.Cell>{entregador.nome}</Table.Cell>
                    <Table.Cell>{entregador.cpf}</Table.Cell>
                    <Table.Cell>{formatarData(entregador.dataNascimento)}</Table.Cell>
                    <Table.Cell>{entregador.foneCelular}</Table.Cell>
                    <Table.Cell>{entregador.foneFixo}</Table.Cell>
                    <Table.Cell textAlign='center'>

                      <Button
                        icon
                        circular
                        inverted
                        color='blue'
                        title='Ver detalhes'
                        onClick={() => abrirModal(entregador)}
                      >
                        <Icon name='eye' />
                      </Button>

                      <Button
                        icon
                        circular
                        inverted
                        color='green'
                        title='Editar'
                      >
                        <Icon name='edit' />
                      </Button>

                      <Button
                        icon
                        circular
                        inverted
                        color='red'
                        title='Remover'
                      >
                        <Icon name='trash' />
                      </Button>

                    </Table.Cell>
                  </Table.Row>
                ))}
              </Table.Body>
            </Table>
          </div>
        </Container>
      </div>

      {/* Modal de Detalhes */}
      {entregadorSelecionado && (
        <Modal
          open={open}
          onClose={() => setOpen(false)}
          onOpen={() => setOpen(true)}
          size='small'
        >
          <ModalHeader>Detalhes do Entregador</ModalHeader>
          <ModalContent>
            <ModalDescription>
              <Header>{entregadorSelecionado.nome}</Header>
              <p><strong>CPF:</strong> {entregadorSelecionado.cpf}</p>
              <p><strong>Data de Nascimento:</strong> {formatarData(entregadorSelecionado.dataNascimento)}</p>
              <p><strong>Fone Celular:</strong> {entregadorSelecionado.foneCelular}</p>
              <p><strong>Fone Fixo:</strong> {entregadorSelecionado.foneFixo}</p>
            </ModalDescription>
          </ModalContent>
          <ModalActions>
            <Button color='grey' onClick={() => setOpen(false)}>
              <Icon name='close' /> Fechar
            </Button>
          </ModalActions>
        </Modal>
      )}
    </div>
  );
}
