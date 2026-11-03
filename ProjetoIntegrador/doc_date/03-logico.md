# Passos 5 e 6 — Modelo lógico, normalização e dicionário

Marco M2. A entrega do passo 5 é o modelo lógico: o desenho em `entregas/03-logico.pdf` (ou `.png`) e este texto em `entregas/03-logico.md`.

O desenho parte do modelo conceitual e mostra tabelas, colunas, chave primária e chaves estrangeiras. Não é outro DER. Pode ser feito no brModelo (modelo lógico) ou no Visual Paradigm Online. Se a normalização achar violação, corrijam o desenho e o texto.

## 5. Modelo lógico

| Relacionamento no DER | Cardinalidade | Vira | Onde fica a FK ou a tabela associativa |
| --- | --- | --- | --- |
| Categoria — possui — Pergunta | 1:N | FK no lado N | `Perguntas` (`id_categoria` ref `Categorias.id_numeracao`) |
| Pergunta — tem — Alternativa | 1:N | FK no lado N | `Alternativas` (`id_pergunta` ref `Perguntas.codigo_perguntas`) |
| Pergunta — publicada — Publicação | 1:N | FK no lado N | `Publicacoes` (`id_pergunta` ref `Perguntas.codigo_perguntas`) |
| Pergunta — referencia — Bibliografia | 1:N | FK no lado N | `Bibliografias` (`id_pergunta` ref `Perguntas.codigo_perguntas`) |
| Pergunta — gerado_por — Classificação | 1:N | FK no lado N | `Classificacao` (`id_pergunta` ref `Perguntas.codigo_perguntas`) |
| Jogador — obtém — Classificação | 1:1 | PK/FK no lado dependente | `Classificacao` (`id_codigo_jogadorfk` ref `Jogador.codigo_jogador`) |

N:N vira tabela associativa. 1:N vira chave estrangeira no lado N. 1:1 compartilha a PK como FK no lado dependente.

### Normalização

Dependências no formato `determinante → dependente`, com o requisito que sustenta.

| ID | Dependência | Requisito |
| --- | --- | --- |
| DF1 | `codigo_categorias → id_numeracao, nome` | Identificador único da categoria determina seu número identificador e seu nome |
| DF2 | `id_numeracao → codigo_categorias, nome` | O número único da categoria determina a categoria e seu nome |
| DF3 | `codigo_perguntas → id_categoria, pergunta, enunciado` | Identificador único da pergunta determina a categoria relacionada, o número sequencial da pergunta e seu enunciado |
| DF4 | `codigo_alternativas → id_pergunta, texto_alternativa, eh_correta` | Identificador da alternativa determina a pergunta à qual pertence, o texto ('TRUE'/'FALSE') e a indicação se é correta |
| DF5 | `codigo_publicacoes → id_pergunta, data_publicacao, status_publicacao` | Identificador da publicação determina a pergunta publicada, a data de publicação e o status ('Ativo'/'Inativo') |
| DF6 | `codigo_bibliografias → id_pergunta, titulo_fonte, link_url` | Identificador da bibliografia determina a pergunta fundamentada, o título da fonte e o link de referência |
| DF7 | `codigo_jogador → nome, email, data_cadastro` | Identificador único do jogador determina seu nome, e-mail único e data de cadastro |
| DF8 | `id_codigo_jogadorfk → id_pergunta, pontuacao, data_atualizacao` | Identificador da classificação (mesmo id do jogador) determina a pergunta opcional vinculada, pontuação acumulada e data de atualização |

| Forma | Por que o esquema atende | Tabela em que isso aparece |
| --- | --- | --- |
| 1FN | Todos os atributos contêm apenas valores atômicos e indivisíveis. Não existem colunas repetidas nem grupos multivalorados. | Todas as tabelas (`Categorias`, `Perguntas`, `Alternativas`, `Publicacoes`, `Bibliografias`, `Jogador`, `Classificacao`) |
| 2FN | O esquema está na 1FN e todas as tabelas possuem chaves primárias simples (`SERIAL PRIMARY KEY` ou PK 1:1 simples). Portanto, não existem dependências parciais de chaves compostas. | Todas as tabelas |
| 3FN | O esquema está na 2FN e todos os atributos não-chave dependem de forma direta e exclusiva das respectivas chaves primárias/candidatas, sem dependências transitivas. | Todas as tabelas |

## 6. Dicionário de dados

### Tabela: Categorias

| Coluna | Tipo e tamanho | Nulo | Restrição | Descrição |
| --- | --- | --- | --- | --- |
| codigo_categorias | SERIAL | NOT NULL | PK | Código de auto-incremento identificador único da categoria |
| id_numeracao | INT | NOT NULL | UNIQUE | Identificador numérico único da categoria (usado em FKs) |
| nome | VARCHAR(30) | NOT NULL | - | Nome descritivo da categoria do quiz |

