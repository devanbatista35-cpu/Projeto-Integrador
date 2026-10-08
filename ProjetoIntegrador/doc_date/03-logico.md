

O desenho parte do modelo conceitual e mostra tabelas, colunas, chave primária e chaves estrangeiras. Não é outro DER. Pode ser feito no brModelo (modelo lógico) ou no Visual Paradigm Online.
Se a normalização achar violação, corrijam o desenho e o texto.

## 5. Modelo lógico

| Relacionamento no DER | Cardinalidade | Vira | Onde fica a FK ou a tabela associativa |
| --- | --- | --- | --- |
| Exemplo_Relacao_1 | 1:N | Chave Estrangeira | FK no lado N |
| Exemplo_Relacao_2 | N:N | Tabela Associativa | Criação de tabela intermediária contendo as FKs das entidades originais |
| Exemplo_Relacao_3 | 1:1 | Chave Estrangeira | FK em uma das tabelas (geralmente na entidade dependente) |

N:N vira tabela associativa. 1:N vira chave estrangeira no lado N.

### Normalização

Dependências no formato `determinante -> dependente`, com o requisito que sustenta:

| ID | Dependência | Requisito |
| --- | --- | --- |
| DF1 | ID_Exemplo -> Nome, Email | R01 - Cadastro básico de usuário |
| DF2 | ID_Pedido -> Data, ID_Cliente | R02 - Registro de pedidos de compras |

| Forma | Por que o esquema atende | Tabela em que isso aparece |
| --- | --- | --- |
| 1FN | Valores atômicos; grupos multivalorados e atributos compostos foram separados em tabelas próprias. | Todas as tabelas |
| 2FN | Sem dependência parcial de chave composta. Todos os atributos não-chave dependem totalmente da chave primária. (Caso não haja chave composta, não há como haver dependência parcial). | Todas as tabelas |
| 3FN | Sem dependência transitiva. Atributos não-chave determinam apenas outros atributos não-chave e foram movidos para tabelas próprias. | Todas as tabelas |

Se alguma forma falhar: o que mudou neste dicionário.

## 6. Dicionário de dados

Repitam o bloco para cada tabela. A descrição diz o que a coluna guarda, em uma linha.

### Tabela: EXEMPLO_TABELA

| Coluna | Tipo e tamanho | Nulo | Restrição | Descrição |
| --- | --- | --- | --- | --- |
| id | INT | NOT NULL | PK | Identificador único do registro na tabela. |
| nome | VARCHAR(100) | NOT NULL | - | Guarda o nome completo cadastrado. |
| email | VARCHAR(100) | NOT NULL | UNIQUE | Endereço de e-mail do usuário. |
| status | VARCHAR(20) | NOT NULL | CHECK (status IN ('Ativo', 'Inativo')) | Indica se o registro está ativo ou inativo. |
| data_criacao | TIMESTAMP | NOT NULL | DEFAULT CURRENT_TIMESTAMP | Data e hora de criação do registro. |
| id_origem | INT | NULL | FK -> tabela_origem.id | Identificador da tabela de origem relacionada. |

### Tabela: TABELA_ASSOCIATIVA_EXEMPLO

| Coluna | Tipo e tamanho | Nulo | Restrição | Descrição |
| --- | --- | --- | --- | --- |
| id_item_a | INT | NOT NULL | PK / FK -> tabela_a.id | Parte da chave composta; referência à Tabela A. |
| id_item_b | INT | NOT NULL | PK / FK -> tabela_b.id | Parte da chave composta; referência à Tabela B. |
| quantidade | INT | NOT NULL | DEFAULT 1 | Quantidade de itens associados na relação. |

### imagem modelo ligico

![alt text](<modelo_logico_quiz.png>)
