<p align="center">
  <h1>Web Services e interoperabilidade com RPC</h1>
</p>

## 🎯 **Descrição do projeto**

Este projeto tem como objetivo desenvolver um sistema para gerenciamento de carteiras de criptomoedas utilizando Web Services 
e interoperabilidade com RPC.

As criptomoedas, como o Bitcoin e o Ethereum, já ganharam popularidade e valor. Com isso, surge a necessidade de desenvolver ferramentas que facilitem o gerenciamento dessas criptomoedas, como o controle de compras, vendas, transferências, consultas de saldo, etc. 

## 🎯 **Funcionalidades**

1. **Cadastro de carteira de criptomoedas:**
   - A aplicação permite a criação de novas carteiras de criptomoedas com um saldos iniciais definidos no momento da criação.
   - Cada conta possui um número único e um saldo associado.
 
2. **Transações:**
    - A aplicação suporta transações dos seguintes tipos:
      - Depósito
      - Saque
      - Transferência entre contas.
 
3. **Consulta de carteiras:**
    - A aplicação permite a consulta do saldo atual de uma carteira específica.
    - A aplicação permite a consulta de todas as informações de uma carteira específica.
    - A aplicação permite a consulta das informações de todas as carteiras.
 
3. **Exclusão de uma carteira:**
    - Através de um soft-delete, é possível desabilitar uma carteira. Uma carteira desabilitada não pode realizar transações.
 
## ⚡️Executando a aplicação

Siga os passos abaixo:

### 1.  Clone o repositório e navegue até a pasta backend:

#### Clonando usando a URL da web.

```bash
$ git clone https://github.com/p1reis/crypto-api.git && cd crypto-api
```

#### Usando uma chave SSH protegida por senha

```bash
$ git clone git@github.com:p1reis/crypto-api.git && cd crypto-api
```

### 2. Instale as dependências:

Você pode usar o gerenciador de pacotes que preferir. Para este projeto, eu utilizei o pnpm, então este documento seguirá essa abordagem.

```bash
$ pnpm install
```

### 3. Inicie a aplicação e o servidor RPC:

Para executar ambos juntos você pode executar:

```bash
$ pnpm start:dev:all
```

Para executar separadamente, escolha o modo que deseja e execute:

```bash
# application
$ pnpm run start

# application on watch mode
$ pnpm run start:dev

# server rpc
$ pnpm run start:rpc

# application on watch mode
$ pnpm run start:dev:rpc
```

> **Note:** Verifique no terminal se a aplicação está rodando corretamente.

### 4. Fazendo requisições:

Acesse a coleção no Postman para realizar requisições.

[<img src="https://run.pstmn.io/button.svg" alt="Run In Postman" style="width: 128px; height: 32px;">](https://documenter.getpostman.com/view/34772834/2sB2qUoQkV)


## ✔️ Tecnologias Utilizadas

- `Typescript`
- `Nest.js`

## 🫱🏾‍🫲🏾 Contato

Sinta-se à vontade para entrar em contato comigo. Abaixo estão as melhores maneiras de me contatar:

- **Email**: Entre em contato por email para perguntas ou assistência em [contatodopedroreis@gmail.com](mailto:contatodopedroreis@gmail.com).
- **LinkedIn**: Conecte-se comigo ou me siga em [in/p-reis](https://www.linkedin.com/in/p-reis/)

## 📃 Licença

Licenciado sob a [MIT licensed](LICENSE).

<p align="right"><a href="#top">Back to top</a></p>