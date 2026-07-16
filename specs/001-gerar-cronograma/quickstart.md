# Quickstart: Geração de Cronograma de Estudo

Este guia descreve como validar a funcionalidade de geração de cronograma.

## Pré-requisitos
1. Um navegador web moderno.
2. Uma chave de API válida do Google Gemini (configurada com acesso ao modelo `gemini-1.5-flash-latest`).

## Como Rodar/Validar

### 1. Iniciar a aplicação
Abra o arquivo `index.html` em seu navegador.

### 2. Validar Fluxo de Sucesso
1. No campo "Chave de API", insira sua chave válida.
2. Preencha "Tema" (ex: "JavaScript") e "Tempo" (ex: "5 horas/semana por 3 semanas").
3. Clique em "Gerar cronograma".
4. **Verificação**:
   - Um feedback de "Gerando..." deve aparecer imediatamente.
   - O cronograma deve aparecer na tela organizado por semanas, contendo nome do tópico, tempo e justificativa.

### 3. Validar Fluxo de Erro
1. Preencha apenas o campo "Chave de API" e clique em "Gerar cronograma" (deixando tema/tempo em branco).
2. **Verificação**: O sistema deve exibir uma mensagem pedindo o preenchimento dos campos.
3. Insira uma chave de API inválida e clique em "Gerar cronograma".
4. **Verificação**: O sistema deve exibir uma mensagem de erro amigável na interface.
