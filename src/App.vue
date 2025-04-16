<template>
  <div id="app" :class="{ 'dark-mode': isDarkMode }">
    <!-- Loading overlay -->
    <div class="loading-overlay" v-if="isLoading">
      <div class="loader"></div>
      <p>Loading your awesome portfolio...</p>
    </div>

    <div 
      class="mouse-follower" 
      :style="{ 
        left: `${mousePosition.x}px`, 
        top: `${mousePosition.y}px`,
        transform: `translate(-50%, -50%) scale(${cursorScale})`,
        opacity: cursorVisible ? 1 : 0
      }"
      v-show="!isLoading"
    ></div>
    
    <div class="interactive-grid" ref="gridContainer"></div>
    
    <button @click="toggleDarkMode" class="theme-toggle" v-show="!isLoading">
      <span v-if="isDarkMode">☀️</span>
      <span v-else>🌙</span>
    </button>
    
    <ProjectsShowcase v-show="!isLoading" />
  </div>
</template>

<script>
import { ref, onMounted, onUnmounted } from 'vue';
import ProjectsShowcase from './components/ProjectsShowcase.vue';
import { useMouseFollower, useDarkMode } from './composables/effects.js';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger);

export default {
  name: 'App',
  components: {
    ProjectsShowcase
  },
  setup() {
    const { mousePosition } = useMouseFollower();
    const { isDarkMode, toggleDarkMode } = useDarkMode();
    
    // Loading state
    const isLoading = ref(true);
    
    // Enhanced cursor effects
    const cursorScale = ref(1);
    const cursorVisible = ref(false);
    
    // Grid effect refs
    const gridContainer = ref(null);
    const gridCells = ref([]);
    const gridSize = ref({ cols: 0, rows: 0 });
    const cellSize = 40; // Size of each grid cell in pixels
    
    // Additional tracking for grid animation
    const lastMousePos = ref({ x: 0, y: 0 });
    
    onMounted(() => {
      // Make cursor visible after component mounts
      setTimeout(() => {
        cursorVisible.value = true;
        isLoading.value = false; // Hide loading screen after a delay
      }, 1500);
      
      // Add event listeners for cursor effects
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mousedown', handleMouseDown);
      document.addEventListener('mouseup', handleMouseUp);
      document.addEventListener('mouseenter', handleMouseEnter);
      document.addEventListener('mouseleave', handleMouseLeave);
      
      // Setup interactive elements tracking
      setTimeout(() => {
        setupInteractiveElements();
      }, 1800);
      
      // Initialize grid
      createGrid();
      window.addEventListener('resize', handleResize);
    });
    
    onUnmounted(() => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mousedown', handleMouseDown);
      document.removeEventListener('mouseup', handleMouseUp);
      document.removeEventListener('mouseenter', handleMouseEnter);
      document.removeEventListener('mouseleave', handleMouseLeave);
      window.removeEventListener('resize', handleResize);
    });
    
    const handleMouseMove = (e) => {
      // Track mouse position for grid cell activation
      lastMousePos.value = { x: e.clientX, y: e.clientY };
      updateActiveGridCells(e.clientX, e.clientY);
    };
    
    const handleMouseDown = () => {
      gsap.to(cursorScale, { 
        value: 0.8, 
        duration: 0.3,
        ease: 'power3.out',
        overwrite: true
      });
      
      // Light up surrounding cells on click
      const { x, y } = lastMousePos.value;
      rippleEffect(x, y);
    };
    
    const handleMouseUp = () => {
      gsap.to(cursorScale, { 
        value: 1, 
        duration: 0.3,
        ease: 'elastic.out(1, 0.3)',
        overwrite: true
      });
    };
    
    const handleMouseEnter = () => {
      cursorVisible.value = true;
    };
    
    const handleMouseLeave = () => {
      cursorVisible.value = false;
    };
    
    const handleResize = () => {
      // Clear existing grid
      if (gridContainer.value) {
        gridContainer.value.innerHTML = '';
      }
      gridCells.value = [];
      
      // Recreate grid
      createGrid();
    };
    
    // Track interactive elements
    const setupInteractiveElements = () => {
      const interactiveElements = document.querySelectorAll('button, a, .project-card');
      
      interactiveElements.forEach(el => {
        el.addEventListener('mouseenter', () => {
          gsap.to(cursorScale, { 
            value: 1.5, 
            duration: 0.3,
            ease: 'power3.out',
            overwrite: true
          });
        });
        
        el.addEventListener('mouseleave', () => {
          gsap.to(cursorScale, { 
            value: 1, 
            duration: 0.3,
            ease: 'power3.out',
            overwrite: true
          });
        });
      });
    };
    
    // Create grid layout
    const createGrid = () => {
      if (!gridContainer.value) return;
      
      const container = gridContainer.value;
      const viewportWidth = window.innerWidth;
      const viewportHeight = window.innerHeight;
      
      // Calculate number of cells
      const cols = Math.ceil(viewportWidth / cellSize);
      const rows = Math.ceil(viewportHeight / cellSize);
      
      gridSize.value = { cols, rows };
      
      // Create grid cells
      for (let row = 0; row < rows; row++) {
        for (let col = 0; col < cols; col++) {
          const cell = document.createElement('div');
          cell.className = 'grid-cell';
          
          // Position cell
          cell.style.width = `${cellSize}px`;
          cell.style.height = `${cellSize}px`;
          cell.style.left = `${col * cellSize}px`;
          cell.style.top = `${row * cellSize}px`;
          
          // Create inner cell for glow effect
          const innerCell = document.createElement('div');
          innerCell.className = 'cell-inner';
          cell.appendChild(innerCell);
          
          // Store cell data
          const cellData = {
            element: cell,
            innerElement: innerCell,
            row,
            col,
            x: col * cellSize,
            y: row * cellSize,
            isActive: false,
            brightness: 0
          };
          
          gridCells.value.push(cellData);
          container.appendChild(cell);
          
          // Add staggered entrance animation
          gsap.from(cell, {
            opacity: 0,
            scale: 0.5,
            delay: (row + col) * 0.01,
            duration: 0.5,
            ease: 'power2.out'
          });
        }
      }
    };
    
    // Update active grid cells based on mouse position
    const updateActiveGridCells = (mouseX, mouseY) => {
      if (gridCells.value.length === 0) return;
      
      gridCells.value.forEach(cell => {
        // Calculate distance from mouse to cell center
        const cellCenterX = cell.x + cellSize / 2;
        const cellCenterY = cell.y + cellSize / 2;
        
        const dx = mouseX - cellCenterX;
        const dy = mouseY - cellCenterY;
        const distance = Math.sqrt(dx * dx + dy * dy);
        
        // Define how far the effect spreads
        const radius = 150;
        
        if (distance < radius) {
          // Calculate brightness based on distance (closer = brighter)
          const brightness = 1 - distance / radius;
          
          // Animate cell
          gsap.to(cell.innerElement, {
            opacity: brightness * 0.8 + 0.2,
            scale: brightness * 0.2 + 1,
            duration: 0.5,
            ease: 'power2.out'
          });
          
          // Border glow effect
          const hue = (cell.row + cell.col) % 360;
          const borderColor = `hsla(${hue}, 100%, 70%, ${brightness * 0.8})`;
          gsap.to(cell.element, {
            boxShadow: `0 0 12px ${borderColor}`,
            duration: 0.5
          });
          
          cell.isActive = true;
        } else if (cell.isActive) {
          // Fade out when no longer in range
          gsap.to(cell.innerElement, {
            opacity: 0.1,
            scale: 1,
            duration: 0.8,
            ease: 'power2.out'
          });
          
          gsap.to(cell.element, {
            boxShadow: '0 0 0 rgba(0,0,0,0)',
            duration: 0.8
          });
          
          cell.isActive = false;
        }
      });
    };
    
    // Create a ripple effect from the mouse click
    const rippleEffect = (centerX, centerY) => {
      if (gridCells.value.length === 0) return;
      
      gridCells.value.forEach(cell => {
        // Calculate distance from click to cell center
        const cellCenterX = cell.x + cellSize / 2;
        const cellCenterY = cell.y + cellSize / 2;
        
        const dx = centerX - cellCenterX;
        const dy = centerY - cellCenterY;
        const distance = Math.sqrt(dx * dx + dy * dy);
        
        // Define ripple properties
        const maxRadius = 300;
        const maxDelay = 0.5;
        
        if (distance < maxRadius) {
          // Calculate delay based on distance
          const delay = (distance / maxRadius) * maxDelay;
          
          // Calculate intensity based on distance
          const intensity = 1 - distance / maxRadius;
          
          // Random color for ripple
          const hue = Math.random() * 60 + 220; // Blue to purple range
          
          // Animate glow
          gsap.timeline()
            .to(cell.innerElement, {
              opacity: intensity * 0.8 + 0.2,
              scale: intensity * 0.5 + 1,
              backgroundColor: `hsla(${hue}, 100%, 70%, ${intensity * 0.3})`,
              boxShadow: `0 0 15px hsla(${hue}, 100%, 70%, ${intensity * 0.8})`,
              delay: delay,
              duration: 0.4,
              ease: 'power2.out'
            })
            .to(cell.innerElement, {
              opacity: 0.1,
              scale: 1,
              backgroundColor: 'transparent',
              boxShadow: 'none',
              duration: 0.8,
              ease: 'power2.in'
            });
        }
      });
    };
    
    return {
      mousePosition,
      isDarkMode,
      toggleDarkMode,
      cursorScale,
      cursorVisible,
      gridContainer,
      isLoading
    };
  }
}
</script>

