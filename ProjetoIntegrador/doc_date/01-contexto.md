# Passos 1 a 3 — Contexto, minimundo e requisitos

## 1. Introdução e contexto

O Bug or Fact é uma aplicação web interativa de quiz verdadeiro ou falso (jogo de perguntas respostas) voltada para a área de Tecnologia da Informação. O projeto foi desenvolvido no âmbito universitário como Projeto Integrador da Graduação em Análise e Desenvolvimento de Sistemas e Ciência da Computação (ano de 2026), integrando conceitos práticos de HTML, CSS e Java Script e simulação/integração com manipulação de dados. O nosso tema será sobre Machine Learning, o nível do jogo é intermediário, para aqueles que são entendidos no assunto ou acadêmicos iniciantes, como bibliografia utilizamos de diversas fontes para deixarmos nosso projeto rico em informações.

## Escopo 

| O banco faz | O banco não faz |
| --- | --- |
| Armazena os 3 conceitos fundamentais de Machine Learning abordados no quiz (Conceito, Funcionalidades e Fundo Histórico). | Senhas e Dados de Autenticação |
| Armazena as 30 perguntas cadastradas disponíveis para as jogadas. | Tabelas de Gestão Administrativa |
| Contém apenas os dois valores booleanos permitidos para o jogo: True (Verdadeiro) e False (Falso). | Registo de Múltiplas Escolhas |
| Registra o vínculo do ID da pergunta com a sua respetiva data de criação | Sistema de vidas |
| | |

Usuários. Quem usa o sistema e o que cada um faz com os dados. Não criem tabela de usuário se nenhum requisito pedir cadastro, senha ou sessão.

| Usuário | O que faz |
| --- | --- |
| Jogador | Informa o seu nome e e-mail para se identificar, responde às perguntas de verdadeiro ou falso, acompanha o indicador de progresso, recebe a pontuação (10 pontos por acerto) e visualiza a sua posição no ranking geral. |
| Desenvolvedor | Cadastra e altera as perguntas diretamente no banco (por script). |
| | |

## 2. Minimundo

Preciso criar um sistema web que é um quiz sobre Machine Learning. O objetivo principal é permitir que o participante se cadastre com nome e e-mail para responder a um questionário de 10 perguntas. Cada pergunta deve pertencer a uma categoria. Além disso, as perguntas e alternativas devem estar cadastradas no idioma Português-Brasil e cada questão precisa ter somente duas opções(CErto ou Errado), com a indicação exata de qual delas é a correta e uma curiosidade.

Durante a partida, o sistema deve registrar a pontuação do jogador — somando 10 pontos por acerto —, controlar o progresso exibindo visualmente em qual pergunta ele está e apresentar o feedback explicativo após cada escolha. Ao final do jogo, a pontuação obtida e o total de resposta corretas e o total de perguntas devem ser salvos para alimentar o ranking geral comparativo. O sistema também precisa permitir a alternância de temas visuais (claro e escuro) e exibir telas informativas com as regras do jogo, informações sobre os autores e as referências utilizadas no projeto.

> 

## 3. Requisitos e regras de negócio

| Código | Texto do requisito | Tipo |
| --- | --- | --- |
| RF02 | Executar um partida: o sistema de dar a opção de iniciar o jogo. | funcional |
| RF03 | Escolher uma alternativa: o usuario deve escolher uma alternativa, para que a outra seja libera e respondida | funcional |
| RF04 | Sair do  jogo: ao fim da partida, sair do jogo | funcional |

| RN01 | Cadastro de Jogador: o sistema deve solicitar o Nome e o E-mail do usuário antes do início do jogo. | regra de negocio |
| RN02 | Apresentação das Regras: o sistema deve exibir as instruções do jogo, informando que a temática é Tecnologia e que cada acerto vale 10 pontos. | regra de negócio |
| RN03 | Apresentação das Perguntas: o sistema deve exibir sequencialmente 10 perguntas no formato "Certo" (Verdadeiro) ou "Errado" (Falso). | regra de negócio |
| RN04 | Seção Sobre: o sistema deve disponibilizar uma tela com dados dos desenvolvedores do projeto integrador e alternar a exibição de referências. | regra de negócio |
| RN05 | Cálculo de Pontuação: o sistema deve somar 10 pontos para cada resposta correta e contar o total de acertos e erros. | regra de negocio |
| RN06 | Barra de Progresso: o sistema deve exibir visualmente a contagem e a posição da pergunta atual através de marcadores/bolinhas de progresso. | regra de negocio |
| RN07 | Feedback: após responder uma questão, o sistema deve bloquear os botões de resposta, mostrar se o usuário acertou ou errou e fornecer uma explicação sobre o assunto antes de permitir o avanço para a próxima pergunta. | regra de negocio |
| RN08 | Estatísticas: ao término das 10 perguntas, o sistema deve apresentar a pontuação final e o quantitativo de perguntas corretas e incorretas. | regra de negocio |
| RN09 | Ranking: o sistema deve permitir a visualização da tabela de pontuação com os melhores desempenhos dos jogadores. | regra de negocio |

| RNF01 | Usabilidade e Interface: a interface deve ser amigável, estilizada com a fonte Instrument Sans e paleta de cores customizada com variáveis CSS. | não funcional |
| RNF02 | Compatibilidade e Padrões Web: aplicação desenvolvida com padrões semânticos de HTML5, estilização moderna com CSS3 e manipulação do DOM nativa via JavaScript (ES6+). | não funcional |
| RNF03 | Desempenho e Execução Local: a aplicação e os motores de JS devem executar nativamente no navegador (client-side), sem dependências complexas de bibliotecas externas. | não funcional |
| RNF04 | Alternância de Temas: o sistema deve permitir ao usuário alternar a interface entre o modo claro (Light) e escuro (Dark). | não funcional |
