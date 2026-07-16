# Implementation Plan: Geração de Perguntas de Fixação

**Branch**: `003-gerar-perguntas-fixacao` | **Date**: 2026-07-16 | **Spec**: [specs/003-gerar-perguntas-fixacao/spec.md](spec.md)

**Input**: Feature specification from `specs/003-gerar-perguntas-fixacao/spec.md`

## Summary
Este plano orienta a implementação da Fatia 3 do Assistente de Estudos com IA: geração sequencial de perguntas de fixação para os tópicos do cronograma. A abordagem técnica estende os arquivos existentes em JavaScript puro e CSS Vanilla, adicionando a função de chamada estruturada à API do Gemini (`gemini-3.1-flash-lite`), tratamento de eventos, renderização adaptada ao teclado, feedback visual compatível com WCAG 1.4.1 (combinando cores e indicadores de texto claros), e uma verificação prévia no DOM para garantir que todas as explicações da Fatia 2 foram concluídas antes de iniciar as chamadas de perguntas.

## Technical Context

**Language/Version**: HTML5, CSS3, JavaScript (ES6+ Modules, client-side)

**Primary Dependencies**: Gemini API via HTTP fetch (direct integration, no npm dependencies)

**Storage**: N/A (Em memória, estado volátil por sessão)

**Testing**: Testes manuais integrados detalhados em `quickstart.md`

**Target Platform**: Navegadores modernos (Desktop/Mobile), estático hospedado na Vercel

**Project Type**: Single-page static web application (Vanilla JS)

**Performance Goals**: Tempo de resposta do primeiro bloco de perguntas < 10 segundos, renderização instantânea do feedback pós-clique

**Constraints**: Sem etapas de build, sem transpilação, estrita manutenção do contraste AA para acessibilidade

**Scale/Scope**: Operação em lotes sequenciais de acordo com o número de tópicos no cronograma gerado

## Constitution Check

*GATE: Must pass before Phase 0 research. Re-check after Phase 1 design.*

- [x] **Acessibilidade**: 
  - Layout suporta contraste AA e alternativas em `<button>` nativos garantem navegação por teclado automática.
  - **WCAG 1.4.1 (Uso de Cores)**: Feedback visual de acerto/erro combina cor de fundo com indicador textual/ícone visual adicional (ex: "✓ Correta" ou "✗ Incorreta"), garantindo que a informação não dependa exclusivamente de cor.
- [x] **Segurança**: Chaves de API mantidas apenas na variável em memória do script, nunca persistidas ou salvas em storage.
- [x] **Desempenho**: Inclui feedback visual de carregamento localized ("Carregando perguntas...") na área de cada tópico e desabilita o botão para evitar chamadas duplicadas.
- [x] **Estilo**: Nomes das funções em português (`gerarPerguntas`, `exibirPerguntas`, etc.), indentação de 2 espaços e ponto e vírgula obrigatório.
- [x] **Processo**: Implementação em arquivos existentes (`api.js`, `main.js`, `ui.js`, `index.html`, `style.css`), sem criação de novos arquivos, divididos em etapas claras de validação.

## Project Structure

### Documentation (this feature)

```text
specs/003-gerar-perguntas-fixacao/
├── spec.md              # Feature specification
├── plan.md              # This file (Implementation Plan)
├── research.md          # Phase 0 output (Technical Decisions & Rationale)
├── data-model.md        # Phase 1 output (Entities & UI State transitions)
├── quickstart.md        # Phase 1 output (Validation and End-to-End guide)
└── contracts/           
    └── gemini-api.md    # Phase 1 output (Gemini API prompt contract)
```

### Source Code (repository root)

A estrutura de arquivos original é estritamente mantida, sem criação de novas pastas ou arquivos-fonte:

```text
index.html               # Estrutura HTML (Botão de perguntas, layout acessível)
css/
└── style.css            # Classes CSS de destaque (verde/vermelho) com contraste AA
js/
├── api.js               # Adicionada função exportada gerarPerguntas()
├── foco-teclado.js      # Detecção de Tab/Mouse (originalmente intacto)
├── main.js              # Lógica de controle, verificação de explicações e loop sequencial
└── ui.js                # Renderização das perguntas no DOM, tratamento de cliques e desabilitação
```

**Structure Decision**: Conforme exigência expressa do usuário, o projeto reaproveita a estrutura Single Project existente, estendendo cirurgicamente os arquivos JavaScript e CSS para acomodar a lógica de perguntas sem fragmentar o codebase.

## Complexity Tracking

*Sem violações da Constituição identificadas. Todas as regras de acessibilidade, segurança e tecnologia foram atendidas nativamente.*
