# Research: Geração de Cronograma de Estudo

## Decisões Técnicas

### 1. Chamada à API Gemini
- **Decisão**: Utilizar `fetch` nativo para realizar chamadas POST para a API do Gemini.
- **Rationale**: Atende ao requisito de Vanilla JS, sem necessidade de bibliotecas externas (build steps).
- **Modelo**: `gemini-1.5-flash-latest` (conforme especificado).
- **Formato**: Solicitar resposta em formato JSON para facilitar o parsing e renderização.
  - O prompt incluirá explicitamente a instrução: "Responda APENAS em formato JSON estruturado com a seguinte estrutura: `{"semanas": [{"semana": 1, "topicos": [{"nome": "Tópico X", "tempo_estimado": "30min", "justificativa": "Importância X"}]}]}`".

### 2. Segurança de Chave de API
- **Decisão**: Campo `type="password"` no HTML. A chave será lida pelo JS apenas no momento da requisição e não será armazenada.
- **Rationale**: Garante conformidade com o princípio II da constituição (Segurança de Credenciais).

### 3. Feedback de Carregamento
- **Decisão**: Manipulação da DOM para exibir um elemento de carregamento (ex: texto "Gerando..." ou ícone) durante a requisição `fetch` e ocultá-lo/remover ao receber a resposta.
- **Rationale**: Garante conformidade com o princípio III da constituição (Desempenho e UX).

## Alternativas Consideradas
- **Bibliotecas de UI**: Descartadas para manter o projeto conforme o princípio de Vanilla JS e sem build step.
- **Persistência local**: Descartada para evitar riscos de segurança com a chave de API e para cumprir o escopo do MVP.
