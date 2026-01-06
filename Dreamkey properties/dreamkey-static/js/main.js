document.addEventListener('DOMContentLoaded', async () => {
    // Robust Index Page Detection
    const path = window.location.pathname;
    const isIndex = path.endsWith('/') || path.endsWith('index.html') || path === '' || path.split('/').pop() === '';

    if (isIndex) {
        document.body.classList.add('index-page');
    }

    // Load Shared Components
    try {
        await loadComponents();
    } catch (err) {
        console.error('Initial component load failed:', err);
    }

    const navbar = document.querySelector('.navbar');

    // Navbar Scroll Effect
    const handleScroll = () => {
        if (!navbar) return;
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            if (document.body.classList.contains('index-page')) {
                navbar.classList.remove('scrolled');
            } else {
                navbar.classList.add('scrolled');
            }
        }
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Initial check

    // Scroll Reveal Intersection Observer
    if ('IntersectionObserver' in window) {
        const revealOptions = { threshold: 0.1, rootMargin: "0px 0px -50px 0px" };
        const revealObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('reveal');
                    observer.unobserve(entry.target);
                }
            });
        }, revealOptions);

        document.querySelectorAll('.section-padding, .property-card, .footer-grid > div').forEach(el => {
            revealObserver.observe(el);
        });
    }

    initAdminTrigger();
});

