// mandelbrot-explorer.ts

class MandelbrotExplorer {
  private canvas: HTMLCanvasElement;
  private ctx: CanvasRenderingContext2D;
  private imageData: ImageData;
  private isDragging: boolean = false;
  private dragStart: { x: number, y: number } = { x: 0, y: 0 };
  
  // View parameters
  private xCenter: number = -0.5;
  private yCenter: number = 0;
  private zoom: number = 200;
  private maxIterations: number = 100;
  
  // Color palette
  private colorPalette: Uint8ClampedArray;
  
  constructor() {
    // Create canvas element
    this.canvas = document.createElement('canvas');
    this.canvas.width = 800;
    this.canvas.height = 600;
    document.body.appendChild(this.canvas);
    
    // Get context and create image data
    this.ctx = this.canvas.getContext('2d')!;
    this.imageData = this.ctx.createImageData(this.canvas.width, this.canvas.height);
    
    // Generate a smooth color palette
    this.colorPalette = this.generateColorPalette();
    
    // Set up event listeners
    this.setupEventListeners();
    
    // Initial render
    this.render();
    
    // Add UI instructions
    this.addInstructions();
  }
  
  private generateColorPalette(): Uint8ClampedArray {
    // Create a smooth color palette for visualization
    const paletteSize = 1000;
    const palette = new Uint8ClampedArray(paletteSize * 4);
    
    for (let i = 0; i < paletteSize; i++) {
      const t = i / paletteSize;
      
      // Create a smooth color gradient
      const r = Math.floor(255 * Math.sin(t * Math.PI * 2));
      const g = Math.floor(255 * Math.sin(t * Math.PI * 2 + Math.PI * 2/3));
      const b = Math.floor(255 * Math.sin(t * Math.PI * 2 + Math.PI * 4/3));
      
      palette[i * 4] = r;
      palette[i * 4 + 1] = g;
      palette[i * 4 + 2] = b;
      palette[i * 4 + 3] = 255; // Alpha
    }
    
    return palette;
  }
  
  private setupEventListeners(): void {
    // Mouse wheel for zooming
    this.canvas.addEventListener('wheel', (e: WheelEvent) => {
      e.preventDefault();
      
      // Get mouse position
      const rect = this.canvas.getBoundingClientRect();
      const mouseX = e.clientX - rect.left;
      const mouseY = e.clientY - rect.top;
      
      // Convert to complex plane coordinates
      const x = this.xCenter + (mouseX - this.canvas.width / 2) / this.zoom;
      const y = this.yCenter + (mouseY - this.canvas.height / 2) / this.zoom;
      
      // Adjust zoom based on wheel direction
      const zoomFactor = e.deltaY > 0 ? 0.8 : 1.2;
      this.zoom *= zoomFactor;
      
      // Adjust center to zoom toward mouse position
      this.xCenter = x - (mouseX - this.canvas.width / 2) / this.zoom;
      this.yCenter = y - (mouseY - this.canvas.height / 2) / this.zoom;
      
      // Re-render
      this.render();
    });
    
    // Mouse drag for panning
    this.canvas.addEventListener('mousedown', (e: MouseEvent) => {
      this.isDragging = true;
      this.dragStart.x = e.clientX;
      this.dragStart.y = e.clientY;
    });
    
    document.addEventListener('mousemove', (e: MouseEvent) => {
      if (this.isDragging) {
        const dx = e.clientX - this.dragStart.x;
        const dy = e.clientY - this.dragStart.y;
        
        this.xCenter -= dx / this.zoom;
        this.yCenter -= dy / this.zoom;
        
        this.dragStart.x = e.clientX;
        this.dragStart.y = e.clientY;
        
        this.render();
      }
    });
    
    document.addEventListener('mouseup', () => {
      this.isDragging = false;
    });
    
    // Increase/decrease iterations with keyboard
    document.addEventListener('keydown', (e: KeyboardEvent) => {
      if (e.key === '+' || e.key === '=') {
        this.maxIterations = Math.min(1000, this.maxIterations + 20);
        this.render();
      } else if (e.key === '-') {
        this.maxIterations = Math.max(20, this.maxIterations - 20);
        this.render();
      } else if (e.key === 'r') {
        // Reset view
        this.xCenter = -0.5;
        this.yCenter = 0;
        this.zoom = 200;
        this.maxIterations = 100;
        this.render();
      }
    });
  }
  
