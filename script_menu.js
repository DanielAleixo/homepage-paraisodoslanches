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