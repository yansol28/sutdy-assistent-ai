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
  // Extração simples do JSON da resposta da IA
  const textoResposta = data.candidates[0].content.parts[0].text;
  const textoLimpo = textoResposta.replace(/```json/g, '').replace(/```/g, '').trim();
  return JSON.parse(textoLimpo);
}
