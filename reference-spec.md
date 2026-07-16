# Spec: Assistente de Estudos com IA

## 1. Problema
Aprender um novo assunto sozinho é difícil de organizar: não se sabe por onde
começar, quanto tempo dedicar a cada parte, nem como saber se o conteúdo foi
realmente compreendido.

## 2. Objetivo do produto
Permitir que qualquer pessoa digite um tema e receba, gerado por IA:
um cronograma de estudo, explicações simplificadas do conteúdo e perguntas
de fixação — sem precisar montar nada disso manualmente.

## 3. Público-alvo
Qualquer pessoa estudando por conta própria (concurso, faculdade, nova
habilidade profissional, etc.). Não é específico de nicho — isso o torna
mais rápido de construir e mais fácil de explicar em entrevista.

## 4. Funcionalidades, divididas em fatias verticais (vertical slicing)

Cada fatia abaixo é um pedaço PEQUENO, mas COMPLETO (ponta a ponta) do
produto. A ideia é: termine a Fatia 1 funcionando de verdade antes de
começar a Fatia 2. Isso é o oposto de "construir todo o backend primeiro,
depois todo o frontend".

### Fatia 1 — MVP (fazer primeiro, é o mínimo que já entrega valor)
- Input: usuário digita um tema e quanto tempo/semana tem disponível
- Output: a IA gera um cronograma de estudo (dividido por semana/dia)
- Critério de aceite: o cronograma é específico (não genérico) e realista
  para o tempo informado

### Fatia 2 — Explicações
- Para cada tópico do cronograma, a IA gera uma explicação simples,
  usando analogias, do que precisa ser estudado
- Critério de aceite: uma pessoa leiga no assunto entende a explicação
  sem pesquisar termos extras

### Fatia 3 — Fixação
- Para cada tópico, a IA gera 3-5 perguntas de múltipla escolha para o
  usuário testar o que aprendeu
- Critério de aceite: as perguntas realmente cobram o conteúdo explicado
  na Fatia 2, não são genéricas

### Fatia 4 — Acompanhamento (opcional, só se sobrar tempo)
- Usuário marca o que já estudou; sistema guarda esse progresso
- Critério de aceite: ao reabrir o app, o progresso salvo anteriormente
  ainda está lá

## 5. Fluxo de uso (Fatia 1, o essencial)
1. Usuário abre o app
2. Digita o tema (ex: "Lógica de Programação") e o tempo disponível
   (ex: "5 horas por semana, durante 3 semanas")
3. Clica em "Gerar cronograma"
4. A IA retorna um plano dividido por semana e dia
5. Usuário visualiza o plano na tela

## 6. Stack sugerida (simples, rápida de subir)
- Frontend: HTML/CSS/JS simples, ou React se já tiver familiaridade
- IA: API do DeepSeek ou Claude (chamada direta via fetch)
- Sem necessidade de banco de dados na Fatia 1 (fica só em memória/tela)
- Deploy: Vercel (gratuito e simples)

## 7. Prompt-base para a IA 
```
Você é um especialista em planejamento de estudos.
Dado o tema: {tema}
E o tempo disponível: {tempo}

Gere um cronograma de estudo dividido por semana e dia, com:
- Tópicos específicos (não genéricos) a estudar em cada sessão
- Tempo estimado por tópico
- Uma breve justificativa da ordem escolhida (do mais fundamental ao mais avançado)

Responda em formato de lista, organizado por semana.
```

## 8. O que NÃO está no escopo do MVP
- Login de usuário
- Upload de arquivos/editais
- Banco de dados persistente
- Design sofisticado


