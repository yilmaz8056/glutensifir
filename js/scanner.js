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
            app.showScannerResult(product);
        }, 3000);
    }
}

const scanner = new Scanner();
