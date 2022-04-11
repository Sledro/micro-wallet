<h1 align="center">
  <br>
   Bitcoin HD Micro-Wallet
  <br>
</h1>

<h4 align="center">🚀 Bitcoin HD SegWit Address & P2SH Multisignature Generator</h4>
<br>
<p align="center">
    <a href="#" target="_blank">
      <img src="https://img.shields.io/npm/l/typescript-express-starter.svg" alt="npm Package License" />
    </a>
</p>

<br />

## 😎 Introducing The Project

Bitcoin HD Micro-Wallet is an API server that allows a user to:

1. Generate a Hierarchical Deterministic (HD) Segregated Witness (SegWit) bitcoin address from a given seed and path 
2. Generate an n-out-of-m Multisignature (multi-sig) Pay-To-Script-Hash (P2SH) bitcoin address, where n, m and addresses can be specified 

Production server should use SSL to encrypt API data and prevent network sniffing attacks.

---
## 🚀 Quick Start

Create 3 environment files in the project root:

- .env.development.local
- .env.development.local
- .env.development.local

insert the following:

```
# PORT
PORT = 3000

# TOKEN
SECRET_KEY = secretKey

# LOG
LOG_FORMAT = dev
LOG_DIR = ../logs

# CORS
ORIGIN = *
CREDENTIALS = true
```

### 1. Install dependencies

```bash
$ npm install
```
### 2. Start deveopment server
```bash
$ npm run dev
```
### 3. Access API Server
[http://localhost:3000](http://localhost:3000)
<br>
<br>

### 4. Swagger API Documentation
[http://localhost:3000/api-docs](http://localhost:3000/api-docs)
<br>
<br>

### 6. Example cURL POST /address/segwit

```
curl --location --request POST "http://127.0.0.1:3000/address/segwit" \
--header "Content-Type: application/json" \
--data-raw "{
    \"seed\": \"414583e964a2cf7473c44942712381a8e08817115488c9138b6eebe04030b8f000accafe893a6af8782d3f9612cb8c0d6ff893b6208f5a050a841b2fcb840faf\",
    \"path\": \"m/44'/0'/0'/0/0\"
}"
```

### 7. Example cURL POST /address/multisig

```
curl --location --request POST "http://127.0.0.1:3000/address/multisig" \
--header "Content-Type: application/json" \
--data-raw "{
    \"n\": 2,
    \"m\": 3,
    \"publicKeys\": [
        \"026477115981fe981a6918a6297d9803c4dc04f328f22041bedff886bbc2962e01\",
        \"02c96db2302d19b43d4c69368babace7854cc84eb9e061cde51cfa77ca4a22b8b9\",
        \"03c6103b3b83e4a24a0e33a4df246ef11772f9992663db0c35759a5e2ebf68d8e9\"
    ]
}"
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
│   │   └── address.controller.ts
│   │
│   ├── /dtos
│   │   └── address.dto.ts
│   │
│   ├── /exceptions
│   │   └── HttpException.ts
│   │
│   ├── /interfaces
│   │   └── address.interface.ts
│   │
│   ├── /middlewares
│   │   ├── error.middleware.ts
│   │   └── validation.middleware.ts
│   │
│   ├── /services
│   │   └── address.service.ts
│   │
│   ├── /tests
│   │   ├── index.test.ts
│   │   └── address.test.ts
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

