require('dotenv').config();
const express = require('express');
const cors = require('cors');
const db = require('./queries');

const app = express();
const PORT = process.env.PORT || 3000;
const PONTOS_POR_ACERTO = 10;
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

app.use(cors({ origin: process.env.CORS_ORIGIN || '*' }));
app.use(express.json({ limit: '10kb' }));

const asyncHandler = (fn) => (req, res, next) => Promise.resolve(fn(req, res, next)).catch(next);

// GET /api/health
app.get('/api/health', asyncHandler(async (_req, res) => {
  await db.testarConexao();
  res.json({ status: 'ok' });
}));

// GET /api/perguntas?limite=10
app.get('/api/perguntas', asyncHandler(async (req, res) => {
  const limite = Math.min(Math.max(parseInt(req.query.limite, 10) || 10, 1), 50);
  res.json(await db.buscarPerguntas(limite));
}));

// POST /api/jogadores  { nome, email }
app.post('/api/jogadores', asyncHandler(async (req, res) => {
  const nome = String(req.body.nome ?? '').trim();
  const email = String(req.body.email ?? '').trim().toLowerCase();

  if (!nome || nome.length > 100) {
    return res.status(400).json({ erro: 'Nome é obrigatório (máx. 100 caracteres).' });
  }
  if (!EMAIL_REGEX.test(email) || email.length > 150) {
    return res.status(400).json({ erro: 'E-mail inválido.' });
  }

  res.status(201).json(await db.salvarJogador(nome, email));
}));

// POST /api/partidas  { jogador_id, acertos, erros }  (pontuação = acertos x 10)
app.post('/api/partidas', asyncHandler(async (req, res) => {
  const jogadorId = Number(req.body.jogador_id);
  const acertos = Number(req.body.acertos);
  const erros = Number(req.body.erros);

  if (![jogadorId, acertos, erros].every(Number.isInteger) || jogadorId < 1 || acertos < 0 || erros < 0) {
    return res.status(400).json({ erro: 'jogador_id, acertos e erros devem ser inteiros válidos.' });
  }
  if (acertos + erros > 50) {
    return res.status(400).json({ erro: 'Quantidade de respostas inválida.' });
  }
  if (!(await db.jogadorExiste(jogadorId))) {
    return res.status(404).json({ erro: 'Jogador não encontrado.' });
  }

  const partida = await db.salvarPartida({
    jogadorId,
    pontuacao: acertos * PONTOS_POR_ACERTO,
    acertos,
    erros
  });
  res.status(201).json(partida);
}));

// GET /api/ranking?limite=10
app.get('/api/ranking', asyncHandler(async (req, res) => {
  const limite = Math.min(Math.max(parseInt(req.query.limite, 10) || 10, 1), 100);
  res.json(await db.buscarRanking(limite));
}));

app.use((_req, res) => res.status(404).json({ erro: 'Rota não encontrada.' }));

// eslint-disable-next-line no-unused-vars
app.use((err, _req, res, _next) => {
  if (err.type === 'entity.parse.failed') {
    return res.status(400).json({ erro: 'JSON inválido.' });
  }
  console.error(err);
  res.status(500).json({ erro: 'Erro interno do servidor.' });
});

app.listen(PORT, () => console.log(`API Bug or Fact rodando em http://localhost:${PORT}`));
