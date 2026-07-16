// foco-teclado.js
// Detecta se o usuário está navegando via teclado (Tab) ou mouse,
// para exibir o contorno de foco apenas quando for útil (acessibilidade).
// Referência do padrão: https://github.com/WICG/focus-visible

document.addEventListener('keydown', (e) => {
  if (e.key === 'Tab') {
    document.body.classList.add('usando-teclado');
  }
});

document.addEventListener('mousedown', () => {
  document.body.classList.remove('usando-teclado');
});