const slides = document.querySelector('.slides');
const images = document.querySelectorAll('.slides img');
const prevBtn = document.querySelector('.prev');
const nextBtn = document.querySelector('.next');
const dots = document.querySelectorAll('.dot');

let index = 0;
let interval = setInterval(autoSlide, 5000);

// ===== PRODUITS PAR SAISON =====
const produitsParSaison = {
  "ete": ["Tomates", "Courgettes", "Aubergines", "Melons", "Pêches"],
  "hiver": ["Pommes de terre", "Choux", "Carottes", "Poireaux", "Clémentines"],
  "printemps": ["Fraises", "Radis", "Asperges", "Petits pois"],
  "automne": ["Pommes", "Potirons", "Raisins", "Noix"]
};

// ===== Lightbox =====
const lightbox = document.getElementById('lightbox');
const lightboxImg = document.getElementById('lightbox-img');
const lightboxTitle = document.getElementById('lightbox-title');
const lightboxList = document.getElementById('lightbox-list');
const closeBtn = document.getElementById('close-lightbox');

function showSlide(i) {
  if(i < 0) index = images.length - 1;
  else if(i >= images.length) index = 0;
  else index = i;

  slides.style.transform = `translateX(-${index * 100}%)`;

  clearInterval(interval);
  interval = setInterval(autoSlide, 5000);

  dots.forEach((dot, idx) => {
    dot.classList.toggle('active', idx === index);
  });
}

function autoSlide() {
  showSlide(index + 1);
}

// Navigation
prevBtn.addEventListener('click', () => showSlide(index - 1));
nextBtn.addEventListener('click', () => showSlide(index + 1));
dots.forEach((dot, idx) => dot.addEventListener('click', () => showSlide(idx)));

// ===== Clique sur une image (ouvre la carte lightbox) =====
images.forEach(img => {
    img.addEventListener('click', () => {
        clearInterval(interval);

        // Récupérer saison depuis l'attribut "alt" (ex: alt="ete")
        const saison = img.alt.toLowerCase();

        lightboxImg.src = img.src;
        lightboxTitle.textContent = `Produits de ${saison.charAt(0).toUpperCase() + saison.slice(1)}`;

        // Générer la liste des produits
        lightboxList.innerHTML = "";
        if(produitsParSaison[saison]) {
            produitsParSaison[saison].forEach(prod => {
                let li = document.createElement("li");
                li.textContent = prod;
                lightboxList.appendChild(li);
            });
        }

        lightbox.style.display = 'flex';
    });
});

// Fermer la lightbox
closeBtn.addEventListener('click', () => {
    lightbox.style.display = 'none';
    interval = setInterval(autoSlide, 5000);
});

lightbox.addEventListener('click', (e) => {
    if(e.target === lightbox) {
        lightbox.style.display = 'none';
        interval = setInterval(autoSlide, 5000);
    }
});
