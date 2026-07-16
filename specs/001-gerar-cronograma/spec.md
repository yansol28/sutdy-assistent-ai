# Feature Specification: Geração de Cronograma de Estudo

**Feature Branch**: `gerar-cronograma`

**Created**: 2026-07-15

**Status**: Draft

**Input**: User description: "Geração de cronograma de estudo personalizado. Usuário informa um tema e o tempo disponível. Sistema gera cronograma semanal, tópicos específicos, tempo por tópico, justificativa da ordem e do tópico."

## User Scenarios & Testing *(mandatory)*

### User Story 1 - Gerar Cronograma de Estudo (Priority: P1)

Como usuário, desejo informar o tema que pretendo estudar e o tempo que tenho disponível, para que o sistema gere um cronograma de estudo organizado, realista e específico para a minha necessidade.

**Why this priority**: É a funcionalidade principal (MVP) que entrega o valor central do produto.

**Independent Test**: Usuário preenche tema e tempo, clica em "Gerar cronograma" e recebe um cronograma estruturado na tela.

**Acceptance Scenarios**:

1. **Given** que o usuário está na tela inicial, **When** o usuário preenche um tema (ex: "História do Brasil") e o tempo (ex: "5 horas/semana por 2 semanas") e clica em gerar, **Then** o sistema exibe um cronograma dividido em semanas com tópicos específicos, tempo estimado por tópico e as justificativas solicitadas.
2. **Given** que o sistema está gerando o cronograma, **When** a solicitação é enviada, **Then** o sistema exibe um feedback visual de carregamento até que o resultado esteja pronto.

## Clarifications

### Session 2026-07-15
- Q: Como tratar erros da API ou formato inválido? → A: Exibir mensagem de erro amigável na interface (ex: "Erro ao gerar cronograma. Tente novamente.") sem quebrar a aplicação.
- Q: Como tratar entrada vazia? → A: Validar preenchimento antes da chamada à IA, exibindo mensagem de erro amigável se faltando tema ou tempo.
- Q: Qual o escopo explícito? → A: Apenas geração de cronograma. Explicar tópicos, questões, login, banco de dados ou persistência de progresso estão fora de escopo.
- Q: Como estruturar a justificativa? → A: Cada tópico deve ter uma única justificativa explicando sua importância dentro do tema geral.
- Q: O sistema deve validar se o tempo é realista? → A: Não. A IA é responsável por gerar um cronograma realista para o tempo informado; não há validação no frontend.

## Requirements *(mandatory)*

### Functional Requirements

- **FR-001 (CONSTITUTION)**: O sistema DEVE garantir contraste AA e suporte a navegação por teclado.
- **FR-002 (CONSTITUTION)**: Chaves de API DEVEM ser inseridas via input password e mantidas apenas em memória.
- **FR-003 (CONSTITUTION)**: Toda resposta de IA DEVE ser precedida por um estado de carregamento visual.
- **FR-004**: O sistema DEVE aceitar o "tema" e o "tempo disponível" como entrada.
- **FR-005**: O sistema DEVE validar o preenchimento dos campos antes de enviar a requisição à IA.
- **FR-006**: O sistema DEVE gerar um cronograma dividido por semana.
- **FR-007**: O sistema DEVE incluir para cada tópico: tópico específico, tempo estimado e justificativa de por que esse tópico é importante estudar (ver `data-model.md` para estrutura de dados).
- **FR-008**: O sistema DEVE exibir o cronograma organizado tópico por tópico na tela.
- **FR-009**: O sistema DEVE tratar erros da API ou formato de resposta inválido com mensagens de erro amigáveis na interface, sem quebrar o app.

### Key Entities

- **Cronograma**: Representa a estrutura de estudo gerada, composta por semanas, que por sua vez contêm tópicos.
- **Tópico**: Representa uma unidade de estudo, contendo título, tempo estimado e justificativa de importância.

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: Usuários conseguem gerar um cronograma válido em menos de 1 minuto após inserir os dados.
- **SC-002**: 100% dos cronogramas gerados contêm a justificativa da importância do tópico conforme solicitado.
- **SC-003**: O sistema mantém a interface estável e exibe mensagens de erro amigáveis em caso de falha de rede ou resposta da IA inválida.

## Assumptions

- Usuários têm conexão estável com a internet.
- A API do Gemini está disponível para processar as solicitações.
- O formato de resposta da IA é consistente o suficiente para renderização na interface.

## Out of Scope

- Explicações de tópicos com analogias
- Perguntas de fixação
- Login de usuário / autenticação
- Banco de dados persistente
- Salvamento de progresso do usuário

Esses itens fazem parte de funcionalidades futuras do projeto, já 
mapeadas fora desta especificação.
