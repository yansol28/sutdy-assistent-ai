# Feature Specification: Geração de Perguntas de Fixação

**Feature Branch**: `gerar-perguntas-fixacao`

**Created**: 2026-07-16

**Status**: Draft

**Input**: User description: "Quero construir a terceira funcionalidade do Assistente de Estudos com IA: geração de perguntas de fixação para os tópicos do cronograma. Fluxo esperado: 1. Depois que as explicações da Fatia 2 são geradas e exibidas, o usuário vê um botão 'Gerar perguntas de fixação' acima da lista de tópicos 2. Ao clicar, o sistema gera, sequencialmente (mesmo padrão da Fatia 2, um tópico por vez), exatamente 3 perguntas de múltipla escolha para cada tópico, testando o conteúdo já explicado 3. Cada pergunta tem 4 alternativas, sendo apenas 1 correta 4. As perguntas são exibidas logo abaixo da explicação do tópico correspondente, assim que ficam prontas 5. O usuário pode selecionar uma alternativa e receber feedback visual imediato (certo ou errado), sem precisar enviar um formulário. Critério de aceite: as perguntas devem cobrir especificamente o conteúdo que foi explicado na Fatia 2 para aquele tópico, não ser genéricas ou descoladas do que foi ensinado. Fora de escopo nesta funcionalidade: pontuação acumulada, salvamento de respostas, login, banco de dados, regeneração de uma pergunta isolada."

## Clarifications

### Session 2026-07-16
- Q: Como deve se comportar a numeração de requisitos após a correção das lacunas? → A: Devem ser numerados sequencialmente de forma contínua, sem pular números (FR-001 a FR-012).
- Q: Qual a visibilidade e o comportamento do botão "Gerar perguntas de fixação" em relação às explicações? → A: O botão DEVE estar sempre visível e habilitado. Se clicado antes das explicações terminarem, exibe uma mensagem solicitando que aguarde, sem gerar perguntas.
- Q: Qual o critério de sucesso (SC-004) para tratamento de falhas da API da IA? → A: Remover o limite de tempo específico de 5 segundos e garantir que o erro seja localizado e o fluxo avance automaticamente para o próximo tópico sem travar a interface geral.

## User Scenarios & Testing *(mandatory)*

### User Story 1 - Geração Sequencial de Perguntas de Fixação (Priority: P1)

Como usuário, após visualizar as explicações com analogias geradas na Fatia 2, desejo clicar em um botão "Gerar perguntas de fixação" para que o sistema gere sequencialmente (um tópico por vez) exatamente 3 perguntas de múltipla escolha para cada tópico, permitindo que eu visualize e responda às perguntas assim que ficarem prontas abaixo de cada explicação correspondente.

**Why this priority**: É o fluxo principal e essencial da funcionalidade, permitindo a criação e exibição progressiva das perguntas de fixação baseadas estritamente nas explicações geradas para cada tópico.

**Independent Test**: Com as explicações exibidas, clicar em "Gerar perguntas de fixação". O botão é desabilitado e as perguntas começam a surgir sequencialmente, tópico por tópico, com 3 perguntas por tópico e 4 alternativas cada.

**Acceptance Scenarios**:

1. **Given** que a página foi carregada, **When** o usuário observa a área de controle acima da lista de tópicos, **Then** ele vê o botão "Gerar perguntas de fixação" sempre visível e habilitado.
2. **Given** que as explicações da Fatia 2 ainda estão em andamento ou não foram geradas, **When** o usuário clica no botão "Gerar perguntas de fixação", **Then** o sistema exibe uma mensagem clara na tela solicitando que ele aguarde a conclusão das explicações e NÃO inicia a geração de perguntas.
3. **Given** que todas as explicações da Fatia 2 foram concluídas, **When** o usuário clica no botão "Gerar perguntas de fixação", **Then** o sistema desabilita o botão, exibe feedback visual de carregamento (spinner ou skeleton) na seção de perguntas do primeiro tópico e inicia a geração das perguntas.
4. **Given** que as perguntas de um tópico específico foram geradas, **When** elas ficam prontas, **Then** elas são renderizadas imediatamente abaixo da explicação daquele tópico correspondente e o sistema inicia automaticamente a geração para o tópico subsequente de forma contínua.

