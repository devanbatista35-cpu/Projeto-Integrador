const pool = require('./db');

async function buscarPerguntas(limite) {
  const { rows } = await pool.query(
    `SELECT p.codigo_perguntas AS id,
            p.enunciado        AS statement,
            (a.texto_alternativa = 'TRUE') AS correct,
            b.titulo_fonte     AS source_title,
            b.link_url         AS source_url
       FROM Perguntas p
       JOIN Alternativas a
         ON a.id_pergunta = p.codigo_perguntas AND a.eh_correta = TRUE
       LEFT JOIN LATERAL (
              SELECT titulo_fonte, link_url
                FROM Bibliografias
               WHERE id_pergunta = p.codigo_perguntas
               ORDER BY codigo_bibliografias
               LIMIT 1
            ) b ON TRUE
      WHERE EXISTS (
              SELECT 1 FROM Publicacoes pub
               WHERE pub.id_pergunta = p.codigo_perguntas
                 AND pub.status_publicacao = 'Ativo'
            )
      ORDER BY RANDOM()
      LIMIT $1`,
    [limite]
  );
  return rows;
}

// Cria o jogador ou atualiza o nome se o e-mail já existir
async function salvarJogador(nome, email) {
  const { rows } = await pool.query(
    `INSERT INTO Jogador (nome, email)
          VALUES ($1, $2)
     ON CONFLICT (email) DO UPDATE SET nome = EXCLUDED.nome
       RETURNING codigo_jogador, nome, email`,
    [nome, email]
  );
  return rows[0];
}

async function jogadorExiste(id) {
  const { rowCount } = await pool.query(
    'SELECT 1 FROM Jogador WHERE codigo_jogador = $1',
    [id]
  );
  return rowCount > 0;
}

// Guarda apenas a MELHOR pontuação de cada jogador na Classificacao
async function salvarPartida({ jogadorId, pontuacao }) {
  const { rows } = await pool.query(
    `INSERT INTO Classificacao (id_codigo_jogadorfk, pontuacao)
          VALUES ($1, $2)
     ON CONFLICT (id_codigo_jogadorfk) DO UPDATE
             SET data_atualizacao = CASE
                   WHEN EXCLUDED.pontuacao > Classificacao.pontuacao
                   THEN CURRENT_TIMESTAMP
                   ELSE Classificacao.data_atualizacao
                 END,
                 pontuacao = GREATEST(Classificacao.pontuacao, EXCLUDED.pontuacao)
       RETURNING id_codigo_jogadorfk AS jogador_id, pontuacao, data_atualizacao`,
    [jogadorId, pontuacao]
  );
  return rows[0];
}

async function buscarRanking(limite) {
  const { rows } = await pool.query(
    `SELECT j.nome AS name,
            c.pontuacao AS score
       FROM Classificacao c
       JOIN Jogador j ON j.codigo_jogador = c.id_codigo_jogadorfk
      ORDER BY c.pontuacao DESC, c.data_atualizacao ASC
      LIMIT $1`,
    [limite]
  );
  return rows;
}

async function testarConexao() {
  await pool.query('SELECT 1');
}

module.exports = { buscarPerguntas, salvarJogador, jogadorExiste, salvarPartida, buscarRanking, testarConexao };
