// ui.js - Utilitários de UI
const feedback = document.getElementById('feedback');

export function exibirCarregamento(estaCarregando) {
  feedback.textContent = estaCarregando ? 'Gerando cronograma...' : '';
}

export function exibirErro(mensagem) {
  feedback.textContent = `Erro: ${mensagem}`;
}
