# 🛒 Smart Grocery List (Lista de Compras Inteligente)

Uma aplicação de lista de compras interativa e de alta performance para supermercados. O projeto conta com um sistema de busca dinâmica em tempo real e marcação de itens concluídos de forma totalmente responsiva.

---

## 🚀 Tecnologias Utilizadas

O projeto foi desenvolvido utilizando tecnologias web nativas, sem a necessidade de frameworks externos (*Vanilla Web*):

* **HTML5:** Estruturação semântica da lista de compras e dos componentes.
* **CSS3:** Estilização moderna utilizando **Flexbox** para centralização e alinhamento responsivo dos elementos.
* **JavaScript (ES6):** Manipulação dinâmica do DOM e lógica de filtragem baseada em eventos de teclado.

---

## 🧠 Como Funciona a Lógica do Projeto?

A lógica deste projeto é dividida em duas engrenagens principais que trabalham juntas: a **estrutura visual inteligente (HTML + CSS)** e o **mecanismo de busca (JavaScript)**.

Aqui está a explicação simples de como tudo funciona por trás dos panos:

### 1. A Estrutura Visual (HTML e CSS)
O HTML organiza a lista dividindo-a em duas coisas diferentes:
* **Títulos (`li class="locais"`)**: As categorias do mercado (Açougue, Hortifrúti, etc.).
* **Produtos (`ol` com vários `li`)**: Os itens que você vai comprar.

Cada produto foi envelopado seguindo este padrão semântico:
```html
<li>
  <input type="checkbox">
  <span> Nome do Produto </span>
</li>
```

#### O Truque do Efeito Riscado (CSS Puro)
Para riscar o texto ao marcar a caixa, usamos esta regra seletora avançada no CSS:
```css
li input[type="checkbox"]:checked + span {
  text-decoration: line-through;
}
```
* **`:checked`**: Monitora quando o usuário clica e ativa o checkbox.
* **`+ span`**: Seletor adjacente direto. Diz ao navegador para olhar especificamente para o vizinho irmão do checkbox (o `<span>` com o texto).
* **`text-decoration: line-through`**: Aplica a linha de riscado apenas no texto, deixando o quadrado do checkbox intacto. **Tudo isso funciona nativamente sem precisar de nenhuma linha de JavaScript.**

---

### 2. O Mecanismo de Busca (JavaScript)
Toda a mágica da pesquisa acontece dentro da função `filtrarLista()`, que roda a cada letra digitada graças ao atributo de evento `onkeyup="filtrarLista()"` configurado na barra de pesquisa.

A lógica interna segue estes **4 passos principais**:

#### 🔹 Passo 1: Captura o que foi digitado
```javascript
let input = document.getElementById("BarraPesquisa").value.toLowerCase();
```
O script pega o texto atualizado da barra e usa o método `.toLowerCase()` para transformá-lo completamente em letras minúsculas. Isso garante que a busca seja *case-insensitive* (se você digitar "ARROZ" ou "arroz", o resultado será o mesmo).

#### 🔹 Passo 2: Pega todas as linhas (`<li>`) da tela
```javascript
let itens = lista.getElementsByTagName("li");
```
O JavaScript cria uma lista indexada interna contendo todas as tags `<li>` da página (englobando tanto os títulos das categorias quanto os produtos).

#### 🔹 Passo 3: O laço de repetição (`for`) e a Validação Inteligente
O código usa um loop `for` para inspecionar item por item da lista, do primeiro ao último. Para cada loop, ele faz uma verificação estrutural: *"Esse item é um produto ou um título de categoria?"*
```javascript
let spanElement = itens[i].getElementsByTagName("span");
if (spanElement[0]) { ... }
```
* Se encontrar um `<span>` (ou seja, o item analisado é um produto), o JavaScript lê **apenas o texto de dentro do span**, ignorando os nós de HTML do checkbox.
* Se não encontrar um `<span>`, ele lê o texto do `<li>` inteiro (tratando a linha como um título de categoria).

#### 🔹 Passo 4: O Filtro de Exibição (Esconder ou Mostrar)
```javascript
if (textoItem.toLowerCase().indexOf(input) > -1) {
    itens[i].style.display = "flex"; 
} else {
    itens[i].style.display = "none"; 
}
```
O comando `.indexOf(input)` varre a string para verificar se o termo digitado está contido no nome do produto/categoria.
* **Se encontrar (resultado maior que -1):** O JavaScript aplica `display: "flex"`, fazendo o item aparecer ou continuar visível na tela sem quebrar o layout flexível.
* **Se não encontrar (resultado igual a -1):** O JavaScript injeta dinamicamente `display: "none"`, ocultando o elemento instantaneamente da interface.

---

### 🎭 Resumo da Ópera
Quando você digita *"frango"*, o JavaScript roda a lista inteira no background, esconde todas as outras categorias e produtos que não possuem a palavra *"frango"* e mantém visível na tela apenas o cabeçalho correspondente (*"Açougue"*) junto ao item *"Peito de frango (1kg)"*. Ao clicar na caixa de seleção do item filtrado, o CSS entra em ação e risca a palavra sinalizando a conclusão da tarefa.

---