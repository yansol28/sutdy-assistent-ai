// ui.js - Utilitários de UI
const feedback = document.getElementById('feedback');

export function exibirCarregamento(estaCarregando) {
  feedback.textContent = estaCarregando ? 'Gerando cronograma...' : '';
}

export function exibirErro(mensagem) {
  feedback.textContent = `Erro: ${mensagem}`;
}

export function exibirCarregamentoPerguntas(estaCarregando, container) {
  const loaderId = `loader-${container.id}`;
  if (estaCarregando) {
    // Evita usar innerHTML += para não destruir referências do DOM
    const loader = document.createElement('p');
    loader.id = loaderId;
    loader.textContent = 'Carregando perguntas...';
    container.appendChild(loader);
  } else {
    const loader = document.getElementById(loaderId);
    if (loader) loader.remove();
  }
}

export function exibirPerguntas(perguntas, container) {
  let html = '<h4>Perguntas de Fixação</h4>';
  perguntas.forEach((p, idx) => {
    // Usamos o ID do container para criar IDs de perguntas 100% únicos (ex: p-exp-s0-t0-0)
    const perguntaId = `p-${container.id}-${idx}`;
    html += `
      <div class="pergunta" id="${perguntaId}">
        <p>${p.pergunta}</p>
        <div class="alternativas-grupo">
          ${p.alternativas.map((alt, altIdx) => `
            <button class="alternativa" data-correta="${alt.correta}">${alt.texto}</button>
          `).join('')}
        </div>
      </div>`;
  });
  
  // Cria um elemento div seguro para injetar o HTML em vez de usar += no container pai
  const divPerguntas = document.createElement('div');
  divPerguntas.innerHTML = html;
  container.appendChild(divPerguntas);
}

export function processarResposta(button, container) {
  const alternativas = container.querySelectorAll('.alternativa');
  alternativas.forEach(a => a.disabled = true);

  const correta = button.dataset.correta === 'true';
  if (correta) {
    button.classList.add('feedback-success');
    button.innerHTML += ' ✓ Correta';
  } else {
    button.classList.add('feedback-error');
    button.innerHTML += ' ✗ Incorreta';
    
    // Destaque a correta também
    const corretaBtn = Array.from(alternativas).find(a => a.dataset.correta === 'true');
    if (corretaBtn) {
      corretaBtn.classList.add('feedback-success');
      corretaBtn.innerHTML += ' ✓ Correta';
    }
  }
}
