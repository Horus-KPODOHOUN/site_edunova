// Menu mobile
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

if (hamburger && navMenu) {
    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
    });

    // Fermer le menu mobile en cliquant sur un lien
    document.querySelectorAll('.nav-menu a').forEach(n => n.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
    }));

    // Gestion des sous-menus sur mobile
    document.querySelectorAll('.nav-menu .has-submenu > a').forEach(link => {
        link.addEventListener('click', (e) => {
            if (window.innerWidth <= 992) {
                e.preventDefault();
                const subMenu = link.nextElementSibling;
                if (subMenu && subMenu.classList.contains('sub-menu')) {
                    subMenu.style.display = subMenu.style.display === 'block' ? 'none' : 'block';
                }
            }
        });
    });
}

// Back to top button
const backToTopButton = document.querySelector('.back-to-top');

if (backToTopButton) {
    window.addEventListener('scroll', () => {
        if (window.pageYOffset > 300) {
            backToTopButton.classList.add('active');
        } else {
            backToTopButton.classList.remove('active');
        }
    });

    backToTopButton.addEventListener('click', (e) => {
        e.preventDefault();
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });
}

// Animation au défilement
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animate');
        }
    });
}, observerOptions);

// Observer les sections
document.querySelectorAll('.section, .main-section').forEach(section => {
    observer.observe(section);
});

// Formulaire de contact
const contactForm = document.getElementById('contactForm');
if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        alert('Merci pour votre message! Nous vous répondrons dans les plus brefs délais.');
        contactForm.reset();
    });
}

// Galerie Carrousel
const gallerySlider = document.querySelector('.gallery-slider');
if (gallerySlider) {
    const slides = document.querySelectorAll('.slide');
    const prevButton = document.querySelector('.gallery-prev');
    const nextButton = document.querySelector('.gallery-next');
    const dotsContainer = document.querySelector('.gallery-dots');
    
    let currentSlide = 0;
    const totalSlides = slides.length;
    
    // Créer les points indicateurs
    slides.forEach((_, index) => {
        const dot = document.createElement('div');
        dot.classList.add('gallery-dot');
        if (index === 0) dot.classList.add('active');
        dot.addEventListener('click', () => goToSlide(index));
        dotsContainer.appendChild(dot);
    });
    
    const dots = document.querySelectorAll('.gallery-dot');
    
    // Fonction pour aller à une slide spécifique
    function goToSlide(slideIndex) {
        currentSlide = slideIndex;
        updateSlider();
    }
    
    // Fonction pour mettre à jour le slider
    function updateSlider() {
        gallerySlider.style.transform = `translateX(-${currentSlide * 100}%)`;
        
        // Mettre à jour les points actifs
        dots.forEach((dot, index) => {
            dot.classList.toggle('active', index === currentSlide);
        });
    }
    
    // Événements pour les boutons précédent/suivant
    prevButton.addEventListener('click', () => {
        currentSlide = (currentSlide - 1 + totalSlides) % totalSlides;
        updateSlider();
    });
    
    nextButton.addEventListener('click', () => {
        currentSlide = (currentSlide + 1) % totalSlides;
        updateSlider();
    });
    
    // Défilement automatique
    let autoSlideInterval = setInterval(() => {
        currentSlide = (currentSlide + 1) % totalSlides;
        updateSlider();
    }, 5000);
    
    // Arrêter le défilement automatique au survol
    gallerySlider.addEventListener('mouseenter', () => {
        clearInterval(autoSlideInterval);
    });
    
    gallerySlider.addEventListener('mouseleave', () => {
        autoSlideInterval = setInterval(() => {
            currentSlide = (currentSlide + 1) % totalSlides;
            updateSlider();
        }, 5000);
    });
}

