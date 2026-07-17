import { describe, it, expect } from 'vitest';

// Função com a lógica atualizada para aceitar acentuação
function obterChaveProgresso(tema, tempo, nomeTopico) {
  const chaveBruta = `${tema}:${tempo}:${nomeTopico}`;
  
  // O \p{L} junto com a flag 'u' garante que letras com acento fiquem intactas
  const chaveSanitizada = chaveBruta
    .replace(/[^\p{L}0-9: ]/gu, '')
    .substring(0, 100);
    
  return `progresso:${chaveSanitizada}`;
}

describe('Testes de Gerenciamento de Progresso', () => {
  
  it('deve gerar uma chave no formato correto para o localStorage', () => {
    const chave = obterChaveProgresso('JavaScript', '4 semanas', 'Variáveis');
    expect(chave).toBe('progresso:JavaScript:4 semanas:Variáveis');
  });

  it('deve remover caracteres especiais perigosos do nome do tópico', () => {
    const chave = obterChaveProgresso('HTML', '1 semana', 'Tags <div> & <p>!!');
    expect(chave).toBe('progresso:HTML:1 semana:Tags div  p');
  });
  
});