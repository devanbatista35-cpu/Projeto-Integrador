/* ==========================================================================
   1. ESTADO GLOBAL DA APLICAÇÃO
   ========================================================================== */
let currentUser = { name: '', email: '' };
let currentQuestionIndex = 0;
let score = 0;
let correctAnswersCount = 0;
let incorrectAnswersCount = 0;
const rankingStorageKey = 'bug-or-fact-ranking';
let rankingEmMemoria = [];

/* ==========================================================================
   2. BANCO DE DADOS DE PERGUNTAS (10 Perguntas)
   ========================================================================== */
const questions = [
    {
        statement: "A linguagem C, é uma linguagem compilada?",
        correct: true,
        explanation: "Desenvolvida por Dennis Ritchie no Bell Labs em 1972, o código-fonte em C é traduzido diretamente para linguagem de máquina por um compilador antes da execução."
    },
    {
        statement: "HTML é uma linguagem de programação?",
        correct: false,
        explanation: "O HTML é uma linguagem de marcação utilizada para estruturar conteúdos na web, não possuindo lógica de programação."
    },
    {
        statement: "O JavaScript é executado nativamente nos navegadores web?",
        correct: true,
        explanation: "Sim, os navegadores possuem motores JS (como o V8 do Chrome) para interpretar e executar scripts diretamente na página."
    },
    {
        statement: "HTTP significa HyperText Transfer Protocol?",
        correct: true,
        explanation: "Correto! É o protocolo base para transferência de dados na World Wide Web."
    },
    {
        statement: "SQL é utilizado para gerenciar bancos de dados não-relacionais?",
        correct: false,
        explanation: "O SQL (Structured Query Language) é utilizado especificamente para bancos de dados Relacionais."
    },
    {
        statement: "Python é uma linguagem de alto nível e interpretada?",
        correct: true,
        explanation: "Correto. O código Python é executado linha por linha por um interpretador."
    },
    {
        statement: "O Git é a mesma coisa que o GitHub?",
        correct: false,
        explanation: "O Git é um sistema de controle de versão, enquanto o GitHub é uma plataforma de hospedagem de código baseada em Git."
    },
    {
        statement: "CSS é responsável pelo estilo e apresentação das páginas web?",
        correct: true,
        explanation: "Exatamente! Cascading Style Sheets define cores, fontes e layouts no desenvolvimento web."
    },
    {
        statement: "O protocolo HTTPS não oferece criptografia de dados?",
        correct: false,
        explanation: "Incorreto. O 'S' em HTTPS indica Segurança, oferecida por meio do protocolo TLS/SSL."
    },
    {
        statement: "Algoritmos são sequências finitas de instruções para resolver um problema?",
        correct: true,
        explanation: "Perfeito! Essa é a definição clássica de um algoritmo."
    }
];

/* ==========================================================================
   3. NAVEGAÇÃO E TROCA DE TEMA
   ========================================================================== */

// Função para mudar a tela visível
function navigateTo(screenId) {
    document.querySelectorAll('.screen').forEach(screen => screen.classList.remove('active'));
    document.getElementById(screenId).classList.add('active');
    if (screenId === 'screen-ranking') renderRanking();
}

// Botão de troca de tema (Claro / Escuro)
const themeToggleBtn = document.getElementById('themeToggleBtn');
themeToggleBtn.addEventListener('click', () => {
    const currentTheme = document.documentElement.getAttribute('data-theme');
    const newTheme = currentTheme === 'light' ? 'dark' : 'light';
    document.documentElement.setAttribute('data-theme', newTheme);
});

/* ==========================================================================
   4. LOGICA DO JOGO E EVENTOS
   ========================================================================== */

// Submissão do Formulário de Registro
document.getElementById('form-register').addEventListener('submit', function(e) {
    e.preventDefault();
    currentUser.name = document.getElementById('username').value;
    currentUser.email = document.getElementById('email').value;
    navigateTo('screen-rules');
});

// Iniciar a partida
function startGame() {
    currentQuestionIndex = 0;
    score = 0;
    correctAnswersCount = 0;
    incorrectAnswersCount = 0;
    renderDots();
    loadQuestion();
    navigateTo('screen-quiz');
}

function exitGame() {
    const dialog = document.getElementById('exit-confirm-dialog');
    if (dialog.open) return;
    dialog.showModal();
    document.getElementById('stay-in-game').focus();
}

