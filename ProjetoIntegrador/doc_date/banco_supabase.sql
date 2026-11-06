-- ==========================================
-- BANCO DE DADOS - BUG OR FACT (Machine Learning)
-- ==========================================

-- 0. Remoção das tabelas (permite rodar o script mais de uma vez)

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
    -- SET NULL: apagar uma pergunta não apaga a pontuação do ranking
    CONSTRAINT fk_classificacao_pergunta FOREIGN KEY (id_pergunta)
        REFERENCES Perguntas (codigo_perguntas) ON DELETE SET NULL
);

-- ==========================================
-- Inserção de Dados
-- ==========================================

-- Categorias

INSERT INTO Categorias (id_numeracao, nome) VALUES
(1, 'Conceito'),
(2, 'Funcionalidades'),
(3, 'História');

-- Perguntas

INSERT INTO Perguntas (id_categoria, pergunta, enunciado) VALUES
(2, 1, 'Machine Learning permite que um sistema aprenda e melhore ao ser alimentado com dados?'),
(1, 2, 'Inteligência Artificial e Machine Learning são a mesma coisa?'),
(1, 3, 'O machine learning treina algoritmos em conjuntos de dados para alcançar um resultado esperado?'),
(2, 4, 'Não reconhecer ruídos informacionais e a falta de aprimoramento estão entre as desvantagens do Machine Learning?'),
(2, 5, 'O desempenho do Machine Learning não depende dos dados fornecidos e de conhecimentos técnicos?'),
(2, 6, 'Podemos usar o Machine Learning na automação de processos robóticos e em campos relacionados a segurança?'),
(3, 7, 'O criador do Machine Learning foi Arthur Lee Samuel?'),
(3, 8, 'O Machine Learning foi criado em 1960?'),
(1, 9, 'A preparação dos dados, escolha de um modelo e treinamento fazem parte do Machine Learning?'),
(1, 10, 'O Machine Learning pode ser considerado um subconjunto da Inteligência Artificial?'),
(1, 11, 'Redes neurais são um tipo de algoritmo do Machine Learning?'),
(2, 12, 'A validação cruzada é uma técnica usada para melhorar a precisão de um modelo do Machine Learning?'),
(2, 13, 'A normalização dos dados é uma etapa opcional no pré-processamento de dados para Machine Learning?'),
(2, 14, 'O objetivo principal do Machine Learning é automatizar a tomada de decisões?'),
(2, 15, 'O Machine Learning garante uma boa experiência ao consumidor em todas as etapas da jornada de compra?'),
(1, 16, 'Machine Learning refere-se à capacidade dos computadores de aprender de forma dependente?'),
(2, 17, 'Um modelo de Machine Learning treinado, ainda sim precisa ser atualizado?'),
(1, 18, 'Supervised Learning é um modelo que utiliza um conjunto de dados que possui entradas e as respostas corretas?'),
(1, 19, 'Overfitting ocorre é um modelo que decora os dados de treinamento mas que apresenta péssimo desempenho?'),
(1, 20, 'Deep Learning é um conceito da Inteligência Artificial que abrange todas as técnicas do Machine Learning?');

-- Alternativas

INSERT INTO Alternativas (id_pergunta, texto_alternativa, eh_correta) VALUES
(1, 'TRUE', TRUE),    (1, 'FALSE', FALSE),
(2, 'TRUE', FALSE),   (2, 'FALSE', TRUE),
(3, 'TRUE', TRUE),    (3, 'FALSE', FALSE),
(4, 'TRUE', FALSE),   (4, 'FALSE', TRUE),
(5, 'TRUE', FALSE),   (5, 'FALSE', TRUE),
(6, 'TRUE', TRUE),    (6, 'FALSE', FALSE),
(7, 'TRUE', TRUE),    (7, 'FALSE', FALSE),
(8, 'TRUE', FALSE),   (8, 'FALSE', TRUE),
(9, 'TRUE', TRUE),    (9, 'FALSE', FALSE),
(10, 'TRUE', TRUE),   (10, 'FALSE', FALSE),
(11, 'TRUE', TRUE),   (11, 'FALSE', FALSE),
(12, 'TRUE', TRUE),   (12, 'FALSE', FALSE),
(13, 'TRUE', TRUE),   (13, 'FALSE', FALSE),
(14, 'TRUE', FALSE),  (14, 'FALSE', TRUE),
(15, 'TRUE', TRUE),   (15, 'FALSE', FALSE),
(16, 'TRUE', FALSE),  (16, 'FALSE', TRUE),
(17, 'TRUE', FALSE),  (17, 'FALSE', TRUE),
(18, 'TRUE', TRUE),   (18, 'FALSE', FALSE),
(19, 'TRUE', TRUE),   (19, 'FALSE', FALSE),
(20, 'TRUE', FALSE),  (20, 'FALSE', TRUE);

-- Publicações

