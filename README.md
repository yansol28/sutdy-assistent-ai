Markdown
# Assistente de Estudos Inteligente (SPA) 🚀

Uma Single Page Application (SPA) responsiva e acessível que utiliza Inteligência Artificial para automatizar o ciclo completo de aprendizagem: desde o planejamento macro (cronogramas) até a micro-aprendizagem (explicações didáticas) e a validação ativa de conhecimento (simulados interativos).

Este projeto foi construído sob uma abordagem rigorosa de **Engenharia de Software**, guiado por especificações técnicas formais (**Spec-Driven Development - SDD**), separação estrita de conceitos e fatiamento vertical de entregáveis.

---

##  Decisões de Arquitetura e Fluxo de Dados

A aplicação foi estruturada utilizando JavaScript moderno (ES6+ Modules) sem dependências externas de frameworks (Vanilla JS), garantindo carregamento instantâneo, portabilidade e acoplamento zero.

### Divisão de Responsabilidades (Princípio de Responsabilidade Única - SRP)

## 🧱 Estrutura do Projeto

```text
├── css/
│   └── style.css            # Estilização moderna e responsiva
├── js/
│   ├── api.js               # Cliente de integração com a API do Gemini
│   ├── ui.js                # Manipulação limpa do DOM e utilitários
│   ├── main.js              # Orquestrador da lógica de estado e fluxos
│   └── foco-teclado.js      # Script de acessibilidade para navegação por teclado
└── index.html               # Estrutura semântica da aplicação

🛠️ Detalhamento Técnico das Atividades Realizadas
O desenvolvimento foi dividido de forma incremental através de Fatiamento Vertical (Vertical Slicing), garantindo que cada fase entregasse valor real e testável de ponta a ponta:

🔹 Fatia 1: Setup, Fundação do DOM e Geração de Cronogramas
Construção da Base Semântica: Criação do index.html aplicando tags semânticas do HTML5, garantindo leituras de tela estruturadas e foco acessível nativo.

Estilização Responsiva (style.css): Interface moderna construída do zero, adaptando-se a dispositivos móveis e desktops, com feedback visual claro para interações do usuário.

Integração Base com Gemini API: Desenvolvimento da função gerarCronograma utilizando o modelo gemini-3.1-flash-lite. Implementação de prompts otimizados para garantir o retorno estrito de um payload JSON contendo semanas, tópicos, tempo estimado e justificativa de aprendizado.

Parser de Resiliência JSON: Implementação de um método robusto de extração sintática (limparRespostaJson) que utiliza indexação por caracteres (indexOf/lastIndexOf) para limpar invólucros Markdown (como blocks ```json) enviados incorretamente pelo modelo de linguagem.

🔹 Fatia 2: Explicações Didáticas sob Demanda e Encapsulamento
Motor de Consumo Sequencial: Desenvolvimento de um laço síncrono controlado em main.js que processa individualmente cada tópico gerado na Fatia 1. Isso garante que o usuário veja o progresso em tempo real ("Explicando 1 de N...") sem sobrecarregar a interface.

Engenharia de Prompt para Didática: Configuração refinada do modelo de linguagem para forçar explicações concisas (máximo de 2 parágrafos), sem jargões e enriquecidas com uma analogia cotidiana curta no final para fixação cognitiva rápida.

Proteção contra Loops Infinitos: Estruturação de um bloco try/catch interno para que a falha na chamada de uma explicação não interrompa a execução ou congele as explicações dos tópicos subsequentes.

🔹 Fatia 3: Perguntas de Fixação e Conciliação Dinâmica de Estado
Geração de Questionários: Implementação da chamada de IA para criar 3 perguntas de múltipla escolha com 4 alternativas cada, retornadas em estrutura de dados JSON tipificada.

Renderização Dinâmica Não-Destrutiva: Criação de elementos filhos no DOM via document.createElement e appendChild nas funções de carregamento de perguntas (exibirCarregamentoPerguntas e exibirPerguntas). Essa abordagem impede o uso cumulativo de innerHTML +=, evitando a destruição de referências de eventos e estados ativos em outros nós da árvore do DOM.

Segurança de Escopo de Identificadores: Prevenção de colisões de IDs no escopo do documento através da injeção de identificadores únicos gerados de forma combinada a partir do ID do container (p-exp-s{Semana}-t{Topico}-{Index}).

Ciclo de Vida de Estado e Reset: Resolução do bug de persistência visual. Implementação da função resetarFatiasSubsequentes integrada ao evento de submit do formulário de novo tema. O sistema limpa de forma limpa o cronograma antigo, oculta botões órfãos e redefine as propriedades de ativação de etapas futuras sem demandar reloads (F5) de página.

