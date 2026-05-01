const app = {
    currentView: 'home',
    userProfile: null,

    init() {
        // Check if user has completed onboarding
        const profile = localStorage.getItem('gs_profile');
        if (profile) {
            this.userProfile = profile;
            this.showMainApp();
        } else {
            document.getElementById('onboarding').classList.add('active');
        }
        
        // Register Service Worker for PWA
        if ('serviceWorker' in navigator) {
            navigator.serviceWorker.register('./sw.js')
                .then(reg => console.log('SW Registered', reg))
                .catch(err => console.error('SW Failed', err));
        }
    },

    finishOnboarding(profileType) {
        localStorage.setItem('gs_profile', profileType);
        this.userProfile = profileType;
        
        document.getElementById('onboarding').classList.remove('active');
        this.showMainApp();
    },

    showMainApp() {
        document.getElementById('main-app').classList.remove('hidden');
        document.getElementById('main-app').classList.add('active');
        this.navigate('home');
    },

    navigate(viewName) {
        // Hide all views
        document.querySelectorAll('.view').forEach(el => {
            el.classList.remove('active-view');
            el.classList.add('hidden-view');
        });

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
        } else if (viewName === 'map') {
            document.querySelectorAll('.nav-item')[2].classList.add('active');
        }

        // Handle Scanner state
        if (viewName === 'scanner') {
            scanner.start();
        } else {
            scanner.stop();
        }
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
