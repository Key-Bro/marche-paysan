// ======= Carrousel =======
const slidesContainer = document.querySelector('.slides');
const images = document.querySelectorAll('.slides img');
const prevBtn = document.querySelector('.prev');
const nextBtn = document.querySelector('.next');
const dots = document.querySelectorAll('.dot');

let index = 0;
let interval = setInterval(autoSlide, 5000);

function showSlide(i) {
    if (i < 0) index = images.length - 1;
    else if (i >= images.length) index = 0;
    else index = i;

    slidesContainer.style.transform = `translateX(-${index * 100}%)`;

    // Update points
    dots.forEach((dot, idx) => {
        dot.classList.toggle('active', idx === index);
    });

    // Reset timer
    clearInterval(interval);
    interval = setInterval(autoSlide, 5000);
}

function autoSlide() {
    showSlide(index + 1);
}

// Navigation
prevBtn.addEventListener('click', () => showSlide(index - 1));
nextBtn.addEventListener('click', () => showSlide(index + 1));

// Cliquer sur les points
dots.forEach((dot, idx) => {
    dot.addEventListener('click', () => showSlide(idx));
});

// ======= Lightbox =======
const lightbox = document.getElementById('lightbox');
const lightboxImg = lightbox.querySelector('img');
const closeBtn = document.getElementById('close-lightbox');

images.forEach(img => {
    img.addEventListener('click', () => {
        // Stop le carrousel
        clearInterval(interval);

        // Affiche la lightbox avec l'image cliquée
        lightboxImg.src = img.src;
        lightbox.style.display = 'flex';
    });
});

// Fermer la lightbox
closeBtn.addEventListener('click', () => {
    lightbox.style.display = 'none';
    interval = setInterval(autoSlide, 5000);
});

// Fermer en cliquant en dehors de l'image
lightbox.addEventListener('click', (e) => {
    if (e.target === lightbox) {
        lightbox.style.display = 'none';
        interval = setInterval(autoSlide, 5000);
    }
});

// ======= Scroll Smooth =======
const menuLinks = document.querySelectorAll('nav a');

menuLinks.forEach(link => {
    link.addEventListener('click', e => {
        e.preventDefault();
        const targetId = link.getAttribute('href').substring(1);
        const targetEl = document.getElementById(targetId);
        if (targetEl) {
            window.scrollTo({
                top: targetEl.offsetTop - 50, // ajuste selon la taille du header
                behavior: 'smooth'
            });
        }
    });
});
