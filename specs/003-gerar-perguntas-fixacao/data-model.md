# Data Model: Geração de Perguntas de Fixação

**Feature**: Geração de Perguntas de Fixação | **Date**: 2026-07-16

---

## Entidades e Estruturas de Dados

Esta funcionalidade opera estritamente na memória de execução da sessão no navegador (client-side), sem persistência em banco de dados ou armazenamento local.

### 1. Pergunta (Entidade Unitária)

Representa uma pergunta de múltipla escolha gerada para avaliar a explicação de um tópico.

```json
{
  "enunciado": "Qual é a principal função do modelo de concorrência baseado em Event Loop no JavaScript?",
  "alternativas": [
    "Executar operações de CPU pesadas de forma paralela e síncrona.",
    "Gerenciar a fila de mensagens e callbacks de forma assíncrona e single-thread.",
    "Criar múltiplas threads do sistema operacional para cada requisição HTTP.",
    "Interromper a execução de código do usuário para priorizar chamadas de rede."
  ],
  "correta": 1
}
```

#### Atributos e Regras de Negócio:
* **`enunciado`** (String): Texto curto e claro contendo a pergunta. Deve cobrir obrigatoriamente os conceitos explicados no respectivo tópico.
* **`alternativas`** (Array de Strings): Lista contendo exatamente 4 alternativas.
* **`correta`** (Integer): Índice numérico (de `0` a `3`) correspondente à alternativa correta no array `alternativas`.

---

### 2. Bloco de Perguntas (Coleção do Tópico)

Representa a lista de perguntas associadas a um tópico específico do cronograma.

```json
{
  "id_topico": "exp-s0-t0",
  "perguntas": [
    { ... }, // Pergunta 1
    { ... }, // Pergunta 2
    { ... }  // Pergunta 3
  ]
}
```

#### Atributos:
* **`id_topico`** (String): ID correspondente ao container do tópico no DOM (utilizado para posicionar as perguntas logo abaixo de sua respectiva explicação).
* **`perguntas`** (Array de Objetos Pergunta): Contém exatamente 3 perguntas de múltipla escolha.

---

## Máquina de Estados da Pergunta na UI

Cada pergunta renderizada passa pelos seguintes estados de interação:

```text
[Não Respondida] ──(Clique numa alternativa)──> [Respondida]
```

### 1. Estado: Não Respondida (Default)
* **Comportamento**: 
  * Os 4 botões de alternativa estão habilitados (`disabled = false`).
  * Estilo CSS padrão de botões neutros (cor escura sobre fundo claro/cinza).
  * Sem ícones ou mensagens auxiliares de acerto/erro.
  * Foco de teclado disponível para navegação.

### 2. Estado: Respondida (Sucesso - Selecionou a Correta)
* **Comportamento**:
  * O botão selecionado é destacado em verde (estilo de sucesso: contraste AA).
  * Adiciona-se o texto não-visual / visual: **"✓ Correta"** ao lado do conteúdo da alternativa correta.
  * Todos os 4 botões de alternativa daquela pergunta específica são imediatamente desabilitados (`disabled = true`) e perdem a propriedade de clique e hover.
  * O foco do teclado é removido das demais opções.

### 3. Estado: Respondida (Falha - Selecionou a Incorreta)
* **Comportamento**:
  * O botão selecionado incorreto é destacado em vermelho (estilo de erro: contraste AA).
  * Adiciona-se o texto não-visual / visual: **"✗ Sua resposta"** ao lado da alternativa incorreta selecionada.
  * O botão da alternativa que era de fato a correta é destacado em verde com o indicador **"✓ Correta"**.
  * Todos os 4 botões de alternativa daquela pergunta específica são imediatamente desabilitados (`disabled = true`) para impedir novos cliques.
