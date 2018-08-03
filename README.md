# Projeto QRPague

Projeto para a padronização de código QR para permitir a agilidade na transferência de recursos financeiros via mobile banking entre correntistas de diferentes instituições financeiras brasileiras.

A proposta é de que com a criação de um padrão único, os usuários de mobile banking dos bancos participantes do projeto possam a partir de seu mobile baking ler o código QR do outro banco e realizar de forma ágil e segura um DOC, TED ou mesmo uma transferência bancária.

## Interoperabilidade

Atualmente cada instituição financeira tem desenvolvido iniciativas para a realização de operações bancárias via código QR em seus aplicativos móveis. De forma isolada, suas inciativas se restrigem aos seus correntistas. A partir da adoção do padrão proposto por este projeto as instituições poderão utilizar os benefícios da tecnologia de código QR para agilizar a realização de DOCs, TEDs e transferências bancárias.

## Instituições Participantes

* [Sicoob](http://www.sicoob.com.br)

## Documentação

| Ordem | Obrigatório |        Campo       |                                          Descrição                                          |
|:-----:|:-----------:|:------------------:|:-------------------------------------------------------------------------------------------:|
|   0   |      *      |       versao       | Versão do TOKEN QrPague.                                                                    |
|   1   |      *      |         id         | Número(UUID) único do TOKEN QrPague.                                                        |
|   2   |             |        label       | Descrição da transação.                                                                     |
|   3   |      *      |        valor       | Valor da transação.                                                                         |
|   4   |      *      |        moeda       | Moeda da transação(BRL,Dolar,Cryptomoeda?)                                                  |
|   5   |      *      |      cpfOrigem     | CPF do gerador do TOKEN QrPague que vai receber o aporte.                                   |
|   6   |      *      |      numBanco      | Número do Banco do gerador do TOKEN QrPague(ISPB ou COMPE).                                 |
|   7   |      *      |        nome        | Nome do Beneficiário que gerou o TOKEN QrPague e vai receber o aporte.                      |
|   8   |      *      |         ag         | Número da Agência de quem gerou e vai receber o aporte.                                     |
|   9   |      *      |        conta       | Número da Conta de quem gerou e vai receber o aporte.                                       |
|   10  |             |     cpfDestino     | CPF de Destino| se o usuário fizer a escolha de filtrar quem deve ser o pagador do QrPague. |
|   11  |             |      metadados     | Qualquer metadados de livre escolha de cada Instiuição Financeira.                          |
|   12  |      *      |  timestampCriação  | Timestamp da data de criação do TOKEN QRPague.                                              |
|   13  |             | timestampExpiração | Timestamp da data de expiração do TOKEN QRPague.                                            |
