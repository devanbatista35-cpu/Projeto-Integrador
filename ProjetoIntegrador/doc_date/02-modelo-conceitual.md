# Passo 4 — Modelo conceitual

Marco M1. A entrega deste passo é o modelo conceitual: o desenho em `entregas/02-conceitual.pdf` (ou `.png`) e as tabelas abaixo.

É um DER na notação de Chen, no brModelo ou no Visual Paradigm Online. Entidades, atributos, relacionamentos e cardinalidades. Ainda não aparecem tabela, chave estrangeira nem tipo de coluna: isso é o modelo lógico, no passo 5.

## Entidades

| Entidade       |                Atributos                |        Identificador      |
| Categoria      | id, id_numeracao, nome                  |            id             |
| Pergunta       | id,pergunta,enunciado                   |            id             |
| Alternativa    | id, texto_alternativo, eh_correta       |            id             |
| Publicacao     | id, data_publicacao, status_publicacao  |            id             |
| Bibliografia   | id, titulo_fonte, link_url              |            id             |
| Jogador        | id, nome_jogador, email_jogador         | id(email_jogador é unico) |
| Classificacao  | id, pontuacao, data_jogo                |            id             |


## Relacionamentos

Uma frase por linha, ligada a um requisito. Cardinalidade dos dois lados, mínimo e máximo.

|         Relacionamento             |           Cardinalidade               |                                              Justificativa                                                                   |       Requisito     |
| Categoria possui Pergunta          | Categoria (0,N) - Pergunta (1,1)      | Uma categoria tem varias perguntas, ou nenhuma ainda. E cada pergunta pertence a exatamente uma categoria                    |          RD__       |
| Pergunta tem Alternativa           | Pergunta  (1,N) - Alernativa (1,1)    | Toda pergunta precisa de ao menos uma altenativa. Cada alternativa pertence a uma unica pergunta                             |          RD__       |
| Pergunta é publicada em Publicação | Pergunta  (0,N) - Publicação (1,1)    | Uma pergunta pode nunca ter sido publicada ou ter varias publicações.Cada publicação refere-se a uma unica pergunta          |          RD__       |
| Pergunta referencia Biblioteca     | Pergunta  (0,N) - Biblioteca (1,1)    | Uma pergunta pode citar varias fontes,ou nenhuma. Cada fonte registrada pertence somente a auma pergunta                     |          RD__       |
| Jogador obtem Classificação        | Jogador   (0,N) - Classificação (1,1) | Um jogador pode ter várias pontuações( uma por partida), ou nenhuma se ainda não jogou. Cada pontuação é de um unico jogador |          RD__       |


O diagrama e esta tabela descrevem o mesmo modelo. Toda entidade do desenho está na tabela.



![alt text](<Captura de tela 2026-10-08 092600.png>)
