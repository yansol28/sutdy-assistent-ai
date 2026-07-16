// main.js - Lógica principal
import { gerarCronograma, gerarExplicacao } from './api.js';
import { exibirCarregamento, exibirErro } from './ui.js';

const form = document.getElementById('formCronograma');
const containerCronograma = document.getElementById('cronograma');
const btnGerarExplicacoes = document.getElementById('btnGerarExplicacoes');

let cronogramaAtual = null;

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
    btnGerarExplicacoes.style.display = 'none';
    
    cronogramaAtual = await gerarCronograma(chaveApi, tema, tempo);
    
    // Renderização
    cronogramaAtual.semanas.forEach((s, semanaIdx) => {
      containerCronograma.innerHTML += `<h3>Semana ${s.semana}</h3>`;
      s.topicos.forEach((t, topicoIdx) => {
        containerCronograma.innerHTML += `
          <div class="topico" id="s${semanaIdx}-t${topicoIdx}">
            <p><strong>${t.nome}</strong> (${t.tempo_estimado})<br>
            ${t.justificativa}</p>
            <div class="explicacao-container" id="exp-s${semanaIdx}-t${topicoIdx}"></div>
          </div>`;
      });
    });
    
    exibirCarregamento(false);
    btnGerarExplicacoes.style.display = 'block';
  } catch (error) {
    exibirCarregamento(false);
    exibirErro(error.message || "Erro ao gerar cronograma.");
  }
});

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
      const explicacao = await gerarExplicacao(chaveApi, tema, t.nome);
      container.innerHTML = `<p><strong>Explicação:</strong> ${explicacao}</p>`;
    } catch (error) {
      container.innerHTML = `<p style="color:red;">Erro ao gerar explicação.</p>`;
    }
  }
  
  btnGerarExplicacoes.textContent = 'Concluído';
});
