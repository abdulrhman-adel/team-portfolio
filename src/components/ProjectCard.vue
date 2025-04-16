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
  methods: {
    onMouseEnter() {
      gsap.to(this.$refs.projectCard, {
        y: -10,
        boxShadow: '0 20px 25px rgba(0, 0, 0, 0.2)',
        duration: 0.3
      });
      gsap.to(this.$refs.projectCard.querySelector('.project-overlay'), {
        opacity: 1,
        duration: 0.3
      });
    },
    onMouseLeave() {
      gsap.to(this.$refs.projectCard, {
        y: 0,
        boxShadow: '0 10px 15px rgba(0, 0, 0, 0.1)',
        duration: 0.3
      });
      gsap.to(this.$refs.projectCard.querySelector('.project-overlay'), {
        opacity: 0,
        duration: 0.3
      });
    }
  }
}
</script>

<style lang="scss" scoped>
.project-card {
  background: #fff;
  border-radius: 16px;
  overflow: hidden;
  box-shadow: 0 10px 15px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease;
  margin: 20px;
  width: 100%;
  max-width: 380px;
  position: relative;
  transform-origin: center;
  border-top: 5px solid var(--project-color);
  
  .project-image {
    position: relative;
    overflow: hidden;
    
    img {
      width: 100%;
      height: 220px;
      object-fit: cover;
      display: block;
      transition: transform 0.5s ease;
    }
    
    .project-overlay {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;      background: rgba(0, 0, 0, 0.6);
      display: flex;
      align-items: center;
      justify-content: center;
      opacity: 0;
      transition: opacity 0.3s ease;
      
      .project-link {
        padding: 10px 20px;
        background: var(--project-color);
        color: white;
        text-decoration: none;
        border-radius: 30px;
        font-weight: 600;
        transform: translateY(20px);
        transition: transform 0.3s ease, background 0.3s ease;
        
        &:hover {
          background: var(--project-color);
          filter: brightness(0.85);
        }
      }
    }
    
    &:hover {
      img {
        transform: scale(1.05);
      }
      
      .project-link {
        transform: translateY(0);
      }
    }
  }
  
  .project-content {
    padding: 20px;
    
    .project-title {
      margin: 0 0 10px;
      color: #333;
      font-size: 1.5rem;
    }
    
    .project-description {
      color: #666;
      margin-bottom: 15px;
      line-height: 1.6;
    }
    
    .project-technologies {
      display: flex;
      flex-wrap: wrap;
      gap: 8px;
      
      .tech-badge {
        background: #f0f0f0;
        padding: 5px 10px;
        border-radius: 15px;
        font-size: 0.8rem;
        color: #333;
        font-weight: 500;
      }
    }
  }
}
</style>
