document.addEventListener("DOMContentLoaded", function () {
    const storedProducts = JSON.parse(localStorage.getItem("favoritos")) || [];
    const sectionBody = document.getElementsByClassName("favoritos")[0];

    sectionBody.innerHTML = "";

    if (storedProducts.length === 0) {
        sectionBody.innerHTML = "<p>Nenhum produto nos favoritos.</p>";
        return;
    }

    storedProducts.forEach(product => {
        let productElement = document.createElement("div");
        productElement.classList.add("favoritos-produtos");

        productElement.innerHTML =
            `
        <div>
            <img src="${product.image}" alt="${product.title}" class="imagem-produto">
        </div>
        <div>
            <h1>${product.title}</h1>
        </div>
        <div>
            <p>${product.price}</p>
        </div>
        <div>
            <p><a href="${product.link}" target="_blank">Comprar</a></p>
        </div>
        <button class="btn-remover">Remover</button>
        `;
        const removeButton = productElement.querySelector(".btn-remover");
        removeButton.addEventListener("click", function () {
            productElement.remove();

            const updatedProducts = storedProducts.filter(p => p.title !== product.title);
            localStorage.setItem("favoritos", JSON.stringify(updatedProducts));
        });

        sectionBody.appendChild(productElement);
    });
});