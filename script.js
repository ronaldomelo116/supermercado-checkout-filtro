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