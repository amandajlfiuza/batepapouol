const telaEntrada = document.querySelector('.tela-de-entrada');
const telaPrincipal = document.querySelector('.tela-principal');
const menuLateral = document.querySelector('.menu-lateral');

let nomeUsuario = "";
let novoUsuario =   {
                        name: ""
                    }
let novaMensagem = {
                        from: "",
                        to: "Todos",
                        text: "",
                        type: "message"
                    }

function enviarNomeUsuario() {
    nomeUsuario = document.querySelector('.tela-de-entrada input').value;
    novoUsuario.name = nomeUsuario;

    const promessa = axios.post('https://mock-api.driven.com.br/api/v6/uol/participants ',novoUsuario);
    promessa.then(entrarBatePapo);
    promessa.catch(alertaErro);
}

function alertaErro(erro) {
    console.log(erro.response.status);
    if (erro.response.status === 400) {
        alert(`O nome de usuário "${nomeUsuario}" já está em uso! Por favor, digite outro nome.`);
    }
}

function manterConexao() {
    setInterval(function(){
        axios.post('https://mock-api.driven.com.br/api/v6/uol/status',novoUsuario);
    },5000);
}
manterConexao();

function entrarBatePapo() {
    telaEntrada.classList.add('oculto');
    telaPrincipal.classList.remove('oculto');
    coletarMensagens();
}

function coletarMensagens() {
    let requisicao = axios.get('https://mock-api.driven.com.br/api/v6/uol/messages');
    requisicao.then(exibirMensagens);
}

function exibirMensagens(resposta) {
    let mensagens = resposta.data;
    
    const ulMensagens = document.querySelector('.mensagens');
    ulMensagens.innerHTML = "";

    for (let i=0; i<mensagens.length; i++) {
        if (mensagens[i].type === 'status') {
            ulMensagens.innerHTML += 
            `<li class="status">
                <div class="horario">${mensagens[i].time}</div>
                <div class="nome"><em>${mensagens[i].from}</em></div>
                <div class="mensagem">${mensagens[i].text}</div>
            </li>`;
        } else if (mensagens[i].type === 'private_message' && mensagens[i].to === nomeUsuario) {
            ulMensagens.innerHTML += 
            `<li class="private_message">
                <div class="horario">${mensagens[i].time}</div>
                <div class="direcionamento">
                    <em>${mensagens[i].from}</em> para <em>${mensagens[i].to}</em>:
                </div>
                <div class="mensagem">${mensagens[i].text}</div>
            </li>`;
        } else if (mensagens[i].type === 'message' && mensagens[i].to === "Todos") {
            ulMensagens.innerHTML += 
            `<li class="message">
                <div class="horario">${mensagens[i].time}</div>
                <div class="direcionamento">
                    <em>${mensagens[i].from}</em> para <em>${mensagens[i].to}</em>:
                </div>
                <div class="mensagem">${mensagens[i].text}</div>
            </li>`;
        }
    }
    ulMensagens.lastChild.scrollIntoView();
}

function enviarMensagem() {
    novaMensagem.from = nomeUsuario;
    novaMensagem.text = document.querySelector('.mensagem-enviada input').value;
    
    let promessa = axios.post('https://mock-api.driven.com.br/api/v6/uol/messages',novaMensagem);
    promessa.catch(recarregarPagina);

    document.querySelector('.mensagem-enviada input').value = "";
}

function recarregarPagina() {
    window.location.reload();
}

function atualizarMensagens() {
    setInterval(coletarMensagens,3000);
}
atualizarMensagens();

function abrirMenuLateral() {
    menuLateral.classList.remove('oculto');

    let requisicao = axios.get('https://mock-api.driven.com.br/api/v6/uol/participants ');
    requisicao.then(exibirParticipantes);
}

function exibirParticipantes(resposta) {
    let participantes = resposta.data;
    const ulParticipantes = document.querySelector('.participantes');
    ulParticipantes.innerHTML = 
    `<li class='todos' onclick='selecionarParticipante(this)'>
        <div class='esquerda'>
            <ion-icon name='people' class='icone-sidebar'></ion-icon>
            <div class='nome-participante'>Todos</div>
        </div>
        <div class='direita'>
            <ion-icon name='checkmark-sharp' class='icone-check'></ion-icon>
        </div>
    </li>`;

    for (let i=0; i<participantes.length; i++) {
        ulParticipantes.innerHTML += 
        `<li class="participante" onclick="selecionarParticipante(this)">
            <div class="esquerda">
                <ion-icon name="person-circle-sharp" class="icone-sidebar"></ion-icon>
                <div class="nome-participante">${participantes[i].name}</div>
            </div>
            <div class="direita">
                <ion-icon name="checkmark-sharp" class="icone-check"></ion-icon>
            </div>
        </li>`;
    }
    
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