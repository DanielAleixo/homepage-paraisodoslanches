// Dados de estados e suas respectivas cidades
const cidadesPorEstado = {
    'RJ': ['Itaperuna']
    // Adicione outros estados e suas cidades aqui
};

// Filtra as cidades com base no estado selecionado
document.getElementById('estado').addEventListener('change', function () {
    const estadoSelecionado = this.value;
    const cidadeSelect = document.getElementById('cidade');

    // Limpa as opções atuais do campo cidade
    cidadeSelect.innerHTML = '<option value="">Selecione a cidade</option>';

    if (estadoSelecionado && cidadesPorEstado[estadoSelecionado]) {
        // Adiciona as novas cidades de acordo com o estado selecionado
        cidadesPorEstado[estadoSelecionado].forEach(function (cidade) {
            const option = document.createElement('option');
            option.value = cidade;
            option.textContent = cidade;
            cidadeSelect.appendChild(option);
        });
    }
});

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

// Restringe a entrada do campo de telefone para apenas números
document.getElementById('telefone').addEventListener('input', function (e) {
    this.value = this.value.replace(/[^0-9]/g, ''); // Remove qualquer caractere que não seja número
});

// Notificação de Cadastro de Clientes
document.getElementById('cadastro-form').addEventListener('submit', function (event) {
    event.preventDefault(); // Impede o comportamento padrão do formulário

    const nome = document.getElementById('nome').value;
    if (nome.trim() === "") {
        alert("O campo Nome é obrigatório.");
        return;
    }

    const senha = document.getElementById('senha').value;
    const confirmaSenha = document.getElementById('confirma-senha').value;

    // Verifica se as senhas coincidem
    if (senha !== confirmaSenha) {
        alert("As senhas não coincidem. Por favor, tente novamente.");
        return;
    }

    // Exibir a notificação de sucesso
    const notificacao = document.getElementById('notificacao');
    notificacao.textContent = `${nome}, está cadastrado(a) com sucesso!`;
    notificacao.classList.add('mostrar'); // Mostra a notificação

    // Oculta a notificação após 3 segundos
    setTimeout(function () {
        notificacao.classList.add('ocultar');
        setTimeout(function () {
            notificacao.classList.remove('mostrar', 'ocultar'); // Remove as classes após desaparecer
        }, 500);
    }, 3000); // Duração da exibição (3 segundos)

    // Limpa os campos do formulário após o envio
    document.getElementById('cadastro-form').reset();
});