// Hero Carrousel
const heroSlider = document.querySelector('.hero-slider');
if (heroSlider) {
    const heroSlides = document.querySelectorAll('.hero-slide');
    const heroPrev = document.querySelector('.hero-prev');
    const heroNext = document.querySelector('.hero-next');
    const heroDots = document.querySelectorAll('.hero-dot');
    
    let currentHeroSlide = 0;
    const totalHeroSlides = heroSlides.length;
    
    // Fonction pour mettre à jour le slider hero
    function updateHeroSlider() {
        heroSlider.style.transform = `translateX(-${currentHeroSlide * 100}%)`;
        
        // Mettre à jour les points actifs
        heroDots.forEach((dot, index) => {
            dot.classList.toggle('active', index === currentHeroSlide);
        });
    }
    
    // Événements pour les boutons précédent/suivant hero
    heroPrev.addEventListener('click', () => {
        currentHeroSlide = (currentHeroSlide - 1 + totalHeroSlides) % totalHeroSlides;
        updateHeroSlider();
    });
    
    heroNext.addEventListener('click', () => {
        currentHeroSlide = (currentHeroSlide + 1) % totalHeroSlides;
        updateHeroSlider();
    });
    
    // Événements pour les points hero
    heroDots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
            currentHeroSlide = index;
            updateHeroSlider();
        });
    });
    
    // Défilement automatique hero
    let autoHeroSlideInterval = setInterval(() => {
        currentHeroSlide = (currentHeroSlide + 1) % totalHeroSlides;
        updateHeroSlider();
    }, 6000);
    
    // Arrêter le défilement automatique au survol hero
    heroSlider.addEventListener('mouseenter', () => {
        clearInterval(autoHeroSlideInterval);
    });
    
    heroSlider.addEventListener('mouseleave', () => {
        autoHeroSlideInterval = setInterval(() => {
            currentHeroSlide = (currentHeroSlide + 1) % totalHeroSlides;
            updateHeroSlider();
        }, 6000);
    });
}

// Animation des éléments au chargement
document.addEventListener('DOMContentLoaded', function() {
    // Animation pour les cartes de fonctionnalités
    const featureCards = document.querySelectorAll('.feature-card, .value-card, .option-card');
    featureCards.forEach((card, index) => {
        card.style.animationDelay = `${index * 0.1}s`;
    });
});

// Fonctionnalités pour la galerie
function initGalleryPage() {
    const galleryItems = document.querySelectorAll('.gallery-item');
    const filterButtons = document.querySelectorAll('.filter-btn');
    const modal = document.getElementById('imageModal');
    const modalImg = document.getElementById('modalImage');
    const modalCaption = document.getElementById('modalCaption');
    const closeModal = document.querySelector('.close-modal');
    const prevButton = document.querySelector('.modal-prev');
    const nextButton = document.querySelector('.modal-next');
    
    let currentImageIndex = 0;
    let filteredItems = [];

    // Filtrage des images
    if (filterButtons.length > 0) {
        filterButtons.forEach(button => {
            button.addEventListener('click', () => {
                const filter = button.getAttribute('data-filter');
                
                // Mettre à jour les boutons actifs
                filterButtons.forEach(btn => btn.classList.remove('active'));
                button.classList.add('active');
                
                // Filtrer les images
                galleryItems.forEach(item => {
                    if (filter === 'all' || item.getAttribute('data-category') === filter) {
                        item.style.display = 'block';
                        setTimeout(() => {
                            item.style.opacity = '1';
                            item.style.transform = 'scale(1)';
                        }, 100);
                    } else {
                        item.style.opacity = '0';
                        item.style.transform = 'scale(0.8)';
                        setTimeout(() => {
                            item.style.display = 'none';
                        }, 300);
                    }
                });
            });
        });
    }

    // Modal functionality
    if (modal) {
        // Ouvrir le modal
        galleryItems.forEach((item, index) => {
            item.addEventListener('click', () => {
                currentImageIndex = index;
                updateModal();
                modal.style.display = 'block';
                document.body.style.overflow = 'hidden';
            });
        });

        // Fermer le modal
        closeModal.addEventListener('click', () => {
            modal.style.display = 'none';
            document.body.style.overflow = 'auto';
        });

        // Navigation dans le modal
        if (prevButton && nextButton) {
            prevButton.addEventListener('click', showPrevImage);
            nextButton.addEventListener('click', showNextImage);
        }

        // Fermer en cliquant en dehors de l'image
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                modal.style.display = 'none';
                document.body.style.overflow = 'auto';
            }
        });

        // Navigation au clavier
        document.addEventListener('keydown', (e) => {
            if (modal.style.display === 'block') {
                if (e.key === 'Escape') {
                    modal.style.display = 'none';
                    document.body.style.overflow = 'auto';
                } else if (e.key === 'ArrowLeft') {
                    showPrevImage();
                } else if (e.key === 'ArrowRight') {
                    showNextImage();
                }
            }
        });
    }

    function updateModal() {
        const currentItem = galleryItems[currentImageIndex];
        const img = currentItem.querySelector('img');
        const caption = currentItem.querySelector('.gallery-item-caption');
        
        modalImg.src = img.src;
        modalImg.alt = img.alt;
        modalCaption.textContent = caption ? caption.textContent : '';
    }

    function showPrevImage() {
        currentImageIndex = (currentImageIndex - 1 + galleryItems.length) % galleryItems.length;
        updateModal();
    }

    function showNextImage() {
        currentImageIndex = (currentImageIndex + 1) % galleryItems.length;
        updateModal();
    }

    // Load more functionality
    const loadMoreBtn = document.getElementById('loadMore');
    if (loadMoreBtn) {
        loadMoreBtn.addEventListener('click', loadMoreImages);
    }
}

