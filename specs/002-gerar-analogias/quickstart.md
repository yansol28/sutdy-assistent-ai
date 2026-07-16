# Quickstart: Geração de Analogias

Este guia descreve como validar a funcionalidade de geração de explicações com analogias.

## Pré-requisitos
1. Cronograma gerado pela Fatia 1.
2. Chave de API válida do Google Gemini.

## Como Rodar/Validar

### 1. Iniciar a funcionalidade
1. Gere um cronograma conforme Fatia 1.
2. **Verificação**: Um botão "Gerar todas as explicações" deve aparecer acima da lista de tópicos.

### 2. Validar Fluxo de Sucesso
1. Clique no botão "Gerar todas as explicações".
2. **Verificação**:
   - O botão deve atualizar seu texto mostrando o progresso (ex: "Explicando 1 de X...").
   - Cada explicação deve aparecer logo abaixo do tópico correspondente assim que gerada, sem esperar o restante.
   - O conteúdo da explicação deve conter analogia do dia a dia e ser leigo-compreensível.

### 3. Validar Fluxo de Erro
1. Simule uma falha na rede ou API durante a geração de um dos tópicos intermediários.
2. **Verificação**: 
   - A explicação que falhou deve mostrar uma mensagem de erro ("Erro ao gerar explicação").
   - O processo de geração deve continuar automaticamente para os tópicos seguintes.
   - O cronograma não deve ser reiniciado nem corrompido.