  private computeMandelbrot(cx: number, cy: number): number {
    let x = 0;
    let y = 0;
    let iteration = 0;
    
    while (x*x + y*y <= 4 && iteration < this.maxIterations) {
      const xTemp = x*x - y*y + cx;
      y = 2*x*y + cy;
      x = xTemp;
      iteration++;
    }
    
    // Smooth coloring using logarithmic scaling
    if (iteration < this.maxIterations) {
      // Calculate fractional iteration for smooth coloring
      const log_zn = Math.log(x*x + y*y) / 2;
      const nu = Math.log(log_zn / Math.log(2)) / Math.log(2);
      iteration = iteration + 1 - nu;
    }
    
    return iteration;
  }
  
  private render(): void {
    const { width, height } = this.canvas;
    const pixels = this.imageData.data;
    
    for (let y = 0; y < height; y++) {
      for (let x = 0; x < width; x++) {
        // Convert pixel coordinates to complex plane
        const cx = this.xCenter + (x - width / 2) / this.zoom;
        const cy = this.yCenter + (y - height / 2) / this.zoom;
        
        // Compute Mandelbrot value
        const iteration = this.computeMandelbrot(cx, cy);
        
        // Calculate color
        const idx = (y * width + x) * 4;
        
        if (iteration >= this.maxIterations) {
          // Points inside the Mandelbrot set are black
          pixels[idx] = 0;
          pixels[idx + 1] = 0;
          pixels[idx + 2] = 0;
          pixels[idx + 3] = 255;
        } else {
          // Map iteration to color palette
          const colorIdx = Math.floor((iteration % 1000) * 4);
          pixels[idx] = this.colorPalette[colorIdx];
          pixels[idx + 1] = this.colorPalette[colorIdx + 1];
          pixels[idx + 2] = this.colorPalette[colorIdx + 2];
          pixels[idx + 3] = 255;
        }
      }
    }
    
    // Draw the image
    this.ctx.putImageData(this.imageData, 0, 0);
    
    // Display current parameters
    this.ctx.fillStyle = 'rgba(0, 0, 0, 0.7)';
    this.ctx.fillRect(10, 10, 250, 70);
    this.ctx.fillStyle = 'white';
    this.ctx.font = '12px monospace';
    this.ctx.fillText(`Center: (${this.xCenter.toFixed(10)}, ${this.yCenter.toFixed(10)})`, 20, 30);
    this.ctx.fillText(`Zoom: ${this.zoom.toFixed(2)}`, 20, 50);
    this.ctx.fillText(`Max Iterations: ${this.maxIterations}`, 20, 70);
  }
  
  private addInstructions(): void {
    const instructions = document.createElement('div');
    instructions.style.position = 'fixed';
    instructions.style.bottom = '10px';
    instructions.style.left = '10px';
    instructions.style.backgroundColor = 'rgba(0, 0, 0, 0.7)';
    instructions.style.color = 'white';
    instructions.style.padding = '10px';
    instructions.style.borderRadius = '5px';
    instructions.style.fontFamily = 'monospace';
    
    instructions.innerHTML = `
      <strong>Controls:</strong><br>
      Mouse wheel: Zoom in/out<br>
      Mouse drag: Pan<br>
      + / -: Increase/decrease iterations<br>
      R: Reset view
    `;
    
    document.body.appendChild(instructions);
  }
}

// Initialize the explorer when the DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  new MandelbrotExplorer();
});

export {};
