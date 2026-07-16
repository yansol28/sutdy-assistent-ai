// main.js - Lógica principal
import { gerarCronograma, gerarExplicacao, gerarPerguntas } from './api.js';
import { exibirCarregamento, exibirErro, exibirCarregamentoPerguntas, exibirPerguntas, processarResposta, atualizarIndicadorProgresso } from './ui.js';

const form = document.getElementById('formCronograma');
const containerCronograma = document.getElementById('cronograma');
const btnGerarExplicacoes = document.getElementById('btnGerarExplicacoes');
const btnGerarPerguntas = document.getElementById('btnGerarPerguntas');

let cronogramaAtual = null;

// Helper para gerar chave única de progresso
function obterChaveProgresso(tema, tempo, nomeTopico) {
  const chaveBruta = `${tema}:${tempo}:${nomeTopico}`;
  // Sanitização: remove caracteres não alfa-numéricos (exceto : e espaços) e limita tamanho
  const chaveSanitizada = chaveBruta
    .replace(/[^a-zA-Z0-9: ]/g, '')
    .substring(0, 100);
  return `progresso:${chaveSanitizada}`;
}

function salvarProgresso(tema, tempo, nomeTopico, isChecked) {
  const chave = obterChaveProgresso(tema, tempo, nomeTopico);
  try {
    localStorage.setItem(chave, isChecked);
  } catch (e) {
    console.error("Erro ao salvar no localStorage", e);
  }
}

function carregarProgresso(tema, tempo, nomeTopico) {
  const chave = obterChaveProgresso(tema, tempo, nomeTopico);
  const valor = localStorage.getItem(chave);
  return valor === "true";
}

function recalcularProgresso() {
  const checkboxes = document.querySelectorAll('.check-estudado');
  const total = checkboxes.length;
  const estudados = Array.from(checkboxes).filter(c => c.checked).length;
  atualizarIndicadorProgresso(total, estudados);
}

// Função para resetar as Fatias 2 e 3 quando um novo cronograma é solicitado
function resetarFatiasSubsequentes() {
  if (btnGerarExplicacoes) {
    btnGerarExplicacoes.textContent = 'Gerar todas as explicações';
    btnGerarExplicacoes.disabled = false;
    btnGerarExplicacoes.style.display = 'none';
  }

  if (btnGerarPerguntas) {
    btnGerarPerguntas.textContent = 'Gerar perguntas de fixação';
    btnGerarPerguntas.disabled = false;
    btnGerarPerguntas.style.display = 'none';
  }
  
  // Limpa indicador
  atualizarIndicadorProgresso(0, 0);
}

// Event Delegation para alternativas das perguntas
containerCronograma.addEventListener('click', (e) => {
  if (e.target.classList.contains('alternativa')) {
    const containerPergunta = e.target.closest('.pergunta');
    processarResposta(e.target, containerPergunta);
  }
});

// Event Delegation para checkboxes de progresso
containerCronograma.addEventListener('change', (e) => {
  if (e.target.classList.contains('check-estudado')) {
    const tema = cronogramaAtual.temaUsado;
    const tempo = cronogramaAtual.tempoUsado;
    const topicoDiv = e.target.closest('.topico');
    const nomeTopico = topicoDiv.querySelector('strong').textContent;
    
    salvarProgresso(tema, tempo, nomeTopico, e.target.checked);
    recalcularProgresso();
  }
});

