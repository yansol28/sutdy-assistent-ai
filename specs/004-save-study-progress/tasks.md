# Tasks: Save Study Progress

**Input**: Design documents from `/specs/004-save-study-progress/`

**Prerequisites**: plan.md (required), spec.md (required for user stories), research.md, data-model.md

**Organization**: Tasks are grouped by user story to enable independent implementation and testing of each story.

## Phase 1: Setup (Shared Infrastructure)

**Purpose**: Project initialization and basic structure

- [ ] T001 Verify project structure per implementation plan

---

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: Core infrastructure that MUST be complete before ANY user story can be implemented

**⚠️ CRITICAL**: No user story work can begin until this phase is complete

- [ ] T002 Implement `obterChaveProgresso` helper function in js/main.js to handle key generation (theme+time+topic)

**Checkpoint**: Foundation ready - user story implementation can now begin

---

## Phase 3: User Story 1 - Save and Load Study Progress (Priority: P1)

**Goal**: Implementar persistência de progresso de tópicos no `localStorage`.

**Independent Test**: Marque um tópico, recarregue a página, gere o mesmo cronograma e verifique se o checkbox permanece marcado.

### Implementation for User Story 1

- [ ] T003 [US1] Update HTML to include checkbox for each topic in js/ui.js
- [ ] T004 [P] [US1] Implement `salvarProgresso` in js/main.js using `localStorage`
- [ ] T005 [P] [US1] Implement `carregarProgresso` in js/main.js to restore checkbox states
- [ ] T006 [US1] Integrate `carregarProgresso` into topic rendering logic in js/main.js

**Checkpoint**: At this point, User Story 1 should be fully functional and testable independently

---

## Phase 4: User Story 2 - Visualize General Progress (Priority: P2)

**Goal**: Implementar indicador visual de progresso ("X de Y tópicos estudados").

**Independent Test**: Marque vários tópicos e verifique se o contador é atualizado em tempo real.

### Implementation for User Story 2

- [ ] T007 [P] [US2] Update HTML/CSS to include progress indicator in index.html and style.css
- [ ] T008 [US2] Implement `atualizarIndicadorProgresso` in js/ui.js
- [ ] T009 [US2] Integrate `atualizarIndicadorProgresso` with checkbox event listener in js/main.js

**Checkpoint**: At this point, User Stories 1 AND 2 should both work independently

---

## Phase 5: Polish & Cross-Cutting Concerns

**Purpose**: Improvements that affect multiple user stories

- [ ] T010 [P] Documentation updates in specs/004-save-study-progress/
- [ ] T011 Run quickstart.md validation guide
- [ ] T012 Code cleanup and final formatting check

---

## Dependencies & Execution Order

### Phase Dependencies

- **Setup (Phase 1)**: No dependencies - can start immediately
- **Foundational (Phase 2)**: Depends on Setup completion - BLOCKS all user stories
- **User Stories (Phase 3+)**: All depend on Foundational phase completion
- **Polish (Final Phase)**: Depends on all desired user stories being complete

### User Story Dependencies

- **User Story 1 (P1)**: Can start after Foundational (Phase 2)
- **User Story 2 (P2)**: Can start after User Story 1 (needs topics rendered with progress)

### Parallel Opportunities

- All Setup tasks marked [P] can run in parallel
- All Foundational tasks marked [P] can run in parallel (within Phase 2)
- All progress-related tasks marked [P] can run in parallel where independent

---

## Implementation Strategy

### Incremental Delivery

1. Complete Setup + Foundational → Foundation ready
2. Add User Story 1 → Test independently → Deploy
3. Add User Story 2 → Test independently → Deploy
