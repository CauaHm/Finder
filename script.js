document.getElementById("botao-buscar").addEventListener("click",function () { 
    const a = document.getElementById("campo-busca").value; buscarProdutos(a) }), 
    document.getElementById("campo-busca").addEventListener("keydown", function (a) 
    { if ("Enter" === a.key) { a.preventDefault(); const b = document.getElementById("campo-busca").value; buscarProdutos(b) } }); 



const botoesCategoria = document.querySelectorAll(".botao-categoria"); botoesCategoria.forEach(a => { a.addEventListener("click", function () { const b = a.getAttribute("data-categoria"); buscarProdutos(b) }) });

 function buscarProdutos(a) { fetch(`https://api.mercadolibre.com/sites/MLB/search?q=${a}`).then(a => a.json()).then(a => exibirResultados(a.results)).catch(a => console.error("Erro ao buscar produtos:", a)) } function exibirResultados(a) {
    const b = document.getElementById("grid-produtos"); return b.innerHTML = "", 0 === a.length ? void (b.innerHTML = "<p>Nenhum produto encontrado.</p>") : void a.forEach(a => {
        const c = document.createElement("div"); c.className = "produto", c.innerHTML = `
    <div class='produto-img'>
    <img src="${a.thumbnail}" alt="${a.title}" class="imagem-produto">
    </div>
    <div class='produto-info'>
    <h3>${a.title}</h3>
    <p class='produto-preco'>Preço: R$ ${a.price.toFixed(2)}</p>
    <p><a href="${a.permalink}" target="_blank">Comprar</a></p>
    </div>
`, b.appendChild(c)
    })
}