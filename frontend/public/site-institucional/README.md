# LabCG - Portfólio Digital


## Informações Acadêmicas:

- **Instituição:** Universidade Estadual do Oeste do Paraná (UNIOESTE)
- **Curso:** Ciência da Computação
- **Disciplina:** Tecnologias para Desenvolvimento de Sistemas
- **Docente:** Newton Spolaôr
- **Discentes:** [Gustavo Domingues](https://github.com/Stremps) e [Leina Yoshida](https://github.com/leinaleinaleina)

---

## Descrição do projeto:

O objetivo foi desenvolver uma aplicação *client-side* (Front-End), utilizando as tecnologias base da web (HTML5, CSS3, JavaScript) juntamente com o framework Bootstrap 5.

O site apresenta:
- **Página Inicial (`index.html`):** Apresentação inicial do laboratório com: Missão, áreas de atuação, lista de parceiros e publicações acadêmicas.
- **Página de Contato (`form.html`):** Um formulário que adapta os campos solicitados com base no perfil do usuário (Aluno Unioeste, Externo ou Pesquisador).
- **Página de Portfólio (`construction.html`):** Página temporária indicando seção em construção.

---

##  Sobre os requisitos do trabalho:

Abaixo detalhamos como cada requisito obrigatório da especificação do trabalho foi implementado no projeto.

### 1. HTML5 & CSS3
| Requisito | Implementação no Projeto |
| :--- | :--- |
| **Tags Semânticas** | Utilização ampla de `<header>`, `<main>`, `<footer>`, `<section>`, `<nav>`, `<ul>`/`<li>`, `<h1>`-`<h4>`, etc. |
| **Formulário Complexo** | Implementado em `form.html` com mais de 10 tipos de inputs: `text`, `email`, `tel`, `password`, `radio`, `checkbox`, `range`, `date`, `number`, `file`, `url`, além de `<select>`, `<textarea>` e `<datalist>` para sugestão de cursos. |
| **Unidades de Medida** | Uso combinado de `px` (bordas), `%` (larguras fluídas), `rem` (fontes e espaçamentos globais) e `em` (ícones e bordas relativas). |
| **Propriedade `display`** | `flex` usado extensivamente para layouts (header, footer); `inline-block` em elementos de texto; `none` para controle de visibilidade responsiva e lógica do formulário. |
| **Propriedade `position`** | Uso de `position: relative` nas seções principais (`.HOME`, `.dark-section`) para controle de fluxo. |

### 2. Bootstrap 5
| Requisito | Implementação no Projeto |
| :--- | :--- |
| **Containers & Grid** | Uso de `.container`, `.container-fluid`, `.row` (com alinhamentos `justify-content-*`, `align-items-*`) e colunas responsivas (`.col-12`, `.col-md-7`, `.col-lg-8`). |
| **Classes de Formulário** | Estilização completa com `.form-label`, `.form-control`, `.form-select`, `.form-check`, `.form-range` e validação visual. |
| **Ícones** | Integração da biblioteca **Bootstrap Icons** para redes sociais e links externos. |
| **Componentes Extras** | • **Accordion:** Utilizado na `index.html` para detalhar as áreas de atuação.<br>• **Card:** Utilizado em `form.html` para encapsular o formulário de contato com elegância. |

### 3. JavaScript
| Requisito | Implementação no Projeto |
| :--- | :--- |
| **Eventos (2)** | • `DOMContentLoaded` (janela) para inicialização segura dos scripts.<br>• `change` (formulário) para detectar mudança de perfil e checkboxes. |
| **Funções (3 formatos)** | • **Declaration:** `function gerenciarObrigatoriedade(...)` em `form.js`.<br>• **Expression:** `const renderizarPublicacoes = function() {...}` em `index.js`.<br>• **Arrow:** `(evento) => {...}` usadas em *callbacks* de eventos e métodos de array. |
| **Arrays & Objetos** | Utilizados em `index.js` para armazenar os dados das publicações acadêmicas (`const publicacoes = [{...}, {...}]`) e apresentá-los dinamicamente. |
| **Manipulação do DOM** | Criação dinâmica de elementos HTML (`document.createElement`), controle de classes CSS (`classList.toggle('d-none')`) e alteração de atributos (`required`, `disabled`) em tempo real. |

---

## Como Executar:

1.  Clone este repositório:
    ```bash
    git clone https://github.com/leinaleinaleina/LabCG-Portifolio
    ```
2.  Navegue até a pasta do projeto.
3.  Abra o arquivo `index.html` em seu navegador de preferência.

---
*Desenvolvido com 💙 para a disciplina de TDS - 2025.*