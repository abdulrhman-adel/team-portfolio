// Mouse follower and dark mode utility functions
import { ref, onMounted, onUnmounted } from 'vue';

// Hook for mouse follower effect
export function useMouseFollower() {
  const mousePosition = ref({ x: 0, y: 0 });
  
  const updateMousePosition = (event) => {
    mousePosition.value = { 
      x: event.clientX, 
      y: event.clientY 
    };
  };
  
  onMounted(() => {
    window.addEventListener('mousemove', updateMousePosition);
  });
  
  onUnmounted(() => {
    window.removeEventListener('mousemove', updateMousePosition);
  });
  
  return { mousePosition };
}

// Hook for dark mode toggle
export function useDarkMode() {
  const isDarkMode = ref(false);
  
  const toggleDarkMode = () => {
    isDarkMode.value = !isDarkMode.value;
    if (isDarkMode.value) {
      document.body.classList.add('dark-mode');
    } else {
      document.body.classList.remove('dark-mode');
    }
    
    // Store preference in localStorage
    localStorage.setItem('darkMode', isDarkMode.value);
  };
  
  onMounted(() => {
    // Check for saved user preference
    const savedDarkMode = localStorage.getItem('darkMode');
    if (savedDarkMode === 'true') {
      isDarkMode.value = true;
      document.body.classList.add('dark-mode');
    }
    
    // Check for system preference
    if (savedDarkMode === null && window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
      isDarkMode.value = true;
      document.body.classList.add('dark-mode');
    }
  });
  
  return { isDarkMode, toggleDarkMode };
}