// Evento de envio do Formulário (Gera novo cronograma)
form.addEventListener('submit', async (e) => {
  e.preventDefault();
  
  const chaveApi = document.getElementById('chaveApi').value;
  const tema = document.getElementById('tema').value;
  const tempo = document.getElementById('tempo').value;
  
  if (!chaveApi || !tema || !tempo) {
    exibirErro("Por favor, preencha todos os campos.");
    return;
  }
  
  try {
    exibirCarregamento(true);
    containerCronograma.innerHTML = '';
    
    // Reseta botões e estados antigos antes de iniciar a nova requisição
    resetarFatiasSubsequentes();
    
    cronogramaAtual = await gerarCronograma(chaveApi, tema, tempo);
    cronogramaAtual.temaUsado = tema;
    cronogramaAtual.tempoUsado = tempo;
    
    // Renderização do Cronograma
    cronogramaAtual.semanas.forEach((s, semanaIdx) => {
      containerCronograma.innerHTML += `<h3>Semana ${s.semana}</h3>`;
      s.topicos.forEach((t, topicoIdx) => {
        const estudado = carregarProgresso(tema, tempo, t.nome);
        containerCronograma.innerHTML += `
          <div class="topico" id="s${semanaIdx}-t${topicoIdx}">
            <p><strong>${t.nome}</strong> (${t.tempo_estimado})<br>
            ${t.justificativa}</p>
            <div class="explicacao-container" id="exp-s${semanaIdx}-t${topicoIdx}"></div>
            <input type="checkbox" id="check-s${semanaIdx}-t${topicoIdx}" class="check-estudado" ${estudado ? 'checked' : ''}>
            <label for="check-s${semanaIdx}-t${topicoIdx}">Marcar como estudado</label>
            <div class="perguntas-container" id="perg-s${semanaIdx}-t${topicoIdx}"></div>
          </div>`;
      });
    });
    
    recalcularProgresso();
    exibirCarregamento(false);
    btnGerarExplicacoes.style.display = 'block';
  } catch (error) {
    exibirCarregamento(false);
    exibirErro(error.message || "Erro ao gerar cronograma.");
  }
});
// Evento: Gerar Explicações (Fatia 2)
btnGerarExplicacoes.addEventListener('click', async () => {
  const chaveApi = document.getElementById('chaveApi').value;
  const tema = document.getElementById('tema').value;
  
  const topicos = [];
  cronogramaAtual.semanas.forEach((s, semanaIdx) => {
    s.topicos.forEach((t, topicoIdx) => {
      topicos.push({ nome: t.nome, id: `exp-s${semanaIdx}-t${topicoIdx}` });
    });
  });
  
  btnGerarExplicacoes.disabled = true;
  let total = topicos.length;
  
  for (let i = 0; i < total; i++) {
    const t = topicos[i];
    const container = document.getElementById(t.id);
    btnGerarExplicacoes.textContent = `Explicando ${i + 1} de ${total}...`;
    
    try {
      const explanation = await gerarExplicacao(chaveApi, tema, t.nome);
      container.innerHTML = `<p><strong>Explicação:</strong> ${explanation}</p>`;
    } catch (error) {
      container.innerHTML = `<p style="color:red;">Erro ao gerar explicação.</p>`;
    }
  }
  
  btnGerarExplicacoes.textContent = 'Concluído';
  btnGerarPerguntas.style.display = 'block';
});

// Evento: Gerar Perguntas (Fatia 3)
btnGerarPerguntas.addEventListener('click', async () => {
  const chaveApi = document.getElementById('chaveApi').value;
  const tema = document.getElementById('tema').value;
  
  if (btnGerarExplicacoes.textContent !== 'Concluído') {
    exibirErro("Por favor, aguarde a conclusão de todas as explicações da Fatia 2 antes de gerar as perguntas de fixação.");
    return;
  }
  
  const topicos = [];
  cronogramaAtual.semanas.forEach((s, semanaIdx) => {
    s.topicos.forEach((t, topicoIdx) => {
      topicos.push({ nome: t.nome, id: `perg-s${semanaIdx}-t${topicoIdx}` });
    });
  });
  
  btnGerarPerguntas.disabled = true;
  let total = topicos.length;
  let geradosComSucesso = 0;
  
  for (let i = 0; i < total; i++) {
    const t = topicos[i];
    const container = document.getElementById(t.id);
    btnGerarPerguntas.textContent = `Gerando perguntas ${i + 1} de ${total}...`;
    
    try {
      exibirCarregamentoPerguntas(true, container);
      const dados = await gerarPerguntas(chaveApi, tema, t.nome);
      exibirCarregamentoPerguntas(false, container);
      exibirPerguntas(dados.perguntas, container);
      geradosComSucesso++;
    } catch (error) {
      exibirCarregamentoPerguntas(false, container);
      const pErro = document.createElement('p');
      pErro.style.color = 'red';
      pErro.textContent = `Erro ao gerar perguntas para este tópico.`;
      container.appendChild(pErro);
    }
  }
  
  if (geradosComSucesso === total) {
    btnGerarPerguntas.textContent = 'Perguntas Concluídas';
  } else {
    btnGerarPerguntas.textContent = 'Gerado com falhas parciais';
    btnGerarPerguntas.disabled = false; 
  }
});