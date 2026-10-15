# Passos 5 e 6 — Modelo lógico, normalização e dicionário

Marco M2. A entrega do passo 5 é o modelo lógico: o desenho em `entregas/03-logico.pdf` (ou `.png`) e este texto em `entregas/03-logico.md`.

O desenho parte do modelo conceitual e mostra tabelas, colunas, chave primária e chaves estrangeiras. Não é outro DER. Pode ser feito no brModelo (modelo lógico) ou no Visual Paradigm Online. Se a normalização achar violação, corrijam o desenho e o texto.

## 5. Modelo lógico

| Relacionamento no DER | Cardinalidade | Vira | Onde fica a FK ou a tabela associativa |
| --- | --- | --- | --- |
| Categoria — possui — Pergunta | 1:N | FK no lado N | `Pergunta` (`id_categoria`) |
| Pergunta — tem — Alternativa | 1:N | FK no lado N | `Alternativa` (`id_perguntam`) |
| Pergunta — publicada — Publicação | 1:N | FK no lado N | `Publicacao` (`id_perguntam`) |
| Pergunta — referencia — Bibliografia | 1:N | FK no lado N | `Bibliografia` (`id_perguntam`) |
| Pergunta — gerado_por — Classificação | 1:N | FK no lado N | `Classificacao` |
| Jogador — obtém — Classificação | 1:N | FK no lado N | `Classificacao` (`id_codigo_jogadorfk`) |

N:N vira tabela associativa. 1:N vira chave estrangeira no lado N.

### Normalização

Dependências no formato `determinante → dependente`, com o requisito que sustenta.

| ID | Dependência | Requisito |
| --- | --- | --- |
| DF1 | `codigo_categorias → nome` | Identificador único da categoria determina seu nome |
| DF2 | `codigo_perguntas → enunciado, id_categoria` | Identificador único da pergunta determina o enunciado e a categoria |
| DF3 | `codigo_alternativas → id_perguntam, texto_alternativa, eh_correta` | Identificador da alternativa determina a pergunta, texto e correção |
| DF4 | `codigo_publicacoes → id_perguntam, data_publicacao, status_publicacao` | Identificador da publicação determina a pergunta, data e status |
| DF5 | `codigo_bibliografia → id_perguntam, titulo_fonte, link_url` | Identificador da bibliografia determina a pergunta, fonte e link |
| DF6 | `codigo_jogador → nome_jogador, email_jogador` | Identificador do jogador determina seu nome e e-mail |
| DF7 | `codigo_classificacao → pontuacao, data_jogo, id_codigo_jogadorfk` | Identificador da classificação determina pontuação, data e jogador |

| Forma | Por que o esquema atende | Tabela em que isso aparece |
| --- | --- | --- |
| 1FN | Valores atômicos; grupo multivalorado separado | Todas as tabelas |
| 2FN | Sem dependência parcial de chave composta. Se não houver chave composta, digam por quê | Chaves primárias simples em todas as tabelas, sem dependências parciais |
| 3FN | Sem dependência transitiva. O que não é chave e determina outro atributo está em tabela própria | Atributos não-chave dependem exclusivamente da chave primária |

Se alguma forma falhar: o que mudou neste dicionário.

## 6. Dicionário de dados

Repitam o bloco para cada tabela. A descrição diz o que a coluna guarda, em uma linha.

### Tabela: Categoria

| Coluna | Tipo e tamanho | Nulo | Restrição | Descrição |
| --- | --- | --- | --- | --- |
| codigo_categorias | INT | NOT NULL | PK | Código identificador único da categoria |
| nome | VARCHAR(100) | NOT NULL | - | Nome descritivo da categoria do quiz |

### Tabela: Pergunta

| Coluna | Tipo e tamanho | Nulo | Restrição | Descrição |
| --- | --- | --- | --- | --- |
| codigo_perguntas | INT | NOT NULL | PK | Código identificador único da pergunta |
| enunciado | TEXT | NOT NULL | - | Texto principal da pergunta do quiz |
| id_categoria | INT | NOT NULL | FK → Categoria.codigo_categorias | Chave estrangeira referenciando a categoria |

### Tabela: Alternativa

| Coluna | Tipo e tamanho | Nulo | Restrição | Descrição |
| --- | --- | --- | --- | --- |
| codigo_alternativas | INT | NOT NULL | PK | Código identificador único da alternativa |
| id_perguntam | INT | NOT NULL | FK → Pergunta.codigo_perguntas | Chave estrangeira referenciando a pergunta correspondente |
| texto_alternativa | TEXT | NOT NULL | - | Texto descritivo da alternativa de resposta |
| eh_correta | BOOLEAN | NOT NULL | - | Indica se esta alternativa é a correta |

### Tabela: Publicacao

| Coluna | Tipo e tamanho | Nulo | Restrição | Descrição |
| --- | --- | --- | --- | --- |
| codigo_publicacoes | INT | NOT NULL | PK | Código identificador único da publicação |
| id_perguntam | INT | NOT NULL | FK → Pergunta.codigo_perguntas | Chave estrangeira referenciando a pergunta publicada |
| data_publicacao | DATE | NOT NULL | - | Data em que a pergunta foi publicada |
| status_publicacao | VARCHAR(50) | NOT NULL | - | Status atual da publicação |

### Tabela: Bibliografia

| Coluna | Tipo e tamanho | Nulo | Restrição | Descrição |
| --- | --- | --- | --- | --- |
| codigo_bibliografia | INT | NOT NULL | PK | Código identificador único da referência bibliográfica |
| id_perguntam | INT | NOT NULL | FK → Pergunta.codigo_perguntas | Chave estrangeira referenciando a pergunta fundamentada |
| titulo_fonte | VARCHAR(255) | NOT NULL | - | Título da fonte bibliográfica ou artigo de referência |
| link_url | VARCHAR(255) | NULL | - | Link de acesso à fonte de referência |

### Tabela: Jogador

| Coluna | Tipo e tamanho | Nulo | Restrição | Descrição |
| --- | --- | --- | --- | --- |
| codigo_jogador | INT | NOT NULL | PK | Código identificador único do jogador |
| nome_jogador | VARCHAR(100) | NOT NULL | - | Nome completo ou apelido do jogador |
| email_jogador | VARCHAR(100) | NOT NULL | UNIQUE | Endereço de e-mail de contato do jogador |

### Tabela: Classificacao

| Coluna | Tipo e tamanho | Nulo | Restrição | Descrição |
| --- | --- | --- | --- | --- |
| codigo_classificacao | INT | NOT NULL | PK | Código identificador único do registro de classificação |
| pontuacao | INT | NOT NULL | - | Pontuação obtida pelo jogador na partida/quiz |
| data_jogo | TIMESTAMP | NOT NULL | - | Data e hora em que a partida foi realizada |
| id_codigo_jogadorfk | INT | NOT NULL | FK → Jogador.codigo_jogador | Chave estrangeira referenciando o jogador |

### Imagem Modelo Lógico

![alt text](<modeloLogico.jpeg>)
