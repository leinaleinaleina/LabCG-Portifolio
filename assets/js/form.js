document.addEventListener("DOMContentLoaded", () => {

    // --- CONTROLE DOS GRUPOS DE PERFIL DE INTERESSE ---
    const radiosVinculo = document.querySelectorAll('input[name="vinculo"]');
    const secaoUnioeste = document.getElementById('secao-unioeste');
    const secaoExterno = document.getElementById('secao-externo');
    const secaoPesquisador = document.getElementById('secao-pesquisador');
    const avisoVinculo = document.getElementById('aviso-vinculo');


    function gerenciarObrigatoriedade(secao, valorObrigatorio) {
        const listaCamposDinamicos = secao.querySelectorAll('.obrigatorio-dinamico'); // Busca na seção, os que tem a classe
        
        // Para cada campo encontrado define o valor de obrigatoriedade
        listaCamposDinamicos.forEach(campo => {
            campo.required = valorObrigatorio;
        });
    }

    function esconderTodasSecoes() {
        secaoUnioeste.classList.add('d-none');
        secaoExterno.classList.add('d-none');
        secaoPesquisador.classList.add('d-none');
        avisoVinculo.classList.add('d-none');

        gerenciarObrigatoriedade(secaoUnioeste, false);
        gerenciarObrigatoriedade(secaoExterno, false);
        gerenciarObrigatoriedade(secaoPesquisador, false);
    }

    radiosVinculo.forEach(radio => {
        radio.addEventListener('change', (evento) => {
            esconderTodasSecoes();
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
    const checkboxesArea = document.querySelectorAll('.area-interesse-check');

    checkboxesArea.forEach(checkbox => {
        checkbox.addEventListener('change', (evento) => {
            const linha = checkbox.closest('tr');
            const rangeInput = linha.querySelector('.area-nivel-range');

            if (checkbox.checked) { // Verifica se pode ativar o range
                rangeInput.disabled = false;
            } else {
                rangeInput.disabled = true; 
                rangeInput.value = 2; // Coloca o valor do range no meio
            }
        });
    });

});

function avisoSubmissao(){
    alert("Obrigado!");
}