<template>  <div 
    class="project-card" 
    :style="{ '--project-color': project.color }"
    ref="projectCard"
    @mouseenter="onMouseEnter"
    @mouseleave="onMouseLeave"
    :class="{'featured-project': project.featured}"
  >
    <div class="project-image">
      <img :src="project.image" :alt="project.title" />
      <div class="project-overlay">
        <a :href="project.link" target="_blank" class="project-link">View Project</a>
      </div>
      <div class="category-badge">{{ project.category }}</div>
      <div v-if="project.featured" class="featured-badge">Featured</div>
    </div>
    <div class="project-content">
      <h3 class="project-title">{{ project.title }}</h3>
      <p class="project-description">{{ project.description }}</p>      <div class="team-contributors">
        <div class="collaborator-badge">
          <div 
            class="team-avatar" 
            :title="project.teamMembers[0]"
            :style="{ backgroundImage: `url(https://placehold.co/30x30/${getAvatarColor(project.teamMembers[0])}/ffffff?text=${project.teamMembers[0].charAt(0)})` }"
          ></div>
          <span class="collaborator-name">{{ project.teamMembers[0] }}</span>
        </div>
      </div>
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
    getAvatarColor(name) {
      // Generate consistent colors based on team member names
      const colors = ['4CAF50', '2196F3', 'FF5722', '9C27B0', '795548', '607D8B'];
      const index = name.charCodeAt(0) % colors.length;
      return colors[index];
    },onMouseEnter() {
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
  background: var(--card-bg, white);
  border-radius: 15px;
  overflow: hidden;
  box-shadow: 0 10px 15px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  position: relative;
  border: 2px solid rgba(0, 0, 0, 0.08);
  transform-style: preserve-3d;
    .dark-mode & {
    --card-bg: #1a1a30;
    border-color: rgba(103, 58, 183, 0.3);
    box-shadow: 0 15px 25px rgba(0, 0, 0, 0.3);
  }
  
  &.featured-project {
    transform: scale(1.02);
    box-shadow: 0 15px 25px rgba(0, 0, 0, 0.15);
    border-width: 3px;
    border-color: var(--project-color);
    
    &::before {
      transform: scaleX(1);
    }
  }
  
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
    
    .category-badge {
      position: absolute;
      top: 15px;
      left: 15px;
      background: rgba(0, 0, 0, 0.7);
      color: white;
      padding: 5px 12px;
      border-radius: 15px;
      font-size: 0.75rem;
      font-weight: 500;
      backdrop-filter: blur(5px);
      box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2);
      z-index: 2;
      letter-spacing: 0.5px;
    }
    
    .featured-badge {
      position: absolute;
      top: 15px;
      right: 15px;
      background: var(--project-color, #667eea);
      color: white;
      padding: 5px 12px;
      border-radius: 15px;
      font-size: 0.75rem;
      font-weight: 700;
      box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2);
      z-index: 2;
      letter-spacing: 0.5px;
      transform: rotate(5deg);
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
    padding: 20px;      .project-title {
      font-size: 1.4rem;
      color: var(--title-color, #333);
      margin: 0 0 10px;
      font-weight: 700;
      
      .dark-mode & {
        --title-color: #e0e0e0;
      }
    }
      .project-description {
      color: var(--description-color, #666);
      font-size: 0.95rem;
      line-height: 1.5;
      margin-bottom: 15px;
      
      .dark-mode & {
        --description-color: #c0c0ff;
      }
    }      .team-contributors {
      display: flex;
      align-items: center;
      margin-bottom: 15px;
        
        .collaborator-badge {
          display: flex;
          align-items: center;
          background: var(--badge-bg, rgba(240, 240, 240, 0.7));
          padding: 5px 12px;
          border-radius: 25px;
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
          border: 1px solid var(--badge-border, rgba(0, 0, 0, 0.05));
          transition: all 0.3s ease;
          
          .dark-mode & {
            --badge-bg: rgba(30, 30, 50, 0.3);
            --badge-border: rgba(103, 58, 183, 0.2);
          }
          
          &:hover {
            transform: translateY(-3px);
            box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
            background: var(--hover-bg, rgba(230, 230, 230, 0.9));
            
            .dark-mode & {
              --hover-bg: rgba(40, 40, 70, 0.4);
            }
          }
          
          .team-avatar {
            width: 30px;
            height: 30px;
            border-radius: 50%;
            background-size: cover;
            background-position: center;
            border: 2px solid var(--avatar-border, white);
            box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
            transition: transform 0.3s ease;
            margin-right: 10px;
            position: relative;
            z-index: 1;
            
            .dark-mode & {
              --avatar-border: rgba(103, 58, 183, 0.3);
              box-shadow: 0 2px 5px rgba(0, 0, 0, 0.3);
            }
            
            &:hover {
              transform: scale(1.1);
              z-index: 5;
            }
          }
          
          .collaborator-name {
            font-size: 0.9rem;
            font-weight: 500;
            color: var(--name-color, #555);
            
            .dark-mode & {
              --name-color: #c0c0ff;
            }
          }
        }
      }
    
    .project-technologies {
      display: flex;
      flex-wrap: wrap;
      gap: 8px;
        .tech-badge {
        background: var(--badge-bg, #f0f0f0);
        color: var(--badge-text, #555);
        padding: 5px 10px;
        border-radius: 15px;
        font-size: 0.8rem;
        font-weight: 500;
        transition: transform 0.2s ease, background 0.2s ease, color 0.2s ease;
        
        .dark-mode & {
          --badge-bg: rgba(103, 58, 183, 0.2);
          --badge-text: #e0e0e0;
          box-shadow: 0 0 10px rgba(103, 58, 183, 0.1);
        }
        
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
