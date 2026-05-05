class Scanner {
    constructor() {
        this.videoElement = document.getElementById('camera-stream');
        this.stream = null;
        this.scanningTimer = null;
    }

    async start() {
        try {
            // Request camera access
            this.stream = await navigator.mediaDevices.getUserMedia({ 
                video: { facingMode: 'environment' } 
            });
            this.videoElement.srcObject = this.stream;
            
            // Simulate scanning process
            this.simulateScan();
            
        } catch (err) {
            console.error("Camera access error:", err);
            // Even if camera fails (e.g. on desktop without cam), simulate a scan after 2 seconds
            this.simulateScan();
        }
    }

    stop() {
        if (this.stream) {
            this.stream.getTracks().forEach(track => track.stop());
            this.stream = null;
        }
        if (this.scanningTimer) {
            clearTimeout(this.scanningTimer);
        }
    }

    simulateScan() {
        // Wait 3 seconds then "find" a product
        this.scanningTimer = setTimeout(() => {
            const product = getRandomMockProduct();
            this.playSuccessSound();
            app.showScannerResult(product);
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
            console.log("Audio not supported or blocked", e);
        }
    }
}

const scanner = new Scanner();
