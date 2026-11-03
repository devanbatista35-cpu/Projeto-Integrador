# Passo 9 — Testes das Regras de Negócio (06-dml-testes.sql)

-- ==========================================
-- Passo 9 — Testes das regras de negócio
-- Rode depois da carga (Passo 8).
-- ==========================================

-- ----------------------------------------------------
-- Regra 1: Não existem duas categorias com o mesmo id_numeracao ou nome duplicado.
-- ----------------------------------------------------
-- Resultado:
-- ERROR: duplicate key value violates unique constraint "categorias_id_numeracao_key"
-- DETAIL: Key (id_numeracao)=(1) already exists.

INSERT INTO Categorias (id_numeracao, nome) 
VALUES (1, 'Conceito Replicado');


-- ----------------------------------------------------
-- Regra 2: Pergunta sem enunciado (campo NOT NULL) não pode ser inserida.
-- ----------------------------------------------------
-- Resultado:
-- ERROR: null value in column "enunciado" of relation "perguntas" violates not-null constraint
-- DETAIL: Failing row contains (21, 1, 99, null).

INSERT INTO Perguntas (id_categoria, pergunta, enunciado) 
VALUES (1, 99, NULL);


-- ----------------------------------------------------
-- Regra 3: Não é possível associar uma pergunta a uma categoria inexistente (Restrição de Chave Estrangeira).
-- ----------------------------------------------------
-- Resultado:
-- ERROR: insert or update on table "perguntas" violates foreign key constraint "perguntas_id_categoria_fkey"
-- DETAIL: Key (id_categoria)=(999) is not present in table "categorias".

INSERT INTO Perguntas (id_categoria, pergunta, enunciado) 
VALUES (999, 1, 'Pergunta com categoria inválida?');


-- ----------------------------------------------------
-- Regra 4: Alternativas devem respeitar o domínio fixo ('TRUE' ou 'FALSE') via restrição CHECK.
-- ----------------------------------------------------
-- Resultado:
-- ERROR: new row for relation "alternativas" violates check constraint "alternativas_texto_alternativa_check"
-- DETAIL: Failing row contains (41, 1, MAYBE, f).

INSERT INTO Alternativas (id_pergunta, texto_alternativa, eh_correta) 
VALUES (1, 'MAYBE', FALSE);


-- ----------------------------------------------------
-- Regra 5: Não pode existir mais de um Jogador cadastrado com o mesmo e-mail (Campo UNIQUE).
-- ----------------------------------------------------
-- Resultado:
-- ERROR: duplicate key value violates unique constraint "jogador_email_key"
-- DETAIL: Key (email)=(dev@teste.com) already exists.

INSERT INTO Jogador (nome, email) 
VALUES ('Outro Jogador', 'dev@teste.com');


-- ----------------------------------------------------
-- Regra 6: A pontuação na tabela de Classificação não pode ser negativa (Restrição CHECK).
-- ----------------------------------------------------
-- Resultado:
-- ERROR: new row for relation "classificacao" violates check constraint "classificacao_pontuacao_check"
-- DETAIL: Failing row contains (1, 1, -50, 2026-11-03 20:24:00).

INSERT INTO Classificacao (id_codigo_jogadorfk, id_pergunta, pontuacao) 
VALUES (1, 1, -50);

```
