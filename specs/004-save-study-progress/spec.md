# Feature Specification: Save Study Progress

**Feature Branch**: `004-save-study-progress`

**Created**: 2026-07-16

**Status**: Draft

**Input**: User description: "Quero construir a quarta funcionalidade do Assistente de Estudos com IA: progresso de estudo salvo localmente no navegador. Fluxo esperado: 1. Cada tópico do cronograma exibido na tela ganha um checkbox "Marcar como estudado" 2. Ao marcar/desmarcar, o estado é salvo no localStorage do navegador, associado ao tema e tempo que geraram aquele cronograma específico 3. Se o usuário recarregar a página (mesmo navegador, mesma sessão), o progresso marcado anteriormente para aquele cronograma permanece visível, desde que ele gere novamente o mesmo tema e tempo 4. Deve existir um indicador visual simples de progresso geral (ex: "3 de 8 tópicos estudados") Critério de aceite: marcar/desmarcar um tópico persiste corretamente entre recarregamentos de página no mesmo navegador. Fora de escopo nesta funcionalidade: sincronização entre dispositivos, login, banco de dados remoto, progresso compartilhado entre diferentes temas gerados."

## User Scenarios & Testing *(mandatory)*

### User Story 1 - Save and Load Study Progress (Priority: P1)

Como estudante, quero marcar tópicos como estudados e ver esse progresso mantido ao recarregar a página, para que eu possa continuar meus estudos sem perder o que já completei.

**Why this priority**: Esta é a funcionalidade central, fornecendo o valor principal descrito pelo usuário.

**Independent Test**:
1. Gere um cronograma com um tema e tempo.
2. Marque alguns tópicos como estudados.
3. Recarregue a página e insira exatamente o mesmo tema e tempo.
4. Verifique se os tópicos anteriormente marcados permanecem marcados.

**Acceptance Scenarios**:

1. **Given** um cronograma gerado para um par (tema, tempo), **When** o usuário marca um checkbox de tópico, **Then** o estado do tópico deve ser salvo localmente.
2. **Given** um cronograma gerado anteriormente para um par (tema, tempo), **When** o usuário recarrega a página e gera novamente o cronograma, **Then** os checkboxes devem refletir o estado salvo.
3. **Given** um cronograma, **When** o usuário desmarca um checkbox, **Then** o estado salvo deve ser atualizado para não estudado.

---

### User Story 2 - Visualize General Progress (Priority: P2)

Como estudante, quero ver uma contagem de quantos tópicos eu já estudei em relação ao total, para que eu possa acompanhar meu progresso geral.

**Why this priority**: Melhora a usabilidade, dando feedback imediato sobre o esforço realizado.

**Independent Test**: Marque vários tópicos como estudado e verifique se o contador é atualizado corretamente.

**Acceptance Scenarios**:

1. **Given** um cronograma, **When** o usuário marca ou desmarca um tópico, **Then** o indicador visual de progresso (ex: "X de Y tópicos estudados") deve ser atualizado instantaneamente.

---

### Edge Cases

- O que acontece se o usuário limpar o cache do navegador? (Progresso é perdido, comportamento aceitável conforme escopo).
- O que acontece se a IA gerar tópicos diferentes para um mesmo tema/tempo? (Tópicos que não possuírem correspondência exata no progresso salvo anteriormente devem aparecer como não estudados).

## Requirements *(mandatory)*

### Functional Requirements

- **FR-001 (CONSTITUTION)**: O sistema DEVE garantir contraste AA e suporte a navegação por teclado.
- **FR-002 (CONSTITUTION)**: Chaves de API DEVEM ser inseridas via input password e mantidas apenas em memória.
- **FR-003 (CONSTITUTION)**: Toda resposta de IA DEVE ser precedida por um estado de carregamento visual.
- **FR-004**: O sistema DEVE exibir um checkbox "Marcar como estudado" ao lado de cada tópico do cronograma.
- **FR-005**: O sistema DEVE persistir o estado de estudado/não estudado de cada tópico no `localStorage`.
- **FR-006**: O sistema DEVE identificar unicamente o progresso salvo pela combinação de `tema` + `tempo` + `nome do tópico`.
- **FR-007**: O sistema DEVE exibir um indicador visual de progresso ("X de Y tópicos estudados").
- **FR-008**: O sistema DEVE atualizar o indicador de progresso instantaneamente ao marcar ou desmarcar um tópico.

### Key Entities

- **Tópico**: Representa um item do cronograma, possui estado de "estudado" (booleano).
- **Cronograma**: Conjunto de Tópicos, identificado pela combinação única de Tema + Tempo disponível.

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: O progresso marcado persiste em 100% dos recarregamentos de página, desde que os inputs de Tema e Tempo sejam idênticos e o nome do tópico exista na geração anterior.
- **SC-002**: O contador de tópicos estudados reflete a soma exata dos checkboxes selecionados.
- **SC-003**: A interação de marcar/desmarcar o tópico é responsiva (atualização visual imediata).

## Assumptions

- O armazenamento em `localStorage` é suficiente para a escala de dados proposta (tópicos de estudo).
- A estrutura do cronograma (nome dos tópicos) é o ponto de referência para a persistência.
- A combinação "Tema + Tempo" é um escopo inicial adequado para a persistência do progresso.

## Clarifications

### Session 2026-07-16
- Q: Clarify requirement language, topic identification, and unmatched topic behavior → A: Requirements translated to Portuguese, identification changed to theme+time+topicName, and unmatched topics default to not studied.
