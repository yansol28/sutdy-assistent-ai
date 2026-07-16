# Tasks: Geração de Cronograma de Estudo

**Input**: Design documents from `specs/001-gerar-cronograma/`

**Prerequisites**: plan.md (required), spec.md (required for user stories), research.md, data-model.md, contracts/

**Organization**: Tasks are grouped by user story to enable independent implementation and testing of each story.

## Format: `[ID] [P?] [Story] Description`

- **[P]**: Can run in parallel (different files, no dependencies)
- **[Story]**: Which user story this task belongs to (e.g., US1, US2, US3)
- Include exact file paths in descriptions

## Phase 1: Setup (Shared Infrastructure)

**Purpose**: Project initialization and basic structure

- [ ] T001 Create project structure per implementation plan
- [ ] T002 [P] Initialize HTML/CSS/JS project structure

---

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: Core infrastructure that MUST be complete before ANY user story can be implemented

**⚠️ CRITICAL**: No user story work can begin until this phase is complete

- [ ] T003 Implement base CSS for layout and accessibility (contrast AA) in css/style.css
- [ ] T004 Implement API client service structure in js/api.js
- [ ] T005 Implement UI utility helper functions in js/ui.js

**Checkpoint**: Foundation ready - user story implementation can now begin

**⚠️ CONSTITUTION CHECKPOINT**:
- [ ] Teste manual realizado com pelo menos 2 exemplos de input diferentes?
- [ ] Código gerado por IA revisado e totalmente compreendido pelo desenvolvedor?
- [ ] Commit realizado apenas após validação da fatia completa?

---

## Phase 3: User Story 1 - Gerar Cronograma de Estudo (Priority: P1) 🎯 MVP

**Goal**: Permitir que o usuário insira tema e tempo, e exiba o cronograma gerado pela IA.

**Independent Test**: Usuário preenche os dados, clica em gerar, vê feedback de carregamento, e recebe o cronograma formatado na tela.

### Implementation for User Story 1

- [ ] T006 [US1] Implement input form and layout in index.html
- [ ] T007 [US1] Implement input validation logic in js/main.js
- [ ] T008 [US1] Implement Gemini API request logic in js/api.js (uses field type password)
- [ ] T009 [US1] Implement UI feedback (loading state) logic in js/ui.js
- [ ] T010 [US1] Implement response parsing and JSON rendering logic in js/main.js
- [ ] T011 [US1] Implement error handling for API and JSON format in js/api.js

**Checkpoint**: At this point, User Story 1 should be fully functional and testable independently

---

## Phase 4: Polish & Cross-Cutting Concerns

**Purpose**: Final polish and accessibility check

- [ ] T012 Verify keyboard accessibility for all form elements in index.html
- [ ] T013 Verify color contrast accessibility in css/style.css
- [ ] T014 Final manual test with 2 distinct input examples
