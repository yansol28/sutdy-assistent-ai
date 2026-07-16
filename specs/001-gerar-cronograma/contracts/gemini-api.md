# Interface Contract: Geração de Cronograma

Esta funcionalidade consome a API externa do Gemini. O contrato abaixo define a interação esperada.

## Requisição

- **Método**: POST
- **URL**: `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent?key=YOUR_API_KEY`
- **Headers**: 
  - `Content-Type`: `application/json`
- **Corpo (Payload)**:
```json
{
  "contents": [
    {
      "parts": [
        {
          "text": "Você é um especialista em planejamento de estudos. Dado o tema: {tema} e o tempo disponível: {tempo}. Gere um cronograma de estudo dividido por semana, com tópicos específicos. Responda APENAS em formato JSON estruturado com a seguinte estrutura: {'semanas': [{'semana': 1, 'topicos': [{'nome': '...', 'tempo_estimado': '...', 'justificativa': '...'}]}]}"
        }
      ]
    }
  ]
}
```

## Resposta

- **Formato**: JSON (conforme definido em `data-model.md`)
- **Status Code**: 200 OK em caso de sucesso.
- **Tratamento de erro**: O frontend deve tratar erros HTTP (4xx, 5xx) e respostas JSON malformadas exibindo uma mensagem amigável ao usuário.
