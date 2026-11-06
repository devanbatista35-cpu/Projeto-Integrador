# 🐛 Bug or Fact

> Quiz de **Verdadeiro ou Falso** sobre tecnologia e Machine Learning, com cadastro de jogadores, feedback com fonte bibliográfica e ranking global. Aplicação full stack com banco de dados na nuvem.

![Node.js](https://img.shields.io/badge/Node.js-18%2B-339933?logo=node.js&logoColor=white)
![Express](https://img.shields.io/badge/Express-4-000000?logo=express&logoColor=white)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-Supabase-3ECF8E?logo=supabase&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-ES6%2B-F7DF1E?logo=javascript&logoColor=black)
![Netlify](https://img.shields.io/badge/Front--end-Netlify-00C7B7?logo=netlify&logoColor=white)
![Render](https://img.shields.io/badge/API-Render-46E3B7?logo=render&logoColor=black)

**🎮 Jogar agora:** [bug-or-fact.netlify.app](https://bug-or-fact.netlify.app)
**🔌 API:** [bug-or-fact-api.onrender.com/api/health](https://bug-or-fact-api.onrender.com/api/health)

> ⏳ A API está hospedada no plano gratuito do Render e "hiberna" após um período sem uso. A primeira requisição pode levar até ~50 segundos para responder.

---

## 📑 Sumário

- [Sobre o projeto](#-sobre-o-projeto)
- [Funcionalidades](#-funcionalidades)
- [Tecnologias](#-tecnologias)
- [Arquitetura](#-arquitetura)
- [Modelagem do banco de dados](#-modelagem-do-banco-de-dados)
- [Documentação da API](#-documentação-da-api)
- [Como executar localmente](#-como-executar-localmente)
- [Deploy](#-deploy)
- [Decisões técnicas e segurança](#-decisões-técnicas-e-segurança)
- [Competências desenvolvidas](#-competências-desenvolvidas)
- [Melhorias futuras](#-melhorias-futuras)
- [Equipe](#-equipe)
- [Licença](#-licença)

---

## 📖 Sobre o projeto

**Bug or Fact** é um jogo de perguntas em que o jogador decide se cada afirmação é um *fato* (verdadeiro) ou um *bug* (falso). As perguntas abordam conceitos, funcionalidades e a história do **Machine Learning**.

Cada partida sorteia 10 perguntas ativas do banco de dados. Ao responder, o jogador recebe o feedback imediato com a resposta correta e a **fonte bibliográfica** do conteúdo. Ao final, a melhor pontuação de cada jogador entra no ranking.

O projeto foi desenvolvido como **Projeto Integrador** do curso de Graduação em Ciência da Computação (2026), integrando front-end, back-end, modelagem de banco de dados e publicação em nuvem.

---

## ✨ Funcionalidades

- 👤 **Cadastro de jogador** com nome e e-mail (o e-mail identifica o jogador; reentradas atualizam o nome).
- 🎲 **Perguntas aleatórias** a cada partida, sorteadas entre as publicações ativas.
- ✅ **Feedback imediato** com a resposta correta e link para a fonte bibliográfica.
- 🏆 **Ranking global** que guarda apenas a **melhor pontuação** de cada jogador, com desempate pela data.
- 📊 **Resumo da partida**: pontuação, acertos, erros e total de perguntas.
- 🚪 **Saída com confirmação** durante a partida.
- 🌗 **Tema claro e escuro**.
- 🎵 **Música de fundo** com controle de volume.
- 📱 **Layout responsivo**.

---

## 🛠 Tecnologias

| Camada | Tecnologias |
|--------|-------------|
| **Front-end** | HTML5, CSS3, JavaScript (ES6+, `fetch`, manipulação do DOM) |
| **Back-end** | Node.js, Express, `cors`, `dotenv` |
| **Banco de dados** | PostgreSQL (Supabase), driver `pg` com pool de conexões |
| **Hospedagem** | Netlify (front-end), Render (API), Supabase (banco) |
| **Versionamento** | Git e GitHub |

---

## 🏗 Arquitetura

```
┌──────────────┐   HTTPS / JSON   ┌──────────────────┐    SSL    ┌─────────────────┐
│  Navegador   │ ───────────────▶ │  API Node/Express │ ────────▶ │  PostgreSQL     │
│  (Netlify)   │ ◀─────────────── │  (Render)         │ ◀──────── │  (Supabase)     │
└──────────────┘                  └──────────────────┘           └─────────────────┘
   HTML / CSS / JS                  server.js + queries.js            7 tabelas + RLS
```

O front-end é estático e consome a API REST. A API valida as entradas, executa as consultas parametrizadas e é a única camada com acesso ao banco.

### Estrutura de pastas

```
Projeto-Integrador/
└── ProjetoIntegrador/
    ├── audios/            # Trilha sonora
    ├── doc_date/          # Documentação e script SQL (banco_supabase.sql)
    ├── img/               # Imagens
    ├── js/
    │   ├── db.js          # Pool de conexão com o PostgreSQL (SSL)
    │   ├── queries.js     # Camada de acesso a dados (SQL)
    │   ├── server.js      # Servidor Express e rotas da API
    │   └── script.js      # Lógica do jogo no navegador
    ├── styles/            # Folhas de estilo
    ├── index.html         # Interface (SPA com várias telas)
    ├── package.json
    └── .gitignore
```

---

## 🗄 Modelagem do banco de dados

O banco possui **7 tabelas** relacionais. O script completo, com os dados iniciais (20 perguntas, alternativas, publicações e bibliografias), está em `doc_date/banco_supabase.sql`.

| Tabela | Função |
|--------|--------|
| `Categorias` | Agrupa perguntas (Conceito, Funcionalidades, História) |
| `Perguntas` | Enunciados das afirmações |
| `Alternativas` | Opções `TRUE`/`FALSE`, com marcação da correta |
| `Publicacoes` | Controla se uma pergunta está `Ativo` ou `Inativo` |
| `Bibliografias` | Fonte e link de cada pergunta |
| `Jogador` | Nome e e-mail (único) dos jogadores |
| `Classificacao` | Melhor pontuação de cada jogador (ranking) |

**Destaques da modelagem**

- Chaves estrangeiras com `ON DELETE CASCADE`, preservando a integridade referencial.
- `CHECK` constraints para valores válidos (`TRUE`/`FALSE`, `Ativo`/`Inativo`, pontuação ≥ 0).
- `UNIQUE` no e-mail do jogador, que viabiliza o *upsert* no cadastro.
- **Row Level Security (RLS)** ativado em todas as tabelas, bloqueando o acesso pela API pública do Supabase.

---

## 🔌 Documentação da API

Base URL: `https://bug-or-fact-api.onrender.com/api`

| Método | Rota | Descrição |
|--------|------|-----------|
| `GET` | `/health` | Verifica se a API e o banco estão no ar |
| `GET` | `/perguntas?limite=10` | Retorna perguntas ativas em ordem aleatória (1 a 50) |
| `POST` | `/jogadores` | Cria o jogador ou atualiza o nome se o e-mail já existir |
| `POST` | `/partidas` | Registra a partida; guarda só a melhor pontuação |
| `GET` | `/ranking?limite=10` | Retorna o ranking (1 a 100) |

### Exemplos

**`GET /perguntas?limite=2`**
```json
[
  {
    "id": 7,
    "statement": "O criador do Machine Learning foi Arthur Lee Samuel?",
    "correct": true,
    "source_title": "Oracle - Dados e Performance",
    "source_url": "https://www.oracle.com"
  }
]
```

**`POST /jogadores`**
```json
// Requisição
{ "nome": "Maria Silva", "email": "maria@email.com" }

// Resposta 201
{ "codigo_jogador": 1, "nome": "Maria Silva", "email": "maria@email.com" }
```

**`POST /partidas`**
```json
// Requisição
{ "jogador_id": 1, "acertos": 8, "erros": 2 }

// Resposta 201 (pontuação = acertos × 10, calculada no servidor)
{ "jogador_id": 1, "pontuacao": 80, "data_atualizacao": "2026-11-05T21:48:00.000Z" }
```

**`GET /ranking?limite=3`**
```json
[
  { "name": "Maria Silva", "score": 80 },
  { "name": "João Souza", "score": 70 }
]
```

Erros retornam JSON no formato `{ "erro": "mensagem" }` com os códigos HTTP `400`, `404` ou `500`.

---

## 💻 Como executar localmente

### Pré-requisitos

- [Node.js](https://nodejs.org) 18 ou superior
- Uma conta gratuita no [Supabase](https://supabase.com)
- Git

### Passo a passo

**1. Clone o repositório**
```bash
git clone https://github.com/devanbatista35-cpu/Projeto-Integrador.git
cd Projeto-Integrador/ProjetoIntegrador
```

**2. Crie o banco no Supabase**

No painel do projeto, abra **SQL Editor**, cole o conteúdo de `doc_date/banco_supabase.sql` e execute. A consulta final deve listar 20 linhas.

**3. Configure as variáveis de ambiente**

Crie um arquivo `.env` na pasta `ProjetoIntegrador`:
```env
PORT=3000
DATABASE_URL=postgresql://postgres.SEU_PROJETO:SUA_SENHA@aws-0-REGIAO.pooler.supabase.com:5432/postgres
CORS_ORIGIN=*
```
Use a string do **Session pooler** (**Connect** → **Direct**) do Supabase. Se a senha tiver caracteres especiais, codifique-os (por exemplo, `@` vira `%40`).

**4. Instale as dependências e inicie a API**
```bash
npm install
npm start
```
Teste em `http://localhost:3000/api/health`.

**5. Abra o front-end**

Abra o `index.html` com a extensão **Live Server** do VS Code. Em `localhost`, o front usa automaticamente a API local.

---

## 🚀 Deploy

| Serviço | Plataforma | Configuração |
|---------|-----------|--------------|
| Banco de dados | Supabase | Script SQL executado no SQL Editor |
| API | Render | Root Directory `ProjetoIntegrador`, build `npm install`, start `npm start`, variáveis `DATABASE_URL` e `CORS_ORIGIN` |
| Front-end | Netlify | Publish directory `ProjetoIntegrador`, sem build command |

Ambos os serviços fazem **deploy contínuo**: cada `push` na branch `main` publica a nova versão automaticamente.

---

## 🔐 Decisões técnicas e segurança

- **Consultas parametrizadas** (`$1`, `$2`) em todas as queries, prevenindo SQL Injection.
- **Validação de entrada** no servidor: tamanho do nome, formato do e-mail, inteiros válidos e limites de quantidade.
- **Pontuação calculada no servidor** (acertos × 10). O cliente envia apenas acertos e erros, o que reduz a chance de adulteração do placar.
- **Melhor pontuação por jogador** via `INSERT ... ON CONFLICT DO UPDATE` com `GREATEST`.
- **Prevenção de XSS** no front-end: dados da API são inseridos com `textContent`, e links externos são validados (`http/https`) e abertos com `rel="noopener noreferrer"`.
- **CORS restrito** ao domínio do front-end em produção.
- **Segredos fora do código**: credenciais em variáveis de ambiente, com `.env` no `.gitignore`.
- **RLS ativo** no Supabase, de modo que a API pública do serviço não expõe os dados.
- **Tratamento centralizado de erros** com `asyncHandler` e middleware dedicado.
- **Limite de tamanho do corpo** das requisições (`10kb`).

---

## 🎓 Competências desenvolvidas

### Back-end
- Construção de **API REST** com Node.js e Express: rotas, middlewares, códigos de status HTTP e tratamento centralizado de erros.
- Comunicação **assíncrona** com `async/await` e padrão `asyncHandler`.
- Configuração de **CORS** e uso de **variáveis de ambiente** com `dotenv`.

### Banco de dados
- **Modelagem relacional** com chaves primárias e estrangeiras, restrições `CHECK` e `UNIQUE`.
- **SQL avançado**: `JOIN`, `LEFT JOIN LATERAL`, subconsultas com `EXISTS`, `ORDER BY RANDOM()`, `ON CONFLICT` (*upsert*) e funções como `GREATEST`.
- Uso de **pool de conexões** e **SSL** com PostgreSQL em nuvem.
- Aplicação de **Row Level Security (RLS)**.

### Front-end
- Desenvolvimento de uma **SPA** em JavaScript puro, com troca de telas e gerenciamento de estado.
- Consumo de API com **`fetch`**, tratamento de erros e estados de carregamento.
- Manipulação segura do **DOM** e controle de **áudio**.
- Interface com **tema claro/escuro** e layout responsivo.

### Segurança
- Prevenção de **SQL Injection** e **XSS**.
- **Validação de dados** em múltiplas camadas e proteção de credenciais.
- Gestão de segredos e resposta a exposição de credenciais (rotação de senha).

### DevOps e entrega
- **Deploy em nuvem** de uma aplicação em três camadas (Supabase, Render e Netlify).
- **CI/CD** simples com deploy automático a cada `push`.
- Configuração de **ambientes** (desenvolvimento e produção) com URLs de API distintas.
- Diagnóstico de problemas de infraestrutura: IPv4 vs IPv6 no pooler, PATH, políticas de execução e CORS.

### Versionamento e trabalho em equipe
- Fluxo de trabalho com **Git e GitHub** (commits, push, desfazer commits locais, `.gitignore`).
- **Colaboração** em equipe multidisciplinar e organização de um projeto integrador.
- **Documentação técnica** e depuração sistemática de erros.

---

## 🔮 Melhorias futuras

- [ ] Painel administrativo para cadastrar e ativar perguntas.
- [ ] Mais categorias e níveis de dificuldade.
- [ ] Autenticação de jogadores.
- [ ] Cronômetro por pergunta.
- [ ] Histórico de partidas por jogador.
- [ ] Testes automatizados (unitários e de integração).
- [ ] Limitação de requisições (*rate limiting*) na API.

---

## 👥 Equipe

Projeto desenvolvido por estudantes de Ciência da Computação:

- Gustavo Sacomani Rafael
- Vanessa Batista de Freitas
- João Pedro Camargo de Souza
- Pamela Nunes de Campos
- Henrique de Oliveira Granso

---

## 📄 Licença

Distribuído sob a licença descrita no arquivo [LICENSE](LICENSE).
