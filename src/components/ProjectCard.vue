<template>
  <div 
    class="project-card" 
    :style="{ '--project-color': project.color }"
    ref="projectCard"
    @mouseenter="onMouseEnter"
    @mouseleave="onMouseLeave"
  >
    <div class="project-image">
      <img :src="project.image" :alt="project.title" />
      <div class="project-overlay">
        <a :href="project.link" target="_blank" class="project-link">View Project</a>
      </div>
    </div>
    <div class="project-content">
      <h3 class="project-title">{{ project.title }}</h3>
      <p class="project-description">{{ project.description }}</p>
      <div class="project-technologies">
        <span 
          v-for="(tech, index) in project.technologies" 
          :key="index" 
          class="tech-badge"
        >
          {{ tech }}
        </span>
      </div>
    </div>
  </div>
</template>

<script>
import { gsap } from 'gsap';

export default {
  name: 'ProjectCard',
  props: {
    project: {
      type: Object,
      required: true
    }
  },
  methods: {    onMouseEnter() {
      gsap.to(this.$refs.projectCard, {
        y: -10,
        boxShadow: '0 20px 25px rgba(0, 0, 0, 0.2)',
        duration: 0.3
      });
      gsap.to(this.$refs.projectCard.querySelector('.project-overlay'), {
        opacity: 1,
        duration: 0.3
      });
      
      // Add technology badge animation
      const techBadges = this.$refs.projectCard.querySelectorAll('.tech-badge');
      gsap.to(techBadges, {
        scale: 1.1,
        stagger: 0.05,
        duration: 0.2,
        ease: 'power1.out'
      });
      
      // Add glowing border effect
      gsap.to(this.$refs.projectCard, {
        borderColor: 'var(--project-color)',
        duration: 0.3
      });
    },
      
    onMouseLeave() {
      gsap.to(this.$refs.projectCard, {
        y: 0,
        boxShadow: '0 10px 15px rgba(0, 0, 0, 0.1)',
        borderColor: 'rgba(0, 0, 0, 0.1)',
        duration: 0.3
      });
      gsap.to(this.$refs.projectCard.querySelector('.project-overlay'), {
        opacity: 0,
        duration: 0.3
      });
      
      // Reset technology badge animation
      const techBadges = this.$refs.projectCard.querySelectorAll('.tech-badge');
      gsap.to(techBadges, {
        scale: 1,
        stagger: 0.03,
        duration: 0.2,
        ease: 'power1.in'
      });
    }
  }
}
</script>

<style lang="scss" scoped>
.project-card {
  background: white;
  border-radius: 10px;
  overflow: hidden;
  box-shadow: 0 10px 15px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  position: relative;
  border: 2px solid rgba(0, 0, 0, 0.1);
  transform-style: preserve-3d;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 5px;
    background: var(--project-color, #667eea);
    transform: scaleX(0);
    transform-origin: left;
    transition: transform 0.3s ease;
  }
  
  &:hover::before {
    transform: scaleX(1);
  }
  
  .project-image {
    position: relative;
    overflow: hidden;
    height: 200px;
    
    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      transition: transform 0.5s ease;
    }
    
    .project-overlay {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: rgba(0, 0, 0, 0.5);
      display: flex;
      justify-content: center;
      align-items: center;
      opacity: 0;
      transition: opacity 0.3s ease;
      
      .project-link {
        color: white;
        text-decoration: none;
        background: var(--project-color, #667eea);
        padding: 10px 20px;
        border-radius: 30px;
        font-weight: 600;
        font-size: 0.9rem;
        letter-spacing: 0.5px;
        transform: translateY(20px);
        transition: transform 0.3s ease, background 0.3s ease;
        box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
        
        &:hover {
          background: white;
          color: var(--project-color, #667eea);
        }
      }
    }
  }
  
  &:hover {
    .project-image img {
      transform: scale(1.1);
    }
    
    .project-overlay .project-link {
      transform: translateY(0);
    }
  }
  
  .project-content {
    padding: 20px;
    
    .project-title {
      font-size: 1.4rem;
      color: #333;
      margin: 0 0 10px;
      font-weight: 700;
    }
    
    .project-description {
      color: #666;
      font-size: 0.95rem;
      line-height: 1.5;
      margin-bottom: 15px;
    }
    
    .project-technologies {
      display: flex;
      flex-wrap: wrap;
      gap: 8px;
      
      .tech-badge {
        background: #f0f0f0;
        color: #555;
        padding: 5px 10px;
        border-radius: 15px;
        font-size: 0.8rem;
        font-weight: 500;
        transition: transform 0.2s ease, background 0.2s ease, color 0.2s ease;
        
        &:hover {
          background: var(--project-color, #667eea);
          color: white;
          transform: translateY(-3px);
        }
      }
    }
  }
}
</style>