function loadMoreImages() {
    // Simuler le chargement de plus d'images
    const loadMoreBtn = document.getElementById('loadMore');
    loadMoreBtn.textContent = 'Chargement...';
    loadMoreBtn.disabled = true;
    
    setTimeout(() => {
        // Ici, vous ajouteriez logiquement plus d'images
        // Pour l'exemple, on va juste désactiver le bouton
        loadMoreBtn.style.display = 'none';
        alert('Toutes les images sont chargées !');
    }, 1500);
}

// Fonctions utilitaires pour le tri
function sortByRecent(items) {
    return items.sort((a, b) => {
        // Utiliser l'ID ou le timestamp pour le tri
        const idA = a.timestamp ? new Date(a.timestamp).getTime() : a.id;
        const idB = b.timestamp ? new Date(b.timestamp).getTime() : b.id;
        return idB - idA;
    });
}

function getRecentItems(items, count = 3) {
    const sorted = sortByRecent(items);
    return sorted.slice(0, count);
}

// Formater la date
function formatDate(dateString) {
    const date = new Date(dateString);
    return date.toLocaleDateString('fr-FR', {
        day: 'numeric',
        month: 'long',
        year: 'numeric'
    });
}

// Fonctions de création de cartes
function createNewsCard(item) {
    return `
        <div class="news-card">
            <div class="news-img">
                <img src="${item.image || 'https://source.unsplash.com/random/600x400/?education,news'}" alt="${item.title}">
            </div>
            <div class="news-content">
                <div class="news-date">${formatDate(item.date)}</div>
                <h3>${item.title}</h3>
                <p style="display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical; overflow: hidden;">
                    ${item.content}
                </p>
                <a href="actualites.html?id=${item.id}" class="btn">Lire la suite</a>
            </div>
        </div>
    `;
}

function createEventCard(event) {
    return `
        <div class="event-card">
            <div class="event-header">
                <div class="event-date">${new Date(event.date).getDate()}</div>
                <div class="event-month">${event.month}</div>
            </div>
            <div class="event-content">
                <h3>${event.title}</h3>
                <p>${event.description}</p>
                <div class="event-meta">
                    <span><i class="far fa-clock"></i> ${event.time}</span>
                    <span><i class="fas fa-map-marker-alt"></i> ${event.location}</span>
                </div>
                <a href="#" class="btn" style="margin-top: 20px;">S'inscrire</a>
            </div>
        </div>
    `;
}

// Contenu par défaut pour les actualités
function showDefaultNews(container) {
    container.innerHTML = `
        <div class="news-card">
            <div class="news-img">
                <img src="https://source.unsplash.com/random/600x400/?education,technology" alt="Nouveau programme">
            </div>
            <div class="news-content">
                <div class="news-date">15 Juin 2023</div>
                <h3>Lancement de notre nouveau programme STEM</h3>
                <p style="display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical; overflow: hidden;">
                    Nous sommes ravis d'annoncer le lancement de notre programme STEM innovant conçu pour préparer les étudiants aux carrières de demain. Ce programme inclut des ateliers pratiques, des projets collaboratifs et un accompagnement personnalisé.
                </p>
                <a href="#" class="btn">Lire la suite</a>
            </div>
        </div>
        <div class="news-card">
            <div class="news-img">
                <img src="https://source.unsplash.com/random/600x400/?education,workshop" alt="Atelier">
            </div>
            <div class="news-content">
                <div class="news-date">10 Juin 2023</div>
                <h3>Atelier sur les méthodes d'apprentissage actif</h3>
                <p style="display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical; overflow: hidden;">
                    Participez à notre atelier gratuit sur les méthodes d'apprentissage actif qui transforment l'expérience éducative. Découvrez comment impliquer davantage vos étudiants et améliorer leurs résultats.
                </p>
                <a href="#" class="btn">Lire la suite</a>
            </div>
        </div>
        <div class="news-card">
            <div class="news-img">
                <img src="https://source.unsplash.com/random/600x400/?education,partnership" alt="Partenariat">
            </div>
            <div class="news-content">
                <div class="news-date">5 Juin 2023</div>
                <h3>Nouveau partenariat avec TechInnovate</h3>
                <p style="display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical; overflow: hidden;">
                    Nous avons le plaisir d'annoncer un nouveau partenariat stratégique avec TechInnovate pour enrichir notre offre éducative. Cette collaboration nous permettra d'intégrer les dernières technologies dans nos programmes.
                </p>
                <a href="#" class="btn">Lire la suite</a>
            </div>
        </div>
    `;
}

