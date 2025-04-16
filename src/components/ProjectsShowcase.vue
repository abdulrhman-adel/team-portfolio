<template>
  <div class="showcase-container" ref="showcaseContainer">    <div class="hero-section">
      <div class="team-badge" ref="teamBadge">TEAM SHOWCASE</div>
      <h1 class="main-title" ref="mainTitle">Our Amazing Projects</h1>
      <p class="subtitle" ref="subtitle">Explore our team's innovative work</p>
      <div class="team-members" ref="teamMembers">
        <div v-for="(member, index) in teamMembers" :key="index" class="member-avatar" 
             :style="{ backgroundImage: `url(${member.avatar})` }"
             :data-name="member.name">
        </div>
      </div>
      <div class="scroll-indicator" ref="scrollIndicator">
        <span>View Projects</span>
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
      <p>© {{ new Date().getFullYear() }} Team Showcase. All rights reserved.</p>
      <div class="team-credit">Created with ❤️ by our amazing team</div>
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
    ProjectCard  },  data() {
    return {
      projects,
      teamMembers: [
        { name: 'Alex', avatar: 'https://placehold.co/100x100/667eea/ffffff?text=A' },
        { name: 'Sarah', avatar: 'https://placehold.co/100x100/764ba2/ffffff?text=S' },
        { name: 'Jamie', avatar: 'https://placehold.co/100x100/4CAF50/ffffff?text=J' },
        { name: 'Taylor', avatar: 'https://placehold.co/100x100/FF5722/ffffff?text=T' }
      ]
    }
  },
  mounted() {
    this.initAnimations();
  },
  methods: {    initAnimations() {
      // Hero section animations
      const tl = gsap.timeline();
      
      tl.from(this.$refs.teamBadge, {
        y: -50,
        opacity: 0,
        duration: 0.8,
        ease: 'power3.out'
      })
      .from(this.$refs.mainTitle, {
        y: 50,
        opacity: 0,
        duration: 1,
        ease: 'power3.out'
      }, '-=0.4')
      .from(this.$refs.subtitle, {
        y: 30,
        opacity: 0,
        duration: 0.8,
        ease: 'power3.out'
      }, '-=0.5')
      .from(this.$refs.teamMembers.children, {
        scale: 0,
        opacity: 0,
        y: 30,
        duration: 0.6,
        stagger: 0.1,
        ease: 'back.out(1.7)',
      }, '-=0.3')
      .from(this.$refs.scrollIndicator, {
        y: 20,
        opacity: 0,
        duration: 0.6,
        ease: 'power3.out'
      }, '-=0.2');
      
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
  padding: 0 20px;  position: relative;
  
  .team-badge {
    background: linear-gradient(45deg, #764ba2, #667eea);
    color: white;
    padding: 8px 16px;
    font-size: 0.9rem;
    font-weight: 700;
    border-radius: 20px;
    letter-spacing: 1.5px;
    margin-bottom: 30px;
    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
    position: relative;
    overflow: hidden;
    
    &::before {
      content: '';
      position: absolute;
      top: -10%;
      left: -10%;
      width: 120%;
      height: 120%;
      background: linear-gradient(90deg, 
        rgba(255, 255, 255, 0) 0%, 
        rgba(255, 255, 255, 0.2) 50%, 
        rgba(255, 255, 255, 0) 100%);
      transform: rotate(25deg) translateX(-100%);
      animation: shimmer 3s infinite;
    }
  }
  
  .team-members {
    display: flex;
    gap: 20px;
    margin: 30px 0;
    
    .member-avatar {
      width: 60px;
      height: 60px;
      border-radius: 50%;
      background-size: cover;
      background-position: center;
      box-shadow: 0 4px 10px rgba(0, 0, 0, 0.15);
      transition: all 0.3s ease;
      position: relative;
      
      &::after {
        content: attr(data-name);
        position: absolute;
        bottom: -25px;
        left: 50%;
        transform: translateX(-50%);
        font-size: 0.8rem;
        color: #555;
        opacity: 0;
        transition: opacity 0.3s ease;
        white-space: nowrap;
      }
      
      &:hover {
        transform: translateY(-5px);
        box-shadow: 0 8px 15px rgba(0, 0, 0, 0.2);
        
        &::after {
          opacity: 1;
        }
      }
    }
  }
  
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
  position: relative;
  overflow: hidden;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 4px;
    background: linear-gradient(90deg, #667eea, #764ba2, #6B8DD6, #8E37D7);
    background-size: 300% 100%;
    animation: gradientMove 4s ease infinite;
  }
  
  p {
    margin: 0 0 10px;
    opacity: 0.8;
  }
  
  .team-credit {
    font-size: 1.1rem;
    font-weight: 500;
    margin: 15px 0;
    color: #f0f0f0;
    letter-spacing: 0.5px;
  }
  
  .social-links {
    display: flex;
    justify-content: center;
    gap: 20px;
    margin-top: 20px;
    
    .social-link {
      color: white;
      text-decoration: none;
      opacity: 0.7;
      transition: all 0.3s ease;
      position: relative;
      padding: 5px 10px;
      
      &::after {
        content: '';
        position: absolute;
        bottom: 0;
        left: 0;
        width: 100%;
        height: 2px;
        background-color: white;
        transform: scaleX(0);
        transform-origin: center;
        transition: transform 0.3s ease;
      }
      
      &:hover {
        opacity: 1;
        
        &::after {
          transform: scaleX(1);
        }
      }
    }
  }
}

@keyframes shimmer {
  0% {
    transform: rotate(25deg) translateX(-100%);
  }
  100% {
    transform: rotate(25deg) translateX(100%);
  }
}

@keyframes gradientMove {
  0% {
    background-position: 0% 50%;
  }
  50% {
    background-position: 100% 50%;
  }
  100% {
    background-position: 0% 50%;
  }
}
</style>
