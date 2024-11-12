// Carrossel de imagens
let currentIndex = 0;
const slides = document.querySelectorAll('.carousel-slide img');
const totalSlides = slides.length;

function showNextSlide() {
    // Aumenta o índice atual
    currentIndex++;

    // Verifica se chegou ao fim das imagens, se sim, volta para a primeira
    if (currentIndex >= totalSlides) {
        currentIndex = 0;
    }

    // Move o carrossel para a próxima imagem
    const carouselSlide = document.querySelector('.carousel-slide');
    carouselSlide.style.transform = `translateX(-${currentIndex * 260}px)`; // Ajusta o valor conforme a largura e o espaçamento das imagens
}

// Define o intervalo para trocar as imagens automaticamente a cada 1 segundo (1000ms)
setInterval(showNextSlide, 1000);

// Array para armazenar itens do carrinho
let carrinho = [];

// Função para adicionar item ao carrinho
function adicionarAoCarrinho(nome, preco) {
    carrinho.push({ nome, preco });
    atualizarCarrinho();
}

// Função para atualizar a exibição do carrinho
function atualizarCarrinho() {
    const carrinhoItens = document.getElementById('carrinho-itens');
    carrinhoItens.innerHTML = ''; // Limpa os itens atuais

    let total = 0;
    carrinho.forEach((item, index) => {
        total += item.preco;

        // Cria o elemento do item do carrinho
        const itemElemento = document.createElement('div');
        itemElemento.classList.add('carrinho-item');
        itemElemento.innerHTML = `
            <p>${item.nome} - R$ ${item.preco.toFixed(2)}</p>
            <button onclick="removerDoCarrinho(${index})">Remover</button>
        `;
        carrinhoItens.appendChild(itemElemento);
    });

    // Exibe o total do carrinho
    const totalElemento = document.createElement('div');
    totalElemento.classList.add('carrinho-total');
    totalElemento.innerHTML = `<strong>Total: R$ ${total.toFixed(2)}</strong>`;
    carrinhoItens.appendChild(totalElemento);

    atualizarLinkWhatsApp(total);
}

// Função para remover item do carrinho
function removerDoCarrinho(index) {
    carrinho.splice(index, 1);
    atualizarCarrinho();
}

// Função para atualizar o link de pedido no WhatsApp
function atualizarLinkWhatsApp(total) {
    const metodoPagamento = document.getElementById('metodo_pagamento').value;
    const mensagem = `Pedido de lanche:%0A${carrinho.map(item => `- ${item.nome}: R$ ${item.preco.toFixed(2)}`).join('%0A')}%0A%0ATotal: R$ ${total.toFixed(2)}%0AMétodo de Pagamento: ${metodoPagamento}`;
    
    const linkWhatsApp = document.getElementById('btn-pedido');
    linkWhatsApp.href = `https://wa.me/+5522981655352?text=${mensagem}`;
}

// Adiciona eventos a todos os botões de "Adicionar ao Carrinho"
document.querySelectorAll('.add-to-cart').forEach(button => {
    button.addEventListener('click', () => {
        const item = button.parentElement;
        const nome = item.querySelector('h3').textContent;
        const precoText = item.querySelector('p:nth-of-type(2)').textContent;
        const preco = parseFloat(precoText.replace('Preço: R$', '').replace(',', '.').trim());

        adicionarAoCarrinho(nome, preco);
    });
});

// Atualiza o link do WhatsApp ao selecionar o método de pagamento
document.getElementById('metodo_pagamento').addEventListener('change', () => {
    const total = carrinho.reduce((acc, item) => acc + item.preco, 0);
    atualizarLinkWhatsApp(total);
});
