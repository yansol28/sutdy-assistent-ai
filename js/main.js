// main.js - Lógica principal
import { gerarCronograma, gerarExplicacao, gerarPerguntas } from './api.js';
import { exibirCarregamento, exibirErro, exibirCarregamentoPerguntas, exibirPerguntas, processarResposta, atualizarIndicadorProgresso } from './ui.js';
import { obterChaveProgresso } from './utils.js';

const form = document.getElementById('formCronograma');
const containerCronograma = document.getElementById('cronograma');
const CHAVE_API_GEMINI = "AQ.Ab8RN6LsVyZ4w8H0a7Uk23QbeiPf49rufjUZaBgEXSjRPDDJDQ";

let cronogramaAtual = null;

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

function resetarFatiasSubsequentes() {
  atualizarIndicadorProgresso(0, 0);
}

// Event Delegation para alternativas das perguntas
containerCronograma.addEventListener('click', (e) => {
  if (e.target.classList.contains('alternativa')) {
    const btnAlternativa = e.target;
    const containerPergunta = btnAlternativa.closest('.pergunta');
    const topicoDiv = btnAlternativa.closest('.topico');
    
    // Processa o visual de acerto/erro (função da sua ui.js)
    processarResposta(btnAlternativa, containerPergunta);

    // Salva a alternativa que o usuário escolheu
    if (cronogramaAtual) {
      const tema = cronogramaAtual.temaUsado;
      const tempo = cronogramaAtual.tempoUsado;
      const nomeTopico = topicoDiv.getAttribute('data-nome-topico');
      
      const todasPerguntasDoTopico = Array.from(topicoDiv.querySelectorAll('.pergunta'));
      const perguntaIdx = todasPerguntasDoTopico.indexOf(containerPergunta);
      
      const todasAlternativasDaPergunta = Array.from(containerPergunta.querySelectorAll('.alternativa'));
      const alternativaIdx = todasAlternativasDaPergunta.indexOf(btnAlternativa);

      const chaveProgressoBase = obterChaveProgresso(tema, tempo, nomeTopico);
      const chaveResposta = `resp:${chaveProgressoBase}:p${perguntaIdx}`;
      localStorage.setItem(chaveResposta, alternativaIdx);
    }
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

    const btnPerguntas = topicoDiv.querySelector('.btn-gerar-perguntas-topico');
    if (btnPerguntas) {
      btnPerguntas.style.display = e.target.checked ? 'inline-block' : 'none';
    }
  }
});

// Evento de envio do Formulário (Gera novo cronograma)
form.addEventListener('submit', async (e) => {
  e.preventDefault();
  
  const chaveApi = CHAVE_API_GEMINI;
  const tema = document.getElementById('tema').value;
  const tempo = document.getElementById('tempo').value;
  
  if (!tema || !tempo) {
    exibirErro("Por favor, preencha todos os campos.");
    return;
  }
  
  try {
    exibirCarregamento(true);
    containerCronograma.innerHTML = '';
    
    resetarFatiasSubsequentes();
    
    cronogramaAtual = await gerarCronograma(chaveApi, tema, tempo);
    cronogramaAtual.temaUsado = tema;
    cronogramaAtual.tempoUsado = tempo;

    // Salva a estrutura do cronograma para persistência
    localStorage.setItem('ultimo_cronograma', JSON.stringify(cronogramaAtual));
    
    renderizarCronogramaNaTela();
    exibirCarregamento(false);
  } catch (error) {
    exibirCarregamento(false);
    exibirErro(error.message || "Erro ao gerar cronograma.");
  }
});

