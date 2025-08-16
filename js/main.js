// ===== PRODUITS PAR SAISON =====
const produitsParSaison = {
  hiver: {
    fruits: ["Pomme", "Poire", "Kiwi", "Clémentine", "Mandarine", "Orange", "Pamplemousse", "Citron", "Châtaigne"],
    legumes: ["Chou (tous types)", "Carotte", "Navet", "Poireau", "Céleri-rave", "Endive", "Panais", "Topinambour", "Betterave", "Oignon"]
  },
  printemps: {
    fruits: ["Pomme (fin de saison)", "Poire (fin de saison)", "Kiwi", "Fraise", "Cerise (fin mai)", "Rhubarbe"],
    legumes: ["Asperge", "Artichaut", "Épinard", "Radis", "Carotte", "Poireau", "Salade", "Petit pois", "Navet", "Chou-fleur"]
  },
  ete: {
    fruits: ["Fraise", "Cerise", "Framboise", "Groseille", "Abricot", "Pêche", "Nectarine", "Melon", "Pastèque", "Myrtille", "Prune", "Mûre", "Figue", "Raisin (début)", "Pomme", "Poire"],
    legumes: ["Tomate", "Courgette", "Concombre", "Poivron", "Aubergine", "Haricot vert", "Maïs", "Carotte", "Salade", "Radis", "Oignon", "Fenouil"]
  },
  automne: {
    fruits: ["Raisin", "Pomme", "Poire", "Coing", "Prune", "Figue", "Kaki", "Châtaigne", "Noisette"],
    legumes: ["Potiron", "Citrouille", "Courge", "Carotte", "Navet", "Céleri", "Chou (rouge, vert, Bruxelles)", "Betterave", "Poireau", "Champignon", "Endive"]
  }
};


// ===== Lightbox =====
const lightbox = document.getElementById('lightbox');
const lightboxImg = document.getElementById('lightbox-img');
const lightboxTitle = document.getElementById('lightbox-title');
const lightboxList = document.getElementById('lightbox-list');
const closeBtn = document.getElementById('close-lightbox');

// ===== Fonction pour initialiser un carrousel =====
function initCarousel(carouselElement) {
  const slides = carouselElement.querySelector('.slides');
  const images = carouselElement.querySelectorAll('.slides img');
  const prevBtn = carouselElement.querySelector('.prev');
  const nextBtn = carouselElement.querySelector('.next');
  const dots = carouselElement.querySelectorAll('.dot');

  let index = 0;
  let interval = setInterval(autoSlide, 5000);

  function showSlide(i) {
    if (i < 0) index = images.length - 1;
    else if (i >= images.length) index = 0;
    else index = i;

    slides.style.transform = `translateX(-${index * 100}%)`;

    // Reset timer
    clearInterval(interval);
    interval = setInterval(autoSlide, 5000);

    // Update dots
    dots.forEach((dot, idx) => {
      dot.classList.toggle('active', idx === index);
    });
  }

  function autoSlide() {
    showSlide(index + 1);
  }

  // Boutons navigation
  prevBtn.addEventListener('click', () => showSlide(index - 1));
  nextBtn.addEventListener('click', () => showSlide(index + 1));

  // Clic sur les points
  dots.forEach((dot, idx) => {
    dot.addEventListener('click', () => showSlide(idx));
  });

  // ===== Clique sur une image → Lightbox =====
  images.forEach(img => {
    img.addEventListener('click', () => {
      clearInterval(interval);

      // Récupérer saison depuis l'attribut alt
      const saison = img.alt.toLowerCase();

      // Remplir la lightbox
      lightboxImg.src = img.src;
      lightboxTitle.textContent = `Produits de ${saison.charAt(0).toUpperCase() + saison.slice(1)}`;

      // Générer la liste
      lightboxList.innerHTML = "";
      if (produitsParSaison[saison]) {
        produitsParSaison[saison].forEach(prod => {
          const li = document.createElement("li");
          li.textContent = prod;
          lightboxList.appendChild(li);
        });
      }

      lightbox.style.display = 'flex';
    });
  });

  // Fonction publique pour relancer le carrousel
  return () => {
    clearInterval(interval);
    interval = setInterval(autoSlide, 5000);
  };
}

// ===== Initialisation de TOUS les carrousels =====
const carousels = document.querySelectorAll('.carousel');
const restartFunctions = [];
carousels.forEach(carousel => {
  const restart = initCarousel(carousel);
  restartFunctions.push(restart);
});

// ===== Gestion fermeture de la lightbox =====
closeBtn.addEventListener('click', () => {
  lightbox.style.display = 'none';
  restartFunctions.forEach(fn => fn());
});

lightbox.addEventListener('click', (e) => {
  if (e.target === lightbox) {
    lightbox.style.display = 'none';
    restartFunctions.forEach(fn => fn());
  }
});