function closeExitDialog() {
    document.getElementById('exit-confirm-dialog').close();
}

function confirmExitGame() {
    closeExitDialog();
    currentQuestionIndex = 0;
    score = 0;
    correctAnswersCount = 0;
    incorrectAnswersCount = 0;
    navigateTo('screen-rules');
}

// Criar indicadores (bolinhas) da barra de progresso
function renderDots() {
    const container = document.getElementById('dots-container');
    container.innerHTML = '';
    for (let i = 0; i < questions.length; i++) {
        const dot = document.createElement('div');
        dot.className = 'dot' + (i <= currentQuestionIndex ? ' active' : '');
        container.appendChild(dot);
    }
}

// Carregar pergunta na tela
function loadQuestion() {
    const q = questions[currentQuestionIndex];
    document.getElementById('quiz-question-number').innerText = `Pergunta ${currentQuestionIndex + 1} de ${questions.length}`;
    document.getElementById('quiz-score-badge').innerText = `Pontuação atual: ${score} pontos`;
    document.getElementById('question-text').innerText = q.statement;
    
    // Oculta o painel de feedback e reexibe os botões Certo/Errado
    document.getElementById('feedback-container').style.display = 'none';
    document.getElementById('quiz-options').style.display = 'flex';
    renderDots();
}

// Resposta do Usuário (Verdadeiro/Falso)
function answerQuestion(userChoice) {
    const q = questions[currentQuestionIndex];
    const isCorrect = (userChoice === q.correct);

    if (isCorrect) {
        score += 10;
        correctAnswersCount++;
    } else {
        incorrectAnswersCount++;
    }

    // Atualização do quadro de explicação
    const feedbackBox = document.getElementById('feedback-box');
    const feedbackTitle = document.getElementById('feedback-title');
    const feedbackDesc = document.getElementById('feedback-desc');

    if (isCorrect) {
        feedbackBox.className = 'feedback-box correct';
        feedbackTitle.className = 'feedback-title correct';
        feedbackTitle.innerText = 'RESPOSTA CORRETA';
    } else {
        feedbackBox.className = 'feedback-box';
        feedbackTitle.className = 'feedback-title incorrect';
        feedbackTitle.innerText = 'RESPOSTA INCORRETA';
    }

    feedbackDesc.innerText = q.explanation;

    // Ocultar botões e exibir o feedback
    document.getElementById('quiz-options').style.display = 'none';
    document.getElementById('feedback-container').style.display = 'block';
    document.getElementById('quiz-score-badge').innerText = `Pontuação atual: ${score} pontos`;
}

// Avançar Pergunta
function nextQuestion() {
    currentQuestionIndex++;
    if (currentQuestionIndex < questions.length) {
        loadQuestion();
    } else {
        showGameOver();
    }
}

// Exibir Tela de Fim de Jogo
function showGameOver() {
    document.getElementById('final-score').innerText = `${score} pontos.`;
    document.getElementById('final-correct').innerText = `${correctAnswersCount} perguntas`;
    document.getElementById('final-incorrect').innerText = `${incorrectAnswersCount} perguntas`;
    salvarPontuacao();
    navigateTo('screen-gameover');
}

function carregarRanking() {
    try {
        const rankingSalvo = JSON.parse(localStorage.getItem(rankingStorageKey) || '[]');
        if (Array.isArray(rankingSalvo)) {
            rankingEmMemoria = rankingSalvo.filter(jogador =>
                typeof jogador.name === 'string' && Number.isFinite(jogador.score)
            );
        }
    } catch {
        return rankingEmMemoria;
    }

    return rankingEmMemoria;
}

function salvarPontuacao() {
    const nome = currentUser.name.trim();
    if (!nome) return;

    const ranking = carregarRanking();
    const nomeNormalizado = nome.toLocaleLowerCase();
    const jogadorExistente = ranking.find(jogador =>
        jogador.name.trim().toLocaleLowerCase() === nomeNormalizado
    );

    if (jogadorExistente) {
        jogadorExistente.name = nome;
        jogadorExistente.score = score;
    } else {
        ranking.push({ name: nome, score });
    }

    rankingEmMemoria = ranking.sort((a, b) => b.score - a.score);
    try {
        localStorage.setItem(rankingStorageKey, JSON.stringify(rankingEmMemoria));
    } catch {
        // Mantém o ranking disponível durante a sessão quando o armazenamento não puder ser acessado.
    }
}