---

### User Story 2 - Resolução com Feedback Visual Imediato (Priority: P2)

Como usuário, desejo clicar em qualquer uma das 4 alternativas de uma pergunta e receber feedback visual imediato sobre o meu acerto ou erro, sem necessidade de submeter formulários, para ter um processo de estudo dinâmico e autoexplicativo.

**Why this priority**: É a interação principal de validação do conhecimento do aluno, permitindo o aprendizado rápido por meio do feedback de acerto/erro instantâneo.

**Independent Test**: Com as perguntas exibidas, clicar em uma alternativa de qualquer pergunta. O sistema destaca visualmente a opção escolhida e a correta, bloqueando as demais alternativas daquela pergunta.

**Acceptance Scenarios**:

1. **Given** que as perguntas estão visíveis para o usuário, **When** o usuário clica na alternativa correspondente à resposta CORRETA de uma pergunta, **Then** essa alternativa é destacada com cor verde de sucesso e todas as 4 alternativas daquela pergunta são desabilitadas para cliques subsequentes.
2. **Given** que as perguntas estão visíveis para o usuário, **When** o usuário clica em uma alternativa INCORRETA de uma pergunta, **Then** a alternativa selecionada é destacada com cor vermelha de erro, a alternativa correta é simultaneamente destacada com cor verde de sucesso e todas as 4 alternativas daquela pergunta são desabilitadas para cliques subsequentes.

---

### User Story 3 - Acessibilidade e Navegação Teclado (Priority: P3)

Como usuário que utiliza apenas teclado para navegação, desejo conseguir navegar entre as perguntas e suas alternativas utilizando a tecla `Tab` e selecionar uma resposta utilizando a tecla `Enter` ou `Espaço`, de forma que o sistema responda exatamente como no clique do mouse.

**Why this priority**: Garante o cumprimento do Princípio I (Acessibilidade) da Constituição do projeto, tornando a aplicação inclusiva e em conformidade técnica.

**Independent Test**: Navegar pelas perguntas utilizando a tecla `Tab`. Ao focar em uma alternativa, pressionar `Enter` ou `Espaço` e validar se o feedback visual imediato é exibido e as opções são bloqueadas normalmente.

**Acceptance Scenarios**:

1. **Given** que as perguntas foram renderizadas, **When** o usuário navega na página pressionando a tecla `Tab`, **Then** o foco de navegação do teclado se move sequencialmente pelas alternativas de cada pergunta.
2. **Given** que uma alternativa está focada pelo teclado, **When** o usuário pressiona as teclas `Enter` ou `Espaço`, **Then** a alternativa é selecionada, o feedback visual imediato é disparado (conforme o cenário de acerto ou erro) e as opções daquela pergunta perdem o foco e são desabilitadas.

### Edge Cases

- **Erro na Chamada de API da IA para um Tópico**: Se a API do Gemini falhar (devido a limite de taxa ou erro de conexão) enquanto estiver gerando perguntas para um tópico específico, o sistema DEVE exibir uma mensagem de erro localizada e clara na seção de perguntas daquele tópico (ex: "Não foi possível gerar as perguntas para este tópico.") e continuar gerando as perguntas para os tópicos seguintes.
- **Botão Clicado Múltiplas Vezes**: O botão "Gerar perguntas de fixação" DEVE ser desabilitado quando a geração real for iniciada (com explicações concluídas) e seu texto atualizado para indicar processamento (ex: "Gerando perguntas..."), evitando chamadas concorrentes à API.
- **Mudança de Foco no Meio da Geração**: Se o usuário rolar a tela ou interagir com outra parte da página enquanto a geração sequencial ocorre, as perguntas geradas devem ser inseridas normalmente abaixo das explicações correspondentes sem quebrar o layout ou a usabilidade da página.

## Requirements *(mandatory)*

### Functional Requirements

