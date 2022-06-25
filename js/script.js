const telaEntrada = document.querySelector('.tela-de-entrada');
const telaPrincipal = document.querySelector('.tela-principal');
const menuLateral = document.querySelector('.menu-lateral');

function entrarBatePapo() {
    telaEntrada.classList.add('oculto');
    telaPrincipal.classList.remove('oculto');
}

function abrirMenuLateral() {
    menuLateral.classList.remove('oculto');
}

function sairMenu() {
    menuLateral.classList.add('oculto');
}

function selecionarParticipante(elemento) {
    const checkAtivo = document.querySelector('.participantes .ativo');
    if (checkAtivo !== null) {
        checkAtivo.classList.remove('ativo');
    }
    elemento.querySelector('.icone-check').classList.add('ativo');
}

function selecionarVisibilidade(elemento) {
    const checkAtivo = document.querySelector('.visibilidade .ativo');
    if (checkAtivo !== null) {
        checkAtivo.classList.remove('ativo');
    }
    elemento.querySelector('.icone-check').classList.add('ativo');
}