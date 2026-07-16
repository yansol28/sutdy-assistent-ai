# Research: Geração de Perguntas de Fixação

**Feature**: Geração de Perguntas de Fixação | **Date**: 2026-07-16

---

## Technical Decisions

### 1. Modelo de IA para Geração de Perguntas
* **Decision**: Utilizar o modelo `gemini-3.1-flash-lite`, exatamente como já empregado nas funções anteriores de `api.js`.
* **Rationale**: Garante máxima consistência do stack, reduz latência de resposta, respeita as limitações e quotas da chave gratuita da API do Gemini e entrega a capacidade estruturada necessária para formulação de testes.
* **Alternatives considered**: `gemini-1.5-pro` (rejeitado por introduzir latência desnecessariamente alta e possuir cotas mais restritivas) e `gemini-1.5-flash` (rejeitado para manter o modelo atualizado e idêntico às demais funções do projeto).

### 2. Formato de Resposta Estruturada (JSON)
* **Decision**: Configurar o prompt para instruir estritamente o retorno em formato JSON estruturado, sem marcadores de bloco de código markdown (```json ... ```) e sem texto explicativo ou saudações antes/depois. Aplicar a mesma higienização por regex utilizada em `gerarCronograma` para remover eventuais fences indesejadas antes de submeter ao `JSON.parse`.
* **Rationale**: Garante robustez no parsing client-side. Impedir a geração de texto livre em volta do JSON evita que o interpretador JavaScript quebre ao manipular o objeto resultante.
* **Alternatives considered**: Respostas textuais livres formatadas por convenção e parsed via expressão regular customizada (rejeitado por ser altamente frágil e sujeito a variações da IA).

### 3. Acessibilidade na Interface (Navegação por Teclado e WCAG 1.4.1)
* **Decision**: 
  1. Utilizar a tag nativa `<button>` para as alternativas de múltipla escolha.
  2. Implementar indicadores visuais de acerto/erro através de classes CSS que combinam cor de destaque (verde/vermelho) com indicadores textuais não-visuais claros (ex: ícone "✓" e o texto "Correta" para acerto, ou "✗" e "Sua resposta" para erro).
* **Rationale**:
  * O uso de `<button>` garante foco do teclado (`Tab`) e ativação nativa (`Enter`/`Espaço`) sem necessidade de JavaScript adicional para emular foco e tratamento de eventos de tecla.
  * O cumprimento da diretriz WCAG 1.4.1 (Uso de Cor) exige que a cor não seja o único meio de transmitir informação. A inclusão de símbolos (✓/✗) e textos auxiliares garante que estudantes daltônicos ou com baixa visão compreendam o feedback imediatamente.
* **Alternatives considered**: Uso de elementos `<div>` interativos estilizados (rejeitado pois violaria o Princípio I de Acessibilidade da Constituição do projeto ao requerer gerenciamento complexo de `tabindex` e listeners de teclado adicionais).

### 4. Arquitetura Client-Side (Sem Backend/DB)
* **Decision**: Executar todo o fluxo em memória no cliente. O botão de perguntas estará permanentemente no DOM. Ao ser clicado, a lógica em `main.js` verificará o estado das explicações de Fatia 2 para validar se a geração de perguntas pode prosseguir.
* **Rationale**: Respeita de forma absoluta a pilha tecnológica pura (Vanilla JS, HTML e CSS estáticos) e as diretrizes de escopo da Constituição (sem banco de dados, sem backend).
* **Alternatives considered**: Criação de banco de dados temporário local via `localStorage` (rejeitado por estar explicitamente fora do escopo funcional definido na especificação).