// Mobile Menu Toggle
function initMobileMenu() {
    console.log("Initializing Mobile Menu...");
    const toggle = document.querySelector('.menu-toggle');
    const links = document.querySelector('.nav-links');
    if (toggle && links) {
        toggle.onclick = (e) => {
            e.stopPropagation();
            links.classList.toggle('active');
            const spans = toggle.querySelectorAll('span');
            if (links.classList.contains('active')) {
                spans[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
                spans[1].style.opacity = '0';
                spans[2].style.transform = 'rotate(-45deg) translate(7px, -8px)';
            } else {
                spans[0].style.transform = 'none';
                spans[1].style.opacity = '1';
                spans[2].style.transform = 'none';
            }
        };

        document.addEventListener('click', (e) => {
            if (!toggle.contains(e.target) && !links.contains(e.target)) {
                links.classList.remove('active');
                const spans = toggle.querySelectorAll('span');
                if (spans.length >= 3) {
                    spans[0].style.transform = 'none';
                    spans[1].style.opacity = '1';
                    spans[2].style.transform = 'none';
                }
            }
        });
    }
}

// Hidden Admin Trigger (Event Delegation)
function initAdminTrigger() {
    let clickCount = 0;
    let clickTimer;
    let navTimer;

    document.addEventListener('click', (e) => {
        const logo = e.target.closest('.logo');
        if (!logo) return;

        // Prevent immediate navigation while checking for multi-clicks
        e.preventDefault();

        clickCount++;
        clearTimeout(clickTimer);
        clearTimeout(navTimer);

        if (clickCount >= 5) {
            window.location.href = 'admin.html';
            clickCount = 0;
            return;
        }

        // Reset clicks after inactivity
        clickTimer = setTimeout(() => {
            clickCount = 0;
        }, 800);

        // Perform original navigation if no multi-click sequence follows within 300ms
        navTimer = setTimeout(() => {
            if (clickCount < 5 && clickCount > 0) {
                const href = logo.getAttribute('href');
                if (href && href !== '#') {
                    window.location.href = href;
                }
                clickCount = 0;
            }
        }, 300);
    });
}

async function loadComponents() {
    const navPlaceholder = document.querySelector('.navbar');
    const footerPlaceholder = document.querySelector('footer');

    if (navPlaceholder) {
        try {
            const response = await fetch('./components/navbar.html');
            if (!response.ok) throw new Error("Nav fetch failed");
            const html = await response.text();
            navPlaceholder.innerHTML = html;

            const path = window.location.pathname.split("/").pop() || 'index.html';
            const pageId = path.split(".")[0] || 'index';
            const activeLink = document.getElementById(`link-${pageId}`);
            if (activeLink) activeLink.classList.add('active');
            if (!document.body.classList.contains('index-page')) navPlaceholder.classList.add('scrolled');
        } catch (err) {
            console.warn('Navbar fetch failed, using fallback');
            navPlaceholder.innerHTML = `
                <div class="container">
                    <a href="index.html" class="logo"><img src="assets/logo-1.png" alt="Logo">DreamKey<span>Properties</span></a>
                    <div class="menu-toggle"><span></span><span></span><span></span></div>
                    <ul class="nav-links">
                        <li><a href="index.html">Home</a></li>
                        <li><a href="listings.html">Listings</a></li>
                        <li><a href="about.html">About</a></li>
                        <li><a href="services.html">Services</a></li>
                        <li><a href="contact.html">Contact</a></li>
                    </ul>
                </div>`;
        }
        initMobileMenu();
    }

    if (footerPlaceholder) {
        try {
            const response = await fetch('./components/footer.html');
            if (!response.ok) throw new Error("Footer fetch failed");
            footerPlaceholder.innerHTML = await response.text();
        } catch (err) {
            console.warn('Footer fetch failed, using fallback');
            footerPlaceholder.innerHTML = `
                <div class="container" style="padding: 4rem 2rem; background: var(--primary); color: white; text-align: center; border-top: 1px solid rgba(255,255,255,0.1);">
                    <div class="logo" style="justify-content: center; margin-bottom: 1.5rem;">
                        <img src="assets/logo-1.png" alt="Logo" style="height: 30px;">DreamKey<span>Properties</span>
                    </div>
                    <p style="opacity: 0.7; margin-bottom: 2rem;">Your trusted partner in premium real estate.</p>
                    <div style="font-size: 0.9rem; opacity: 0.5;">&copy; 2026 DreamKey Properties. All rights reserved.</div>
                </div>`;
        }
    }
}

// Helper: Cache DB Connection
let dbCache = null;
async function getDB() {
    if (dbCache) return dbCache;
    return new Promise((resolve) => {
        const request = indexedDB.open('DreamKeyAssets', 1);
        request.onsuccess = (e) => {
            dbCache = e.target.result;
            resolve(dbCache);
        };
        request.onerror = () => resolve(null);
    });
}

async function resolveAsset(path) {
    if (!path || !path.startsWith('local:')) return path;
    const assetId = path.replace('local:', '');
    const db = await getDB();
    if (!db || !db.objectStoreNames.contains('files')) return path;

    return new Promise((resolve) => {
        const getReq = db.transaction(['files'], 'readonly').objectStore('files').get(assetId);
        getReq.onsuccess = () => resolve(getReq.result || path);
        getReq.onerror = () => resolve(path);
    });
}

function formatPrice(price) {
    return new Intl.NumberFormat('en-IN', {
        style: 'currency',
        currency: 'INR',
        maximumFractionDigits: 0
    }).format(price);
}

async function createPropertyCard(property) {
    let thumb = property.images && property.images[0] ? await resolveAsset(property.images[0]) : 'https://via.placeholder.com/600x400';
    return `
        <div class="property-card">
            <div class="property-image">
                <img src="${thumb}" alt="${property.title}" loading="lazy" onload="this.classList.add('loaded')">
                <span class="property-badge badge-featured">${property.type}</span>
                <span class="property-badge badge-status">${property.status}</span>
            </div>
            <div class="property-info">
                <div class="property-location"><i class="fas fa-map-marker-alt"></i> ${property.location}</div>
                <h3 class="property-title">${property.title}</h3>
                <div class="property-meta">
                    ${property.type !== 'Land' ? `
                        <div class="meta-item"><i class="fas fa-bed"></i> ${property.bedrooms || 0} Beds</div>
                        <div class="meta-item"><i class="fas fa-bath"></i> ${property.bathrooms || 0} Baths</div>
                    ` : ''}
                    <div class="meta-item"><i class="fas fa-vector-square"></i> ${property.area} sqft</div>
                </div>
                <div class="property-footer">
                    <div class="property-price">${formatPrice(property.price)}</div>
                    <a href="property.html?slug=${property.slug}" class="btn btn-primary" style="padding: 0.5rem 1.5rem; font-size: 0.85rem;">Details</a>
                </div>
            </div>
        </div>`;
}
