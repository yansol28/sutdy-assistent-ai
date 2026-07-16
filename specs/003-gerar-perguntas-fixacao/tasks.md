# Tasks: Geração de Perguntas de Fixação

**Input**: Design documents from `/specs/003-gerar-perguntas-fixacao/`

**Prerequisites**: plan.md (required), spec.md (required for user stories), research.md, data-model.md, contracts/

**Tests**: Manual testing scenarios defined in quickstart.md.

**Organization**: Tasks are grouped by user story to enable independent implementation and testing of each story.

## Phase 1: Setup (Shared Infrastructure)

**Purpose**: Project initialization and basic structure

- [ ] T001 Verify project structure per implementation plan
- [ ] T002 [P] Configure CSS variables and classes for accessibility (green/red feedback) in css/style.css

---

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: Core infrastructure that MUST be complete before ANY user story can be implemented

**⚠️ CRITICAL**: No user story work can begin until this phase is complete

- [ ] T003 Implement helper function for Gemini API cleaning/parsing in js/api.js

**Checkpoint**: Foundation ready - user story implementation can now begin in parallel

**⚠️ CONSTITUTION CHECKPOINT**:
- [ ] Teste manual realizado com pelo menos 2 exemplos de input diferentes?
- [ ] Código gerado por IA revisado e totalmente compreendido pelo desenvolvedor?
- [ ] Commit realizado apenas após validação da fatia completa?

---

## Phase 3: User Story 1 - Geração Sequencial de Perguntas de Fixação (Priority: P1) 🎯 MVP

**Goal**: Implementar a geração sequencial de 3 perguntas por tópico com feedback visual de carregamento.

**Independent Test**: Clicar em "Gerar perguntas de fixação" após conclusão da Fatia 2, verificar desabilitação do botão, exibição do carregamento, e geração sequencial das perguntas abaixo dos tópicos.

### Implementation for User Story 1

- [ ] T004 [US1] Update HTML to include button "Gerar perguntas de fixação" in index.html
- [ ] T005 [P] [US1] Implement `gerarPerguntas` function in js/api.js
- [ ] T006 [US1] Implement validation check in js/main.js to ensure Fatia 2 explanations are done before calling API
- [ ] T007 [US1] Implement sequential loop in js/main.js to call `gerarPerguntas` for each topic
- [ ] T008 [US1] Update js/ui.js to handle rendering of loading state for questions per topic
- [ ] T009 [US1] Implement rendering logic in js/ui.js to display 3 questions with 4 alternatives per topic

**Checkpoint**: At this point, User Story 1 should be fully functional and testable independently

---

## Phase 4: User Story 2 - Resolução com Feedback Visual Imediato (Priority: P2)

**Goal**: Permitir interação com alternativas e feedback visual (verde/vermelho) imediato.

**Independent Test**: Clicar em alternativas das perguntas geradas, validar destaque (verde/vermelho), indicadores (✓/✗), e bloqueio de interação.

### Implementation for User Story 2

- [ ] T010 [P] [US2] Style buttons and feedback classes (success/error) with AA contrast in css/style.css, preparing layout for text indicators
- [ ] T011 [US2] Implement event listener for button click in js/main.js
- [ ] T012 [US2] Implement feedback logic in js/ui.js (highlight selected option, mark correct one with background colors AND explicit text/icon indicators like "✓" or "✗" per WCAG 1.4.1)
- [ ] T013 [US2] Implement disabling logic for all alternatives of the answered question in js/ui.js

**Checkpoint**: At this point, User Stories 1 AND 2 should both work independently

---

## Phase 5: User Story 3 - Acessibilidade e Navegação Teclado (Priority: P3)

**Goal**: Garantir navegação e ativação completa via teclado conforme WCAG.

**Independent Test**: Navegar com Tab, selecionar com Enter/Espaço, validar feedback completo.

### Implementation for User Story 3

- [ ] T014 [US3] Ensure all alternative elements are rendered as `<button>` in js/ui.js
- [ ] T015 [US3] Verify Tab navigation order through alternatives in browser
- [ ] T016 [US3] Verify Enter/Space activation triggers same JS feedback logic as mouse click

**Checkpoint**: All user stories should now be independently functional

---

## Phase 6: Polish & Cross-Cutting Concerns

**Purpose**: Improvements that affect multiple user stories

- [ ] T017 [P] Documentation updates in specs/003-gerar-perguntas-fixacao/
- [ ] T018 Run quickstart.md validation guide
- [ ] T019 Code cleanup and final formatting check (2 spaces, Portuguese names)

---

## Dependencies & Execution Order

### Phase Dependencies

- **Setup (Phase 1)**: No dependencies - can start immediately
- **Foundational (Phase 2)**: Depends on Setup completion - BLOCKS all user stories
- **User Stories (Phase 3+)**: All depend on Foundational phase completion
- **Polish (Final Phase)**: Depends on all desired user stories being complete

### User Story Dependencies

- **User Story 1 (P1)**: Can start after Foundational (Phase 2) - No dependencies on other stories
- **User Story 2 (P2)**: Can start after User Story 1 (needs questions to be rendered)
- **User Story 3 (P3)**: Can start after User Story 2 (needs interactive elements to be fully implemented)

### Parallel Opportunities

- All Setup tasks marked [P] can run in parallel
- All Foundational tasks marked [P] can run in parallel (within Phase 2)
- All alternative-related styling/logic tasks marked [P] can run in parallel where independent

---

## Implementation Strategy

### MVP First (User Story 1 Only)

1. Complete Phase 1: Setup
2. Complete Phase 2: Foundational
3. Complete Phase 3: User Story 1
4. **STOP and VALIDATE**: Test User Story 1 independently

### Incremental Delivery

1. Complete Setup + Foundational → Foundation ready
2. Add User Story 1 → Test independently → Deploy
3. Add User Story 2 → Test independently → Deploy
4. Add User Story 3 → Test independently → Deploy
