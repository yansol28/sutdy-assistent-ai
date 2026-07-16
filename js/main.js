// main.js - Lógica principal
import { gerarCronograma } from './api.js';
import { exibirCarregamento, exibirErro } from './ui.js';

const form = document.getElementById('formCronograma');
const containerCronograma = document.getElementById('cronograma');

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
    
    const cronograma = await gerarCronograma(chaveApi, tema, tempo);
    
    // Renderização simples
    cronograma.semanas.forEach(s => {
      containerCronograma.innerHTML += `<h3>Semana ${s.semana}</h3>`;
      s.topicos.forEach(t => {
        containerCronograma.innerHTML += `
          <p><strong>${t.nome}</strong> (${t.tempo_estimado})<br>
          ${t.justificativa}</p>`;
      });
    });
    
    exibirCarregamento(false);
  } catch (error) {
    exibirCarregamento(false);
    exibirErro(error.message || "Erro ao gerar cronograma. Tente novamente.");
  }
});