🔹 Fatia 4: Persistência Local e Acompanhamento de Progresso (localStorage)
Implementação da persistência de estado do usuário sem dependência de banco de dados remoto, garantindo que o ciclo de aprendizado seja contínuo e mensurável.

*   **UI/UX Reactiva:** Introdução de checkboxes acessíveis em cada tópico do cronograma gerado e de um indicador de progresso dinâmico (ex: *"3 de 8 tópicos estudados"*).
*   **Engine de Persistência Local:** Modelagem de chaves estruturadas no `localStorage` geradas através da tupla composta por `[Tema + Tempo Disponível]`.
*   **Algoritmo de Reconciliação de Estado:** Sistema que reconcilia o payload assíncrono retornado pela API do Gemini com o estado armazenado localmente. Caso a IA gere pequenas variações de tópicos, o sistema realiza o mapeamento exato por correspondência de strings, garantindo que apenas os tópicos validados e idênticos apareçam como concluídos (resiliência contra alucinações ou variações de geração).
*   **Acessibilidade (WCAG 1.4.1 / 2.1):** Controles de progresso operáveis via teclado (foco visual claro e ativação por `Space`/`Enter`) e anúncios de mudança de estado via ARIA Live Regions (garantindo que leitores de tela anunciem dinamicamente quando um tópico é concluído e o progresso geral é atualizado).

♿ Conformidade e Acessibilidade (Padrões WCAG 1.4.1)
O projeto foi submetido a rigorosos testes de usabilidade, atendendo especificamente à diretriz WCAG 1.4.1 (Uso de Cores):

Independência de Canal Visual: Os botões de alternativa não utilizam apenas a cor (verde para correto, vermelho para incorreto) para sinalizar o resultado da resposta.

Indicadores Textuais Explícitos: Após a seleção, o texto interno do botão recebe dinamicamente os prefixos ✓ Correta ou ✗ Incorreta. Isso garante que daltônicos, usuários com baixa visão ou leitores de tela identifiquem instantaneamente o sucesso ou falha na questão.

Feedback Inclusivo de Correção: Ao errar uma pergunta, o botão correto correspondente também é revelado com estilo de sucesso e o indicador textual ✓ Correta, auxiliando o processo pedagógico do estudante sem impor barreiras de acessibilidade.

Gerenciamento de Foco por Teclado: Integração do script js/foco-teclado.js para assegurar fluxo lógico de navegação (tabulação de teclado) em botões dinâmicos e formulários.

⚙️ Especificação Tecnológica de Integração
A comunicação externa é realizada de forma nativa através da Fetch API, estruturada sob as seguintes especificações técnicas da API do Gemini:

Endpoint: [https://generativelanguage.googleapis.com/v1beta/models/gemini-3.1-flash-lite:generateContent?key=](https://generativelanguage.googleapis.com/v1beta/models/gemini-3.1-flash-lite:generateContent?key=){API_KEY}

Método: POST

Headers: Content-Type: application/json

Limitação de Cota Tratada (TPM): O sistema prevê a volumetria de requisições de cotas em planos gratuitos (250k Tokens Por Minuto). O fatiamento das tarefas e a redução de contextos redundantes evitam o erro de exaustão de recurso (HTTP 429 Resource Exhausted).

🚀 Instruções para Instalação e Execução Local
Pré-requisitos
Por utilizar ES6 Modules (import/export), o navegador exige que os scripts sejam executados sob um protocolo HTTP seguro e não diretamente via sistema de arquivos (file://).

Clonar o Repositório:

Bash
git clone https://github.com/SEU_USUARIO/NOME_DO_REPOSITORIO.git
cd NOME_DO_REPOSITORIO
Inicializar o Servidor Local:

Se você utiliza o VS Code, clique com o botão direito no index.html e selecione "Open with Live Server".

Caso prefira utilizar o terminal, execute o módulo de servidor nativo do Python:

Bash
python -m http.server 8000
Acesse em seu navegador o endereço: http://localhost:8000

Utilização:
Insira sua credencial de API do Gemini (obtida via Google AI Studio) diretamente no formulário da aplicação para começar.

🌍 Deploy
A aplicação está disponível e configurada para deploy contínuo em ambiente de produção:

Deploy Host: Vercel (Frontend Estático com Módulos)

URL de Produção: [https://SEU-LINK-AQUI.vercel.app](https://SEU-LINK-AQUI.vercel.app)


