function filtrarLista() {
    let input = document.getElementById("BarraPesquisa").value.toLowerCase();
    let lista = document.getElementById("listaItens");
    let itens = lista.getElementsByTagName("li");

    for (let i = 0; i < itens.length; i++) {
        let textoItem = "";
        let spanElement = itens[i].getElementsByTagName("span")[0];

        // Se o item tiver um <span> (produtos), pega o texto do span
        if (spanElement) {
            textoItem = spanElement.textContent || spanElement.innerText;
        } else {
            // Se não tiver span (títulos das categorias tipo "Açougue"), pega o texto do próprio li
            textoItem = itens[i].textContent || itens[i].innerText;
        }

        if (textoItem.toLowerCase().indexOf(input) > -1) {
            itens[i].style.display = "flex";
        } else {
            itens[i].style.display = "none";

        }
    }
}


/* SALVAMENTO DE CHECKBOXES */
function iniciarMemoriaDaLista() {

    let checkboxes = document.querySelectorAll('input[type="checkbox"]');

    checkboxes.forEach(function (caixinha) {

        let nomeProduto = caixinha.nextElementSibling.innerText;

        if (localStorage.getItem(nomeProduto) === "true") {
            caixinha.checked = true;
        }

        caixinha.addEventListener('change', function () {
            localStorage.setItem(nomeProduto, caixinha.checked);
        });

    });
}

iniciarMemoriaDaLista();


function verificarEstadoDoBotao() {
    let botao = document.getElementById("btnLimparCheckboxes");
    if (!botao) return;

    let quantidadeMarcada = document.querySelectorAll('input[type="checkbox"]:checked').length;

    if (quantidadeMarcada === 0) {
        botao.disabled = true;
    } else {
        botao.disabled = false;
    }
}

/**
 * FUNÇÃO PARA LIMPAR TODAS AS CAIXINHAS
 */

function configurarBotaoLimpar() {

    let botao = document.getElementById("btnLimparCheckboxes");

    if (!botao) return;

    botao.addEventListener('click', function () {

        let confirmacao = confirm("Você tem certeza que deseja desmarcar todos os itens da sua lista?");

        if (confirmacao) {

            let checkboxes = document.querySelectorAll('input[type="checkbox"]');

            checkboxes.forEach(function (caixinha) {
                caixinha.checked = false;
                let nomeProduto = caixinha.nextElementSibling.innerText;
                if (nomeProduto) {
                    localStorage.setItem(nomeProduto, false);
                }
            });

            verificarEstadoDoBotao();
        }
    });
}

document.addEventListener('change', function (event) {
    if (event.target.type === 'checkbox') {
        verificarEstadoDoBotao();
    }
});

iniciarMemoriaDaLista();
configurarBotaoLimpar();
verificarEstadoDoBotao();

setTimeout(() => {
    document.body.classList.remove("carregando");
}, 10);


/* menu hunbúrguer */

const btnHamburguer = document.getElementById('btnHamburguer');
const menuNabegacao = document.getElementById('menuNabegacao');
const linkMenu = menuNabegacao.querySelectorAll('a');

btnHamburguer.addEventListener('click', () => {
    const openMenu = menuNabegacao.classList.toggle('ativo');
    btnHamburguer.classList.toggle('ativo');
    btnHamburguer.setAttribute('aria-expanded', openMenu);
});

linkMenu.forEach(link => {
    link.addEventListener('click', () => {
        menuNabegacao.classList.remove('ativo');
        btnHamburguer.classList.remove('ativo');
        btnHamburguer.setAttribute('aria-expanded', 'false');
    });
});