// Contenu par défaut pour les événements
function showDefaultEvents(container) {
    container.innerHTML = `
        <div class="event-card">
            <div class="event-header">
                <div class="event-date">25</div>
                <div class="event-month">JUIN</div>
            </div>
            <div class="event-content">
                <h3>Journée Portes Ouvertes</h3>
                <p>Venez découvrir nos installations, rencontrer notre équipe pédagogique et en apprendre davantage sur nos programmes éducatifs innovants.</p>
                <div class="event-meta">
                    <span><i class="far fa-clock"></i> 9h00 - 17h00</span>
                    <span><i class="fas fa-map-marker-alt"></i> Campus Principal</span>
                </div>
                <a href="#" class="btn" style="margin-top: 20px;">S'inscrire</a>
            </div>
        </div>
        <div class="event-card">
            <div class="event-header">
                <div class="event-date">5-7</div>
                <div class="event-month">JUILLET</div>
            </div>
            <div class="event-content">
                <h3>Conférence sur l'Éducation du Futur</h3>
                <p>Une conférence de trois jours réunissant des experts en éducation pour discuter des tendances et innovations dans le domaine de l'enseignement.</p>
                <div class="event-meta">
                    <span><i class="far fa-clock"></i> 9h00 - 18h00</span>
                    <span><i class="fas fa-map-marker-alt"></i> Auditorium</span>
                </div>
                <a href="#" class="btn" style="margin-top: 20px;">S'inscrire</a>
            </div>
        </div>
        <div class="event-card">
            <div class="event-header">
                <div class="event-date">15</div>
                <div class="event-month">AOÛT</div>
            </div>
            <div class="event-content">
                <h3>Atelier Coding pour Enfants</h3>
                <p>Initiation au codage pour les enfants de 8 à 12 ans. Une approche ludique pour développer la pensée computationnelle.</p>
                <div class="event-meta">
                    <span><i class="far fa-clock"></i> 14h00 - 17h00</span>
                    <span><i class="fas fa-map-marker-alt"></i> Salle Informatique</span>
                </div>
                <a href="#" class="btn" style="margin-top: 20px;">S'inscrire</a>
            </div>
        </div>
    `;
}

// Charger les actualités - Afficher les 3 plus récentes
function loadNews() {
    const newsContainer = document.getElementById('dynamic-news');
    if (!newsContainer) return;

    const news = JSON.parse(localStorage.getItem('edunova_news')) || [];
    
    // Trier par ID (les plus récentes en premier) et prendre les 3 premières
    const recentNews = getRecentItems(news, 3);

    if (recentNews.length === 0) {
        // Contenu par défaut si aucune actualité
        showDefaultNews(newsContainer);
        return;
    }

    // Afficher les 3 actualités les plus récentes avec seulement 2 lignes de description
    newsContainer.innerHTML = recentNews.map(createNewsCard).join('');
}

// Charger les événements - Afficher les 3 plus récents
function loadEvents() {
    const eventsContainer = document.getElementById('dynamic-events');
    if (!eventsContainer) return;

    const events = JSON.parse(localStorage.getItem('edunova_events')) || [];
    
    // Trier par ID (les plus récents en premier) et prendre les 3 premiers
    const recentEvents = getRecentItems(events, 3);

    if (recentEvents.length === 0) {
        // Contenu par défaut si aucun événement
        showDefaultEvents(eventsContainer);
        return;
    }

    // Afficher les 3 événements les plus récents
    eventsContainer.innerHTML = recentEvents.map(createEventCard).join('');
}