<style>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  font-family: 'Poppins', Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  overflow-x: hidden;
  transition: background-color 0.3s ease, color 0.3s ease;
}

#app {
  min-height: 100vh;
  position: relative;
}

/* Loading overlay */
.loading-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  z-index: 10000;
}

.loader {
  width: 60px;
  height: 60px;
  border: 4px solid rgba(255, 255, 255, 0.3);
  border-radius: 50%;
  border-top: 4px solid white;
  animation: spin 1s infinite cubic-bezier(0.45, 0.05, 0.55, 0.95);
  margin-bottom: 20px;
}

.loading-overlay p {
  color: white;
  font-size: 1.2rem;
  font-weight: 500;
  letter-spacing: 1px;
  animation: pulse 1.5s infinite;
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

@keyframes pulse {
  0%, 100% { opacity: 1; }
  50% { opacity: 0.7; }
}

/* Dark mode styles */
.dark-mode {
  background-color: #121212;
  color: #e0e0e0;
}

.dark-mode .project-card {
  background: #1e1e1e;
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.3);
}

.dark-mode .project-title {
  color: #e0e0e0 !important;
}

.dark-mode .project-description {
  color: #b0b0b0 !important;
}

.dark-mode .tech-badge {
  background: #2a2a2a !important;
  color: #e0e0e0 !important;
}

