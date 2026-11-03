# Passo 7 — Modelo Físico (04-ddl.sql)

-- ==========================================
-- Passo 7 — Modelo físico
-- Equipe: João Pedro Camargo, Vanessa Vieira dos Santos, Gustavo Sacomani Rafael, Pamela Nunes e Henrique Granso
-- SGBD: PostgreSQL
-- Justificativa do SGBD: Escolhido por sua robustez, suporte nativo a 
-- integridade referencial complexa, compatibilidade total com o Supabase 
-- e excelente desempenho em consultas SQL de leitura e agregações.
-- ==========================================

BEGIN;

-- Remoção das tabelas na ordem inversa de dependência
DROP TABLE IF EXISTS Classificacao CASCADE;
DROP TABLE IF EXISTS Bibliografias CASCADE;
DROP TABLE IF EXISTS Publicacoes CASCADE;
DROP TABLE IF EXISTS Alternativas CASCADE;
DROP TABLE IF EXISTS Jogador CASCADE;
DROP TABLE IF EXISTS Perguntas CASCADE;
DROP TABLE IF EXISTS Categorias CASCADE;

-- 1. Tabela Categorias
CREATE TABLE Categorias (
    codigo_categorias SERIAL PRIMARY KEY,
    id_numeracao INT UNIQUE NOT NULL,
    nome VARCHAR(30) NOT NULL
);

-- 2. Tabela Perguntas
CREATE TABLE Perguntas (
    codigo_perguntas SERIAL PRIMARY KEY,
    id_categoria INT NOT NULL,
    pergunta INT NOT NULL,
    enunciado TEXT NOT NULL,
    FOREIGN KEY (id_categoria) REFERENCES Categorias(id_numeracao) ON DELETE CASCADE
);

-- 3. Tabela Alternativas
CREATE TABLE Alternativas (
    codigo_alternativas SERIAL PRIMARY KEY,
    id_pergunta INT NOT NULL REFERENCES Perguntas(codigo_perguntas) ON DELETE CASCADE,
    texto_alternativa VARCHAR(10) CHECK (texto_alternativa IN ('TRUE', 'FALSE')),
    eh_correta BOOLEAN NOT NULL DEFAULT FALSE
);

-- 4. Tabela Publicações
CREATE TABLE Publicacoes (
    codigo_publicacoes SERIAL PRIMARY KEY,
    id_pergunta INT NOT NULL REFERENCES Perguntas(codigo_perguntas) ON DELETE CASCADE,
    data_publicacao DATE DEFAULT CURRENT_DATE,
    status_publicacao VARCHAR(10) CHECK (status_publicacao IN ('Ativo', 'Inativo'))
);

-- 5. Tabela Bibliografias
CREATE TABLE Bibliografias (
    codigo_bibliografias SERIAL PRIMARY KEY,
    id_pergunta INT NOT NULL REFERENCES Perguntas(codigo_perguntas) ON DELETE CASCADE,
    titulo_fonte VARCHAR(100) NOT NULL,
    link_url TEXT
);

-- 6. Tabela Jogador
CREATE TABLE Jogador (
    codigo_jogador SERIAL PRIMARY KEY,
    nome VARCHAR(50) NOT NULL,
    email VARCHAR(100) NOT NULL UNIQUE,
    data_cadastro DATE DEFAULT CURRENT_DATE
);

-- 7. Tabela Classificacao (Ranking)
CREATE TABLE Classificacao (
    id_codigo_jogadorfk INT PRIMARY KEY,
    id_pergunta INT,
    pontuacao INT NOT NULL DEFAULT 0 CHECK (pontuacao >= 0),
    data_atualizacao TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (id_codigo_jogadorfk) REFERENCES Jogador (codigo_jogador)
        ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT fk_classificacao_pergunta FOREIGN KEY (id_pergunta)
        REFERENCES Perguntas (codigo_perguntas) ON DELETE SET NULL
);

COMMIT;
```