function renderRanking() {
    const container = document.getElementById('ranking-list');
    const ranking = carregarRanking().sort((a, b) => b.score - a.score).slice(0, 10);
    container.replaceChildren();

    if (ranking.length === 0) {
        const vazio = document.createElement('div');
        vazio.className = 'stats-item';
        vazio.textContent = 'Nenhuma pontuação registrada.';
        container.appendChild(vazio);
        return;
    }

    ranking.forEach((jogador, index) => {
        const item = document.createElement('div');
        item.className = 'stats-item';

        const nome = document.createElement('span');
        nome.textContent = `${index + 1}. ${jogador.name}`;

        const pontos = document.createElement('strong');
        pontos.textContent = `${jogador.score} pontos.`;

        item.append(nome, pontos);
        container.appendChild(item);
    });
}

// Alternar entre tela "Sobre" e "Referências"
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
        <strong>Jogo Desenvolvido por Gustavo Sacomani Rafael, Vanessa Batista de Freitas, João, Henrique Granso</strong>`;
        btn.innerText = 'Referências';
    }
}

// Configuração do botão de música
document.addEventListener("DOMContentLoaded", () => {
    const musica = document.getElementById('musica-site');
    const btnMusica = document.getElementById('btn-musica');
    const volumeControl = document.getElementById('volume-control');
    let volumeBase = Number(volumeControl?.value ?? musica?.volume ?? 0);
    const duracaoFade = 1.5;
    let quadroFade = null;

    const atualizarBotaoMusica = () => {
        const acao = musica.paused ? 'Tocar' : 'Pausar';
        btnMusica.classList.toggle('is-playing', !musica.paused);
        const semVolume = volumeBase === 0;
        btnMusica.classList.toggle('is-muted', semVolume);
        btnMusica.setAttribute('aria-label', `${semVolume ? 'Sem volume. ' : ''}${acao} música`);
        btnMusica.title = semVolume ? 'Sem volume' : `${acao} música`;
    };

    const obterGanhoFade = () => {
        if (!Number.isFinite(musica.duration) || musica.duration <= duracaoFade * 2) return 1;

        const ganhoEntrada = Math.min(1, musica.currentTime / duracaoFade);
        const tempoRestante = musica.duration - musica.currentTime;
        const ganhoSaida = Math.min(1, Math.max(0, tempoRestante / duracaoFade));
        return Math.min(ganhoEntrada, ganhoSaida);
    };

    const atualizarVolumeMusica = () => {
        musica.volume = volumeBase * obterGanhoFade();
    };

    const animarFade = () => {
        if (musica.paused) {
            quadroFade = null;
            return;
        }

        atualizarVolumeMusica();
        quadroFade = requestAnimationFrame(animarFade);
    };

    // Configuração inicial de volume
    if (musica && volumeControl) {
        volumeBase = Number(volumeControl.value);
        musica.volume = volumeBase;
    }

    // Controle de Play / Pause
    if (btnMusica && musica) {
        atualizarBotaoMusica();
        musica.addEventListener('play', () => {
            atualizarBotaoMusica();
            if (quadroFade === null) quadroFade = requestAnimationFrame(animarFade);
        });
        musica.addEventListener('pause', () => {
            if (quadroFade !== null) cancelAnimationFrame(quadroFade);
            quadroFade = null;
            atualizarBotaoMusica();
        });

        btnMusica.addEventListener('click', (e) => {
            e.stopPropagation();

            if (musica.paused) {
                atualizarVolumeMusica();
                musica.play().then(() => {
                    atualizarBotaoMusica();
                }).catch(error => {
                    console.error("Erro ao tocar a música:", error);
                    btnMusica.title = 'Não foi possível carregar o áudio. Verifique audios/sua-musica.mp3.';
                });
            } else {
                musica.pause();
                atualizarBotaoMusica();
            }
        });
    }

    // Controle de Volume
    if (volumeControl && musica) {
        volumeControl.addEventListener('input', (e) => {
            volumeBase = Number(e.target.value);
            atualizarVolumeMusica();
            if (btnMusica) atualizarBotaoMusica();
        });
    }
});