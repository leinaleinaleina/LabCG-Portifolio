document.addEventListener("DOMContentLoaded", () => { //Espera a página HTML carregar, para definir as funções

    // --- CONTROLE DOS GRUPOS DE PERFIL DE INTERESSE ---

    //Guarda a referência para manipulação dos elementos de perfil
    const radiosVinculo = document.querySelectorAll('input[name="vinculo"]');
    const secaoUnioeste = document.getElementById('secao-unioeste');
    const secaoExterno = document.getElementById('secao-externo');
    const secaoPesquisador = document.getElementById('secao-pesquisador');
    const avisoVinculo = document.getElementById('aviso-vinculo');

    // Função para "required" dinâmico na escolha de perfil
    function gerenciarObrigatoriedade(secao, valorObrigatorio) {
        const listaCamposDinamicos = secao.querySelectorAll('.obrigatorio-dinamico'); // Busca na seção, os que tem a classe
        
        // Para cada campo encontrado define o valor de obrigatoriedade
        listaCamposDinamicos.forEach(campo => {
            campo.required = valorObrigatorio;
        });
    }

    // Função para alterar entre perfil, sem prejudicar o funcionamento
    function esconderTodasSecoes() {
        secaoUnioeste.classList.add('d-none');
        secaoExterno.classList.add('d-none');
        secaoPesquisador.classList.add('d-none');
        avisoVinculo.classList.add('d-none');

        // Configura todos inputs para não "required"
        gerenciarObrigatoriedade(secaoUnioeste, false);
        gerenciarObrigatoriedade(secaoExterno, false);
        gerenciarObrigatoriedade(secaoPesquisador, false);
    }

    // Para cada radio criado, é adicionado um escutador de evento
    radiosVinculo.forEach(radio => {
        radio.addEventListener('change', (evento) => {
            esconderTodasSecoes();
            // Depois verifica qual valor foi marcado para ativar o perfil
            if (evento.target.value === 'unioeste') {
                secaoUnioeste.classList.remove('d-none');
                gerenciarObrigatoriedade(secaoUnioeste, true);
            } else if (evento.target.value === 'externo') {
                secaoExterno.classList.remove('d-none');
                gerenciarObrigatoriedade(secaoExterno, true);
            } else if (evento.target.value === 'pesquisador') {
                secaoPesquisador.classList.remove('d-none');
                gerenciarObrigatoriedade(secaoPesquisador, true);
            }
        });
    });

    // --- CONTROLE DA MATRIZ DE HABILIDADES ---
    //Guarda a referência das checkbox de área de interesse
    const checkboxesArea = document.querySelectorAll('.area-interesse-check');

    // Para cada checkbox criado, é adicionado um escutador de evento
    checkboxesArea.forEach(checkbox => {
        checkbox.addEventListener('change', (evento) => {
            const linha = checkbox.closest('tr'); // Acha a linha da tabela onde o clique ocorreu
            const rangeInput = linha.querySelector('.area-nivel-range'); // Acha o range dentro dessa linha

            if (checkbox.checked) { // Verifica se pode ativar o range
                rangeInput.disabled = false;
            } else {
                rangeInput.disabled = true; 
                rangeInput.value = 0; // Coloca o valor do range no meio
            }
        });
    });

});

// Fica fora do evento, pois é chamado dentro do HTML
function avisoSubmissao(){
    // Guarda os valores para personalizar a mensagem
    const nomeUsuario = document.getElementById('nome').value;
    const vinculoSelecionado = document.querySelector('input[name="vinculo"]:checked');

    // Formata o texto, de acordo com o perfil selecionado
    let textoPerfil = "";
    if (vinculoSelecionado.value === 'unioeste') {
        textoPerfil = "Aluno Unioeste";
    } else if (vinculoSelecionado.value === 'externo') {
        textoPerfil = "Aluno Externo";
    } else {
        textoPerfil = "Pesquisador/Parceiro";
    }

    // Apresenta caixa de alerta com a mensagem formatada
    alert(`Obrigado, ${nomeUsuario}!\n\nRecebemos sua pré-inscrição como ${textoPerfil}.\nAguarde nosso contato.`);
}