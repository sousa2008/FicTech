# FicTech 🚀

Portal da FicTech, iniciativa acadêmica de extensão do curso de Análise e Desenvolvimento de Sistemas (ADS) do IFSP Campus Guarulhos. O projeto aproxima competências de engenharia de software das demandas de empresas, parceiros e da comunidade local.

## 📌 Sobre o Projeto

O site está organizado em uma página única (`index.html`) com as seguintes áreas:

- Apresentação institucional, missão, visão e valores.
- Especialidades e tecnologias da equipe.
- Quatro frentes de extensão: consultoria, capacitação, prestação de serviços e engenharia de software.
- Galeria interativa com os cinco integrantes.
- Formulário visual para registro de demandas.

O formulário atualmente simula o envio no navegador: ele exibe uma confirmação, mas ainda não transmite nem armazena as informações. Não há backend PHP nem integração com banco de dados nesta versão.

🛠️ Tecnologias e Infraestrutura

- HTML5 e CSS3 para estrutura e apresentação.
- JavaScript para interações da página, galeria, animações e efeitos WebGL.
- Google Fonts para carregamento das famílias tipográficas.
- Git e GitHub para controle de versão e colaboração.
- Hospedagem cPanel com integração de deploy via Git, conforme a configuração registrada para o projeto.

## Estrutura do repositório

```text
.
├── index.html       # Página principal do portal
├── style.css        # Estilos e layout responsivo
├── main.js          # Interações e efeitos da página
└── docs/
	├── CONTEXT.md   # Contexto, decisões e roadmap
	├── DESIGN.md    # Sistema visual e arquitetura planejada
	└── PRODUCT.md   # Público, objetivos e escopo do produto
```

As páginas antigas `quem-somos.html` e `personas.html` foram removidas; o conteúdo institucional e a apresentação da equipe estão, no momento, na página principal.

## Como visualizar localmente

Abra `index.html` diretamente no navegador ou use a extensão Live Server do VS Code. O projeto não requer instalação de dependências ou etapa de build.

## Evolução do projeto

- **6 de novembro de 2026:** criação da estrutura inicial do portal e restauração do README.
- **10 de novembro de 2026:** envio de uma nova implementação da landing page, com HTML, CSS e JavaScript.
- **11 de novembro de 2026:** merge da landing page na `main`, remoção de páginas obsoletas e inclusão da documentação de contexto, produto e design em `docs/`.

O histórico pode ser consultado com `git log --graph --oneline --all`. O desenvolvimento é integrado à `main` por merges; a documentação do projeto registra o uso de branches e revisão por pull request.

## 👥 Equipe 

- **Lucas de Sousa e Silva:** Scrum Master líder e desenvolvimento back-end.
- **João Vitor Souza da Silva:** Scrum Master suplente e desenvolvimento back-end.
- **Enzo Gabriel Cortinove Gomes:** desenvolvimento front-end.
- **Gustavo Menezes Garcia:** banco de dados e testes.
- **Nikolas Alcantara Deodato:** desenvolvimento front-end e segurança.

## Documentação

- [Contexto e roadmap](docs/CONTEXT.md)
- [Produto e público-alvo](docs/PRODUCT.md)
- [Design e arquitetura planejada](docs/DESIGN.md)