- **FR-001 (CONSTITUTION)**: O sistema DEVE garantir contraste AA (mínimo de 4.5:1 para texto normal) em todos os elementos de perguntas, alternativas e estados de feedback (verde para acerto, vermelho para erro).
- **FR-002 (CONSTITUTION)**: Todos os elementos interativos de seleção de alternativas DEVEM ser navegáveis e operáveis via teclado (Tab, Enter e Espaço).
- **FR-003 (CONSTITUTION)**: O sistema DEVE exibir um estado de carregamento visual localizado (spinner ou skeleton) na seção de perguntas de cada tópico enquanto aguarda o retorno da API do Gemini para aquele tópico específico.
- **FR-004**: O botão "Gerar perguntas de fixação" DEVE estar sempre visível e habilitado na área de controle acima da lista de tópicos do cronograma, independentemente do estado de geração das explicações.
- **FR-005**: Se o usuário clicar no botão "Gerar perguntas de fixação" antes que todas as explicações da Fatia 2 estejam concluídas, o sistema DEVE exibir uma mensagem de alerta orientando-o a aguardar as explicações e NÃO DEVE iniciar a geração de perguntas.
- **FR-006**: Ao clicar em "Gerar perguntas de fixação" com todas as explicações da Fatia 2 concluídas e visíveis, o sistema DEVE iniciar a geração sequencial das perguntas de múltipla escolha (um tópico por vez).
- **FR-007**: Para cada tópico do cronograma, o sistema DEVE enviar uma requisição à API do Gemini solicitando exatamente 3 perguntas de múltipla escolha.
- **FR-008**: Cada pergunta gerada DEVE conter exatamente 4 alternativas e apontar exatamente 1 delas como correta.
- **FR-009**: O prompt enviado à IA DEVE instruir estritamente que as perguntas de cada tópico cubram especificamente o conteúdo que foi ensinado na explicação daquele tópico gerada na Fatia 2, impedindo perguntas genéricas ou descontextualizadas.
- **FR-010**: O sistema DEVE renderizar as perguntas de um tópico imediatamente abaixo da explicação desse respectivo tópico assim que elas forem recebidas e processadas pela API.
- **FR-011**: Ao selecionar uma alternativa (via clique ou teclado), o sistema DEVE atualizar a interface imediatamente fornecendo feedback visual: verde se estiver correta; vermelha para a selecionada incorreta e verde para a correta se estiver errada.
- **FR-012**: O sistema DEVE desabilitar e remover a capacidade de interação de todas as 4 alternativas de uma pergunta assim que o usuário selecionar uma resposta.

### Key Entities

- **Pergunta**: Representa uma questão individual de fixação de múltipla escolha.
  - *Atributos*: enunciado (texto), alternativas (lista de 4 textos), alternativa_correta (índice de 0 a 3 da alternativa correta), alternativa_selecionada (índice da alternativa escolhida pelo usuário ou null se ainda não respondida).
- **Bloco de Perguntas**: Coleção de 3 perguntas vinculadas a um tópico do cronograma.
  - *Atributos*: id_topico (relação com o tópico do cronograma), perguntas (lista de 3 objetos Pergunta), estado (ex: "carregando", "pronto", "erro").

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: O usuário consegue visualizar o início da geração de perguntas para o primeiro tópico na tela em até 10 segundos após clicar no botão "Gerar perguntas de fixação".
- **SC-002**: 100% dos tópicos explicados recebem exatamente 3 perguntas com 4 alternativas cada.
- **SC-003**: 100% das alternativas das perguntas geradas são interativas, navegáveis por teclado (via Tab) e selecionáveis com resposta visual imediata.
- **SC-004**: Em caso de falha na API para um tópico específico, o sistema DEVE exibir uma mensagem de erro localizada e prosseguir automaticamente para o próximo tópico, sem travar o fluxo geral ou interromper as demais perguntas.

## Assumptions

- O usuário já configurou sua chave de API do Gemini válida na interface nas etapas anteriores.
- A explicação de cada tópico está disponível em memória ou no DOM da página para servir de contexto para a geração das perguntas correspondentes.
- O formato de retorno estruturado (como JSON) instruído no prompt do Gemini será interpretado com sucesso pelo parser de IA do JavaScript.
- A geração sequencial de um tópico por vez evita concorrência e mitiga estouros de rate limits de contas gratuitas da API.

## Out of Scope

- Pontuação acumulada ou ranking de acertos.
- Salvamento ou persistência do histórico de respostas (em localStorage ou banco de dados).
- Autenticação ou login de usuários.
- Regeneração de perguntas individuais ou do bloco de perguntas de um único tópico.
