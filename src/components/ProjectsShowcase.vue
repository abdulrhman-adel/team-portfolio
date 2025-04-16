<template>
  <div class="showcase-container" ref="showcaseContainer">
    <div class="hero-section">
      <h1 class="main-title" ref="mainTitle">My Portfolio</h1>
      <p class="subtitle" ref="subtitle">Check out my latest work</p>
      <div class="scroll-indicator" ref="scrollIndicator">
        <span>Scroll Down</span>
        <div class="arrow">▼</div>
      </div>
    </div>
    
    <div class="projects-grid" ref="projectsGrid">
      <ProjectCard 
        v-for="project in projects" 
        :key="project.id" 
        :project="project"
        class="project-item"
        ref="projectCards"
      />
    </div>
    
    <footer class="footer" ref="footer">
      <p>© {{ new Date().getFullYear() }} My Portfolio. All rights reserved.</p>
      <div class="social-links">
        <a href="#" class="social-link">GitHub</a>
        <a href="#" class="social-link">LinkedIn</a>
        <a href="#" class="social-link">Twitter</a>
      </div>
    </footer>
  </div>
</template>

<script>
import ProjectCard from './ProjectCard.vue';
import projects from '../data/projects.js';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default {
  name: 'ProjectsShowcase',
  components: {
    ProjectCard
  },
  data() {
    return {
      projects
    }
  },
  mounted() {
    this.initAnimations();
  },
  methods: {
    initAnimations() {
      // Hero section animations
      const tl = gsap.timeline();
      
      tl.from(this.$refs.mainTitle, {
        y: 50,
        opacity: 0,
        duration: 1,
        ease: 'power3.out'
      })
      .from(this.$refs.subtitle, {
        y: 30,
        opacity: 0,
        duration: 0.8,
        ease: 'power3.out'
      }, '-=0.5')
      .from(this.$refs.scrollIndicator, {
        y: 20,
        opacity: 0,
        duration: 0.6,
        ease: 'power3.out'
      }, '-=0.3');
      
      // Continuous scroll indicator animation
      gsap.to(this.$refs.scrollIndicator.querySelector('.arrow'), {
        y: 10,
        duration: 1.5,
        repeat: -1,
        yoyo: true,
        ease: 'power1.inOut'
      });
      
      // Project cards staggered animation
      gsap.from(this.$refs.projectCards, {
        scrollTrigger: {
          trigger: this.$refs.projectsGrid,
          start: 'top bottom-=100',
          toggleActions: 'play none none none'
        },
        y: 100,
        opacity: 0,
        duration: 0.8,
        stagger: 0.2,
        ease: 'power3.out'
      });
      
      // Footer animation
      gsap.from(this.$refs.footer, {
        scrollTrigger: {
          trigger: this.$refs.footer,
          start: 'top bottom-=50',
          toggleActions: 'play none none none'
        },
        opacity: 0,
        y: 30,
        duration: 1,
        ease: 'power3.out'
      });
    }
  }
}
</script>

<style lang="scss" scoped>
.showcase-container {
  min-height: 100vh;
  background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
  position: relative;
  overflow: hidden;
}

.hero-section {
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  padding: 0 20px;
  position: relative;
  
  .main-title {
    font-size: 4rem;
    font-weight: 800;
    margin: 0;
    background: linear-gradient(45deg, #667eea, #764ba2);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    text-fill-color: transparent;

    @media (max-width: 768px) {
      font-size: 3rem;
    }
  }
  
  .subtitle {
    font-size: 1.5rem;
    color: #555;
    margin-top: 20px;
    max-width: 600px;
    
    @media (max-width: 768px) {
      font-size: 1.2rem;
    }
  }
  
  .scroll-indicator {
    position: absolute;
    bottom: 40px;
    display: flex;
    flex-direction: column;
    align-items: center;
    color: #555;
    cursor: pointer;
    
    span {
      margin-bottom: 8px;
      font-size: 0.9rem;
      font-weight: 500;
    }
    
    .arrow {
      font-size: 0.8rem;
    }
  }
}

.projects-grid {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 30px;
  padding: 50px 20px 100px;
  max-width: 1400px;
  margin: 0 auto;
  
  .project-item {
    flex: 1 1 350px;
    max-width: 380px;
  }
}

.footer {
  background: #2a2a2a;
  color: white;
  padding: 40px 20px;
  text-align: center;
  
  p {
    margin: 0 0 20px;
    opacity: 0.8;
  }
  
  .social-links {
    display: flex;
    justify-content: center;
    gap: 20px;
    
    .social-link {
      color: white;
      text-decoration: none;
      opacity: 0.7;
      transition: opacity 0.3s ease;
      
      &:hover {
        opacity: 1;
      }
    }
  }
}
</style>
