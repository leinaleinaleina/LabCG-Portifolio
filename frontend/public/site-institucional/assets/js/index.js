// Array de publicações com objetos que detalham dados sobre as publicações
const publicacoes = [
    {
        titulo: "Head-Mounted Displays e IA para Acessibilidade: Ferramentas de Inclusão Sensorial",
        autores: "Leina Yoshida, Gustavo Camargo Domingues, Fabiana Frata Furlan Peres, Claudio Roberto Marquetto Mauricio",
        link: "https://sol.sbc.org.br/index.php/latinoware/article/view/31521",
        data: "2024-11-27"
    },
    {
        titulo: "What if We Could Trick Meta Quest 3 Hand Tracking System to Enable Low Limb Tracking with No Additional Sensors?",
        autores: "Gustavo Domingues, Leina Yoshida, Fabiana Peres, Claudio Mauricio, João Teixeira",
        link: "https://link.springer.com/chapter/10.1007/978-3-032-04999-5_36",
        data: "2025-09-16"
    },
    {
        titulo: "Jogo Sério para Educação Alimentar e Nutricional Infantil",
        autores: "Carlos Penteado, Maria Eduarda Ruzin, Thaynara de Jesus, Daniela Bernardi, Mariana Cavagnari, Fabiana Peres, Claudio Maurício",
        link: "https://sol.sbc.org.br/index.php/sbgames_estendido/article/view/37136",
        data: "2025-10-03"
    }
];

// Função para "renderizar" as publicações na página 
const renderizarPublicacoes = function() {
    const listaElemento = document.getElementById('lista-publicacoes');

    if (!listaElemento) return; // Se não achar o elemento, evita erros

    // Função arrow para ordenar publicações de forma decrescente
    publicacoes.sort((a, b) => new Date(b.data) - new Date(a.data)); 

    // Para cada publicação, criar um elemento html para a lista
    publicacoes.forEach(pub => {
        const itemLista = document.createElement('li');
        itemLista.className = "mb-4"; // Classe de margem de baixo do Bootstrap

        itemLista.innerHTML = `
            <a target="_blank" href="${pub.link}" class="fw-bold text-decoration-none" style="color: #022132;">
                ${pub.titulo}
                <i class="bi bi-box-arrow-up-right ms-1 small"></i>
            </a>
            <p class="text-white mb-0 small" style="opacity: 0.9;">
                ${pub.autores}
            </p>
            <small class="text-warning">
                Publicado em: ${new Date(pub.data).toLocaleDateString('pt-BR')}
            </small>
        `;
        
        // Adiciona o item recém-criado dentro da lista <ul>
        listaElemento.appendChild(itemLista);
    });
};

// Chamada direta da função.
renderizarPublicacoes();