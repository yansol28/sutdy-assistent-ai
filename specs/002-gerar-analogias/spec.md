# Feature Specification: Geração de Analogias

**Feature Branch**: `gerar-analogias`

**Created**: 2026-07-16

**Status**: Draft

**Input**: User description: "Geração de explicações com analogias para tópicos do cronograma. Botão 'Gerar todas as explicações' acima da lista de tópicos. Geração sequencial (tópico por tópico) com progresso exibido no botão. Exibição da explicação abaixo do tópico correspondente assim que pronta. Critério: explicações compreensíveis para leigos, sem termos técnicos não explicados, usando analogias do dia a dia."

## User Scenarios & Testing *(mandatory)*

### User Story 1 - Gerar Todas as Explicações (Priority: P1)

Como usuário, desejo clicar em um botão para gerar explicações simples com analogias para todos os tópicos do meu cronograma, para que eu possa compreender melhor os assuntos de forma progressiva.

**Why this priority**: É a funcionalidade central desta fatia, permitindo que o usuário entenda os tópicos do cronograma sem precisar de conhecimento técnico prévio.

**Independent Test**: Usuário clica em "Gerar todas as explicações", vê o progresso no botão e as explicações aparecendo abaixo de cada tópico conforme são geradas.

**Acceptance Scenarios**:

1. **Given** que o cronograma está exibido, **When** o usuário clica em "Gerar todas as explicações", **Then** o sistema gera as explicações sequencialmente e exibe cada uma abaixo do tópico correspondente assim que estiver pronta.
2. **Given** que a geração está em curso, **When** uma explicação está sendo gerada, **Then** o botão exibe o progresso atual (ex: "Explicando 2 de 5...").
3. **Given** que uma explicação falhou ao ser gerada, **When** o erro ocorre, **Then** o sistema exibe uma mensagem de erro específica naquele tópico, sem interromper a geração dos tópicos seguintes.

## Clarifications

### Session 2026-07-16
- Q: Qual o critério de qualidade da explicação? → A: DEVE conter uma analogia do dia a dia e evitar termos técnicos não explicados, para ser compreensível por leigos.
- Q: Qual o critério de desempenho mensurável (SC-003)? → A: Cada explicação individual deve aparecer em até 10 segundos após o início da sua geração.
- Q: Como tratar erro em um tópico específico? → A: Exibir mensagem de erro apenas naquele tópico e continuar a geração dos próximos.

## Requirements *(mandatory)*

### Functional Requirements

- **FR-001 (CONSTITUTION)**: O sistema DEVE garantir contraste AA e suporte a navegação por teclado para o novo botão e áreas de explicação.
- **FR-002 (CONSTITUTION)**: O sistema DEVE exibir feedback visual de carregamento durante a geração de cada explicação.
- **FR-003**: O sistema DEVE exibir um botão "Gerar todas as explicações" acima da lista de tópicos.
- **FR-004**: O sistema DEVE gerar as explicações sequencialmente (um tópico por vez) para respeitar limites de taxa da API.
- **FR-005**: O sistema DEVE exibir cada explicação abaixo do tópico correspondente assim que finalizada.
- **FR-006**: O sistema DEVE atualizar o texto do botão com o progresso atual durante a geração.
- **FR-007**: Toda explicação DEVE priorizar a explicação clara do tópico em si, complementada por uma analogia curta do dia a dia (não o inverso). 
DEVE evitar termos técnicos sem explicação, sendo compreensível por leigos.
- **FR-008**: Se uma explicação falhar, o sistema DEVE exibir uma mensagem de erro específica naquele tópico e continuar a geração dos tópicos seguintes.

### Key Entities

- **Explicação**: Conteúdo gerado pela IA contendo a analogia do dia a dia para um tópico específico.

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: O usuário visualiza o progresso da geração em tempo real no botão.
- **SC-002**: As explicações são exibidas incrementalmente (não bloqueia a exibição até que todas terminem).
- **SC-003**: Cada explicação individual aparece em até 10 segundos após o início da sua geração.

## Assumptions

- A API do Gemini permite requisições sequenciais contínuas.
- O formato de resposta da IA para a analogia será consistente.
- A interface já possui elementos para renderizar o cronograma da Fatia 1.

## Out of Scope

- Perguntas de fixação.
- Login de usuário / autenticação.
- Banco de dados persistente.
- Edição ou regeneração de explicação isolada (a regeneração é total).
