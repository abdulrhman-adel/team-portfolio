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
    
    <div class="interactive-particles" ref="particlesContainer"></div>
    
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
    
    // Particle effect refs
    const particlesContainer = ref(null);
    const particles = ref([]);
    
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
      
      // Initialize particles
      createParticles();
      animateParticles();
    });
    
    onUnmounted(() => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mousedown', handleMouseDown);
      document.removeEventListener('mouseup', handleMouseUp);
      document.removeEventListener('mouseenter', handleMouseEnter);
      document.removeEventListener('mouseleave', handleMouseLeave);
      
      // Clear particles animation if any
      if (window.particleAnimationFrame) {
        cancelAnimationFrame(window.particleAnimationFrame);
      }
    });
    
    const handleMouseMove = () => {
      // Already handled by useMouseFollower
    };
    
    const handleMouseDown = () => {
      gsap.to(cursorScale, { 
        value: 0.8, 
        duration: 0.3,
        ease: 'power3.out',
        overwrite: true
      });
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
    
    // Create floating particles background
    const createParticles = () => {
      if (!particlesContainer.value) return;
      
      const container = particlesContainer.value;
      const containerWidth = window.innerWidth;
      const containerHeight = window.innerHeight;
      
      for (let i = 0; i < 50; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        
        // Random properties
        const size = Math.random() * 5 + 3;
        const posX = Math.random() * containerWidth;
        const posY = Math.random() * containerHeight;
        const opacity = Math.random() * 0.5 + 0.1;
        const delay = Math.random() * 5;
        
        // Apply styles
        particle.style.width = `${size}px`;
        particle.style.height = `${size}px`;
        particle.style.left = `${posX}px`;
        particle.style.top = `${posY}px`;
        particle.style.opacity = opacity;
        particle.style.animationDelay = `${delay}s`;
        
        // Store particle data
        particles.value.push({
          element: particle,
          x: posX,
          y: posY,
          size,
          speedX: Math.random() * 1 - 0.5,
          speedY: Math.random() * 1 - 0.5
        });
        
        // Add to DOM
        container.appendChild(particle);
      }
    };
    
    // Animate particles with subtle movement
    const animateParticles = () => {
      if (particles.value.length === 0) return;
      
      const animate = () => {
        particles.value.forEach(particle => {
          // Update position
          particle.x += particle.speedX;
          particle.y += particle.speedY;
          
          // Boundary check
          if (particle.x < 0 || particle.x > window.innerWidth) {
            particle.speedX *= -1;
          }
          
          if (particle.y < 0 || particle.y > window.innerHeight) {
            particle.speedY *= -1;
          }
          
          // Apply position
          particle.element.style.left = `${particle.x}px`;
          particle.element.style.top = `${particle.y}px`;
        });
        
        window.particleAnimationFrame = requestAnimationFrame(animate);
      };
      
      animate();
    };
    
    return {
      mousePosition,
      isDarkMode,
      toggleDarkMode,
      cursorScale,
      cursorVisible,
      particlesContainer,
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

/* Interactive particles background */
.interactive-particles {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
  z-index: 1;
  overflow: hidden;
}

.particle {
  position: absolute;
  background: #6a11cb;
  border-radius: 50%;
  opacity: 0.2;
  transition: opacity 0.3s ease;
  animation: float 15s infinite ease-in-out;
}

.dark-mode .particle {
  background: #9C27B0;
  opacity: 0.3;
}

@keyframes float {
  0%, 100% {
    transform: translateY(0) translateX(0);
  }
  25% {
    transform: translateY(-10px) translateX(10px);
  }
  50% {
    transform: translateY(10px) translateX(-15px);
  }
  75% {
    transform: translateY(5px) translateX(10px);
  }
}
</style>

