# Research: Geração de Analogias

## Decisões Técnicas

### 1. Chamada à API Gemini (Sequencial)
- **Decisão**: Utilizar `for...of` com `await` para realizar chamadas sequenciais, evitando `Promise.all`.
- **Rationale**: Respeita os limites de requisição da API gratuita (evita concorrência) e permite exibição incremental conforme solicitado pelo usuário.
- **Tratamento de erro**: `try...catch` dentro do loop para isolar falhas de tópicos individuais.
- **Modelo**: `gemini-1.5-flash-latest`.

### 2. Interface de Usuário
- **Decisão**: Botão com ID `btnGerarExplicacoes` acima da lista de tópicos. Manipulação da DOM para inserir a explicação (tag `<p>` ou `<div>`) logo após o tópico correspondente (identificável por ID ou contêiner).
- **Rationale**: Melhora a UX, permitindo visualização incremental e acompanhamento do progresso.

### 3. Formato de Resposta da IA
- **Decisão**: Texto simples com a explicação e analogia. Não será JSON para esta funcionalidade, visando simplicidade conforme solicitado.
- **Rationale**: Facilita a renderização direta do texto retornado pela IA.

## Alternativas Consideradas
- **Promise.all**: Descartada pois violaria a restrição de requisições sequenciais para proteger os limites de taxa da API e impediria a exibição incremental.
