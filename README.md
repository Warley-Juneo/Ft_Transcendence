<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="200" alt="Nest Logo" /></a>
</p>

[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nest

  <p align="center">A progressive <a href="http://nodejs.org" target="_blank">Node.js</a> framework for building efficient and scalable server-side applications.</p>
    <p align="center">
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/v/@nestjs/core.svg" alt="NPM Version" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/l/@nestjs/core.svg" alt="Package License" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/dm/@nestjs/common.svg" alt="NPM Downloads" /></a>
<a href="https://circleci.com/gh/nestjs/nest" target="_blank"><img src="https://img.shields.io/circleci/build/github/nestjs/nest/master" alt="CircleCI" /></a>
<a href="https://coveralls.io/github/nestjs/nest?branch=master" target="_blank"><img src="https://coveralls.io/repos/github/nestjs/nest/badge.svg?branch=master#9" alt="Coverage" /></a>
<a href="https://discord.gg/G7Qnnhy" target="_blank"><img src="https://img.shields.io/badge/discord-online-brightgreen.svg" alt="Discord"/></a>
<a href="https://opencollective.com/nest#backer" target="_blank"><img src="https://opencollective.com/nest/backers/badge.svg" alt="Backers on Open Collective" /></a>
<a href="https://opencollective.com/nest#sponsor" target="_blank"><img src="https://opencollective.com/nest/sponsors/badge.svg" alt="Sponsors on Open Collective" /></a>
  <a href="https://paypal.me/kamilmysliwiec" target="_blank"><img src="https://img.shields.io/badge/Donate-PayPal-ff3f59.svg"/></a>
    <a href="https://opencollective.com/nest#sponsor"  target="_blank"><img src="https://img.shields.io/badge/Support%20us-Open%20Collective-41B883.svg" alt="Support us"></a>
  <a href="https://twitter.com/nestframework" target="_blank"><img src="https://img.shields.io/twitter/follow/nestframework.svg?style=social&label=Follow"></a>
</p>
  <!--[![Backers on Open Collective](https://opencollective.com/nest/backers/badge.svg)](https://opencollective.com/nest#backer)
  [![Sponsors on Open Collective](https://opencollective.com/nest/sponsors/badge.svg)](https://opencollective.com/nest#sponsor)-->

## Description

[Nest](https://github.com/nestjs/nest) framework TypeScript starter repository.

## Installation

```bash
$ npm install
```

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Test

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

## Support

Nest is an MIT-licensed open source project. It can grow thanks to the sponsors and support by the amazing backers. If you'd like to join them, please [read more here](https://docs.nestjs.com/support).

## Stay in touch

- Author - [Kamil Myśliwiec](https://kamilmysliwiec.com)
- Website - [https://nestjs.com](https://nestjs.com/)
- Twitter - [@nestframework](https://twitter.com/nestframework)

## License

Nest is [MIT licensed](LICENSE).


# Ft_Transcendece
Last project of 42School


## Objetivos

  ### Login
  1- Salvar um usuario no banco de dados:                                29/09
  2- Connectar com API 42
      Preencher dados do Dto                                             02/10
  3- CRUD (rotas) module User
      - create                                                           02/10
      - findUser                                                         02/10
  4- Frontend Login




1 - Criar Projeto - nest [new name_project]

## Errors
   
    Caso seu node de problema de versão use esse comando
    `nvm install 20`


## Install

  ### Prisma

    install:                  npm install prisma --save-dev
                              npm install prisma @prisma/client
  ### Nestjs

  install:                    sudo apt update
	                            sudo apt install nodejs
	                            sudo apt install npm

  ### Axios (A libary to make HTTP Requests) https://docs.nestjs.com/techniques/http-module#using-axios-directly

  install:                   npm i --save @nestjs/axios axios

## Terminal Commands

  ### Prisma

    init prisma schema:                          npx prisma init --datasource-provider sqlite
    init prisma (browser):                       npx prisma studio
    push table to db from schema(Migration):     npx prisma migrate dev --name <name>
    pull a db table to schema(Introspection):    npx prisma db pull


  ### Nestjs

    create new project:             nest new [directory]
                                    sudo npm -g @nestjs/cli
    run application:                npm run start:dev
    lint and autofix with eslint:   npm run lint
    format with prettier:           npm run format

  ### Axios


  ## Directives

  ### Prisma
    @id                     primary key. Every model must have 
    @@id([field, field])    combination of more than one field will be unique. Primary key
    @@map("name")           change the name of the db table
    @map("name")            change name of the field in db table
    @default                set a default value for the field
    @?                      field can be empty