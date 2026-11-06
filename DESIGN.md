## 2. Design System (`DESIGN.md`)

### Cores
* **Fundo Principal (Dark Deep Space):** `#090511`
* **Cards e Superfícies:** `rgba(19, 12, 36, 0.75)` com efeito Glassmorphism (`backdrop-filter: blur(16px)`)
* **Cor Primária:** `#7B2CBF` (Roxo Vibrante)
* **Destaque / Accent:** `#9D4EDD` (Roxo Neon)
* **Texto Principal:** `#F3F0F9`
* **Texto Secundário / Muted:** `#A39BB0`
* **Bordas Translúcidas:** `rgba(157, 78, 221, 0.2)`

### Tipografia & Proporções
* **Fonte Padrão:** `'Plus Jakarta Sans'`, sans-serif (fallback para `Arial`)
* **Espaçamento de Seções:** Padding vertical generoso (`4rem` ou superior)
* **Arredondamento dos Cards:** `20px` a `24px`
* **Sombras:** `box-shadow: 0 20px 50px rgba(0, 0, 0, 0.6)`
* **Proporção da Imagem Hero:** `16:9` (horizontal clássica)
* **Proporção das Fotos da Equipe:** `3:4` (retrato/vertical)

---

## 3. Integrantes da Equipe & Personas

### 1. Lucas de Sousa e Silva
* **Papel:** Scrum Master Líder / Desenvolvedor Back-end
* **Perfil:** Estudante de Análise e Desenvolvimento de Sistemas com interesse em automação e dados. Responsável pela coordenação de tarefas e backend.
* **Habilidades:** Programação JS/Python, Banco de Dados PostgreSQL, Hospedagem.
* **Ferramentas:** Python, JavaScript, AppScript, PostgreSQL, C, Git/GitHub, IA.
* **Objetivo:** Liderar o grupo com o suplente e construir a aplicação funcional backend.

### 2. João Vitor Souza da Silva
* **Papel:** Scrum Master Suplente / Desenvolvedor Back-end
* **Perfil:** Técnico em Dev. de Sistemas e estudante de ADS. Forte resolução de problemas e aprendizado rápido.
* **Habilidades:** Programação C/Java, Banco de Dados, Engenharia de Prompt.
* **Ferramentas:** Java, C, PHP, SQL, Figma, Canva, Pacote Office, GitHub.
* **Objetivo:** Organizar entregas com o Líder, liderar backend e supervisionar a qualidade.

### 3. Enzo Gabriel Cortinove Gomes
* **Papel:** Desenvolvedor Front-End
* **Perfil:** Estudante de ADS focado em desenvolvimento de software full-stack e visual.
* **Habilidades:** Programação C, Java e Python; Banco de dados MySQL.
* **Ferramentas:** Java, C, Python, Django, SQL, HTML, CSS, Git/GitHub, Photoshop, Illustrator.
* **Objetivo:** Desenvolver o front-end garantindo usabilidade e integração com backend/banco de dados.

### 4. Gustavo Menezes Garcia
* **Papel:** Desenvolvedor de Banco de Dados & Tester
* **Perfil:** Estudante de ADS focado na modelagem de dados e regras de negócio.
* **Habilidades:** Desenvolvimento Back-end, Full-stack, Lógica de programação.
* **Ferramentas:** Python, C, MySQL, HTML, CSS, JavaScript, Pacote Office, GitHub.
* **Objetivo:** Desenvolver a estrutura de banco de dados e realizar testes de qualidade do sistema.

### 5. Nikolas Alcantara Deodato
* **Papel:** Desenvolvedor Front-End
* **Perfil:** Estudante de ADS com interesse em design, web dev e segurança da informação.
* **Habilidades:** Design de Interfaces, Full Stack, Segurança de Dados, Web Scraping (Python).
* **Ferramentas:** Python, C, JavaScript, HTML, CSS, TypeScript, Git e GitHub.
* **Objetivo:** Atuar na construção da interface e segurança visual do projeto.

---

## 4. Arquitetura das Páginas

### Página 1: Home (`index.html`) — 5 Dobras Obrigatórias
1. **1ª Dobra (Hero):** Foto da equipe no IFSP (`16:9`), título de impacto e chamada para ação (CTA).
2. **2ª Dobra (Institucional):** Apresentação em cards da **Missão**, **Visão** e **Valores**.
3. **3ª Dobra (Serviços):** 4 Cards com as Ações de Extensão:
   * Consultoria
   * Capacitação
   * Prestação de Serviço
   * Projetos de Engenharia
4. **4ª Dobra (Equipe):** 5 Cards interativos com as fotos verticais (`3:4`) redirecionando para `personas.html`.
5. **5ª Dobra (Rodapé):** Localização do IFSP Campus Guarulhos e copyright.

### Página 2: Quem Somos (`quem-somos.html`)
* Trajetória da FicTech no IFSP Campus Guarulhos.
* Explicação aprofundada das 4 frentes de atuação acadêmica e comunitária.

### Página 3: Personas (`personas.html`)
* Exibição detalhada do perfil, habilidades, ferramentas e dores de cada um dos 5 integrantes.

### Página 4: Contato (`contato.php`)
* Formulário com Nome, E-mail, Assunto e Mensagem.
* Processamento POST via PHP e persistência no MySQL (banco hospedado no cPanel).

---

## 5. Instruções de Ambiente & Execução Local

1. **Configuração de Estilo:** Manter todas as variáveis centralizadas no CSS principal.
2. **Visualização Front-End:** Utilizar a extensão **Live Server** no VS Code para renderizar o `index.html`.
3. **Padrão Impeccable:** Os arquivos `PRODUCT.md` e `DESIGN.md` servem como guia padrão para auditorias e manutenções do código visual.