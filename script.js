const DATA_IRIGASI = {
    banjarmasin: 85,
    banjarbaru: 24
};

const totalIrigasi = DATA_IRIGASI.banjarmasin + DATA_IRIGASI.banjarbaru;

console.log('%c💧 Dashboard Irigasi Pertanian (Mode Manual)', 'font-size: 20px; font-weight: bold; color: #0ea5e9;');

document.addEventListener('DOMContentLoaded', () => {
    console.log('🚀 Initializing dashboard...');

    updateStatistics();

    setupEventListeners();
    
    console.log('✅ Dashboard initialized successfully!');
});

function updateStatistics() {
    const banjarmasinCount = DATA_IRIGASI.banjarmasin;
    const banjarbaruCount = DATA_IRIGASI.banjarbaru;
    
    console.log('📊 Data Loaded:', { Total: totalIrigasi, Banjarmasin: banjarmasinCount, Banjarbaru: banjarbaruCount });

    animateCounter(document.getElementById('banjarmasinCount'), banjarmasinCount);
    animateCounter(document.getElementById('banjarbaruCount'), banjarbaruCount);
    animateCounter(document.getElementById('totalIrigasi'), totalIrigasi);
    
    const banjarmasinCounter = document.getElementById('banjarmasinCount');
    const banjarbaruCounter = document.getElementById('banjarbaruCount');
    
    if (banjarmasinCounter) banjarmasinCounter.setAttribute('data-target', banjarmasinCount);
    if (banjarbaruCounter) banjarbaruCounter.setAttribute('data-target', banjarbaruCount);
    
    setTimeout(() => {
        const safeTotal = totalIrigasi === 0 ? 1 : totalIrigasi;
        
        const banjarmasinPercentage = (banjarmasinCount / safeTotal * 100).toFixed(1);
        const banjarbaruPercentage = (banjarbaruCount / safeTotal * 100).toFixed(1);
        
        const banjarmasinProgress = document.getElementById('banjarmasinProgress');
        const banjarbaruProgress = document.getElementById('banjarbaruProgress');
        
        if (banjarmasinProgress) banjarmasinProgress.style.width = banjarmasinPercentage + '%';
        if (banjarbaruProgress) banjarbaruProgress.style.width = banjarbaruPercentage + '%';
    }, 500);
}

function animateCounter(element, target) {
    if (!element) return;
    
    if (target === 0) {
        element.textContent = "0";
        return;
    }

    const duration = 2000;
    const increment = target / (duration / 16);
    let current = 0;
    
    const updateCounter = () => {
        current += increment;
        if (current < target) {
            element.textContent = Math.floor(current);
            requestAnimationFrame(updateCounter);
        } else {
            element.textContent = target;
        }
    };
    
    updateCounter();
}

function setupEventListeners() {
    const expandBtn = document.querySelector('.expand-btn');
    if (expandBtn) {
        expandBtn.addEventListener('click', function(e) {
            e.preventDefault();
            const mapWrapper = document.querySelector('.map-wrapper');
            
            if (!document.fullscreenElement) {
                if (mapWrapper.requestFullscreen) {
                    mapWrapper.requestFullscreen();
                } else if (mapWrapper.webkitRequestFullscreen) {
                    mapWrapper.webkitRequestFullscreen();
                } else if (mapWrapper.mozRequestFullScreen) {
                    mapWrapper.mozRequestFullScreen();
                } else if (mapWrapper.msRequestFullscreen) {
                    mapWrapper.msRequestFullscreen();
                }
            } else {
                if (document.exitFullscreen) {
                    document.exitFullscreen();
                } else if (document.webkitExitFullscreen) {
                    document.webkitExitFullscreen();
                } else if (document.mozCancelFullScreen) {
                    document.mozCancelFullScreen();
                } else if (document.msExitFullscreen) {
                    document.msExitFullscreen();
                }
            }
        });
    }
    
    const updateExpandButton = () => {
        if (!expandBtn) return;
        
        if (document.fullscreenElement || document.webkitFullscreenElement || 
            document.mozFullScreenElement || document.msFullscreenElement) {
            expandBtn.innerHTML = '<i class="fas fa-compress-alt mr-2"></i>Perkecil';
        } else {
            expandBtn.innerHTML = '<i class="fas fa-expand-alt mr-2"></i>Perbesar';
        }
    };

    document.addEventListener('fullscreenchange', updateExpandButton);
    document.addEventListener('webkitfullscreenchange', updateExpandButton);
    document.addEventListener('mozfullscreenchange', updateExpandButton);
    document.addEventListener('MSFullscreenChange', updateExpandButton);
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && document.fullscreenElement) {
            document.exitFullscreen();
        }
    });
}