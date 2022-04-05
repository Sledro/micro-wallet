<h1 align="center">
  <br>
   Bitcoin HD Micro-Wallet
  <br>
</h1>

<h4 align="center">🚀 Bitcoin HD SegWit Address & P2SH Multisignature Generator</h4>

<p align="center">
    <a href="http://npm.im/typescript-express-starter" target="_blank">
      <img src="https://img.shields.io/npm/v/typescript-express-starter.svg" alt="npm Version" />
    </a>
    <a href="http://npm.im/typescript-express-starter" target="_blank">
      <img src="https://img.shields.io/npm/l/typescript-express-starter.svg" alt="npm Package License" />
    </a>
    <a href="http://npm.im/typescript-express-starter" target="_blank">
      <img src="https://img.shields.io/npm/dm/typescript-express-starter.svg" alt="npm Downloads" />
    </a>
</p>

<br />

## 😎 Introducing The Project

Bitcoin HD Micro-Wallet is an API server that allows a user to generate:

1. Generate a Hierarchical Deterministic (HD) Segregated Witness (SegWit) bitcoin address from a given seed and path 
2. Generate an n-out-of-m Multisignature (multi-sig) Pay-To-Script-Hash (P2SH) bitcoin address, where n, m and addresses can be specified 

---
## 🚀 Quick Start

### Install dependencies

```bash
$ npm install
```
### Start deveopment server
```bash
$ npm run dev
```
### Access API Server
```
http://localhost:3000/
```
### Swagger API Documentation
```
http://localhost:3000/api-docs
```

---
## 🛎 Available Commands for the Server

- Run the Server in production mode : `npm run start`
- Run the Server in development mode : `npm run dev`
- Run all unit-tests : `npm test`
- Check for linting errors : `npm run lint`
- Fix for linting : `npm run lint:fix`

---


## 🗂 Code Structure (default)

```bash
│
├── /.vscode
│   ├── launch.json
│   └── settings.json
│
├── /src
│   ├── /configs
│   │   ├── index.ts
│   │
│   ├── /controllers
│   │   ├── index.controller.ts
│   │   └── wallet.controller.ts
│   │
│   ├── /dtos
│   │   └── wallet.dto.ts
│   │
│   ├── /exceptions
│   │   └── HttpException.ts
│   │
│   ├── /interfaces
│   │   └── wallet.interface.ts
│   │
│   ├── /middlewares
│   │   ├── error.middleware.ts
│   │   └── validation.middleware.ts
│   │
│   ├── /services
│   │   └── wallet.service.ts
│   │
│   ├── /tests
│   │   ├── index.test.ts
│   │   └── wallet.test.ts
│   │
│   ├── /utils
│   │   ├── logger.ts
│   │   ├── util.ts
│   │   └── vaildateEnv.ts
│   │
│   ├── app.ts
│   └── server.ts
│
├── .editorconfig
├── .env.development.local
├── .env.production.local
├── .env.test.local
├── .eslintignore
├── .eslintrc
├── .gitignore
├── .huskyrc
├── .lintstagedrc.json
├── .prettierrc
├── .swcrc
├── ecosystem.config.js
├── jest.config.js
├── Makefile
├── nodemon.json
├── package-lock.json
├── package.json
└── tsconfig.json
```

## 💳 License

[MIT](LICENSE)

