class Scanner {
    constructor() {
        this.videoElement = document.getElementById('camera-stream');
        this.codeReader = null;
        this.scanningTimer = null;
        this.isPlaying = false;
    }

    async start() {
        try {
            // Check if ZXing is loaded
            if (!this.codeReader && window.ZXing) {
                this.codeReader = new ZXing.BrowserMultiFormatReader();
            }

            if (!this.codeReader) {
                throw new Error("ZXing library not loaded");
            }

            this.isPlaying = true;
            console.log("Kamera başlatılıyor ve barkod aranıyor...");
            
            // Start decoding from the camera
            this.codeReader.decodeFromVideoDevice(null, 'camera-stream', (result, err) => {
                if (result && this.isPlaying) {
                    this.isPlaying = false; // Prevent multiple reads
                    this.handleScanResult(result.text);
                }
                if (err && !(err.name === 'NotFoundException')) {
                    // Ignore NotFoundException, it just means no barcode in the current frame
                }
            });

        } catch (err) {
            console.error("Kamera erişim hatası veya ZXing problemi:", err);
            // Fallback: Eğer kamera yoksa (Örn. masaüstü), 3 saniye sonra simüle et
            this.simulateScan();
        }
    }

    stop() {
        this.isPlaying = false;
        if (this.codeReader) {
            this.codeReader.reset(); // Stops the camera
        }
        if (this.scanningTimer) {
            clearTimeout(this.scanningTimer);
        }
    }

    handleScanResult(barcode) {
        this.playSuccessSound();
        
        // MOCK_PRODUCTS içinde barkodu ara
        const product = window.MOCK_PRODUCTS.find(p => p.barcode === barcode);
        
        if (product) {
            window.app.showScannerResult(product);
        } else {
            // Veritabanında yoksa genel bir uyarı göster
            window.app.showScannerResult({
                status: 'warning',
                brand: 'Bilinmeyen Ürün',
                name: 'Barkod: ' + barcode,
                description: 'Bu ürün veritabanımızda bulunamadı. Lütfen içeriğini manuel olarak kontrol ediniz.'
            });
        }
    }

    simulateScan() {
        // 3 saniye bekle, sonra rastgele bir ürün bul (simülasyon)
        this.scanningTimer = setTimeout(() => {
            const product = typeof window.getRandomMockProduct === 'function' ? window.getRandomMockProduct() : window.MOCK_PRODUCTS[0];
            this.handleScanResult(product.barcode);
        }, 3000);
    }

    playSuccessSound() {
        try {
            const AudioContext = window.AudioContext || window.webkitAudioContext;
            const ctx = new AudioContext();
            const osc = ctx.createOscillator();
            const gain = ctx.createGain();
            
            osc.connect(gain);
            gain.connect(ctx.destination);
            
            osc.type = 'sine';
            osc.frequency.setValueAtTime(880, ctx.currentTime); // A5
            osc.frequency.exponentialRampToValueAtTime(1760, ctx.currentTime + 0.1); // A6
            
            gain.gain.setValueAtTime(0, ctx.currentTime);
            gain.gain.linearRampToValueAtTime(1, ctx.currentTime + 0.05);
            gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.5);
            
            osc.start(ctx.currentTime);
            osc.stop(ctx.currentTime + 0.5);
        } catch(e) {
            console.log("Ses çalınamadı", e);
        }
    }
}

// Global scope'a ekleyelim ki HTML'deki onclick'ler veya app.js ulaşabilsin
window.scanner = new Scanner();
