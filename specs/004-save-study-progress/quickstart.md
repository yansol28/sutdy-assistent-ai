# Quickstart: Save Study Progress

**Feature**: Save Study Progress | **Date**: 2026-07-16

---

## Guia de Validação Rápida (End-to-End)

Este guia descreve os passos práticos para validar a funcionalidade de salvamento de progresso de estudo.

### Pré-requisitos
1. Um navegador web moderno (com suporte a `localStorage`).

---

### Passo 1: Geração do Cronograma
1. Abra o `index.html`.
2. Insira tema e tempo.
3. Gere o cronograma.

### Passo 2: Marcar Progresso
1. Observe os checkboxes "Marcar como estudado" ao lado de cada tópico.
2. Marque dois ou três tópicos.
3. Observe o indicador "X de Y tópicos estudados" atualizar para mostrar o total correto.

### Passo 3: Validação de Persistência
1. Recarregue a página (F5).
2. Insira exatamente o mesmo tema e tempo.
3. Gere o cronograma novamente.
4. Verifique se os tópicos anteriormente marcados permanecem marcados e se o indicador de progresso mostra a contagem correta.

### Passo 4: Validação de Desmarcar e Reset
1. Desmarque um tópico.
2. Verifique se o indicador de progresso atualiza (decrementa).
3. Recarregue a página e valide que o estado desmarcado foi persistido.
