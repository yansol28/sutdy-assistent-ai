# Data Model: Geração de Cronograma de Estudo

## Cronograma (Estrutura de Resposta da IA)

O modelo de dados segue a estrutura JSON que será recebida da API do Gemini e manipulada pelo frontend.

```json
{
  "semanas": [
    {
      "semana": 1,
      "topicos": [
        {
          "nome": "string",
          "tempo_estimado": "string",
          "justificativa": "string"
        }
      ]
    }
  ]
}
```

## Validação de Entidades

- **Cronograma**: Deve conter pelo menos uma semana.
- **Semana**: Deve conter o número da semana e uma lista de tópicos.
- **Tópico**: 
  - `nome`: Obrigatório, string não vazia.
  - `tempo_estimado`: Obrigatório, string representativa de tempo.
  - `justificativa`: Obrigatório, string explicativa sobre a importância do tópico.
