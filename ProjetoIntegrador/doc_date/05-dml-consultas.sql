# Passo 8 — Carga de Teste e Consultas (05-dml-consultas.sql)
  
-- ==========================================
-- Passo 8 — Carga de teste e consultas
-- Rode depois de 04-ddl.sql.
-- ==========================================

BEGIN;

-- Inserção das Categorias
INSERT INTO Categorias (id_numeracao, nome) VALUES
(1, 'Conceito'),
(2, 'Funcionalidades'),
(3, 'História');

-- Inserção das Perguntas
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

-- Inserção das Alternativas
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

-- Inserção das Publicações
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

-- Inserção das Bibliografias
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

-- Inserção de Jogadores e Classificação de Exemplo
INSERT INTO Jogador (nome, email) VALUES 
('Dev Teste', 'dev@teste.com');

INSERT INTO Classificacao (id_codigo_jogadorfk, id_pergunta, pontuacao) VALUES 
(1, 1, 100);

COMMIT;

-- ==========================================
-- CONSULTAS SOLICITADAS (RA01 a RA07)
-- ==========================================

-- RA01. Categorias em ordem alfabética, com a quantidade de perguntas.
SELECT 
    c.nome AS categoria, 
    COUNT(p.codigo_perguntas) AS qtd_perguntas
FROM Categorias c
LEFT JOIN Perguntas p ON c.id_numeracao = p.id_categoria
GROUP BY c.nome
ORDER BY c.nome ASC;

-- RA02a. Uma pergunta aleatória, de qualquer categoria.
SELECT 
    codigo_perguntas, 
    enunciado 
FROM Perguntas 
ORDER BY RANDOM() 
LIMIT 1;

-- RA02b. Uma pergunta aleatória de uma categoria recebida por parâmetro (ex: categoria 1 - Conceito).
SELECT 
    p.codigo_perguntas, 
    p.enunciado, 
    c.nome AS categoria
FROM Perguntas p
JOIN Categorias c ON p.id_categoria = c.id_numeracao
WHERE c.id_numeracao = 1
ORDER BY RANDOM() 
LIMIT 1;

-- RA03. Título (Categoria), enunciado e alternativas de uma pergunta (ex: pergunta 1).
SELECT 
    c.nome AS categoria,
    p.enunciado,
    a.texto_alternativa,
    a.eh_correta
FROM Perguntas p
INNER JOIN Categorias c ON p.id_categoria = c.id_numeracao
INNER JOIN Alternativas a ON p.codigo_perguntas = a.id_pergunta
WHERE p.codigo_perguntas = 1;

-- RA04. Dada a pergunta e a alternativa escolhida, verificar se acertou.
-- Exemplo 1: Testando com a alternativa CORRETA da Pergunta 1
SELECT 
    p.codigo_perguntas,
    a.texto_alternativa AS resposta_escolhida,
    CASE 
        WHEN a.eh_correta = TRUE THEN 'Resposta Correta!'
        ELSE 'Resposta Errada!'
    END AS resultado
FROM Alternativas a
JOIN Perguntas p ON a.id_pergunta = p.codigo_perguntas
WHERE p.codigo_perguntas = 1 AND a.texto_alternativa = 'TRUE';

-- Exemplo 2: Testando com a alternativa ERRADA da Pergunta 1
SELECT 
    p.codigo_perguntas,
    a.texto_alternativa AS resposta_escolhida,
    CASE 
        WHEN a.eh_correta = TRUE THEN 'Resposta Correta!'
        ELSE 'Resposta Errada!'
    END AS resultado
FROM Alternativas a
JOIN Perguntas p ON a.id_pergunta = p.codigo_perguntas
WHERE p.codigo_perguntas = 1 AND a.texto_alternativa = 'FALSE';

-- RA05. Explicação e fonte: título, publicador/status e URL.
SELECT 
    p.enunciado,
    b.titulo_fonte,
    pub.status_publicacao,
    b.link_url
FROM Perguntas p
INNER JOIN Bibliografias b ON p.codigo_perguntas = b.id_pergunta
INNER JOIN Publicacoes pub ON p.codigo_perguntas = pub.id_pergunta
WHERE p.codigo_perguntas = 1;

-- RA06. Publicadores/Fontes mais citados, com o número de perguntas.
SELECT 
    b.titulo_fonte,
    COUNT(b.id_pergunta) AS total_perguntas_citadas
FROM Bibliografias b
GROUP BY b.titulo_fonte
ORDER BY total_perguntas_citadas DESC;

-- RA07. Fontes (URLs) citadas por mais de uma pergunta.
SELECT 
    b.link_url,
    COUNT(b.id_pergunta) AS qtd_referencias
FROM Bibliografias b
GROUP BY b.link_url
HAVING COUNT(b.id_pergunta) > 1;
```
