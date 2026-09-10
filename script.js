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


/* gerador de pdf */

function gerarPdfLista() {
    const { jsPDF } = window.jspdf;
    const doc = new jsPDF;

    const categorias = document.querySelectorAll('.locais');
    let itensMercadosTotal = 0;

    let posicaoY = 20;

    /* cabeçalho */
    doc.setFont("helvetica", "bold");
    doc.setFontSize(18);
    doc.text("LISTA DE COMPRAS", 105, posicaoY, { align: "center" });

    posicaoY += 8;
    doc.setFont("helvetica", "normal");
    doc.setFontSize(10);
    const dataHoje = new
        Date().toLocaleDateString('pt-BR');
    doc.text(`Gerado em ${dataHoje}`, 105, posicaoY, { align: "center" });

    posicaoY += 12;

    /* verifica cada categoria se tem item marcado */
    categorias.forEach(categoria => {
        const lista01 = categoria.nextElementSibling;
        if (!lista01) return;

        /* PEGA SOMENTE OS CHECKBOXES MARCADOS DENTRO DESSA CATEGORIA */
        const checkboxesMarcados = lista01.querySelectorAll('input[type="checkbox"]:checked');

        if (checkboxesMarcados.length > 0) {
            itensMercadosTotal += checkboxesMarcados.length;


            /* cria uma nova pagina se estiver perto do fim (280mm*/
            if (posicaoY > 260) {
                doc.addPage();
                posicaoY = 20;
            }

            /* titulo da categoria em negrito e azul escuro */
            doc.setFont("helvetica", "bold");
            doc.setFontSize(13);
            doc.setTextColor(14, 82, 130); /* cor azul */
            doc.text(categoria.innerText, 15, posicaoY);
            posicaoY += 7;

            /* linha fina separada */
            doc.setDrawColor(200, 200, 200);
            doc.line(15, posicaoY - 5, 195, posicaoY - 5);

            /*  Itens marcados da categoria */

            doc.setFont("helvetica", "normal");
            doc.setFontSize(11);
            doc.setTextColor(30, 30, 30); /* Preto suave para leitura */

            checkboxesMarcados.forEach(caixinha => {
                const nomeItem = caixinha.nextElementSibling.innerText;
                if (posicaoY > 275) {
                    doc.addPage();
                    posicaoY = 20;
                }

                /* Desenha o item com um quadradinho limpo de checklist [ ] */
                doc.text(`[  ]  ${nomeItem}`, 20, posicaoY);
                posicaoY += 6.5;
            });

            posicaoY += 6; /* Espaço entre uma categoria e outra */
        }
    });
    /* 4. Se o usuário não marcou nada, avisa e cancela o download */
    if (itensMercadosTotal === 0) {
        alert("Você ainda não marcou nenhum item na lista!");
        return;
    }
    /* 5. Salva e baixa o PDF */
    doc.save("lista-de-compras.pdf");
}
/* Conecta a função ao clique do botão */
document.getElementById("btnGerarPdf").addEventListener("click", gerarPdfLista);