### Tabela: Perguntas

| Coluna | Tipo e tamanho | Nulo | Restrição | Descrição |
| --- | --- | --- | --- | --- |
| codigo_perguntas | SERIAL | NOT NULL | PK | Código de auto-incremento identificador único da pergunta |
| id_categoria | INT | NOT NULL | FK → Categorias.id_numeracao (ON DELETE CASCADE) | Chave estrangeira que referencia o número da categoria |
| pergunta | INT | NOT NULL | - | Número sequencial da pergunta dentro do sistema |
| enunciado | TEXT | NOT NULL | - | Texto completo com o enunciado da pergunta do quiz |

### Tabela: Alternativas

| Coluna | Tipo e tamanho | Nulo | Restrição | Descrição |
| --- | --- | --- | --- | --- |
| codigo_alternativas | SERIAL | NOT NULL | PK | Código de auto-incremento identificador único da alternativa |
| id_pergunta | INT | NOT NULL | FK → Perguntas.codigo_perguntas (ON DELETE CASCADE) | Chave estrangeira referenciando a pergunta associada |
| texto_alternativa | VARCHAR(10) | NULL | CHECK IN ('TRUE', 'FALSE') | Texto da alternativa (restrito aos valores 'TRUE' ou 'FALSE') |
| eh_correta | BOOLEAN | NOT NULL | DEFAULT FALSE | Flag lógica indicando se a alternativa é a resposta correta |

### Tabela: Publicacoes

| Coluna | Tipo e tamanho | Nulo | Restrição | Descrição |
| --- | --- | --- | --- | --- |
| codigo_publicacoes | SERIAL | NOT NULL | PK | Código de auto-incremento identificador único da publicação |
| id_pergunta | INT | NOT NULL | FK → Perguntas.codigo_perguntas (ON DELETE CASCADE) | Chave estrangeira referenciando a pergunta publicada |
| data_publicacao | DATE | NULL | DEFAULT CURRENT_DATE | Data de publicação da pergunta no sistema |
| status_publicacao | VARCHAR(10) | NULL | CHECK IN ('Ativo', 'Inativo') | Status da publicação ('Ativo' ou 'Inativo') |

### Tabela: Bibliografias

| Coluna | Tipo e tamanho | Nulo | Restrição | Descrição |
| --- | --- | --- | --- | --- |
| codigo_bibliografias | SERIAL | NOT NULL | PK | Código de auto-incremento identificador único da bibliografia |
| id_pergunta | INT | NOT NULL | FK → Perguntas.codigo_perguntas (ON DELETE CASCADE) | Chave estrangeira referenciando a pergunta fundamentada |
| titulo_fonte | VARCHAR(100) | NOT NULL | - | Título da fonte ou artigo bibliográfico de referência |
| link_url | TEXT | NULL | - | URL para acesso direto à fonte de referência na web |

### Tabela: Jogador

| Coluna | Tipo e tamanho | Nulo | Restrição | Descrição |
| --- | --- | --- | --- | --- |
| codigo_jogador | SERIAL | NOT NULL | PK | Código de auto-incremento identificador único do jogador |
| nome | VARCHAR(50) | NOT NULL | - | Nome completo do jogador cadastrado |
| email | VARCHAR(100) | NOT NULL | UNIQUE | Endereço de e-mail único para contato e login do jogador |
| data_cadastro | DATE | NULL | DEFAULT CURRENT_DATE | Data em que o jogador realizou o cadastro no sistema |

### Tabela: Classificacao

| Coluna | Tipo e tamanho | Nulo | Restrição | Descrição |
| --- | --- | --- | --- | --- |
| id_codigo_jogadorfk | INT | NOT NULL | PK, FK → Jogador.codigo_jogador (ON DELETE CASCADE ON UPDATE CASCADE) | Chave primária e estrangeira vinculando 1:1 o registro ao jogador |
| id_pergunta | INT | NULL | FK → Perguntas.codigo_perguntas (ON DELETE SET NULL) | Chave estrangeira opcional vinculando à última pergunta respondida |
| pontuacao | INT | NOT NULL | DEFAULT 0, CHECK (pontuacao >= 0) | Pontuação acumulada do jogador no ranking |
| data_atualizacao | TIMESTAMP | NULL | DEFAULT CURRENT_TIMESTAMP | Data e hora da última atualização de pontuação no ranking |

### Imagem Modelo Lógico

![alt text](<mer_logico.png>)
