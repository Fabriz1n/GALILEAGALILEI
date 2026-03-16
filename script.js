// Mensajes dedicatorios
const mensajes = [
    "Cada día a tu lado es un regalo que atesoro en mi corazón. Eres la luz que ilumina mi vida. ✨",
    "Tu sonrisa es mi amanecer favorito y tu abrazo mi lugar seguro en el mundo. 🌅",
    "Contigo aprendí que el amor verdadero existe y que vale la pena esperar por él. 💫",
    "Si pudiera pedir un deseo, pediría volver a enamorarme de ti una y otra vez. 🌟",
    "Eres mi pensamiento constante, mi sueño recurrente y mi realidad más hermosa. 💭",
    "Amarte es tan fácil como respirar, y es tan necesario como el aire para vivir. 💕",
    "Cada momento contigo es un capítulo favorito de mi historia de vida. 📖",
    "No hay distancia que pueda separar lo que nuestros corazones sienten. 🌹",
    "Eres el 'por qué' de mis sonrisas y la respuesta a mis oraciones. 🙏",
    "Prometo amarte hoy, mañana y siempre, más allá de lo que las palabras pueden expresar. 💍"
];

let currentMessage = 0;
let isPlaying = false;

// Elementos del DOM
const messageDisplay = document.getElementById('message-display');
const nextBtn = document.getElementById('next-message');
const indicatorsContainer = document.getElementById('indicators');
const musicToggle = document.getElementById('music-toggle');
const bgMusic = document.getElementById('bg-music');
const surpriseBtn = document.getElementById('surprise-btn');
const surpriseModal = document.getElementById('surprise-modal');
const closeModal = document.getElementById('close-modal');
const kissBtn = document.createElement('button');

// Crear indicadores
function createIndicators() {
    mensajes.forEach((_, index) => {
        const dot = document.createElement('div');
        dot.className = `w-2 h-2 rounded-full transition-all duration-300 cursor-pointer ${index === 0 ? 'bg-pink-500 w-6' : 'bg-pink-200'}`;
        dot.addEventListener('click', () => showMessage(index));
        indicatorsContainer.appendChild(dot);
    });
}

// Mostrar mensaje
function showMessage(index) {
    currentMessage = index;
    const messageText = messageDisplay.querySelector('p');
    
    // Fade out
    messageText.style.opacity = '0';
    messageText.style.transform = 'translateY(10px)';
    
    setTimeout(() => {
        messageText.textContent = `"${mensajes[index]}"`;
        messageText.style.opacity = '1';
        messageText.style.transform = 'translateY(0)';
    }, 300);

    // Actualizar indicadores
    const dots = indicatorsContainer.querySelectorAll('div');
    dots.forEach((dot, i) => {
        if (i === index) {
            dot.className = 'w-6 h-2 rounded-full bg-pink-500 transition-all duration-300 cursor-pointer';
        } else {
            dot.className = 'w-2 h-2 rounded-full bg-pink-200 transition-all duration-300 cursor-pointer';
        }
    });
}

// Navegación de mensajes
nextBtn.addEventListener('click', () => {
    currentMessage = (currentMessage + 1) % mensajes.length;
    showMessage(currentMessage);
});

// Cambio automático cada 8 segundos
setInterval(() => {
    currentMessage = (currentMessage + 1) % mensajes.length;
    showMessage(currentMessage);
}, 8000);

// Control de música
musicToggle.addEventListener('click', () => {
    if (isPlaying) {
        bgMusic.pause();
        musicToggle.innerHTML = '<i data-lucide="music" class="w-6 h-6"></i><span class="text-sm font-semibold hidden sm:inline">Reproducir Música</span>';
        isPlaying = false;
    } else {
        bgMusic.play().catch(e => console.log('Autoplay prevented:', e));
        musicToggle.innerHTML = '<i data-lucide="pause" class="w-6 h-6"></i><span class="text-sm font-semibold hidden sm:inline">Pausar Música</span>';
        isPlaying = true;
    }
    lucide.createIcons();
});

// Sorpresa
surpriseBtn.addEventListener('click', () => {
    surpriseModal.classList.remove('hidden');
    surpriseModal.classList.add('flex');
    setTimeout(() => {
        surpriseModal.querySelector('div').classList.remove('scale-0');
        surpriseModal.querySelector('div').classList.add('scale-100');
    }, 10);
    
    // Efecto de confeti
    createConfetti();
});

