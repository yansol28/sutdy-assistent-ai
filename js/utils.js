// js/utils.js
export function obterChaveProgresso(tema, tempo, nomeTopico) {
  const chaveBruta = `${tema}:${tempo}:${nomeTopico}`;
  
  // Regex atualizada com suporte a acentos que mantém o Vitest funcionando
  const chaveSanitizada = chaveBruta
    .replace(/[^\p{L}0-9: ]/gu, '')
    .substring(0, 100);
    
  return `progresso:${chaveSanitizada}`;
}