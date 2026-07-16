# Data Model: Geração de Analogias

Esta funcionalidade não altera a estrutura do cronograma existente, mas estende a representação visual dos tópicos no DOM.

## Estrutura de UI Extendida (Frontend DOM)

Cada tópico no cronograma, quando renderizado em `index.html`, passará a ter um contêiner para a explicação:

```html
<!-- Exemplo de estrutura de tópico no DOM -->
<div class="topico" id="topico-1">
  <h3>Nome do Tópico</h3>
  <!-- Explicação será inserida aqui -->
  <div class="explicacao-container" id="explicacao-topico-1"></div>
</div>
```

## Contrato de Dados (IA)

- **Input**: Tema do tópico (string).
- **Output**: Texto simples contendo explicação e analogia (string).
