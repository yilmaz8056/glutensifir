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
            
            // Kullanıcıya HTTPS uyarısı ver
            if(window.location.protocol !== 'https:' && window.location.hostname !== 'localhost') {
                alert("Kamera Açılamadı!\n\nTarayıcılar güvenlik nedeniyle yerel ağda (HTTP) kameraya izin vermez. Gerçek barkod okuma için HTTPS bağlantısı veya Localhost gereklidir. Şimdilik simülasyon moduna geçiliyor.");
            }

            // Fallback: Eğer kamera yoksa veya izin verilmediyse Fotoğraf Yükleme UI'ını aç
            this.showFallbackUploader();
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
            // Veritabanında yoksa "Ürün Ekle" ekranını aç
            this.stop(); // Taramayı durdur
            document.getElementById('add-product-modal').classList.remove('hidden');
            window.currentUnknownBarcode = barcode; // Kaydetmek için geçici olarak tut
        }
    }

    showFallbackUploader() {
        document.getElementById('scanner-overlay').classList.add('hidden');
        document.getElementById('camera-stream').classList.add('hidden');
        document.getElementById('scanner-fallback').classList.remove('hidden');
    }

    async decodeFromFile(inputElement) {
        if (!inputElement || !inputElement.files || !inputElement.files[0]) return;
        
        try {
            if (!this.codeReader && window.ZXing) {
                this.codeReader = new ZXing.BrowserMultiFormatReader();
            }

            // Resmi oku ve barkodu çöz
            const result = await this.codeReader.decodeFromImageUrl(URL.createObjectURL(inputElement.files[0]));
            if (result && result.text) {
                this.handleScanResult(result.text);
            }
        } catch (err) {
            console.error("Fotoğraftan barkod okunamadı:", err);
            alert("Barkod net okunamadı. Lütfen fotoğrafın net olduğundan emin olup tekrar deneyin.");
        }
        
        // Inputu temizle ki aynı dosyayı tekrar seçebilsin
        inputElement.value = '';
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
