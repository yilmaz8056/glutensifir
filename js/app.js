const app = {
    currentView: 'home',
    userProfile: null,
    mapInstance: null,

    init() {
        // Check if user has completed onboarding
        let profile = null;
        try {
            profile = localStorage.getItem('gs_profile');
        } catch(e) {
            console.warn('LocalStorage error:', e);
        }
        
        if (profile) {
            this.userProfile = profile;
            this.showMainApp();
        } else {
            document.getElementById('onboarding').classList.add('active');
            document.getElementById('onboarding').style.display = 'flex';
        }
        
        // Register Service Worker for PWA
        if ('serviceWorker' in navigator) {
            navigator.serviceWorker.register('./sw.js')
                .then(reg => console.log('SW Registered', reg))
                .catch(err => console.error('SW Failed', err));
        }

        // Render dynamic places
        this.renderPlaces();
        
        // Render dynamic recipes
        this.renderRecipes();
        
        // Generate initial meal plan
        this.generateMealPlan();
        
        // Render symptom logs
        this.renderSymptomLogs();
    },

    finishOnboarding(profileType) {
        try {
            localStorage.setItem('gs_profile', profileType);
        } catch(e) {
            console.warn('LocalStorage error:', e);
        }
        this.userProfile = profileType;
        
        document.getElementById('onboarding').classList.remove('active');
        document.getElementById('onboarding').style.display = 'none'; // Force hide just in case
        
        this.showMainApp();
    },

    showMainApp() {
        const mainApp = document.getElementById('main-app');
        mainApp.classList.remove('hidden');
        mainApp.classList.add('active');
        mainApp.style.display = 'flex'; // Force display just in case
        this.navigate('home');
    },

    renderPlaces() {
        const container = document.getElementById('places-container');
        if (!container) return;

        container.innerHTML = '';
        
        MOCK_PLACES.forEach((place, index) => {
            const placeImg = `https://image.pollinations.ai/prompt/${encodeURIComponent(place.name + ' cozy cafe interior gluten free restaurant realistic')}?width=400&height=300&nologo=true&seed=${place.id}`;

            // Güven Skoru rengi
            let scoreColor = 'var(--primary)';
            if(place.safetyScore < 80 && place.safetyScore >= 60) scoreColor = 'var(--warning)';
            if(place.safetyScore < 60) scoreColor = 'var(--danger)';

            const html = `
                <div class="place-card">
                    <div class="place-img" style="background-image: url('${placeImg}'); background-size: cover; background-position: center;"></div>
                    <div class="place-info">
                        <div style="display: flex; justify-content: space-between; align-items: start;">
                            <h3 style="margin-bottom: 5px;">${place.name}</h3>
                            <span style="background: ${scoreColor}; color: white; padding: 2px 6px; border-radius: 4px; font-size: 0.8rem; font-weight: bold;">
                                %${place.safetyScore} Güvenli
                            </span>
                        </div>
                        <p><i class="ph ${place.icon}"></i> ${place.rating} (${place.type})</p>
                        <div style="display: flex; gap: 10px; margin-top: 10px;">
                            <a href="https://www.google.com/maps/dir/?api=1&destination=${place.lat},${place.lng}" target="_blank" class="direction-btn" style="flex: 1; text-align: center;">
                                <i class="ph ph-navigation-arrow"></i> Yol Tarifi
                            </a>
                            <button class="direction-btn" style="flex: 1; background: var(--border-color); color: var(--text-main); border: none; cursor: pointer;" onclick="app.rateVenue(${place.id})">
                                <i class="ph ph-star"></i> Değerlendir
                            </button>
                        </div>
                    </div>
                </div>
            `;
            container.innerHTML += html;
        });
    },

    renderRecipes() {
        const dailyContainer = document.getElementById('daily-recipe-container');
        const listContainer = document.getElementById('recipes-list');
        
        if (!dailyContainer || !listContainer) return;

        // Meal plan is handled by generateMealPlan() now
        if(dailyContainer) dailyContainer.innerHTML = '';


        // Render All Recipes in Recipes View
        listContainer.innerHTML = '';
        MOCK_RECIPES.forEach(recipe => {
            const recipeImg = `https://image.pollinations.ai/prompt/${encodeURIComponent(recipe.name + ' turkish food plate delicious realistic')}?width=400&height=300&nologo=true`;
            listContainer.innerHTML += `
                <div class="recipe-card" onclick="app.showRecipeDetail(${recipe.id})">
                    <div class="recipe-img" style="background-image: url('${recipeImg}'); height: 140px;"></div>
                    <div class="recipe-content">
                        <div style="display: flex; justify-content: space-between; align-items: start;">
                            <div>
                                <h3>${recipe.name}</h3>
                                <p style="font-size: 0.8rem; margin-top: 4px;">
                                    <span style="background: var(--primary-light); color: var(--primary-dark); padding: 2px 6px; border-radius: 4px;">${recipe.category}</span>
                                    • ${recipe.difficulty}
                                </p>
                            </div>
                            <div style="text-align: right; font-size: 0.8rem; color: var(--text-muted);">
                                <b>P:</b> ${recipe.protein} | <b>C:</b> ${recipe.carbs} <br> <b>Y:</b> ${recipe.fat}
                            </div>
                        </div>
                    </div>
                </div>
            `;
        });
    },

    generateMealPlan() {
        const dailyContainer = document.getElementById('daily-recipe-container');
        if (!dailyContainer) return;

        // Kategorilere göre filtrele
        const breakfasts = MOCK_RECIPES.filter(r => r.category === 'kahvaltı');
        const mains = MOCK_RECIPES.filter(r => r.category === 'ana_yemek');

        // Rastgele seç
        const breakfast = breakfasts[Math.floor(Math.random() * breakfasts.length)] || MOCK_RECIPES[0];
        const lunch = mains[Math.floor(Math.random() * mains.length)] || MOCK_RECIPES[1];
        let dinner = mains[Math.floor(Math.random() * mains.length)] || MOCK_RECIPES[2];
        
        // Öğle ve akşam aynı olmasın diye basit kontrol
        while(dinner.id === lunch.id && mains.length > 1) {
            dinner = mains[Math.floor(Math.random() * mains.length)];
        }

        const mealHtml = (title, recipe) => {
            const recipeImg = `https://image.pollinations.ai/prompt/${encodeURIComponent(recipe.name + ' turkish food plate delicious realistic')}?width=400&height=300&nologo=true`;
            return `
            <div class="recipe-card" onclick="app.showRecipeDetail(${recipe.id})">
                <div class="recipe-img" style="background-image: url('${recipeImg}'); height: 120px;"></div>
                <div class="recipe-content" style="padding: 10px 15px;">
                    <div style="font-size: 0.8rem; color: var(--primary-dark); font-weight: bold; margin-bottom: 2px;">${title}</div>
                    <h3 style="font-size: 1.1rem; margin-bottom: 5px;">${recipe.name}</h3>
                    <p><i class="ph ph-fire"></i> ${recipe.calories} kcal</p>
                </div>
            </div>
            `;
        };

        dailyContainer.innerHTML = mealHtml('🌅 KAHVALTI', breakfast) +
                                   mealHtml('☀️ ÖĞLE YEMEĞİ', lunch) +
                                   mealHtml('🌙 AKŞAM YEMEĞİ', dinner);
    },

    rateVenue(id) {
        // MVP: Simple simulated modal using alert/prompt or custom UI
        const venue = MOCK_PLACES.find(p => p.id === id);
        if(!venue) return;
        
        const score = prompt(`"${venue.name}" mekanını değerlendirin:\n1 - Kesinlikle Güvenli\n2 - Aynı Yağda Kızartılıyor (Çapraz Bulaşma Riski)\n3 - Glutensiz Değil`, "1");
        
        if(score === "1" || score === "2" || score === "3") {
            alert('Değerlendirmeniz alındı! Topluluğa katkı sağladığınız için teşekkürler. (+5 Puan kazandınız)');
        }
    },

    addVenue() {
        const name = document.getElementById('venue-name').value;
        const type = document.getElementById('venue-type').value;
        if(!name) {
            alert('Lütfen mekan adı girin.');
            return;
        }

        // Add to MOCK_PLACES for simulation
        const newPlace = {
            id: Date.now(),
            name: name,
            type: type,
            safety: "safe",
            safetyScore: 90,
            rating: 5.0,
            icon: "ph-star-fill",
            lat: 40.9840 + (Math.random() * 0.02 - 0.01), // random offset around Kadıköy
            lng: 29.0250 + (Math.random() * 0.02 - 0.01)
        };
        MOCK_PLACES.unshift(newPlace); // add to top

        alert(`"${name}" başarıyla önerildi. Teşekkürler! (+20 Dedektif Puanı)`);
        document.getElementById('add-venue-modal').classList.add('hidden');
        document.getElementById('venue-name').value = '';

        // Refresh UI
        this.renderPlaces();
        if(this.mapInstance) {
            this.mapInstance.remove();
            this.mapInstance = null;
            this.initMap();
        }
    },

    saveSymptomLog(status, color) {
        let logs = [];
        try {
            logs = JSON.parse(localStorage.getItem('gs_symptoms') || '[]');
        } catch(e) {
            console.warn('LocalStorage error:', e);
        }
        
        const today = new Date().toLocaleDateString('tr-TR', { day: 'numeric', month: 'short', hour: '2-digit', minute: '2-digit' });
        
        logs.unshift({ date: today, status, color });
        if(logs.length > 10) logs.pop(); // keep last 10
        
        try {
            localStorage.setItem('gs_symptoms', JSON.stringify(logs));
        } catch(e) {}
        
        this.renderSymptomLogs();
        
        if(status === 'Kaçak') {
            alert('⚠️ Gluten kaçağı raporladınız. Lütfen bol su için ve doktorunuzun tavsiyelerine uyun. Acil şifalar!');
        }
    },

    renderSymptomLogs() {
        const container = document.getElementById('symptom-logs');
        if(!container) return;
        
        let logs = [];
        try {
            logs = JSON.parse(localStorage.getItem('gs_symptoms') || '[]');
        } catch(e) {
            console.warn('LocalStorage error:', e);
        }
        
        if(logs.length === 0) {
            container.innerHTML = '<div style="text-align: center; color: var(--text-muted); font-size: 0.8rem;">Henüz kayıt yok.</div>';
            return;
        }

        container.innerHTML = logs.map(log => `
            <div style="display: flex; justify-content: space-between; align-items: center; padding: 10px; border: 1px solid var(--border-color); border-radius: var(--radius-md);">
                <span style="font-size: 0.85rem; color: var(--text-muted);">${log.date}</span>
                <span style="color: ${log.color}; font-weight: bold; font-size: 0.9rem;">${log.status}</span>
            </div>
        `).join('');
    },

    showRecipeDetail(id) {
        const recipe = MOCK_RECIPES.find(r => r.id === id);
        if(!recipe) return;

        const recipeImg = `https://image.pollinations.ai/prompt/${encodeURIComponent(recipe.name + ' turkish food plate delicious realistic')}?width=400&height=300&nologo=true`;
        
        const content = `
            <div style="position: relative;">
                <div style="height: 250px; background-image: url('${recipeImg}'); background-size: cover; background-position: center;"></div>
                <button onclick="app.closeRecipeDetail()" style="position: absolute; top: 20px; left: 20px; background: rgba(255,255,255,0.8); border: none; width: 40px; height: 40px; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: 1.5rem; color: var(--text-main); cursor: pointer; box-shadow: var(--shadow-sm);">
                    <i class="ph ph-arrow-left"></i>
                </button>
            </div>
            <div style="padding: 20px;">
                <div style="display: inline-block; background: var(--primary-light); color: var(--primary-dark); padding: 4px 10px; border-radius: var(--radius-full); font-size: 0.8rem; font-weight: bold; margin-bottom: 10px;">
                    ${recipe.category.toUpperCase().replace('_', ' ')}
                </div>
                <h2 style="font-size: 1.8rem; margin-bottom: 15px;">${recipe.name}</h2>
                
                <div style="display: flex; justify-content: space-between; background: var(--card-bg); padding: 15px; border-radius: var(--radius-md); box-shadow: var(--shadow-sm); margin-bottom: 20px; text-align: center;">
                    <div>
                        <i class="ph ph-clock" style="font-size: 1.5rem; color: var(--primary); margin-bottom: 5px; display: block;"></i>
                        <span style="font-size: 0.85rem; color: var(--text-muted);">${recipe.prep_time}</span>
                    </div>
                    <div>
                        <i class="ph ph-fire" style="font-size: 1.5rem; color: var(--warning); margin-bottom: 5px; display: block;"></i>
                        <span style="font-size: 0.85rem; color: var(--text-muted);">${recipe.calories} kcal</span>
                    </div>
                    <div>
                        <i class="ph ph-barbell" style="font-size: 1.5rem; color: var(--danger); margin-bottom: 5px; display: block;"></i>
                        <span style="font-size: 0.85rem; color: var(--text-muted);">${recipe.difficulty}</span>
                    </div>
                </div>

                <div style="display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 10px; margin-bottom: 25px;">
                    <div style="background: var(--card-bg); padding: 10px; border-radius: var(--radius-md); text-align: center; border: 1px solid var(--border-color);">
                        <div style="font-size: 0.8rem; color: var(--text-muted);">Protein</div>
                        <div style="font-weight: bold;">${recipe.protein}</div>
                    </div>
                    <div style="background: var(--card-bg); padding: 10px; border-radius: var(--radius-md); text-align: center; border: 1px solid var(--border-color);">
                        <div style="font-size: 0.8rem; color: var(--text-muted);">Karb.</div>
                        <div style="font-weight: bold;">${recipe.carbs}</div>
                    </div>
                    <div style="background: var(--card-bg); padding: 10px; border-radius: var(--radius-md); text-align: center; border: 1px solid var(--border-color);">
                        <div style="font-size: 0.8rem; color: var(--text-muted);">Yağ</div>
                        <div style="font-weight: bold;">${recipe.fat}</div>
                    </div>
                </div>

                <h3 style="margin-bottom: 10px; font-size: 1.2rem;">Malzemeler</h3>
                <ul style="list-style-type: none; margin-bottom: 25px;">
                    ${recipe.ingredients.map(ing => `<li style="padding: 10px 0; border-bottom: 1px solid var(--border-color); display: flex; align-items: center; gap: 10px;"><i class="ph ph-check-circle" style="color: var(--primary);"></i> ${ing}</li>`).join('')}
                </ul>

                <h3 style="margin-bottom: 10px; font-size: 1.2rem;">Hazırlanışı</h3>
                <ol style="padding-left: 20px; color: var(--text-muted); line-height: 1.6;">
                    ${recipe.steps.map(step => `<li style="margin-bottom: 10px;">${step}</li>`).join('')}
                </ol>
            </div>
        `;

        document.getElementById('recipe-detail-content').innerHTML = content;
        
        // Hide bottom nav and header
        document.querySelector('.app-header').style.display = 'none';
        document.querySelector('.bottom-nav').style.display = 'none';

        // Hide all views
        document.querySelectorAll('.view').forEach(el => {
            el.classList.remove('active-view');
            el.classList.add('hidden-view');
        });

        // Show detail view
        document.getElementById('view-recipe-detail').classList.remove('hidden-view');
        document.getElementById('view-recipe-detail').classList.add('active-view');
    },

    closeRecipeDetail() {
        // Show bottom nav and header
        document.querySelector('.app-header').style.display = 'flex';
        document.querySelector('.bottom-nav').style.display = 'flex';

        // Go back to currentView
        this.navigate(this.currentView);
    },

    navigate(viewName) {
        // Hide all views
        document.querySelectorAll('.view').forEach(el => {
            el.classList.remove('active-view');
            el.classList.add('hidden-view');
        });

        // Hide detail specific stuff if navigating from elsewhere
        document.querySelector('.app-header').style.display = 'flex';
        document.querySelector('.bottom-nav').style.display = 'flex';

        // Update nav UI
        document.querySelectorAll('.nav-item').forEach(el => {
            el.classList.remove('active');
        });

        // Show target view
        document.getElementById(`view-${viewName}`).classList.remove('hidden-view');
        document.getElementById(`view-${viewName}`).classList.add('active-view');

        // Update active state on nav
        if (viewName === 'home') {
            document.querySelectorAll('.nav-item')[0].classList.add('active');
        } else if (viewName === 'recipes') {
            document.querySelectorAll('.nav-item')[1].classList.add('active');
        } else if (viewName === 'map') {
            document.querySelectorAll('.nav-item')[3].classList.add('active');
        } else if (viewName === 'profile') {
            document.querySelectorAll('.nav-item')[4].classList.add('active');
            // Profil view is now shown automatically by the classes above
        }

        // Handle Scanner state
        if (viewName === 'scanner') {
            scanner.start();
        } else {
            scanner.stop();
        }

        // Handle Map state
        if (viewName === 'map') {
            // Need a slight timeout to let DOM render the map container properly before Leaflet calculation
            setTimeout(() => {
                this.initMap();
            }, 100);
        }
    },

    initMap() {
        if (this.mapInstance) {
            this.mapInstance.invalidateSize();
            return;
        }

        // Center on Kadıköy (since many places are around Kadıköy/Moda)
        this.mapInstance = L.map('map-container').setView([40.9840, 29.0250], 12);

        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '© OpenStreetMap contributors'
        }).addTo(this.mapInstance);

        // Add markers
        MOCK_PLACES.forEach(place => {
            const markerColor = place.safety === 'safe' ? 'green' : 'orange';
            
            // Custom simple icon logic using divIcon
            const customIcon = L.divIcon({
                className: 'custom-map-marker',
                html: `<div style="background-color: ${markerColor}; width: 20px; height: 20px; border-radius: 50%; border: 3px solid white; box-shadow: 0 0 5px rgba(0,0,0,0.5);"></div>`,
                iconSize: [20, 20],
                iconAnchor: [10, 10]
            });

            L.marker([place.lat, place.lng], { icon: customIcon })
                .addTo(this.mapInstance)
                .bindPopup(`
                    <b>${place.name}</b><br>
                    ${place.type}<br>
                    <a href="https://www.google.com/maps/dir/?api=1&destination=${place.lat},${place.lng}" target="_blank" style="display:inline-block; margin-top:5px; color:#10B981; text-decoration:none; font-weight:bold;">Yol Tarifi Al</a>
                `);
        });
    },

    showScannerResult(product) {
        const overlay = document.getElementById('scan-result');
        const icon = overlay.querySelector('.result-icon');
        const title = overlay.querySelector('.result-title');
        const desc = overlay.querySelector('.result-desc');

        // Reset classes
        icon.className = 'result-icon ' + product.status;
        title.className = 'result-title ' + product.status;

        if (product.status === 'safe') {
            icon.innerHTML = '<i class="ph ph-check-circle"></i>';
            title.textContent = 'Güvenli';
        } else if (product.status === 'danger') {
            icon.innerHTML = '<i class="ph ph-x-circle"></i>';
            title.textContent = 'Riskli!';
        } else {
            icon.innerHTML = '<i class="ph ph-warning-circle"></i>';
            title.textContent = 'Dikkat';
        }

        desc.innerHTML = `<strong>${product.brand} - ${product.name}</strong><br><br>${product.description}`;
        
        // Gamification message
        const gamificationMsg = document.createElement('div');
        gamificationMsg.innerHTML = '<div style="background: var(--primary-light); color: var(--primary-dark); padding: 8px; border-radius: 8px; font-weight: bold; margin-top: 15px; display: inline-block; animation: slideUp 0.5s ease-out;"><i class="ph ph-star-fill" style="color: var(--warning);"></i> +10 Tarama Puanı Kazandın!</div>';
        
        // Remove old message if exists
        const oldMsg = overlay.querySelector('.gamification-msg');
        if(oldMsg) oldMsg.remove();
        
        gamificationMsg.className = 'gamification-msg';
        desc.appendChild(gamificationMsg);

        overlay.classList.remove('hidden');
    },

    closeScannerResult() {
        document.getElementById('scan-result').classList.add('hidden');
        // Restart scan
        scanner.simulateScan();
    }
};

// Initialize App
document.addEventListener('DOMContentLoaded', () => {
    app.init();
});
