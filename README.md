# REST API com Node.js & Express - Compass.UOL challenge 🧭

Este é um projeto proposto como desafio pelo programa de bolsa da [Compass.UOL](https://compass.uol/en/home/). Consiste de uma REST API construída com Node.js e Express, que permite gerenciar eventos e usuários.

## 🔖 Sumário

- [Como rodar o projeto localmente](#como-rodar-o-projeto-localmente)
- [Como testar o projeto remotamente](#como-testar-o-projeto-remotamente)
- [Tecnologias utilizadas](#tecnologias-utilizadas)
- [Endpoints](#endpoints)

## 💻 Como rodar o projeto localmente

1. Clone este repositório em sua máquina local usando https://github.com/seu-usuario/nome-do-repo.git
2. Navegue até o diretório do projeto com o comando `cd nome-do-repo`
3. Instale as dependências do projeto com o comando `npm install`
4. Inicie o servidor com o comando `npm run start`
5. Acesse http://localhost:3000/ no seu navegador para verificar se a API está funcionando corretamente

## 🌐 Como testar o projeto remotamente

Você pode realizar as operações através do link de deploy com as endpoints:
- https://planner-challenge.vercel.app/api/v1/events
- https://planner-challenge.vercel.app/api/v1/users

⚠️ Atenção: Verifique os métodos e parametros válidos na seção [Endpoints](#endpoints)

## 🧰 Tecnologias utilizadas

- [Node.js](https://nodejs.org/en/)
- [Express](https://expressjs.com/pt-br/)
- [Vercel](https://vercel.com/) (deploy)

## 🛣️ Endpoints

### Eventos
|Rotas|Métodos|Descrição|
|--------|-------|-----------|
|/api/v1/events       |GET   |Retorna todos os eventos cadastrados|
|/api/v1/events       |POST  |Cria um novo evento|
|/api/v1/events/:param|GET   |Retorna um evento específico pelo ID ou dia da semana|
|/api/v1/events/:param|DELETE|Exclui um evento específico pelo ID ou dia da semana|

⚠️ Atenção: O parâmetro `:param` pode ser tanto o ID (formato UUID) de um evento quanto um dia da semana (monday, tuesday, wednesday, thursday, friday).

### Usuários
|Rotas|Métodos|Descrição|
|--------|-------|-----------|
|/api/v1/users/signUp|POST|Cria um novo usuário|
|/api/v1/users/signIn|POST|Realiza login de um usuário existente|

## 📊 Dados

### Eventos
|Chave|Formato|
|--------|-------|
|`_id`| UUID|
|`createdAt`| Date ISO 8601|
|`description`| String|
|`dateTime`| Date ISO 8601|

### Usuários
|Chave|Formato|
|--------|-------|
|`firstName`| String|
|`lastName`| String|
|`birthday`| Date YY-MM-DD|
|`city`| String|
|`country`| String|
|`email`| String|
|`password`| String|
|`confirmPassword`| String|

⚠️ Atenção: As operações CRUD são realizadas através dos dados armazenados nos arquivos JSON: `events.json` e `users.json` para persistência de dados.

