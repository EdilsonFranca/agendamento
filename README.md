# Agendamento — Front-end

Aplicação front-end desenvolvida com Angular para consumir a API de agendamento de transferências, permitindo cadastrar e consultar transferências com cálculo de taxas conforme as regras de negócio.

## Tecnologias utilizadas

- **Angular 22** — desenvolvimento da aplicação front-end.
- **TypeScript 6** — linguagem de programação.
- **Bootstrap 5** — estilização e layout responsivo.
- **RxJS** — programação reativa e operações assíncronas.
- **Angular Router** — gerenciamento de rotas.
- **Angular Forms** — criação e validação de formulários.

## Pré-requisitos

Antes de executar o projeto, certifique-se de ter instalado:

- Node.js compatível com Angular 22.
- npm 11 ou compatível.
- API de agendamento configurada e em execução.

## Instalação

Clone o repositório:

```bash
git clone https://githugfb.com/EdilsonFranca/agendamento.git
cd agendamento
```

Instale as dependências:

```bash
npm install
```

## Executando a aplicação

Inicie o servidor de desenvolvimento:

```bash
npm start
```

Por padrão, o Angular disponibiliza a aplicação em:

http://localhost:4200

## Comandos disponíveis

| Comando | Descrição |
|---|---|
| `npm start` | Inicia o servidor de desenvolvimento. |
| `npm run build` | Gera a versão de produção. |
| `npm run watch` | Compila continuamente em modo de desenvolvimento. |
| `npm test` | Executa os testes automatizados. |

## Integração com a API

A aplicação consome a API de agendamento de transferências, responsável pelo processamento das solicitações e pelas regras de cálculo das taxas.

Endpoint principal:

```http
/api/v1/transferencias
```

- `POST /api/v1/transferencias` — cadastra uma transferência.
- `GET /api/v1/transferencias` — consulta as transferências cadastradas.

A URL base da API deve ser configurada conforme o ambiente de execução.

## Build de produção

Para gerar os arquivos otimizados para publicação:

```bash
npm run build
```

Os arquivos compilados são gerados no diretório `dist/`.

## Testes

Execute os testes automatizados com:

```bash
npm test
```

## Objetivo

Projeto desenvolvido para praticar o desenvolvimento de aplicações web com Angular, integração com APIs REST, validação de formulários, organização de componentes e testes automatizados.
