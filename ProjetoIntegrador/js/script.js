/* ==========================================================================
   CONFIGURAÇÃO
   ========================================================================== */
// Endereço da API (server.js). Se o front for servido pelo mesmo servidor, use '/api'.
const API_URL = ['localhost', '127.0.0.1'].includes(location.hostname)
    ? 'http://localhost:3000/api'
    : 'https://bug-or-fact-api.onrender.com/api';

const QUESTIONS_PER_GAME = 10;

/* ==========================================================================
   ESTADO GLOBAL DA APLICAÇÃO
   ========================================================================== */
let currentUser = { id: null, name: '', email: '' };
let questions = [];            // carregadas do banco via /api/perguntas
let currentQuestionIndex = 0;
let score = 0;
let correctAnswersCount = 0;
let incorrectAnswersCount = 0;

/* ==========================================================================
   COMUNICAÇÃO COM A API
   ========================================================================== */
async function api(path, options = {}) {
    const response = await fetch(`${API_URL}${path}`, {
        headers: { 'Content-Type': 'application/json' },
        ...options
    });
    const data = await response.json().catch(() => ({}));
    if (!response.ok) {
        throw new Error(data.erro || `Erro ${response.status} ao falar com o servidor.`);
    }
    return data;
}

const apiSaveUser = (nome, email) =>
    api('/jogadores', { method: 'POST', body: JSON.stringify({ nome, email }) });

const apiLoadQuestions = (limite) => api(`/perguntas?limite=${limite}`);

const apiSaveMatch = (jogador_id, acertos, erros) =>
    api('/partidas', { method: 'POST', body: JSON.stringify({ jogador_id, acertos, erros }) });

const apiLoadRanking = (limite = 10) => api(`/ranking?limite=${limite}`);

/* ==========================================================================
   NAVEGAÇÃO E TROCA DE TEMA
   ========================================================================== */
function navigateTo(screenId) {
    document.querySelectorAll('.screen').forEach(screen => screen.classList.remove('active'));
    document.getElementById(screenId).classList.add('active');
}

const themeToggleBtn = document.getElementById('themeToggleBtn');
if (themeToggleBtn) {
    themeToggleBtn.addEventListener('click', () => {
        const currentTheme = document.documentElement.getAttribute('data-theme');
        document.documentElement.setAttribute('data-theme', currentTheme === 'light' ? 'dark' : 'light');
    });
}

/* ==========================================================================
   CADASTRO DO JOGADOR
   ========================================================================== */
document.getElementById('form-register').addEventListener('submit', async function (e) {
    e.preventDefault();

    const submitBtn = this.querySelector('button[type="submit"]');
    const name = document.getElementById('username').value.trim();
    const email = document.getElementById('email').value.trim();

    if (submitBtn) submitBtn.disabled = true;
    try {
        const player = await apiSaveUser(name, email);
        currentUser = { id: player.codigo_jogador ?? player.id, name: player.nome, email: player.email };
        navigateTo('screen-rules');
    } catch (err) {
        alert(`Não foi possível cadastrar o jogador: ${err.message}`);
    } finally {
        if (submitBtn) submitBtn.disabled = false;
    }
});

/* ==========================================================================
   LÓGICA DO JOGO
   ========================================================================== */
async function startGame() {
    try {
        questions = await apiLoadQuestions(QUESTIONS_PER_GAME);
    } catch (err) {
        alert(`Não foi possível carregar as perguntas: ${err.message}`);
        return;
    }

    if (!questions.length) {
        alert('Nenhuma pergunta ativa foi encontrada no banco de dados.');
        return;
    }

    currentQuestionIndex = 0;
    score = 0;
    correctAnswersCount = 0;
    incorrectAnswersCount = 0;
    loadQuestion();
    navigateTo('screen-quiz');
}

function renderDots() {
    const container = document.getElementById('dots-container');
    container.innerHTML = '';
    for (let i = 0; i < questions.length; i++) {
        const dot = document.createElement('div');
        dot.className = 'dot' + (i <= currentQuestionIndex ? ' active' : '');
        container.appendChild(dot);
    }
}

function loadQuestion() {
    const q = questions[currentQuestionIndex];
    document.getElementById('quiz-question-number').innerText = `Pergunta ${currentQuestionIndex + 1} de ${questions.length}`;
    document.getElementById('quiz-score-badge').innerText = `Pontuação atual: ${score} pontos`;
    document.getElementById('question-text').innerText = q.statement;

    document.getElementById('feedback-container').style.display = 'none';
    document.getElementById('quiz-options').style.display = 'flex';
    renderDots();
}

// Monta o texto de feedback: resposta certa + fonte (bibliografia) se existir
function renderFeedbackDescription(q) {
    const feedbackDesc = document.getElementById('feedback-desc');
    feedbackDesc.textContent = `A resposta correta é: ${q.correct ? 'Verdadeiro' : 'Falso'}.`;

    if (q.explanation) {
        feedbackDesc.textContent += ` ${q.explanation}`;
    }

    if (q.source_title) {
        feedbackDesc.appendChild(document.createElement('br'));
        feedbackDesc.appendChild(document.createTextNode('Fonte: '));

        if (q.source_url && /^https?:\/\//i.test(q.source_url)) {
            const link = document.createElement('a');
            link.href = q.source_url;
            link.target = '_blank';
            link.rel = 'noopener noreferrer';
            link.textContent = q.source_title;
            feedbackDesc.appendChild(link);
        } else {
            feedbackDesc.appendChild(document.createTextNode(q.source_title));
        }
    }
}

