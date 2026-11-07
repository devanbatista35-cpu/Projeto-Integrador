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

    const shouldShowControls = screenId === 'screen-register';
    document.body.classList.toggle('controls-visible', shouldShowControls);
}

document.body.classList.toggle('controls-visible', document.getElementById('screen-register')?.classList.contains('active'));

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
// Monta o texto de feedback: resposta certa + curiosidade + fonte (bibliografia) se existir
// Monta o feedback: curiosidade + fonte (bibliografia) se existir
function renderFeedbackDescription(q) {
    const feedbackDesc = document.getElementById('feedback-desc');
    feedbackDesc.replaceChildren(); // limpa o conteúdo anterior (e o texto padrão do HTML)

    // Curiosidade (acima da fonte)
    if (q.curiosity) {
        const box = document.createElement('div');
        box.className = 'feedback-curiosidade';

        const strong = document.createElement('strong');
        strong.textContent = '💡 Curiosidade: ';
        box.appendChild(strong);
        box.appendChild(document.createTextNode(q.curiosity));

        feedbackDesc.appendChild(box);
    }

    // Fonte
    if (q.source_title) {
        const fonte = document.createElement('div');
        fonte.appendChild(document.createTextNode('Fonte: '));

        if (q.source_url && /^https?:\/\//i.test(q.source_url)) {
            const link = document.createElement('a');
            link.href = q.source_url;
            link.target = '_blank';
            link.rel = 'noopener noreferrer';
            link.textContent = q.source_title;
            fonte.appendChild(link);
        } else {
            fonte.appendChild(document.createTextNode(q.source_title));
        }

        feedbackDesc.appendChild(fonte);
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
        content.innerHTML = `<strong>Referências</strong><br><br>
        AHMED, M.; MAHMOOD, A. N.; HU, J. A survey of network anomaly detection techniques. <strong><em>Journal of Network and Computer Applications</em></strong>, v. 60, p. 19–31, 2016.<br><br>
        BISHOP, C. M. <strong><em>Pattern Recognition and Machine Learning</em></strong>. New York: Springer, 2006.<br><br>
        DOMINGOS, P. A few useful things to know about machine learning. <strong><em>Communications of the ACM</em></strong>, v. 55, n. 10, p. 78–87, 2012.<br><br>
        GAMA, J. et al. A survey on concept drift adaptation. <strong><em>ACM Computing Surveys (CSUR)</em></strong>, v. 46, n. 4, p. 1–37, 2014.<br><br>
        GOMEZ-URIBE, C. A.; HUNT, N. The Netflix recommender system: algorithms, business value, and innovation. <strong><em>ACM Transactions on Management Information Systems (TMIS)</em></strong>, v. 6, n. 4, p. 1–19, 2015.<br><br>
        GOODFELLOW, I.; BENGIO, Y.; COURVILLE, A. <strong><em>Deep Learning</em></strong>. Cambridge: MIT Press, 2016.<br><br>
        HASTIE, T.; TIBSHIRANI, R.; FRIEDMAN, J. <strong><em>The Elements of Statistical Learning: Data Mining, Inference, and Prediction</em></strong>. 2. ed. New York: Springer, 2009.<br><br>
        HAWKINS, D. M. The problem of overfitting. <strong><em>Journal of Chemical Information and Computer Sciences</em></strong>, v. 44, n. 1, p. 1–12, 2004.<br><br>
        KILKENNY, M. F.; ROBINSON, K. M. Data quality: "Garbage in, garbage out". <strong><em>Health Information Management Journal</em></strong>, v. 47, n. 3, p. 103–105, 2018.<br><br>
        KOHAVI, R. A study of cross-validation and bootstrap for accuracy estimation and model selection. In: INTERNATIONAL JOINT CONFERENCE ON ARTIFICIAL INTELLIGENCE, 14., 1995, Montreal. <strong><em>Proceedings...</em></strong> San Mateo: Morgan Kaufmann, 1995. v. 2, p. 1137–1143.<br><br>
        LECUN, Y.; BENGIO, Y.; HINTON, G. Deep learning. <strong><em>Nature</em></strong>, v. 521, n. 7553, p. 436–444, 2015.<br><br>
        MCCARTHY, J. In Memoriam: Arthur Samuel (1901–1990). <strong><em>AI Magazine</em></strong>, v. 11, n. 3, p. 10, 1990.<br><br>
        MCCULLOCH, W. S.; PITTS, W. A logical calculus of the ideas immanent in nervous activity. <strong><em>The Bulletin of Mathematical Biophysics</em></strong>, v. 5, n. 4, p. 115–133, 1943.<br><br>
        MITCHELL, T. M. <strong><em>Machine Learning</em></strong>. New York: McGraw-Hill Education, 1997.<br><br>
        PRESS, G. <strong><em>Cleaning Big Data: Most Time-Consuming, Least Enjoyable Data Science Task, Survey Says</em></strong>. Forbes, 2016. Disponível em: <a href="https://www.forbes.com" target="_blank" rel="noopener noreferrer">https://www.forbes.com</a>. Acesso em: 7 nov. 2026.<br><br>
        PROVOST, F.; FAWCETT, T. <strong><em>Data Science for Business: What You Need to Know about Data Mining and Data-Analytic Thinking</em></strong>. Sebastopol: O'Reilly Media, 2013.<br><br>
        ROSENBLATT, F. The perceptron: a probabilistic model for information storage and organization in the brain. <strong><em>Psychological Review</em></strong>, v. 65, n. 6, p. 386–408, 1958.<br><br>
        RUSSELL, S.; NORVIG, P. <strong><em>Artificial Intelligence: A Modern Approach</em></strong>. 4. ed. Hoboken: Pearson, 2020.<br><br>
        SAMUEL, A. L. Some studies in machine learning using the game of checkers. <strong><em>IBM Journal of Research and Development</em></strong>, v. 3, n. 3, p. 210–229, 1959.<br><br>
        ZHENG, A.; CASARI, A. <strong><em>Feature Engineering for Machine Learning: Principles and Techniques for Data Developers</em></strong>. Sebastopol: O'Reilly Media, 2018.`;
        btn.innerText = 'Sobre';
    } else {
        title.innerText = 'Sobre';
        content.innerHTML = `<strong>Bug or Fact</strong> é um jogo de perguntas em que o jogador decide se cada afirmação é um <em>fato</em> (verdadeiro) ou um <em>bug</em> (falso). As perguntas abordam conceitos, funcionalidades e a história do <strong>Machine Learning</strong>.<br><br>
        Projeto integrador da Graduação em Ciência da computação, no ano de 2026.<br><br>
        <div style="text-align: left;"><strong>Desenvolvedores<br>
        Gustavo Sacomani Rafael<br>
        Vanessa Vieira dos Santos<br>
        João Pedro Camargo de Souza<br>
        Pamela Nunes de Campos<br>
        Henrique de Oliveira Granso<br></strong></div>`;
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

    // Atualiza o visual do botão pelas classes do CSS (sem emoji)
    function atualizarIconeMusica() {
        btnMusica.classList.toggle('is-muted', Number(musica.volume) === 0);
        btnMusica.classList.toggle('is-playing', !musica.paused && Number(musica.volume) !== 0);
    }

    if (btnMusica && musica) {
        btnMusica.addEventListener('click', (e) => {
            e.stopPropagation();

            if (musica.paused) {
                musica.play()
                    .then(atualizarIconeMusica)
                    .catch(error => console.error('Erro ao tocar a música:', error));
            } else {
                musica.pause();
                atualizarIconeMusica();
            }
        });
    }

    if (volumeControl && musica && btnMusica) {
        volumeControl.addEventListener('input', (e) => {
            musica.volume = e.target.value;
            atualizarIconeMusica();
        });
    }
});