// Initialiser la galerie dynamique avec les images les plus récentes
function initDynamicGallery() {
    const galleryContainer = document.querySelector('.gallery-grid');
    if (!galleryContainer) return;

    const gallery = JSON.parse(localStorage.getItem('edunova_gallery')) || [];
    
    // Trier par ID (les plus récentes en premier) et prendre les 12 premières
    const recentGallery = getRecentItems(gallery, 12);
    
    if (recentGallery.length > 0) {
        // Ajouter les images les plus récentes à la galerie
        galleryContainer.innerHTML = recentGallery.map(item => `
            <div class="gallery-item" data-category="${item.category}">
                <img src="${item.image}" alt="${item.caption}">
                <div class="gallery-item-caption">${item.caption}</div>
            </div>
        `).join('');
    }
}

// Recréer les points indicateurs du carrousel
function recreateCarouselDots() {
    const galleryDots = document.querySelector('.gallery-dots');
    const slides = document.querySelectorAll('.slide');
    
    if (!galleryDots) return;
    
    galleryDots.innerHTML = '';
    
    slides.forEach((_, index) => {
        const dot = document.createElement('div');
        dot.classList.add('gallery-dot');
        if (index === 0) dot.classList.add('active');
        dot.addEventListener('click', () => goToSlide(index));
        galleryDots.appendChild(dot);
    });
}

// Réinitialiser le carrousel
function resetCarousel() {
    const gallerySlider = document.querySelector('.gallery-slider');
    const slides = document.querySelectorAll('.slide');
    const dots = document.querySelectorAll('.gallery-dot');
    
    if (!gallerySlider || slides.length === 0) return;
    
    let currentSlide = 0;
    
    // Mettre à jour la position du slider
    function updateSlider() {
        gallerySlider.style.transform = `translateX(-${currentSlide * 100}%)`;
        
        // Mettre à jour les points actifs
        dots.forEach((dot, index) => {
            dot.classList.toggle('active', index === currentSlide);
        });
    }
    
    // Réattacher les événements des boutons de navigation
    const prevButton = document.querySelector('.gallery-prev');
    const nextButton = document.querySelector('.gallery-next');
    
    if (prevButton) {
        prevButton.onclick = () => {
            currentSlide = (currentSlide - 1 + slides.length) % slides.length;
            updateSlider();
        };
    }
    
    if (nextButton) {
        nextButton.onclick = () => {
            currentSlide = (currentSlide + 1) % slides.length;
            updateSlider();
        };
    }
    
    // Redémarrer le défilement automatique
    startAutoSlide();
}

// Démarrer le défilement automatique
function startAutoSlide() {
    const slides = document.querySelectorAll('.slide');
    if (slides.length === 0) return;
    
    let currentSlide = 0;
    const dots = document.querySelectorAll('.gallery-dot');
    const gallerySlider = document.querySelector('.gallery-slider');
    
    // Arrêter tout intervalle existant
    if (window.carouselInterval) {
        clearInterval(window.carouselInterval);
    }
    
    window.carouselInterval = setInterval(() => {
        currentSlide = (currentSlide + 1) % slides.length;
        gallerySlider.style.transform = `translateX(-${currentSlide * 100}%)`;
        
        // Mettre à jour les points actifs
        dots.forEach((dot, index) => {
            dot.classList.toggle('active', index === currentSlide);
        });
    }, 5000);
}

// Fonction pour aller à une slide spécifique
function goToSlide(slideIndex) {
    const gallerySlider = document.querySelector('.gallery-slider');
    const dots = document.querySelectorAll('.gallery-dot');
    const slides = document.querySelectorAll('.slide');
    
    if (!gallerySlider || slides.length === 0) return;
    
    let currentSlide = slideIndex;
    gallerySlider.style.transform = `translateX(-${currentSlide * 100}%)`;
    
    // Mettre à jour les points actifs
    dots.forEach((dot, index) => {
        dot.classList.toggle('active', index === currentSlide);
    });
    
    // Redémarrer le défilement automatique
    startAutoSlide();
}

