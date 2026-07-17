<!--
<sync_impact_report>
Version change: 0.0.0 → 1.0.0
Modified principles:
  - [PRINCIPLE_1_NAME] → I. Acessibilidade
  - [PRINCIPLE_2_NAME] → II. Segurança de Credenciais
  - [PRINCIPLE_3_NAME] → III. Desempenho e UX
  - [PRINCIPLE_4_NAME] → IV. Disciplina de Desenvolvimento (Vertical Slicing)
  - [PRINCIPLE_5_NAME] → V. Padrões de Código e Estilo
Added sections:
  - Stack e Implantação
  - Escopo e Limitações
Removed sections: None
Templates requiring updates:
  - .specify/templates/plan-template.md (✅ updated)
  - .specify/templates/spec-template.md (✅ updated)
  - .specify/templates/tasks-template.md (✅ updated)
Follow-up TODOs: None
</sync_impact_report>
-->

# Assistente de Estudos com IA Constitution

## Core Principles

### I. Acessibilidade
O sistema deve ser inclusivo e utilizável por todos. Isso exige contraste de cores adequado (mínimo AA), labels explicitamente associados a todos os inputs e garantia de que todos os elementos interativos sejam navegáveis e operáveis via teclado.

### II. Segurança de Credenciais
[REMOVIDO]A proteção de chaves de API é absoluta. Chaves nunca devem ser commitadas no código-fonte. O usuário deve inserir sua própria chave em um campo de texto do tipo "password". Esta chave não deve ser persistida em localStorage, sessionStorage ou cookies, permanecendo apenas na memória de execução da sessão.

### III. Desempenho e UX
A experiência do usuário deve ser fluida e informativa. Todas as chamadas à API de IA devem disparar um feedback visual de carregamento (spinner/skeleton). Deve-se evitar chamadas paralelas desnecessárias para respeitar os limites de taxa (rate limits) da API gratuita e garantir a estabilidade da aplicação.

### IV. Disciplina de Desenvolvimento (Vertical Slicing)
O desenvolvimento segue a estratégia de fatias verticais. Um commit deve ser realizado a cada fatia concluída e validada. Nenhuma fatia nova começa antes da anterior ser testada manualmente com pelo menos 2 exemplos de input diferentes. O desenvolvedor deve revisar e entender cada trecho de código gerado por IA antes de aceitá-lo.

### V. Padrões de Código e Estilo
Consistência e legibilidade são fundamentais. Nomes de variáveis e funções devem ser em português em todo o projeto. O código JavaScript deve usar indentação de 2 espaços e ponto e vírgula obrigatório. Comentários curtos devem explicar trechos não óbvios, servindo como material de estudo.

## Stack e Implantação
A aplicação é construída com tecnologias web fundamentais para garantir simplicidade e facilidade de manutenção.
- **Frontend**: HTML, CSS e JavaScript puro (Vanilla JS), sem frameworks ou etapas de build.
- **IA**: Integração direta com a API do Gemini (modelo gemini-flash-latest).
- **Implantação**: Hospedagem na Vercel como uma página estática única (index.html).

## Escopo e Limitações
O projeto foca na entrega de valor educacional rápido.
- **Incluso**: Geração de cronograma, explicações com analogias e perguntas de fixação.
- **Excluso**: Login de usuário, autenticação centralizada e banco de dados persistente (para as fatias iniciais). Qualquer mudança de escopo exige alteração nesta constituição.

## Governance
Esta constituição é a autoridade máxima sobre os padrões do projeto.

1. **Conformidade**: Todas as tarefas, planos e commits devem ser validados contra estes princípios.
2. **Emendas**: Mudanças nos princípios exigem incremento de versão (SemVer) e atualização deste documento.
3. **Revisão**: Periodicamente, o alinhamento entre o código e a constituição deve ser revisado.

**Version**: 1.0.0 | **Ratified**: 2026-07-15 | **Last Amended**: 2026-07-15
