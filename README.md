# Projeto QRPague

Projeto para a padronização de código QR para permitir a agilidade na transferência de recursos financeiros via mobile banking entre correntistas de diferentes instituições financeiras brasileiras.

A proposta é de que com a criação de um padrão único, os usuários de mobile banking dos bancos participantes do projeto possam a partir de seu mobile baking ler o código QR do outro banco e realizar de forma ágil e segura um DOC, TED ou mesmo uma transferência bancária.

## Interoperabilidade

Atualmente cada instituição financeira tem desenvolvido iniciativas para a realização de operações bancárias via código QR em seus aplicativos móveis. De forma isolada, suas inciativas se restrigem aos seus correntistas. A partir da adoção do padrão proposto por este projeto as instituições poderão utilizar os benefícios da tecnologia de código QR para agilizar a realização de DOCs, TEDs e transferências bancárias.

## Instituições Participantes

* [Sicoob](http://www.sicoob.com.br)

## Documentação

O TOKEN QrPague, é posicional e separado por um delimitador ';', conforme abaixo:
`
version;id;label;valor;moeda;cpfOrigem;numBanco;nome;ag;conta;cpfDestino;metadados;timestampCriacao;timestampExpiracao;assinaturaECDSA
`

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
| 14    |      *      |   assinaturaECDSA  | Hash(ECDSA) da assinatura efetuada pela Instiuição Financeira, na criação do TOKEN QrPague. |

#### Exemplo prático
```js
let qrPagueToken = "0.1.0;5afad42239ee9f000fe92189;;10;BRL;99999999999;756;Fulano de Tal;0001;700000001;;;1526387746083;;3046022100c1bf3a2fd92766e82022cf5202a2d7520dead8a432b048b7d5f3e8cf78247f4f022100a34b2b6dc6622daf981566f45eb40c756abb8c4026ce98ce0c3fa78e1c942766"

let qrPagueArray = qrPagueToken.split(';')
console.log(qrPagueArray)
```
#### Saída do console
```
[
  "0.1.0",
  "5afad42239ee9f000fe92189",
  "",
  "10",
  "BRL",
  "99999999999",
  "756",
  "Fulano de Tal",
  "0001",
  "700000001",
  "",
  "",
  "1526387746083",
  "",
  "3046022100c1bf3a2fd92766e82022cf5202a2d7520dead8a432b048b7d5f3e8cf78247f4f022100a34b2b6dc6622daf981566f45eb40c756abb8c4026ce98ce0c3fa78e1c942766"
]
```

Como observado, campos não obrigatórios são representados por um characeter vazio na string do TOKEN QrPague, ou seja, será cocatenado ';;'.


## Assinatura
O último campo que representa a assinatura, é um HASH assinado com a chave privada da Instiutição Financeira, que deve ser respeitado o algorítimo de curva elíptica ECDSA.
>https://pt.wikipedia.org/wiki/ECDSA

Essa assinatura, deve ser validada com a chave pública da Instituição Financeira pagadora do QrPague. Dessa forma, as IFs participantes do deste modelo, devem compartilhar e manter atualizado sua chave pública(ECDSA).

A estratégia de usar chave de Curva Elíptica, se deu com a finalidade de diminuir a densidade do qrcode(QrPague), para evitar dificuldades de leituras por parte de alguns smatphones mais antigos.

#### Exemplos NODEJS:

##### Assinar 
```js
let crypto = require('crypto')
let crypto = require('fs')

function assinar(qrPagueToken){// "0.1.0;5afad42239ee9f000fe92189;;10;BRL;99999999999;756;Fulano de Tal;0001;700000001;;;1526387746083;"
  
  let crypto = require('crypto')
  let privateKey = fs.readFileSync('/path/to/key/private.key').toString('utf-8');
  let password = fs.readFileSync('/path/to/key/passord').toString('utf-8');
  let sign = crypto.createSign('SHA256');
  sign.write(token);
  sign.end();
  let decipher = crypto.createDecipher('aes256', passwd);
  let decPrivKey = decipher.update(prvK, 'hex', 'utf8');
  let pemPrivateKey = keyEncoder.encodePrivate(decPrivKey, 'raw', 'pem');
  let signature = sign.sign(pemPrivateKey, 'hex');
  qrPagueToken += ";" + signature;
  return qrPagueToken;

}
```

##### Validar
```js
let crypto = require('crypto')

function validarAssinatura(pubKey, signature, token){
    let payload = token.slice(0, token.length - 1).join(";");
    pubKey = keyEncoder.encodePublic(pubKey, 'raw', 'pem');
    let verify = crypto.createVerify('SHA256');

    verify.write(payload);
    verify.end();

    if (!verify.verify(pubKey, signature, 'hex'))
        throw new Error("Could not validate token signature");
    return true
}
```


