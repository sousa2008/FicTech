# 🧠 Contexto do Projeto: FicTech (Startup Acadêmica)

> **Aviso para IAs e LLMs:** Leia este documento inteiramente antes de sugerir ou gerar qualquer código para este repositório. Este arquivo contém o histórico de decisões técnicas, o design system e os objetivos de negócio da startup.

## 🎯 1. Visão Geral e Negócio
A **FicTech** é uma startup acadêmica criada como parte do projeto de curricularização de extensão do curso de Análise e Desenvolvimento de Sistemas (ADS) do **IFSP - Campus Guarulhos**. 
* **Missão:** Desenvolver soluções tecnológicas inteligentes, aproximando a engenharia de software acadêmica das demandas reais da comunidade e empresas de Guarulhos.
* **Ações de Extensão Ofertadas:** Consultoria, Capacitação, Prestação de Serviço e Projetos de Engenharia.

## 📜 2. Histórico e Decisões Técnicas (O que já fizemos)
Para entender a estrutura atual, é crucial conhecer nossa trajetória:
* **Fase 1 (Nota 10):** Configuramos com sucesso o repositório no GitHub e a Integração Contínua (CI) com a hospedagem via cPanel (`fictech.simplifica.gru.br`).
* **Resolução de Infraestrutura:** Nosso servidor roda **LiteSpeed** (PHP). Tivemos problemas de erro 404 devido a permissões estritas (700) geradas por conflitos de Git. Atualmente, o padrão exigido no servidor é pasta raiz com permissão `0755` e arquivos com `0644`.
* **Evolução do Design (Adeus "AI Slop"):** A primeira versão da landing page possuía um layout genérico (imagens fora de contexto, botões mal posicionados). Substituímos isso através de um Pull Request (PR) por um layout Dark Mode profissional, focado em tecnologia acadêmica. Arquivos lixo da versão antiga (`personas.html` e `quem-somos.html` mal formatados) foram removidos com `git rm`.
* **Fluxo de Trabalho Git:** Aprendemos a duras penas que o comando `git push --force` quebra o pipeline do cPanel. **Regra de Ouro:** Ninguém faz commit na `main`. Todo desenvolvimento acontece em branches (`feat/`, `fix/`, `chore/`) e a integração é feita via Pull Request após revisão do Scrum Master (Lucas).

## 📍 3. Estado Atual (Onde estamos)
Neste momento, estamos no meio da **Fase 1.5**. 
A branch `main` possui o novo layout da página principal (`index.html`) com o *Design System* correto (cabeçalho pílula, hero section impactante). Contudo, o projeto ainda contém dados de marcação (placeholders) e as subpáginas ainda estão sendo desenvolvidas em branches paralelas pela equipe de front-end.

## 🚀 4. Roadmap: O que falta para 100% (Prazo: 17/11)
Para cumprir os requisitos exatos do professor, as seguintes tarefas precisam ser codificadas e integradas à `main`:

### Front-end (HTML/CSS)
- [x] **Home (`index.html`):** Trocar a imagem de fundo atual por uma foto real da equipe no IFSP Guarulhos. Configurar os links dos 4 cards de extensão para a página "Quem Somos".
- [ ] **Validar necessidade das páginas abaixo**
- [ ] **Página "Quem Somos" (`quem-somos.html`):** Criar a página detalhando a história da FicTech ligada à extensão do IFSP, e criar as 4 seções detalhando as ações de extensão.
- [ ] **Página "Personas" (`personas.html`):** Criar a página de apresentação detalhada de cada membro da equipe (Lucas, João, Enzo, Gustavo, Nikolas), linkando com os cards da Home.
- [ ] **Responsividade:** Garantir que o Glassmorphism e os paddings funcionem perfeitamente em telas mobile.

### Back-end e Infraestrutura (PHP/MySQL) 
- [ ] **Esperar Front-end ser devidamente concluido/validado**
- [ ] **Formulário de Contato (`contato.php`):** Criar a página com campos de Nome, E-mail, Assunto e Conteúdo.
- [ ] **Banco de Dados:** Criar um BD MySQL no cPanel com o nome da startup.
- [ ] **Integração PHP:** Fazer o formulário inserir os dados na tabela do MySQL e preparar lógica para notificar o Scrum Master.

## 🎨 5. Design System (Regras Visuais para a IA)
Qualquer novo componente gerado deve respeitar as seguintes regras CSS:
* **Tema:** Dark Mode.
* **Fundo Principal:** `#090511` (Dark Deep Space).
* **Superfícies/Cards:** Efeito Glassmorphism -> `background: rgba(19, 12, 36, 0.75); backdrop-filter: blur(16px);`.
* **Cores de Destaque:** Roxo Vibrante (`#7B2CBF`) e Roxo Neon (`#9D4EDD`).
* **Texto:** Cor principal clara (`#F3F0F9`) e secundária silenciada (`#A39BB0`).
* **Estilo:** Semântica HTML rigorosa, design limpo, cantos arredondados (border-radius 20px+ em cards) e visual high-tech.