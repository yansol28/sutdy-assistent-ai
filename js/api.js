// api.js - Cliente API Gemini

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
    throw new Error('Erro na chamada da API.');
  }

  const data = await response.json();
  const textoResposta = data.candidates[0].content.parts[0].text;

  // Encontra o início e o fim do objeto JSON de forma robusta
  const inicioJson = textoResposta.indexOf('{');
  const fimJson = textoResposta.lastIndexOf('}') + 1;

  if (inicioJson === -1 || fimJson === 0) {
    throw new Error('A resposta da API não contém um objeto JSON válido.');
  }

  const textoLimpo = textoResposta.substring(inicioJson, fimJson).trim();
  return JSON.parse(textoLimpo);
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