import { createApp } from 'vue'
import App from './App.vue'

// Define Vue feature flags
// This fixes the "__VUE_PROD_HYDRATION_MISMATCH_DETAILS__" warning
window.__VUE_PROD_DEVTOOLS__ = false;
window.__VUE_PROD_HYDRATION_MISMATCH_DETAILS__ = false;

createApp(App).mount('#app')