INSERT INTO Publicacoes (id_pergunta, data_publicacao, status_publicacao) VALUES
(1, '2026-10-01', 'Ativo'),
(2, '2026-10-01', 'Ativo'),
(3, '2026-10-01', 'Ativo'),
(4, '2026-10-01', 'Ativo'),
(5, '2026-10-01', 'Ativo'),
(6, '2026-10-01', 'Ativo'),
(7, '2026-10-01', 'Ativo'),
(8, '2026-10-01', 'Ativo'),
(9, '2026-10-01', 'Ativo'),
(10, '2026-10-01', 'Ativo'),
(11, '2026-10-09', 'Ativo'),
(12, '2026-10-09', 'Ativo'),
(13, '2026-10-09', 'Ativo'),
(14, '2026-10-09', 'Ativo'),
(15, '2026-10-09', 'Ativo'),
(16, '2026-10-09', 'Ativo'),
(17, '2026-10-09', 'Ativo'),
(18, '2026-10-09', 'Ativo'),
(19, '2026-10-09', 'Ativo'),
(20, '2026-10-09', 'Ativo');

-- Bibliografias

INSERT INTO Bibliografias (id_pergunta, titulo_fonte, link_url) VALUES
(1, 'Oracle - Machine Learning', 'https://www.oracle.com'),
(2, 'Tecnoblog - IA vs ML', 'https://tecnoblog.net'),
(3, 'SAS - O que e Machine Learning', 'https://www.sas.com'),
(4, 'Unyleya - Desvantagens do ML', 'https://blog.unyleya.edu.br'),
(5, 'Posdigital - Machine Learning', 'https://posdigital.pucpr.br'),
(6, 'IBM - Topics', 'https://www.ibm.com'),
(7, 'Oracle - Dados e Performance', 'https://www.oracle.com'),
(8, 'Tecnoblog - Aplicacoes de ML', 'https://tecnoblog.net'),
(9, 'SAS - Historia do ML', 'https://www.sas.com'),
(10, 'Unyleya - Origem do ML', 'https://blog.unyleya.edu.br'),
(11, 'Posdigital - Machine Learning', 'https://posdigital.pucpr.br'),
(12, 'IBM - Topics', 'https://www.ibm.com'),
(13, 'Oracle - Dados e Performance', 'https://www.oracle.com'),
(14, 'Tecnoblog - IA vs ML', 'https://tecnoblog.net'),
(15, 'SAS - O que e Machine Learning', 'https://www.sas.com'),
(16, 'Unyleya - Desvantagens do ML', 'https://blog.unyleya.edu.br'),
(17, 'Posdigital - Machine Learning', 'https://posdigital.pucpr.br'),
(18, 'IBM - Topics', 'https://www.ibm.com'),
(19, 'Oracle - Dados e Performance', 'https://www.oracle.com'),
(20, 'Tecnoblog - IA vs ML', 'https://tecnoblog.net');

-- ==========================================
-- SEGURANÇA: RLS (Row Level Security)
-- ==========================================

ALTER TABLE Categorias    ENABLE ROW LEVEL SECURITY;
ALTER TABLE Perguntas     ENABLE ROW LEVEL SECURITY;
ALTER TABLE Alternativas  ENABLE ROW LEVEL SECURITY;
ALTER TABLE Publicacoes   ENABLE ROW LEVEL SECURITY;
ALTER TABLE Bibliografias ENABLE ROW LEVEL SECURITY;
ALTER TABLE Jogador       ENABLE ROW LEVEL SECURITY;
ALTER TABLE Classificacao ENABLE ROW LEVEL SECURITY;

-- ==========================================
-- Consulta de conferência
-- ==========================================

SELECT
    LPAD(p.pergunta::text, 3, '0') AS num_pergunta,
    c.nome AS categoria,
    p.enunciado,
    a.texto_alternativa AS resposta_correta,
    pub.data_publicacao,
    pub.status_publicacao,
    b.titulo_fonte,
    b.link_url
FROM Perguntas p
INNER JOIN Categorias c
    ON p.id_categoria = c.id_numeracao
INNER JOIN Alternativas a
    ON p.codigo_perguntas = a.id_pergunta AND a.eh_correta = TRUE
INNER JOIN Publicacoes pub
    ON p.codigo_perguntas = pub.id_pergunta
LEFT JOIN Bibliografias b
    ON p.codigo_perguntas = b.id_pergunta
ORDER BY p.pergunta ASC;

-- ==========================================
-- Consulta de ranking (separadamente quando houver jogadores)
-- ==========================================
--
-- SELECT
--     DENSE_RANK() OVER (ORDER BY c.pontuacao DESC) AS posicao_ranking,
--     j.codigo_jogador,
--     j.nome AS nome_jogador,
--     j.email,
--     c.pontuacao AS pontos,
--     c.data_atualizacao
-- FROM Jogador j
-- INNER JOIN Classificacao c
--     ON j.codigo_jogador = c.id_codigo_jogadorfk
-- ORDER BY c.pontuacao DESC, j.nome ASC;