// FUNÇÃO ISOLADA: Renderiza o cronograma e os componentes contextuais sob demanda
function renderizarCronogramaNaTela() {
  if (!cronogramaAtual) return;

  const tema = cronogramaAtual.temaUsado;
  const tempo = cronogramaAtual.tempoUsado;

  containerCronograma.innerHTML = '';
  document.querySelector('.container').classList.add('com-conteudo');

  cronogramaAtual.semanas.forEach((s, semanaIdx) => {
    containerCronograma.innerHTML += `<h3>Semana ${s.semana}</h3>`;
    s.topicos.forEach((t, topicoIdx) => {
      const estudado = carregarProgresso(tema, tempo, t.nome);
      
      const chaveProgressoBase = obterChaveProgresso(tema, tempo, t.nome);
      const explicacaoSalva = localStorage.getItem(`exp:${chaveProgressoBase}`);
      const perguntasSalvas = localStorage.getItem(`perg:${chaveProgressoBase}`);

      containerCronograma.innerHTML += `
        <div class="topico" id="s${semanaIdx}-t${topicoIdx}" data-nome-topico="${t.nome}">
          <p><strong>${t.nome}</strong> (${t.tempo_estimado})<br>
          ${t.justificativa}</p>
          
          <button class="btn-explicar-topico" style="padding: 5px 10px; font-size: 12px; background: #475569; margin-bottom: var(--space-2); border-radius: 4px;">
            ${explicacaoSalva ? 'Explicação Pronta' : 'Ver explicação com IA'}
          </button>
          
          <div class="explicacao-container" id="exp-s${semanaIdx}-t${topicoIdx}">
            ${explicacaoSalva ? `<p><strong>Explicação:</strong> ${explicacaoSalva}</p>` : ''}
          </div>
          
          <div class="controle-estudo" style="margin-top: var(--space-2);">
            <input type="checkbox" id="check-s${semanaIdx}-t${topicoIdx}" class="check-estudado" ${estudado ? 'checked' : ''}>
            <label for="check-s${semanaIdx}-t${topicoIdx}">Marcar como estudado</label>
            
            <button class="btn-gerar-perguntas-topico" style="display: ${estudado ? 'inline-block' : 'none'}; margin-left: var(--space-2); padding: 5px 10px; font-size: 12px;">
              ${perguntasSalvas ? 'Perguntas Prontas' : 'Gerar perguntas de fixação'}
            </button>
          </div>

          <div class="perguntas-container" id="perg-s${semanaIdx}-t${topicoIdx}"></div>
        </div>`;

      if (perguntasSalvas) {
        setTimeout(() => {
          const containerPerg = document.getElementById(`perg-s${semanaIdx}-t${topicoIdx}`);
          if (containerPerg) {
            exibirPerguntas(JSON.parse(perguntasSalvas), containerPerg);
            
            // Recupera e marca a alternativa que o usuário já tinha respondido
            const perguntasRenderizadas = containerPerg.querySelectorAll('.pergunta');
            perguntasRenderizadas.forEach((containerPergunta, perguntaIdx) => {
              const chaveResposta = `resp:${chaveProgressoBase}:p${perguntaIdx}`;
              const alternativaSalvaIdx = localStorage.getItem(chaveResposta);
              
              if (alternativaSalvaIdx !== null) {
                const alternativas = containerPergunta.querySelectorAll('.alternativa');
                const botaoParaClicar = alternativas[parseInt(alternativaSalvaIdx)];
                if (botaoParaClicar) {
                  processarResposta(botaoParaClicar, containerPergunta);
                }
              }
            });
          }
        }, 0);
      }
    });
  });

  recalcularProgresso();
}

// Event Delegation para ações de botões contextuais (Explicações e Perguntas)
containerCronograma.addEventListener('click', async (e) => {
  const chaveApi = CHAVE_API_GEMINI;
  const tema = cronogramaAtual ? cronogramaAtual.temaUsado : '';
  const tempo = cronogramaAtual ? cronogramaAtual.tempoUsado : '';

  if (e.target.classList.contains('btn-explicar-topico')) {
    const btn = e.target;
    const topicoDiv = btn.closest('.topico');
    const nomeTopico = topicoDiv.getAttribute('data-nome-topico');
    const containerExplicacao = topicoDiv.querySelector('.explicacao-container');

    btn.disabled = true;
    btn.textContent = 'Explicando...';

    try {
      containerExplicacao.innerHTML = `<p style="font-size:13px; color:var(--muted);">Buscando explicação na IA...</p>`;
      const explanation = await gerarExplicacao(chaveApi, tema, nomeTopico);
      containerExplicacao.innerHTML = `<p><strong>Explicação:</strong> ${explanation}</p>`;
      btn.textContent = 'Explicação Pronta';

      const chaveExp = `exp:${obterChaveProgresso(tema, tempo, nomeTopico)}`;
      localStorage.setItem(chaveExp, explanation);

    } catch (error) {
      containerExplicacao.innerHTML = '';
      btn.disabled = false;
      btn.textContent = 'Tentar novamente';
      console.error(error);
    }
  }

  if (e.target.classList.contains('btn-gerar-perguntas-topico')) {
    const btn = e.target;
    const topicoDiv = btn.closest('.topico');
    const nomeTopico = topicoDiv.getAttribute('data-nome-topico');
    const containerPerguntas = topicoDiv.querySelector('.perguntas-container');

    btn.disabled = true;
    btn.textContent = 'Gerando...';

    try {
      exibirCarregamentoPerguntas(true, containerPerguntas);
      const dados = await gerarPerguntas(chaveApi, tema, nomeTopico);
      exibirCarregamentoPerguntas(false, containerPerguntas);
      exibirPerguntas(dados.perguntas, containerPerguntas);
      btn.textContent = 'Perguntas Prontas';

      const chavePerg = `perg:${obterChaveProgresso(tema, tempo, nomeTopico)}`;
      localStorage.setItem(chavePerg, JSON.stringify(dados.perguntas));

    } catch (error) {
      exibirCarregamentoPerguntas(false, containerPerguntas);
      btn.disabled = false;
      btn.textContent = 'Tentar novamente';
      console.error(error);
    }
  }
});

// AUTO-LOAD: Hidrata o estado da aplicação e reconstrói a interface se houver dados salvos
document.addEventListener('DOMContentLoaded', () => {
  const cronogramaSalvo = localStorage.getItem('ultimo_cronograma');
  if (cronogramaSalvo) {
    try {
      cronogramaAtual = JSON.parse(cronogramaSalvo);
      
      if (cronogramaAtual.temaUsado) document.getElementById('tema').value = cronogramaAtual.temaUsado;
      if (cronogramaAtual.tempoUsado) document.getElementById('tempo').value = cronogramaAtual.tempoUsado;
      
      renderizarCronogramaNaTela();
    } catch (e) {
      console.error("Erro ao reconstruir estado do localStorage", e);
    }
  }
});