# Passos 1 a 3 — Contexto, minimundo e requisitos

Marco M1. Copiem para `entregas/01-contexto.md`.

## 1. Introdução e contexto

O Bug or Fact é uma aplicação web interativa de quiz verdadeiro ou falso (jogo de perguntas respostas) voltada para a área de Tecnologia da Informação. O projeto foi desenvolvido no âmbito universitário como Projeto Integrador da Graduação em Análise e Desenvolvimento 
de Sistemas e Ciência da Computação (ano de 2026), integrando conceitos práticos de HTML, CSS e Java Script e simulação/integração com manipulação de dados. O nosso tema será sobre Machine Learning, o nível do jogo é intermediário, para aqueles que são entendidos no assunto 
ou acadêmicos iniciantes, como bibliografia utilizamos de diversas fontes para deixarmos nosso projeto rico em informações.

## Escopo
## O banco faz

- Armazena os 3 conceitos fundamentais de Machine Learning abordados no quiz (Conceito, Funcionalidades e Fundo Histórico).   
- Armazena as 30 perguntas cadastradas disponíveis para as jogadas.
- Contém apenas os dois valores booleanos permitidos para o jogo: True (Verdadeiro) e False (Falso).
- Registra o vínculo do ID da pergunta com a sua respetiva data de criação (id_pergunta, data_criacao).
- Associa a referência da questão a uma explicação abrangente sobre o tema, servindo para o feedback educativo ao jogador.   

## O banco não faz

- Senhas e Dados de Autenticação
- Tabelas de Gestão Administrativa
- Registo de Múltiplas Escolhas
- Sistema de vidas

## Fluxo de Jogo:
- 10 Perguntas.
- Pontuação dinâmica (10 pontos por resposta correta).
- Exibição de feedback e explicação detalhada após cada resposta.
- Indicador visual de progresso (barras/bolinhas ativas por pergunta).

## Telas do Sistema:
- Tela de Cadastro / Login.
- Tela de Regras e instruções gerais.
- Tela do Quiz (Perguntas/Respostas e Feedback).
- Tela de Fim de Jogo (Resumo de estatísticas do jogador(a)).
- Tela de Ranking (Classificação comparativa de pontuações).
- Tela "Sobre" e "Referências" (Informações do projeto integrador e autores).

## Personalização de Interface:
- ○ Suporte a temas visuais claro (Light) e escuro (Dark) alternáveis via botão 
- Design responsivo com card centralizado.

## Fora do Escopo
- Autenticação via senha ou provedores externos (OAuth).
- Edição, adição ou remoção de perguntas por painel administrativo (conteúdo estático no código).
- Persistência real em banco de dados backend remoto (atualmente gerenciado via estado em memória no cliente).

## Escopo Limitações
- Não há número de vidas delimitados.
- O jogo não possui mais que duas alternativas, pois foi criado no estilo booleano.
- O quiz não é acessível para aqueles que não possuem nenhum conhecimento em tecnologia.

## Usuários. Quem usa o sistema e o que cada um faz com os dados.

Estudantes de Tecnologia: Usuários que desejam testar e reforçar seus conhecimentos fundamentais sobre linguagens de programação, protocolos web e conceitos gerais de computação.
Curiosos e Leitores Assíduos: Usuários em busca de uma experiência gamificada e simples com pontuações e rankings.

| Usuário | O que faz |
| Jogador | Informa o seu nome e e-mail para se identificar, responde às perguntas de verdadeiro ou falso, acompanha o indicador de progresso, recebe a pontuação (10 pontos por acerto) e visualiza a sua posição no ranking geral.
| Quem cadastra perguntas | Regista e organiza o acervo de questões no banco de dados, definindo a categoria (Conceito, Funcionalidades, História), o enunciado, as alternativas (TRUE/FALSE), a indicação de qual é a correta, a data/status de publicação e as fontes bibliográficas (título e URL).

## 2. Minimundo

Preciso criar um sistema web que é um quiz sobre Machine Learning. O objetivo principal é permitir que o participante se cadastre com nome e e-mail para responder a um questionário de 10 perguntas. Cada pergunta deve pertencer a uma categoria. Além disso, as perguntas e alternativas devem estar cadastradas no idioma Português-Brasil e cada questão precisa ter somente duas opções(CErto ou Errado), com a indicação exata de qual delas é a correta e uma curiosidade.

Durante a partida, o sistema deve registrar a pontuação do jogador — somando 10 pontos por acerto —, controlar o progresso exibindo visualmente em qual pergunta ele está e apresentar o feedback explicativo após cada escolha. Ao final do jogo, a pontuação obtida e o total de resposta corretas e o total de perguntas devem ser salvos para alimentar o ranking geral comparativo. O sistema também precisa permitir a alternância de temas visuais (claro e escuro) e exibir telas informativas com as regras do jogo, informações sobre os autores e as referências utilizadas no projeto.

## 3. Requisitos e regras de negócio

## Requisitos Funcionais (RF)
RF01 | Cadastro de Jogador: O sistema deve solicitar o Nome e E-mail do usuário antes do início do jogo.
RF02 | Cálculo de Pontuação: O sistema deve somar 10 pontos para cada resposta correta e contatar o total de acertos e erros.
RF03 | Feedback: Após responder uma questão, o sistema deve bloquear os botões de resposta, mostrar se o usuário acertou ou errou, e fornecer uma explicação sobre o assunto antes de permitir o avanço para a próxima pergunta.
RF04 | Barra de Progresso: O sistema deve exibir visualmente a contagem e a posição da pergunta atual através de marcadores/bolinhas de progresso.
RF05 | Estatísticas: Ao término das 10 perguntas, o sistema deve apresentar a pontuação final e o quantitativo de perguntas corretas e incorretas.
RF06 | Ranking: O sistema deve permitir a visualização da tabela de pontuação com os melhores desempenhos dos jogadores.
RF07 | Alternância de Temas: O sistema deve permitir ao usuário alternar a interface entre o modo claro (Light) e escuro (Dark).

## Requisitos Negócios (RN)
RF01 | Apresentação das Regras: O sistema deve exibir as instruções do jogo, informando que a temática é Tecnologia e cada acerto vale 10 pontos.
RF02 | Apresentação das Perguntas: O sistema deve exibir sequencialmente 10 perguntas no formato "Certo" (Verdadeiro) ou "Errado" (Falso).
RF03  | Seção Sobre: O sistema deve disponibilizar uma tela com dados dos desenvolvedores do projeto integrador e alternar a exibição de referências.

## Requisitos Não-Funcionais (RNF)
RNF01 | Usabilidade e Interface: A interface deve ser amigável, estilizada com a fonte Instrument Sans e palette de cores customizada com variáveis CSS.
RNF02 | Compatibilidade e Padrões Web: Aplicação desenvolvida utilizando padrões semânticos de HTML5, estilização moderna com CSS3 e manipulação do DOM nativa via JavaScript (ES6+).
RNF03 | Desempenho e Execução Local: A aplicação e os motores de JS devem executar nativamente no navegador client-side sem dependências complexas de bibliotecas externas.