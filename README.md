# REST API com Node.js & Express 🚀

Este é um projeto proposto como desafio pelo programa de bolsa da [compass.UOL](https://compass.uol/en/home/). Consiste de uma REST API construída com Node.js e Express, que permite gerenciar eventos e usuários.

## Conteúdo

- [Como rodar o projeto localmente](#como-rodar-o-projeto-localmente)
- [Documentação](#documentação)
- [Tecnologias utilizadas](#tecnologias-utilizadas)
- [Endpoints](#endpoints)

## Como rodar o projeto localmente

1. Clone este repositório em sua máquina local usando https://github.com/seu-usuario/nome-do-repo.git
2. Navegue até o diretório do projeto com o comando `cd nome-do-repo`
3. Instale as dependências do projeto com o comando `npm install`
4. Inicie o servidor com o comando `npm run start`
5. Acesse http://localhost:3000/ no seu navegador para verificar se a API está funcionando corretamente

## Documentação

[Em Construção]

## Tecnologias utilizadas

- [Node.js](https://nodejs.org/en/)
- [Express](https://expressjs.com/pt-br/)

## Endpoints

### Eventos
- GET /api/v1/events - Retorna todos os eventos cadastrados
- POST /api/v1/events - Cria um novo evento
- GET /api/v1/events/:param - Retorna um evento específico pelo ID ou dia da semana
- DELETE /api/v1/events/:param - Exclui um evento específico pelo ID ou dia da semana

⚠️ Atenção: O parâmetro `:param` pode ser tanto o ID (formato UUID) de um evento quanto um dia da semana (monday, tuesday, wednesday, thursday, friday).

### Usuários
- POST /api/v1/users/signUp - Cria um novo usuário
- POST /api/v1/users/signIn - Realiza login de um usuário existente
