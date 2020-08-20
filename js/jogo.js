let player1;
let player2;
let playTime;
let gameOver = false;
let vencedor = "";

function menu() {
    const input1 = document.getElementById("input1");
    const input2 = document.getElementById("input2");

    $("#btnmenu").on("click", () => {
        if (input1.value == "" || input2.value == "") {
            alert("Digite o nome dos participantes !");
        } else {
            player1 = input1.value;
            player2 = input2.value;
            playTime = player1;
            // $("#btnmenu").click(() => { // este evento de click comentando estava fazendo você tem que clicar duas vezes no botão jogar para o menu sumir
            $("#menu").slideUp(1000);
            // });
            atualizaMostrador();
        }
    });
}

menu();
mostraxeo();

function atualizaMostrador() {
    if (gameOver) return; // Quando o bloco ({}) de uma condição tiver apenas uma linha, você pode omitir o {}

    document.querySelector("#jog").innerHTML = `Vez de: </br> ${playTime}`;
}

function mostraxeo() {
    const qdr = document.querySelectorAll(".square"); // Usei querySelectorAll por que ele retorna uma NodeList ao contrário do getElementsByClassName que retorna uma HTMLCollection, com isso eu posso usar a variável qdr com o forEach. logo não preciso usar Array.from(qdr) para transformar o qdr em uma lista e usar com o forEach.
    qdr.forEach((el) => {
        el.addEventListener("click", () => {
            if (gameOver) return; // Quando o bloco ({}) de uma condição tiver apenas uma linha, você pode omitir o {}

            if (el.getAttribute('data-jogada')) {
                alert('Jogada Inválida')
            } else {
                if (playTime == player1) {
                    el.setAttribute("data-jogada", "x");
                    el.classList.add("x");
                    playTime = player2;
                } else {
                    el.setAttribute("data-jogada", "bolinha");
                    el.classList.add("bolinha");
                    playTime = player1;
                }
                console.log(playTime);

                mostrarVencedor();
                atualizaMostrador();
            }
        });
    });
}

function mostrarVencedor() {
    const a1 = document.getElementById("a1").getAttribute("data-jogada"); // Coloque sempre o prefixo data- para atributos personalizados
    const a2 = document.getElementById("a2").getAttribute("data-jogada");
    const a3 = document.getElementById("a3").getAttribute("data-jogada");
    const b1 = document.getElementById("b1").getAttribute("data-jogada");
    const b2 = document.getElementById("b2").getAttribute("data-jogada");
    const b3 = document.getElementById("b3").getAttribute("data-jogada");
    const c1 = document.getElementById("c1").getAttribute("data-jogada");
    const c2 = document.getElementById("c2").getAttribute("data-jogada");
    const c3 = document.getElementById("c3").getAttribute("data-jogada");

    if ((a1 == b1 && a1 == c1 && a1 != "") || (a1 == a2 && a1 == a3 && a1 != "") || (a1 == b2 && a1 == c3 && a1 != "")) {
        a1 == "x" ? (vencedor = player1) : (vencedor = player2); // Isso é um ternário, ou seja uma estrutura condicional (IF/ELSE) em uma linha
    } else if ((b2 == b1 && b2 == b3 && b2 != "") || (b2 == a2 && b2 == c2 && b2 != "") || (b2 == a3 && b2 == c1 && b2 != "")) {
        b2 == "x" ? (vencedor = player1) : (vencedor = player2); // Isso é um ternário, ou seja uma estrutura condicional (IF/ELSE) em uma linha
    } else if (((c3 == c2 && c3 == c1) || (c3 == a3 && c3 == b3)) && c3 != "") {
        c3 == "x" ? (vencedor = player1) : (vencedor = player2); // Isso é um ternário, ou seja uma estrutura condicional (IF/ELSE) em uma linha
    } else if (a1 != "" && a2 != "" && a3 != "" && b1 != "" && b2 != "" && b3 != "" && c1 != "" && c2 != "" && c3 != "") {

        setTimeout(() => {
            alert('Deu Velha !')
        }, 300)
        gameOver = true
        reset()
    }

    if (vencedor != "") {
        gameOver = true;
        setTimeout(() => {
            alert(`O vencedor foi ${vencedor} !`);
        }, 300);
        reset();
    }
}

function reset() {
    const reset = document.getElementById("reset");
    const sqr = document.querySelectorAll(".square");

    if (gameOver) {
        // Quando você quer ver se a condição é true, você pode omitir o "== true"
        reset.addEventListener("click", () => {
            $("#menu").slideDown(1000);
            sqr.forEach((elm) => {
                if (elm.getAttribute("data-jogada") != "") {
                    elm.classList.remove("x");
                    elm.classList.remove("bolinha");
                    elm.setAttribute("data-jogada", "");
                    document.getElementById('input1').value = ''
                    document.getElementById('input2').value = ''
                    gameOver = false;
                    playTime = player1;
                    vencedor = "";
                    menu();
                }
            });
        });
    }
}