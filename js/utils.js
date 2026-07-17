export function obterChaveProgresso(tema, tempo, nomeTopico) {
  const chaveBruta = `${tema}:${tempo}:${nomeTopico}`;
  
  // O \p{L} com a flag 'gu' garante que o "á" de Variáveis não suma na tela!
  const chaveSanitizada = chaveBruta
    .replace(/[^\p{L}0-9: ]/gu, '')
    .substring(0, 100);
    
  return `progresso:${chaveSanitizada}`;
}