// Initialiser le carrousel dynamique avec les 10 images les plus récentes
function initDynamicCarousel() {
    const gallerySlider = document.querySelector('.gallery-slider');
    const galleryDots = document.querySelector('.gallery-dots');
    
    if (!gallerySlider || !galleryDots) return;

    const gallery = JSON.parse(localStorage.getItem('edunova_gallery')) || [];
    
    // Trier les images par ID (les plus récentes en premier) et prendre les 10 premières
    const recentImages = getRecentItems(gallery, 10);

    if (recentImages.length === 0) {
        // Contenu par défaut si aucune image
        gallerySlider.innerHTML = `
            <div class="slide">
                <img src="https://source.unsplash.com/random/1000x600/?classroom" alt="Salle de classe moderne">
                <div class="slide-overlay">
                    <a href="galerie-evenements.html" class="btn-view-more">Voir plus</a>
                </div>
                <div class="slide-caption">Salle de classe moderne</div>
            </div>
            <div class="slide">
                <img src="https://source.unsplash.com/random/1001x600/?students" alt="Étudiants en cours">
                <div class="slide-overlay">
                    <a href="galerie-evenements.html" class="btn-view-more">Voir plus</a>
                </div>
                <div class="slide-caption">Étudiants en cours</div>
            </div>
            <div class="slide">
                <img src="https://source.unsplash.com/random/1002x600/?laboratory" alt="Laboratoire scientifique">
                <div class="slide-overlay">
                    <a href="galerie-evenements.html" class="btn-view-more">Voir plus</a>
                </div>
                <div class="slide-caption">Laboratoire scientifique</div>
            </div>
            <div class="slide">
                <img src="https://source.unsplash.com/random/1003x600/?workshop" alt="Atelier pratique">
                <div class="slide-overlay">
                    <a href="galerie-evenements.html" class="btn-view-more">Voir plus</a>
                </div>
                <div class="slide-caption">Atelier pratique</div>
            </div>
        `;
        
        // Recréer les dots pour le carrousel par défaut
        recreateCarouselDots();
        return;
    }

    // Générer les slides avec les images les plus récentes
    gallerySlider.innerHTML = recentImages.map((item, index) => `
        <div class="slide">
            <img src="${item.image}" alt="${item.caption}">
            <div class="slide-overlay">
                <a href="galerie-evenements.html" class="btn-view-more">Voir plus</a>
            </div>
            <div class="slide-caption">${item.caption}</div>
        </div>
    `).join('');

    // Recréer les dots pour le nouveau carrousel
    recreateCarouselDots();
    
    // Réinitialiser le carrousel
    resetCarousel();
}

// Charger le contenu dynamique depuis le localStorage
function loadDynamicContent() {
    loadNews();
    loadEvents();
    initDynamicGallery();
    initDynamicCarousel();
}

// Charger le contenu dynamique au chargement de la page
document.addEventListener('DOMContentLoaded', loadDynamicContent);

// Arrêter le défilement automatique au survol
document.addEventListener('DOMContentLoaded', function() {
    const gallerySlider = document.querySelector('.gallery-slider');
    if (gallerySlider) {
        gallerySlider.addEventListener('mouseenter', () => {
            if (window.carouselInterval) {
                clearInterval(window.carouselInterval);
            }
        });
        
        gallerySlider.addEventListener('mouseleave', () => {
            startAutoSlide();
        });
    }
});

// Initialiser la galerie si on est sur la page galerie
if (document.querySelector('.gallery-page')) {
    document.addEventListener('DOMContentLoaded', initGalleryPage);
}

// Gestion du formulaire de contact
document.addEventListener('DOMContentLoaded', function() {
    const contactForm = document.getElementById('contactForm');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const submitButton = this.querySelector('button[type="submit"]');
            const originalText = submitButton.textContent;
            submitButton.textContent = 'Envoi en cours...';
            submitButton.disabled = true;
            
            // Récupération des données
            const formData = new FormData(this);
            
            // Envoi des données
            fetch('contact.php', {
                method: 'POST',
                body: formData
            })
            .then(response => response.text())
            .then(data => {
                console.log('Réponse serveur:', data); // Pour debug
                
                if (data === 'success') {
                    alert('Message envoyé avec succès ! Nous vous recontacterons rapidement.');
                    contactForm.reset();
                } else if (data.startsWith('validation_error')) {
                    alert('Veuillez corriger les erreurs dans le formulaire.');
                } else {
                    alert('Erreur lors de l\'envoi du message. Veuillez réessayer ou nous contacter directement par email.');
                }
            })
            .catch(error => {
                console.error('Error:', error);
                alert('Erreur de connexion. Veuillez vérifier votre connexion internet.');
            })
            .finally(() => {
                submitButton.textContent = originalText;
                submitButton.disabled = false;
            });
        });
    }
});