.dark-mode .showcase-container {
  background: linear-gradient(135deg, #121212 0%, #2a2a2a 100%) !important;
}

/* Interactive Grid */
.interactive-grid {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
  z-index: 1;
  overflow: hidden;
}

.grid-cell {
  position: absolute;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: box-shadow 0.5s ease;
  border: 1px solid rgba(255, 255, 255, 0.05);
}

.dark-mode .grid-cell {
  border: 1px solid rgba(255, 255, 255, 0.025);
}

.cell-inner {
  width: 70%;
  height: 70%;
  border-radius: 2px;
  opacity: 0.1;
  transition: opacity 0.3s ease, transform 0.3s ease, background-color 0.3s ease;
  will-change: opacity, transform;
}

.dark-mode .cell-inner {
  background-color: rgba(255, 255, 255, 0.02);
}

/* Mouse follower */
.mouse-follower {
  pointer-events: none;
  position: fixed;
  width: 400px;
  height: 400px;
  border-radius: 50%;
  background: radial-gradient(
    circle,
    rgba(123, 31, 162, 0.15) 0%,
    rgba(103, 58, 183, 0.1) 40%,
    rgba(0, 0, 0, 0) 70%
  );
  transform: translate(-50%, -50%);
  z-index: 9999;
  mix-blend-mode: screen;
  transition: opacity 0.3s ease;
  will-change: transform, left, top, opacity;
}

.dark-mode .mouse-follower {
  background: radial-gradient(
    circle,
    rgba(123, 31, 162, 0.25) 0%,
    rgba(103, 58, 183, 0.15) 40%,
    rgba(0, 0, 0, 0) 70%
  );
  mix-blend-mode: overlay;
}

/* Theme toggle button */
.theme-toggle {
  position: fixed;
  top: 20px;
  right: 20px;
  width: 50px;
  height: 50px;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.2);
  backdrop-filter: blur(10px);
  border: none;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.5rem;
  cursor: pointer;
  z-index: 9999;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease;
}

.theme-toggle:hover {
  transform: scale(1.1) rotate(5deg);
}

.dark-mode .theme-toggle {
  background: rgba(30, 30, 30, 0.8);
}
</style>

