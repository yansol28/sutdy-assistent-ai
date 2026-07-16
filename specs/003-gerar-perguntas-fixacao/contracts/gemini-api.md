# Contract: Geração de Perguntas de Fixação

**Feature**: Geração de Perguntas de Fixação | **Date**: 2026-07-16

---

## Contrato de Integração com a API do Gemini (IA)

O frontend interage diretamente com o serviço do Gemini para gerar as perguntas de fixação de forma estruturada.

### Interface do Endpoint

* **Protocolo / Método**: `POST`
* **URL**: `https://generativelanguage.googleapis.com/v1beta/models/gemini-3.1-flash-lite:generateContent?key=${chaveApi}`
* **Headers**:
  * `Content-Type: application/json`

---

### Payload da Requisição (Request Schema)

```json
{
  "contents": [
    {
      "parts": [
        {
          "text": "[Prompt Estruturado]"
        }
      ]
    }
  ]
}
```

#### Definição do Prompt Estruturado (Instruções do Sistema)
O prompt enviado na propriedade `text` deve seguir estritamente o formato abaixo para instruir o modelo a retornar um JSON puro adequado ao parseamento:

```text
Você é um professor experiente e especialista em avaliação e fixação de conteúdos.
Considerando o tema geral de estudo: "${tema}"
E a explicação específica apresentada ao estudante para o tópico "${topico}":
"${explicacao}"

Gere exatamente 3 perguntas de múltipla escolha para testar especificamente se o estudante assimilou e compreendeu os conceitos ensinados nessa explicação.
Cada pergunta deve conter exatamente 4 alternativas, das quais apenas uma é a correta.
O conteúdo das perguntas deve cobrir obrigatoriamente e exclusivamente pontos abordados na explicação fornecida, não faça perguntas genéricas ou descontextualizadas.

Responda APENAS em formato JSON estruturado seguindo exatamente a estrutura abaixo. Não use marcação markdown de bloco de código (```json), não inclua introduções, notas, textos explicativos, ou saudações antes ou depois do JSON.

Estrutura JSON esperada:
[
  {
    "enunciado": "Texto da pergunta 1",
    "alternativas": [
      "Alternativa A",
      "Alternativa B",
      "Alternativa C",
      "Alternativa D"
    ],
    "correta": 0
  },
  {
    "enunciado": "Texto da pergunta 2",
    "alternativas": [
      "Alternativa A",
      "Alternativa B",
      "Alternativa C",
      "Alternativa D"
    ],
    "correta": 2
  },
  {
    "enunciado": "Texto da pergunta 3",
    "alternativas": [
      "Alternativa A",
      "Alternativa B",
      "Alternativa C",
      "Alternativa D"
    ],
    "correta": 1
  }
]
```

---

### Payload da Resposta (Response Schema)

#### Formato Recebido da API do Gemini:
```json
{
  "candidates": [
    {
      "content": {
        "parts": [
          {
            "text": "[{\"enunciado\": \"Texto da pergunta 1\", \"alternativas\": [\"Alternativa A\", \"Alternativa B\", \"Alternativa C\", \"Alternativa D\"], \"correta\": 0}, ...]"
          }
        ]
      }
    }
  ]
}
```

#### Processamento do JSON no Cliente (Higienização):
Antes de alimentar o método `JSON.parse()`, a propriedade `text` recebida deve passar pela regex de higienização de fences de markdown para mitigar eventuais respostas fora de padrão geradas pela IA:

```javascript
const textoLimpo = textoResposta.replace(/```json/g, '').replace(/```/g, '').trim();
const perguntas = JSON.parse(textoLimpo);
```