closeModal.addEventListener('click', closeSurprise);

surpriseModal.addEventListener('click', (e) => {
    if (e.target === surpriseModal) closeSurprise();
});

function closeSurprise() {
    surpriseModal.querySelector('div').classList.remove('scale-100');
    surpriseModal.querySelector('div').classList.add('scale-0');
    setTimeout(() => {
        surpriseModal.classList.add('hidden');
        surpriseModal.classList.remove('flex');
    }, 300);
}

// Botón de beso
kissBtn.addEventListener('click', () => {
    createHearts();
    alert('¡Te envío un beso lleno de amor! 💋😘');
});

// Crear pétalos cayendo
function createPetal() {
    const petal = document.createElement('div');
    petal.className = 'petal text-2xl';
    petal.textContent = ['🌸', '🌺', '🌹', '🌷', '💮'][Math.floor(Math.random() * 5)];
    petal.style.left = Math.random() * 100 + 'vw';
    petal.style.animationDuration = (Math.random() * 5 + 5) + 's';
    petal.style.opacity = Math.random() * 0.6 + 0.4;
    petal.style.fontSize = (Math.random() * 20 + 10) + 'px';
    
    document.getElementById('petals-container').appendChild(petal);
    
    setTimeout(() => {
        petal.remove();
    }, 10000);
}

// Crear corazones flotantes
function createHearts() {
    for (let i = 0; i < 20; i++) {
        setTimeout(() => {
            const heart = document.createElement('div');
            heart.className = 'floating-heart text-red-500 text-2xl';
            heart.innerHTML = '❤️';
            heart.style.left = Math.random() * 100 + 'vw';
            heart.style.bottom = '0';
            heart.style.animationDuration = (Math.random() * 3 + 2) + 's';
            heart.style.fontSize = (Math.random() * 30 + 20) + 'px';
            
            document.getElementById('hearts-container').appendChild(heart);
            
            setTimeout(() => {
                heart.remove();
            }, 4000);
        }, i * 100);
    }
}

// Crear confeti
function createConfetti() {
    const colors = ['#FF69B4', '#FF1493', '#DC143C', '#FFD700', '#FF69B4'];
    for (let i = 0; i < 50; i++) {
        setTimeout(() => {
            const confetti = document.createElement('div');
            confetti.style.position = 'fixed';
            confetti.style.left = Math.random() * 100 + 'vw';
            confetti.style.top = '-10px';
            confetti.style.width = '10px';
            confetti.style.height = '10px';
            confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
            confetti.style.borderRadius = '50%';
            confetti.style.zIndex = '100';
            confetti.style.animation = `petal-fall ${Math.random() * 3 + 2}s linear forwards`;
            
            document.body.appendChild(confetti);
            
            setTimeout(() => {
                confetti.remove();
            }, 5000);
        }, i * 50);
    }
}

// Efecto de click en flores
document.querySelectorAll('.flower-container').forEach(flower => {
    flower.addEventListener('click', function() {
        this.style.transform = 'scale(1.2)';
        this.style.transition = 'transform 0.3s';
        setTimeout(() => {
            this.style.transform = '';
        }, 300);
        
        // Crear un pequeño corazón
        const heart = document.createElement('div');
        heart.textContent = '❤️';
        heart.style.position = 'absolute';
        heart.style.left = '50%';
        heart.style.top = '50%';
        heart.style.transform = 'translate(-50%, -50%)';
        heart.style.fontSize = '24px';
        heart.style.pointerEvents = 'none';
        heart.style.animation = 'heart-float 2s ease-out forwards';
        this.appendChild(heart);
        setTimeout(() => heart.remove(), 2000);
    });
});

// Inicialización
createIndicators();
setInterval(createPetal, 500);

// Interacciones aleatorias
document.addEventListener('DOMContentLoaded', () => {
    // Animación inicial de entrada
    const flowers = document.querySelectorAll('.flower-container');
    flowers.forEach((flower, index) => {
        flower.style.opacity = '0';
        flower.style.transform = 'scale(0)';
        setTimeout(() => {
            flower.style.transition = 'all 0.5s ease-out';
            flower.style.opacity = '1';
            flower.style.transform = 'scale(1)';
        }, index * 200);
    });
});