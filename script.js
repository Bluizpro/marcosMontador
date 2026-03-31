// ===========================
// FUNCIONALIDADES INTERATIVAS
// ===========================

// Smooth scroll para links internos
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Validação e envio do formulário de contato
const form = document.getElementById('contactForm');
if (form) {
    form.addEventListener('submit', function (e) {
        e.preventDefault();
        
        // Captura os dados do formulário
        const nome = document.getElementById('nome').value.trim();
        const email = document.getElementById('email').value.trim();
        const telefone = document.getElementById('telefone').value.trim();
        const mensagem = document.getElementById('mensagem').value.trim();

        // Validação básica
        if (!nome || !email || !telefone || !mensagem) {
            mostrarNotificacao('Por favor, preencha todos os campos!', 'erro');
            return;
        }

        // Validação de email
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            mostrarNotificacao('Por favor, insira um email válido!', 'erro');
            return;
        }

        // Validação de telefone (apenas números)
        const telefoneLimpo = telefone.replace(/\D/g, '');
        if (telefoneLimpo.length < 10) {
            mostrarNotificacao('Por favor, insira um telefone válido!', 'erro');
            return;
        }

        // Simula envio do formulário
        const botao = form.querySelector('button[type="submit"]');
        const textoOriginal = botao.textContent;
        botao.textContent = 'Enviando...';
        botao.disabled = true;

        // Simula delay de envio
        setTimeout(() => {
            mostrarNotificacao('Obrigado, ' + nome + '! Sua solicitação foi recebida. Entraremos em contato em breve!', 'sucesso');
            
            // Limpa o formulário
            form.reset();
            botao.textContent = textoOriginal;
            botao.disabled = false;

            // Log para debug
            console.log('Dados do formulário:', {
                nome,
                email,
                telefone,
                mensagem
            });
        }, 1500);
    });
}

// Função para mostrar notificações
function mostrarNotificacao(mensagem, tipo = 'info') {
    const notificacao = document.createElement('div');
    notificacao.className = `notificacao notificacao-${tipo}`;
    notificacao.textContent = mensagem;
    notificacao.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        padding: 1rem 1.5rem;
        background-color: ${tipo === 'sucesso' ? '#4CAF50' : tipo === 'erro' ? '#f44336' : '#2196F3'};
        color: white;
        border-radius: 5px;
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
        z-index: 1000;
        animation: slideIn 0.3s ease;
        max-width: 90%;
    `;

    document.body.appendChild(notificacao);

    // Remove a notificação após 4 segundos
    setTimeout(() => {
        notificacao.style.animation = 'slideOut 0.3s ease';
        setTimeout(() => notificacao.remove(), 300);
    }, 4000);
}

// Adiciona animações de notificação
const style = document.createElement('style');
style.textContent = `
    @keyframes slideIn {
        from {
            transform: translateX(400px);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    
    @keyframes slideOut {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(400px);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

// Animação ao scroll (fade-in)
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Aplica a animação aos cards
document.querySelectorAll('.depoimento-card, .portfolio-item, .info-item').forEach(element => {
    element.style.opacity = '0';
    element.style.transform = 'translateY(20px)';
    element.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(element);
});

// Adiciona classe ativa ao menu ao fazer scroll
window.addEventListener('scroll', function() {
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.nav a');

    let current = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        if (pageYOffset >= sectionTop - 200) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href').slice(1) === current) {
            link.classList.add('active');
        }
    });
});

// Formata telefone enquanto o usuário digita
const telefonInput = document.getElementById('telefone');
if (telefonInput) {
    telefonInput.addEventListener('input', function(e) {
        let valor = e.target.value.replace(/\D/g, '');
        if (valor.length > 0) {
            if (valor.length <= 2) {
                valor = `(${valor}`;
            } else if (valor.length <= 6) {
                valor = `(${valor.slice(0, 2)}) ${valor.slice(2)}`;
            } else {
                valor = `(${valor.slice(0, 2)}) ${valor.slice(2, 7)}-${valor.slice(7, 11)}`;
            }
        }
        e.target.value = valor;
    });
}

// ===========================
// CARROSSEL DE SERVIÇOS
// ===========================
let currentSlide = 0;
const slides = document.querySelectorAll('.carousel-slide');
const indicators = document.querySelectorAll('.indicator');
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');

function showSlide(n) {
    // Remove a classe active de todos os slides
    slides.forEach(slide => slide.classList.remove('active'));
    indicators.forEach(indicator => indicator.classList.remove('active'));
    
    // Garante que o índice está dentro do intervalo
    if (n >= slides.length) {
        currentSlide = 0;
    } else if (n < 0) {
        currentSlide = slides.length - 1;
    } else {
        currentSlide = n;
    }
    
    // Adiciona a classe active ao slide e indicador atual
    slides[currentSlide].classList.add('active');
    indicators[currentSlide].classList.add('active');
}

function nextSlide() {
    showSlide(currentSlide + 1);
    resetAutoPlay();
}

function prevSlide() {
    showSlide(currentSlide - 1);
    resetAutoPlay();
}

// Cliques nos botões de navegação
if (nextBtn) nextBtn.addEventListener('click', nextSlide);
if (prevBtn) prevBtn.addEventListener('click', prevSlide);

// Cliques nos indicadores
indicators.forEach((indicator, index) => {
    indicator.addEventListener('click', () => {
        showSlide(index);
        resetAutoPlay();
    });
});

// Auto-play do carrossel
let autoPlayInterval;

function startAutoPlay() {
    autoPlayInterval = setInterval(() => {
        showSlide(currentSlide + 1);
    }, 5000); // Muda de slide a cada 5 segundos
}

function resetAutoPlay() {
    clearInterval(autoPlayInterval);
    startAutoPlay();
}

// Inicia o auto-play quando a página carrega
if (slides.length > 0) {
    startAutoPlay();
}

// Pausa o auto-play quando o mouse está sobre o carrossel
const carousel = document.querySelector('.servicos-carousel');
if (carousel) {
    carousel.addEventListener('mouseenter', () => {
        clearInterval(autoPlayInterval);
    });
    
    carousel.addEventListener('mouseleave', () => {
        startAutoPlay();
    });
}

// Log de inicialização
console.log('Script carregado com sucesso! Landing page pronta para uso.');
console.log('Carrossel de serviços ativado com auto-play.');
