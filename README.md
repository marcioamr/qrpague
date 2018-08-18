# Projeto QRPague

Projeto de padronização de código QR para a realização de transferência de recursos financeiros via mobile banking entre correntistas de diferentes instituições financeiras brasileiras.

A proposta é de que com a criação de um padrão único, os usuários de mobile banking dos bancos participantes do projeto possam a partir de seu mobile baking ler o código QR do outro banco e realizar de forma ágil e segura um DOC, TED ou mesmo uma transferência bancária.

## Interoperabilidade

Atualmente cada instituição financeira tem desenvolvido iniciativas para a realização de operações bancárias via código QR em seus aplicativos móveis. De forma isolada, suas inciativas se restrigem aos seus correntistas. A partir da adoção do padrão proposto por este projeto as instituições poderão utilizar os benefícios da tecnologia de código QR para agilizar a realização de DOCs, TEDs e transferências bancárias.

## Instituições Participantes

* [Sicoob](http://www.sicoob.com.br)

## Padronização

Para que a experiência esperada para os seus usuários seja alçada, além do padrão do código QR é necessário padronizar um MIME Type e um JSON com as informações complementares da operação.

![alt text](https://github.com/marcioamr/qrpague/blob/master/imagens/QRPague.png?raw=true)

### MIME Type

Para que seja possível gerar um código QRPague e compartilhá-lo em forma de link seja por e-mail, em redes sociais ou mesmo por WhatsApp é necessário que seja convensionado um formato de arquivo único entre as instituições.

Todos os aplicativos das instituições devem registrar o MIME Type *application/qrpague* em seus mobile banking de forma que ao clicar em um link que contenha um token QRPague o usuário seja perguntado em qual mobile banking que ele possui instalado ele gostaria de realizar a operação.

### Código QR

## Conclusão
  Como falado anteriormente, QrPague é um token posicional que representa um QRCode assinado pela Insitituição Financeira de origem. Dessa forma a Insituição pagadora deve identificar a IF de Origem a partir no campo de número 6(numBanco), com isso buscar em sua base local a chave pública da insituição de origem a fim de validade a autenticidade do TOKEN e depois disso, extrair os dados para realizar a transação bancária(TEd ou DOC).

