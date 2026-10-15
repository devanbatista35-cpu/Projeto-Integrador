# Passo 4 — Modelo conceitual

É um DER na notação de Chen, no brModelo ou no Visual Paradigm Online. Entidades, atributos, relacionamentos e cardinalidades. Ainda não aparecem tabela, chave estrangeira nem tipo de coluna: isso é o modelo lógico, no passo 5.

## Entidades

| Entidade | Atributos | Identificador |
| --- | --- | --- |
| Categoria | codigo_categorias, id_numeracao, nome | codigo_categorias |
| Pergunta | codigo_perguntas, id_Categoria, enunciado | codigo_perguntas |
| Alternativa | codigo_alternativas, id_pergunta, texto_alternativo, eh_correta | codigo_alternativa |
| Publicacao | codigo_publicacoes, id_pergunta, data_publicacao, status_publicacao | codigo_publicacoes |
| Bibliografia | codigo_bibliografia, id_pergunta, titulo_fonte, link_url | codigo_bibliografia |
| Jogador | codigo_jogador, nome, email_jogador | codigo_jogador |
| Classificacao | codigo_classficacao, id_codigo_jogadorfk, pontuacao, data_jogo | codigo_classificacao |

## Relacionamentos

Uma frase por linha, ligada a um requisito. Cardinalidade dos dois lados, mínimo e máximo.

| Relacionamento | Cardinalidade | Justificativa | Requisito |
| --- | --- | --- | --- |
| Categoria possui Pergunta | Categoria (0,N) - Pergunta (1,1) | Uma categoria tem varias perguntas, ou nenhuma ainda. E cada pergunta pertence a exatamente uma categoria | RD__ |
| Pergunta tem Alternativa | Pergunta (1,N) - Alternativa (1,1) | Toda pergunta precisa de ao menos uma alternativa. Cada alternativa pertence a uma unica pergunta | RD__ |
| Pergunta é publicada em Publicação | Pergunta (0,N) - Publicação (1,1) | Uma pergunta pode nunca ter sido publicada ou ter varias publicações. Cada publicação refere-se a uma unica pergunta | RD__ |
| Pergunta referencia Biblioteca | Pergunta (0,N) - Biblioteca (1,1) | Uma pergunta pode citar varias fontes, ou nenhuma. Cada fonte registrada pertence somente a auma pergunta | RD__ |
| Classificação é gerada por Pergunta | Pergunta (1,N) - Classificação (1,n) | A cada pergunta o jogador acumula ou não os pontos. Cada pontuação é de um unico jogador | RD__ |
| Jogador obtem Classificação | Jogador (0,N) - Classificação (1,1) | Um jogador pode ter várias pontuações( uma por partida), ou nenhuma se ainda não jogou. Cada pontuação é de um unico jogador | RD__ |

## Imagem


![alt text](<modeloConceitual.jpeg>)
