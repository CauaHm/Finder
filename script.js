document.getElementById("botao-buscar").addEventListener("click", function () { const b = document.getElementById("campo-busca").value; buscarProdutos(b) }), document.getElementById("campo-busca").addEventListener("keydown", function (c) { if ("Enter" === c.key) { c.preventDefault(); const a = document.getElementById("campo-busca").value; buscarProdutos(a) } }); const botoesCategoria = document.querySelectorAll(".botao-categoria"); botoesCategoria.forEach(c => { c.addEventListener("click", function () { const a = c.getAttribute("data-categoria"); buscarProdutos(a) }) }); function buscarProdutos(b) { fetch(`https://api.mercadolibre.com/sites/MLB/search?q=${b}`).then(b => b.json()).then(b => exibirResultados(b.results)).catch(b => console.error("Erro ao buscar produtos:", b)) } function exibirResultados(c) {
    const d = document.getElementById("grid-produtos"); return d.innerHTML = "", 0 === c.length ? void (d.innerHTML = "<p>Nenhum produto encontrado.</p>") : void c.forEach(b => {
        const a = document.createElement("div"); a.className = "produto", a.innerHTML = `
    <div class='produto-img'>
        <img src="${b.thumbnail}" alt="${b.title}" class="imagem-produto">
    </div>
    <div class='produto-info'>
        <h3 class="produto-titulo">${b.title}</h3>
        <p class='produto-preco'>Preço: R$ ${b.price.toFixed(2)}</p>
        <div class='btn-fav'>
            <p><a class="btn-link" href="${b.permalink}" target="_blank">Comprar</a></p> 
            <i class="btn-p bi bi-heart-fill"></i>
        </div>
    </div>
`, d.appendChild(a)
    })
} document.addEventListener("click", function (a) { if (a.target.classList.contains("btn-p")) { const b = a.target; b.style.color = "red" === b.style.color ? "" : "red" } }), document.addEventListener("click", function (a) {
    if (a.target.classList.contains("btn-p")) {
        const b = a.target, c = b.parentElement.parentElement.parentElement, d = c.getElementsByClassName("imagem-produto")[0].src, e = c.getElementsByClassName("produto-titulo")[0].innerText, f = c.getElementsByClassName("produto-preco")[0].innerText, g = b.parentElement.getElementsByClassName("btn-link")[0].href, h = { image: d, title: e, price: f, link: g }; let i = JSON.parse(localStorage.getItem("favoritos")) || []; const j = i.some(a => a.title === h.title); if (!j) {
            i.push(h), localStorage.setItem("favoritos", JSON.stringify(i)); let a = document.createElement("div"); a.classList.add("favoritos-produtos"), a.innerHTML = `
        <div class="favoritos-produtos">
            <div>
                <img src="${d}" alt="${e}" class="imagem-produto">
            </div>
            <div>
                <h1>${e}</h1>
            </div>
            <div>
                <p>${f}</p>
            </div>
            <div>
                <p><a href="${g}" target="_blank">Comprar</a></p>
            </div>
            <button class="btn-remover">Remover</button>
        </div>
    `; const b = document.getElementsByClassName("favoritos")[0]; b.appendChild(a), alert("Produto adicionado aos favoritos!")
        } else alert("Este produto j\xE1 est\xE1 nos favoritos!")
    }
}), document.addEventListener("click", function (a) { if (a.target.classList.contains("btn-remover")) { const b = a.target.closest(".favoritos-produtos"), c = b.querySelector("h1").innerText; b.remove(); let d = JSON.parse(localStorage.getItem("favoritos")) || []; d = d.filter(a => a.title !== c), localStorage.setItem("favoritos", JSON.stringify(d)), alert("Produto removido dos favoritos.") } });