# Sistema Bancário Simples

Este README fornece informações sobre um projeto de banco simples que permite gerenciar contas, realizar operações financeiras básicas e acessar informações sobre as contas.

## Introdução

O Sistema Bancário Simples é um projeto que permite criar, listar, atualizar e excluir contas bancárias, além de realizar operações como depósito, saque, transferência, consulta de saldo e exibição de extrato. Ele foi desenvolvido com o objetivo de demonstrar conceitos básicos de gestão de contas em um ambiente bancário.

## Funcionalidades

### 1. Listar Contas

- **Endpoint**: `/contas`
- **Método**: GET

Este endpoint fornece uma lista de todas as contas bancárias registradas no sistema. Pode ser usado para visualizar todas as contas existentes.

### 2. Criar Conta

- **Endpoint**: `/contas`
- **Método**: POST

Permite a criação de uma nova conta bancária. Você pode fornecer informações como nome do titular, número da conta, saldo inicial, etc. A conta será adicionada ao sistema com um ID único.

### 3. Atualizar Conta

- **Endpoint**: `/contas/:numeroConta/usuario`
- **Método**: PUT

Permite a atualização das informações de uma conta existente, como nome do titular ou outras informações relevantes.

### 4. Deletar Conta

- **Endpoint**: `/contas/:numeroConta`
- **Método**: DELETE

Remove uma conta do sistema com base em seu ID. Certifique-se de que a conta a ser excluída não tenha fundos ou esteja vinculada a operações pendentes.

### 5. Depositar em uma Conta

- **Endpoint**: `/transacoes/depositar`
- **Método**: POST

Realize um depósito em uma conta existente especificando o ID da conta e o valor a ser depositado.

### 6. Sacar de uma Conta

- **Endpoint**: `/transacoes/sacar`
- **Método**: POST

Realize um saque de uma conta existente especificando o ID da conta e o valor a ser sacado. Certifique-se de que a conta tenha saldo suficiente.

### 7. Transferir entre Contas

- **Endpoint**: `/transacoes/transferir`
- **Método**: POST

Permite transferir fundos de uma conta para outra, especificando os IDs das contas de origem e destino, bem como o valor a ser transferido.

### 8. Consultar Saldo

- **Endpoint**: `/contas/saldo`
- **Método**: GET

Este endpoint permite verificar o saldo atual de uma conta específica com base em seu ID.

### 9. Consultar Extrato

- **Endpoint**: `/contas/extrato`
- **Método**: GET

Fornece o extrato de uma conta, que inclui informações sobre transações recentes, como depósitos e saques.

## Como Usar

1. Clone este repositório em sua máquina local.
2. Configure o ambiente de desenvolvimento e as dependências necessárias.
3. Inicie o servidor do aplicativo.
4. Acesse as funcionalidades usando os endpoints mencionados.

## Contribuição

Se desejar contribuir para o desenvolvimento deste projeto, sinta-se à vontade para criar um fork do repositório e enviar suas alterações por meio de pull requests.

## Problemas Conhecidos

Neste momento, não há problemas conhecidos no sistema.

## Contato

- **Autor**: [Felipe Guimarães]
- **Email**: [felipe.guimaraes_contato@gmail.com]

## Licença

Este projeto é licenciado sob a [Licença MIT](LICENSE).
