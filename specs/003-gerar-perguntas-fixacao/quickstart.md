# Quickstart: Geração de Perguntas de Fixação

**Feature**: Geração de Perguntas de Fixação | **Date**: 2026-07-16

---

## Guia de Validação Rápida (End-to-End)

Este guia descreve os passos práticos para executar e validar a funcionalidade de geração de perguntas de fixação de forma integrada à UI.

### Pré-requisitos
1. Um navegador web moderno (Google Chrome, Firefox, Microsoft Edge, etc.).
2. Uma chave de API do Gemini válida (`API Key`).

---

### Passo 1: Execução Inicial e Geração do Cronograma
1. Abra o arquivo `index.html` diretamente no navegador (ou utilize um servidor local de desenvolvimento, como o Live Server do VSCode).
2. No campo **Chave da API**, insira sua chave válida do Gemini.
3. No campo **Tema de estudo**, digite um tema (ex: `Closures em JavaScript`).
4. No campo **Tempo disponível**, digite `4h/semana`.
5. Clique no botão **Gerar cronograma** e aguarde até que o cronograma semanal seja renderizado na tela.

---

### Passo 2: Geração das Explicações da Fatia 2
1. Note que o botão **Gerar perguntas de fixação** já está visível e habilitado acima da lista de tópicos.
2. Antes de clicar nele, clique no botão **Gerar todas as explicações**.
3. Deixe o processo de geração de explicações rodar de forma sequencial até que todos os tópicos tenham suas explicações preenchidas.

---

### Passo 3: Teste de Clique Precoce (Caso de Uso de Validação)
1. **Teste:** Recarregue a página, gere um novo cronograma e clique no botão **Gerar perguntas de fixação** *antes* de clicar em "Gerar todas as explicações" (ou enquanto o processo ainda estiver rodando).
2. **Resultado Esperado:** O sistema exibe um alerta ou feedback de erro no topo (ex: `"Por favor, aguarde a conclusão de todas as explicações da Fatia 2 antes de gerar as perguntas de fixação."`) e interrompe a execução sem realizar chamadas de rede para perguntas.

---

### Passo 4: Geração das Perguntas de Fixação
1. Com todas as explicações geradas com sucesso (no Passo 2), clique no botão **Gerar perguntas de fixação**.
2. **Resultados Esperados:**
   * O botão é desabilitado e seu texto muda para indicar processamento.
   * Em cada tópico, um estado de carregamento localizado (como `"Carregando perguntas..."` ou skeleton) é exibido logo abaixo da explicação correspondente.
   * As perguntas aparecem sequencialmente, tópico por tópico. Quando prontas, cada bloco exibe exatamente 3 perguntas de múltipla escolha com 4 alternativas cada.

---

### Passo 5: Resolução Interativa de Questões e Acessibilidade
1. **Interação com Alternativa Correta:**
   * Clique na alternativa que você julgar correta.
   * **Resultado Esperado:** O botão clicado fica verde, exibe um ícone/sufixo `[✓ Correta]` e todos os botões daquela pergunta específica ficam desabilitados.
2. **Interação com Alternativa Incorreta:**
   * Em outra pergunta, clique em uma alternativa incorreta.
   * **Resultado Esperado:** O botão clicado fica vermelho, exibe o indicador `[✗ Sua resposta]`, enquanto o botão correto correspondente fica verde com o indicador `[✓ Correta]`. Todos os botões daquela pergunta são desabilitados.
3. **Validação de Teclado:**
   * Use a tecla `Tab` para navegar até as perguntas. O foco visual deve destacar o contorno do botão selecionado (se a navegação via teclado estiver ativa).
   * Pressione `Espaço` ou `Enter` para responder e verifique se o feedback visual e de texto funciona idêntico ao clique do mouse.
