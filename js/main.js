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
    index = (i + images.length) % images.length;
    slides.style.transform = `translateX(-${index * 100}%)`;

    // Reset timer
    clearInterval(interval);
    interval = setInterval(autoSlide, 5000);

    // Update dots
    dots.forEach((dot, idx) => dot.classList.toggle('active', idx === index));
  }

  function autoSlide() {
    showSlide(index + 1);
  }

  prevBtn.addEventListener('click', () => showSlide(index - 1));
  nextBtn.addEventListener('click', () => showSlide(index + 1));

  dots.forEach((dot, idx) => {
    dot.addEventListener('click', () => showSlide(idx));
  });

  // ===== Clique sur une image → Lightbox =====
  images.forEach(img => {
    img.addEventListener('click', () => {
      clearInterval(interval);

      const saison = img.alt.toLowerCase();
      lightboxImg.src = img.src;
      lightboxTitle.textContent = `Produits de ${saison.charAt(0).toUpperCase() + saison.slice(1)}`;

      // Générer tableau Fruits | Légumes
      lightboxList.innerHTML = "";
      if (produitsParSaison[saison]) {
        const { fruits, legumes } = produitsParSaison[saison];
        const table = document.createElement("table");
        table.classList.add("produits-table");

        const thead = document.createElement("thead");
        thead.innerHTML = `<tr><th>Fruits</th><th>Légumes</th></tr>`;
        table.appendChild(thead);

        const tbody = document.createElement("tbody");
        const maxLength = Math.max(fruits.length, legumes.length);
        for (let i = 0; i < maxLength; i++) {
          const tr = document.createElement("tr");
          tr.innerHTML = `
            <td>${fruits[i] || ""}</td>
            <td>${legumes[i] || ""}</td>
          `;
          tbody.appendChild(tr);
        }
        table.appendChild(tbody);

        // Scroll si le tableau dépasse 300px de hauteur
        table.style.maxHeight = "300px";
        table.style.overflowY = "auto";
        table.style.display = "block";

        lightboxList.appendChild(table);
      }

      lightbox.style.display = 'flex';
    });
  });

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

lightbox.addEventListener('click', e => {
  if (e.target === lightbox) {
    lightbox.style.display = 'none';
    restartFunctions.forEach(fn => fn());
  }
});
