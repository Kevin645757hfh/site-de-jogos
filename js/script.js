function pesquisarHeader(event) {
    event.preventDefault();
    var campo = document.getElementById("busca-header");
    var texto = campo.value.trim();

    if (texto !== "") {
        window.location.href = "jogos.html?busca=" + encodeURIComponent(texto);
    }
}

function buscarJogo() {
    var campo = document.getElementById("busca");
    if (!campo) return;

    var texto = campo.value.toLowerCase();
    var jogos = document.getElementsByClassName("jogo-card");

    for (var i = 0; i < jogos.length; i++) {
        var nome = jogos[i].innerText.toLowerCase();
        jogos[i].style.display = nome.indexOf(texto) > -1 ? "block" : "none";
    }
}

function carregarBusca() {
    var parametros = new URLSearchParams(window.location.search);
    var texto = parametros.get("busca");
    var campo = document.getElementById("busca");

    if (texto && campo) {
        campo.value = texto;
        buscarJogo();
    }
}

function salvarReviews() {
    return JSON.parse(localStorage.getItem("nextLevelReviews") || "[]");
}

function mostrarReviews() {
    var lista = document.getElementById("lista-reviews");
    if (!lista) return;

    var reviews = salvarReviews();
    lista.innerHTML = "";

    if (reviews.length === 0) {
        lista.innerHTML = '<div class="review-item"><p>Ainda não existem reviews de usuários. Seja o primeiro!</p></div>';
        return;
    }

    for (var i = reviews.length - 1; i >= 0; i--) {
        var review = reviews[i];
        var item = document.createElement("article");
        item.className = "review-item";
        item.innerHTML = "<h3>" + escapar(review.jogo) + "</h3>" +
            "<div class='review-meta'>Por <strong>" + escapar(review.nome) + "</strong> • " +
            "<span class='review-nota'>" + review.nota + "/10</span></div>" +
            "<p>" + escapar(review.texto) + "</p>";
        lista.appendChild(item);
    }
}

function escapar(texto) {
    var div = document.createElement("div");
    div.textContent = texto;
    return div.innerHTML;
}

function prepararReviews() {
    var formulario = document.getElementById("review-form");
    if (!formulario) return;

    formulario.addEventListener("submit", function(event) {
        event.preventDefault();

        var review = {
            nome: document.getElementById("nome-review").value.trim(),
            jogo: document.getElementById("jogo-review").value,
            nota: document.getElementById("nota-review").value,
            texto: document.getElementById("texto-review").value.trim()
        };

        if (!review.nome || !review.jogo || !review.nota || !review.texto) return;

        var reviews = salvarReviews();
        reviews.push(review);
        localStorage.setItem("nextLevelReviews", JSON.stringify(reviews));
        formulario.reset();
        mostrarReviews();
        alert("Review publicada e salva neste navegador!");
    });

    mostrarReviews();
}

function limparReviews() {
    if (confirm("Deseja apagar todas as reviews salvas neste navegador?")) {
        localStorage.removeItem("nextLevelReviews");
        mostrarReviews();
    }
}

function enviarContato(event) {
    event.preventDefault();
    alert("Mensagem enviada! Obrigado pelo contato.");
    event.target.reset();
}

window.addEventListener("DOMContentLoaded", function() {
    carregarBusca();
    prepararReviews();
});
