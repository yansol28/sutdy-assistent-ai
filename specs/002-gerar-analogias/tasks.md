# Tasks: Geração de Analogias

**Input**: Design documents from `specs/002-gerar-analogias/`

**Prerequisites**: plan.md (required), spec.md (required for user stories), research.md, data-model.md

**Organization**: Tasks are grouped by user story to enable independent implementation and testing of each story.

## Format: `[ID] [P?] [Story] Description`

- **[P]**: Can run in parallel (different files, no dependencies)
- **[Story]**: Which user story this task belongs to (e.g., US1, US2, US3)
- Include exact file paths in descriptions

## Phase 1: Setup (Shared Infrastructure)

**Purpose**: Project preparation for the new feature

- [X] T001 Initialize branch and directory structure for analogias

---

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: Core infrastructure setup

- [X] T002 Implement `gerarExplicacao` client service in js/api.js

---

## Phase 3: User Story 1 - Gerar Todas as Explicações (Priority: P1) 🎯 MVP

**Goal**: Permitir que o usuário gere explicações com analogias para todos os tópicos de forma sequencial, com feedback de progresso e exibição incremental.

**Independent Test**: Usuário clica em "Gerar todas as explicações", vê o progresso no botão e as explicações aparecendo abaixo de cada tópico conforme são geradas.

### Implementation for User Story 1

- [X] T003 [US1] Adicionar botão "Gerar todas as explicações" no DOM em index.html
- [X] T004 [US1] Implementar contêineres de explicação (`.explicacao-container`) nos tópicos em index.html
- [X] T005 [US1] Implementar lógica de loop sequencial (`for...of` + `await`) em js/main.js
- [X] T006 [US1] Implementar atualização de progresso do botão em js/main.js
- [X] T007 [US1] Implementar inserção incremental das explicações no DOM em js/main.js
- [X] T008 [US1] Implementar tratamento de erro individual por tópico (`try...catch`) em js/main.js

**Checkpoint**: At this point, User Story 1 should be fully functional and testable independently

---

## Phase 4: Polish & Cross-Cutting Concerns

**Purpose**: Final polish and accessibility check

- [X] T009 Verificar acessibilidade (contraste e teclado) dos novos elementos
- [X] T010 Finalizar teste manual com cenários de erro e sucesso
- [X] T011 [US1] Validar manualmente, com pelo menos 2 temas diferentes, que as explicações geradas contêm analogia e evitam jargão técnico não explicado (FR-007)