function answerQuestion(userChoice) {
    const q = questions[currentQuestionIndex];
    const isCorrect = (userChoice === q.correct);

    if (isCorrect) {
        score += 10;
        correctAnswersCount++;
    } else {
        incorrectAnswersCount++;
    }

    const feedbackBox = document.getElementById('feedback-box');
    const feedbackTitle = document.getElementById('feedback-title');

    if (isCorrect) {
        feedbackBox.className = 'feedback-box correct';
        feedbackTitle.className = 'feedback-title correct';
        feedbackTitle.innerText = 'RESPOSTA CORRETA';
    } else {
        feedbackBox.className = 'feedback-box';
        feedbackTitle.className = 'feedback-title incorrect';
        feedbackTitle.innerText = 'RESPOSTA INCORRETA';
    }

    renderFeedbackDescription(q);

    document.getElementById('quiz-options').style.display = 'none';
    document.getElementById('feedback-container').style.display = 'block';
    document.getElementById('quiz-score-badge').innerText = `Pontuação atual: ${score} pontos`;
}

function nextQuestion() {
    currentQuestionIndex++;
    if (currentQuestionIndex < questions.length) {
        loadQuestion();
    } else {
        showGameOver();
    }
}

/* ==========================================================================
   SAIR DA PARTIDA (diálogo de confirmação)
   ========================================================================== */
function exitGame() {
    document.getElementById('exit-confirm-dialog').showModal();
}

function closeExitDialog() {
    document.getElementById('exit-confirm-dialog').close();
}

function confirmExitGame() {
    closeExitDialog();
    navigateTo('screen-register');
}

/* ==========================================================================
   FIM DE JOGO, SALVAR PARTIDA E RANKING
   ========================================================================== */
async function showGameOver() {
    document.getElementById('final-score').innerText = `${score} pontos.`;
    document.getElementById('final-correct').innerText = `${correctAnswersCount} perguntas`;
    document.getElementById('final-incorrect').innerText = `${incorrectAnswersCount} perguntas`;
    navigateTo('screen-gameover');

    // A pontuação final é calculada no servidor (acertos x 10)
    try {
        await apiSaveMatch(currentUser.id, correctAnswersCount, incorrectAnswersCount);
    } catch (err) {
        console.error('Erro ao salvar a partida:', err);
    }

    await refreshRanking();
}

async function refreshRanking() {
    const list = document.getElementById('ranking-list');
    if (!list) return;

    const addRow = (label, value) => {
        const item = document.createElement('div');
        item.className = 'stats-item';

        const span = document.createElement('span');
        span.textContent = label;
        item.appendChild(span);

        if (value !== undefined) {
            const strong = document.createElement('strong');
            strong.textContent = value;
            item.appendChild(strong);
        }
        list.appendChild(item);
    };

    list.innerHTML = '';

    try {
        const ranking = await apiLoadRanking(10);

        if (!ranking.length) {
            addRow('Ainda não há pontuações.');
            return;
        }

        ranking.forEach((entry, index) => {
            addRow(`${index + 1}º ${entry.name}`, `${entry.score} pontos`);
        });
    } catch (err) {
        console.error('Erro ao carregar o ranking:', err);
        addRow('Não foi possível carregar o ranking.');
    }
}

/* ==========================================================================
   TELA SOBRE / REFERÊNCIAS
   ========================================================================== */
function toggleReferences() {
    const title = document.getElementById('about-title');
    const content = document.getElementById('about-content');
    const btn = document.getElementById('btn-toggle-ref');

    if (title.innerText === 'Sobre') {
        title.innerText = 'Referências';
        content.innerHTML = '<br><br><strong>sites e outros</strong><br><br>';
        btn.innerText = 'Sobre';
    } else {
        title.innerText = 'Sobre';
        content.innerHTML = `Esse jogo foi desenvolvido juntando conhecimentos técnicos sobre HTML, JavaScript e Banco de Dados.<br><br>
        Projeto integrador da Graduação em Ciência da computação, no ano de 2026.<br><br>
        <strong>Desenvolvedores<br>
        Gustavo Sacomani Rafael<br>
        Vanessa Vieira dos Santos<br>
        João Pedro Camargo de Souza<br>
        Pamela Nunes de Campos<br>
        Henrique de Oliveira Granso<br></strong>`;
        btn.innerText = 'Referências';
    }
}

/* ==========================================================================
   MÚSICA
   ========================================================================== */
document.addEventListener('DOMContentLoaded', () => {
    const musica = document.getElementById('musica-site');
    const btnMusica = document.getElementById('btn-musica');
    const volumeControl = document.getElementById('volume-control');

    if (musica && volumeControl) {
        musica.volume = volumeControl.value;
    }

    if (btnMusica && musica) {
        btnMusica.addEventListener('click', (e) => {
            e.stopPropagation();

            if (musica.paused) {
                musica.play()
                    .then(() => { btnMusica.textContent = '⏸️'; })
                    .catch(error => console.error('Erro ao tocar a música:', error));
            } else {
                musica.pause();
                btnMusica.textContent = '🎵';
            }
        });
    }

    if (volumeControl && musica && btnMusica) {
        volumeControl.addEventListener('input', (e) => {
            musica.volume = e.target.value;

            if (Number(musica.volume) === 0) {
                btnMusica.textContent = '🔇';
            } else {
                btnMusica.textContent = musica.paused ? '🎵' : '⏸️';
            }
        });
    }
});
