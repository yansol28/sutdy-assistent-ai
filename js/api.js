// api.js - Cliente API Gemini

// Helper para limpar resposta JSON da API
function limparRespostaJson(textoResposta) {
  const inicioJson = textoResposta.indexOf('{');
  const fimJson = textoResposta.lastIndexOf('}') + 1;

  if (inicioJson === -1 || fimJson === 0) {
    throw new Error('A resposta da API não contém um objeto JSON válido.');
  }

  const textoLimpo = textoResposta.substring(inicioJson, fimJson).trim();
  return JSON.parse(textoLimpo);
}

export async function gerarCronograma(chaveApi, tema, tempo) {
  const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-3.1-flash-lite:generateContent?key=${chaveApi}`;

  const prompt = `Você é um especialista em planejamento de estudos.
  Dado o tema: ${tema}
  E o tempo disponível: ${tempo}
  Gere um cronograma de estudo dividido por semana, com tópicos específicos.
  Responda APENAS em formato JSON estruturado com a seguinte estrutura: 
  {"semanas": [{"semana": 1, "topicos": [{"nome": "...", "tempo_estimado": "...", "justificativa": "..."}]}]}`;

  const response = await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ contents: [{ parts: [{ text: prompt }] }] })
  });

  if (!response.ok) {
    throw new Error('Erro na chamada da API. Verifique a chave de API e tente novamente.');
  }

  const data = await response.json();
  return limparRespostaJson(data.candidates[0].content.parts[0].text);
}

export async function gerarExplicacao(chaveApi, tema, topico) {
  const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-3.1-flash-lite:generateContent?key=${chaveApi}`;

  const prompt = `Você é um especialista em didática.
  Dado o tema: ${tema}
  E o tópico do cronograma: ${topico}

  Explique este tópico de forma clara e direta, focando no conteúdo em si.
  Ao final da explicação, inclua uma analogia curta do dia a dia (1-2 frases) 
  para reforçar o entendimento — a analogia é um complemento, não o foco 
  principal do texto.
  O conteúdo deve ser compreensível por uma pessoa leiga, sem termos técnicos 
  não explicados, sem jargão desnecessário.
  Responda em texto corrido, sem markdown (sem asteriscos, sem títulos, sem 
  listas), sem introdução ou saudação, em no máximo 2 parágrafos curtos.`;

  const response = await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ contents: [{ parts: [{ text: prompt }] }] })
  });

  if (!response.ok) {
    throw new Error(`Erro ao gerar explicação para: ${topico}`);
  }

  const data = await response.json();
  return data.candidates[0].content.parts[0].text;
}

export async function gerarPerguntas(chaveApi, tema, topico) {
  const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-3.1-flash-lite:generateContent?key=${chaveApi}`;

  const prompt = `Você é um especialista em avaliação educacional.
  Dado o tema: ${tema}
  E o tópico: ${topico}

  Gere 3 perguntas de fixação para este tópico.
  Cada pergunta deve ter 4 alternativas (A, B, C, D), sendo apenas uma correta.
  Responda APENAS em formato JSON estruturado com a seguinte estrutura: 
  {"perguntas": [{"pergunta": "...", "alternativas": [{"texto": "...", "correta": true/false}], "explicacao": "..."}]}`;

  const response = await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ contents: [{ parts: [{ text: prompt }] }] })
  });

  if (!response.ok) {
    throw new Error(`Erro ao gerar perguntas para: ${topico}`);
  }

  const data = await response.json();
  return limparRespostaJson(data.candidates[0].content.parts[0].text);
}