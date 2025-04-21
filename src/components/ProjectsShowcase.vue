<template>  <div class="showcase-container" ref="showcaseContainer">    
    <div class="hero-section">
      <div class="team-badge" ref="teamBadge">TEAM SHOWCASE</div>
      <h1 class="main-title" ref="mainTitle">Our Team's Latest Projects</h1>
      <p class="subtitle" ref="subtitle">Explore our collaborative innovations</p>
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
    
    <div class="about-team-section" ref="aboutTeamSection">
      <h2 class="section-title">Who We Are</h2>
      <p class="team-intro">We're a passionate team of developers, designers, and innovators working together to create impactful digital solutions. Our diverse skills and collaborative approach help us tackle complex challenges and deliver exceptional results.</p>
      <div class="team-stats">
        <div class="stat-item">
          <div class="stat-number">4</div>
          <div class="stat-label">Projects</div>
        </div>
        <div class="stat-item">
          <div class="stat-number">4</div>
          <div class="stat-label">Team Members</div>
        </div>
        <div class="stat-item">
          <div class="stat-number">12</div>
          <div class="stat-label">Technologies</div>
        </div>
      </div>
    </div>
    
    <div class="projects-section">
      <h2 class="section-title">Our Projects</h2>
      <div class="filter-container" ref="filterContainer">
        <button 
          @click="setFilter('all')" 
          :class="['filter-button', { active: currentFilter === 'all' }]"
        >
          All Projects
        </button>
        <button 
          v-for="category in categories" 
          :key="category" 
          @click="setFilter(category)"
          :class="['filter-button', { active: currentFilter === category }]"
        >
          {{ category }}
        </button>
      </div>
      
      <div class="projects-grid" ref="projectsGrid">
        <ProjectCard 
          v-for="project in filteredProjects" 
          :key="project.id" 
          :project="project"
          class="project-item"
          ref="projectCards"
        />
      </div>
    </div>
    <div class="team-spotlight">
      <h2 class="section-title">Meet Our Team</h2>
      <div class="team-grid">
        <div v-for="(member, index) in teamMembers" :key="index" class="team-member-card">
          <div class="member-avatar-large" :style="{ backgroundImage: `url(${member.avatar})` }"></div>
          <h3 class="member-name">{{ member.name }}</h3>
          <p class="member-role">{{ member.role }}</p>
          <div class="member-projects">
            <span>Projects: </span>
            <div class="project-dots">
              <span 
                v-for="(project, pIndex) in getProjectsByMember(member.name)" 
                :key="pIndex" 
                class="project-dot"
                :style="{ background: project.color }"
                :title="project.title"
              ></span>
            </div>
          </div>
        </div>
      </div>
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
      currentFilter: 'all',
      teamMembers: [
        { name: 'Alex', avatar: 'https://placehold.co/100x100/667eea/ffffff?text=A', role: 'Full-Stack Developer' },
        { name: 'Sarah', avatar: 'https://placehold.co/100x100/764ba2/ffffff?text=S', role: 'UX/UI Designer' },
        { name: 'Jamie', avatar: 'https://placehold.co/100x100/4CAF50/ffffff?text=J', role: 'Back-End Developer' },
        { name: 'Taylor', avatar: 'https://placehold.co/100x100/FF5722/ffffff?text=T', role: 'Front-End Developer' }
      ]
    }
  },
  computed: {
    categories() {
      // Extract unique categories from projects
      const categorySet = new Set(this.projects.map(project => project.category));
      return Array.from(categorySet);
    },
    filteredProjects() {
      if (this.currentFilter === 'all') {
        return this.projects;
      }
      return this.projects.filter(project => project.category === this.currentFilter);
    }
  },  mounted() {
    this.initAnimations();
  },
  methods: {    setFilter(filter) {
      this.currentFilter = filter;
      
      // Animate the filtered projects
      gsap.fromTo(this.$refs.projectsGrid.children, 
        { opacity: 0, y: 30 },
        { 
          opacity: 1, 
          y: 0, 
          stagger: 0.1, 
          duration: 0.6,
          ease: 'power3.out'
        }
      );
    },
    
    getProjectsByMember(memberName) {
      // Filter projects to find those where this member participated
      return this.projects.filter(project => 
        project.teamMembers && project.teamMembers.includes(memberName)
      );
    },initAnimations() {
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
  background: transparent;
  position: relative;
  overflow: hidden;
  
  :deep(.dark-mode) & {
    color-scheme: dark;
  }
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
  z-index: 2;
  
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
    color: transparent;
    text-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);

    @media (max-width: 768px) {
      font-size: 3rem;
    }
  }
  
  .subtitle {
    font-size: 1.5rem;
    color: var(--subtitle-color, #555);
    margin-top: 20px;
    max-width: 600px;
    
    :deep(.dark-mode) & {
      --subtitle-color: #d0d0d0;
      text-shadow: 0 2px 5px rgba(0, 0, 0, 0.3);
    }
    
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

/* Additional styles for new sections */
.about-team-section {
  background: var(--about-section-bg, #f9f9f9);
  padding: 80px 20px;
  text-align: center;
  
  :deep(.dark-mode) & {
    --about-section-bg: #232323;
  }
  
  .section-title {
    font-size: 2.5rem;
    font-weight: 700;
    margin-bottom: 30px;
    color: var(--section-title-color, #333);
    
    :deep(.dark-mode) & {
      --section-title-color: #f0f0f0;
    }
  }
  
  .team-intro {
    max-width: 800px;
    margin: 0 auto 50px;
    font-size: 1.2rem;
    line-height: 1.7;
    color: var(--intro-text-color, #555);
    
    :deep(.dark-mode) & {
      --intro-text-color: #b0b0b0;
    }
  }
  
  .team-stats {
    display: flex;
    justify-content: center;
    gap: 80px;
    
    .stat-item {
      text-align: center;
      
      .stat-number {
        font-size: 3.5rem;
        font-weight: 800;
        color: #667eea;
        line-height: 1;
        margin-bottom: 10px;
      }
      
      .stat-label {
        font-size: 1.1rem;
        color: var(--stat-label-color, #666);
        text-transform: uppercase;
        letter-spacing: 1px;
        
        :deep(.dark-mode) & {
          --stat-label-color: #a0a0a0;
        }
      }
    }
  }
}

.projects-section {
  padding: 80px 20px;
  
  .section-title {
    text-align: center;
    font-size: 2.5rem;
    font-weight: 700;
    margin-bottom: 50px;
    color: #333;
  }
  
  .filter-container {
    display: flex;
    justify-content: center;
    flex-wrap: wrap;
    gap: 15px;
    margin-bottom: 40px;
    
    .filter-button {
      background: none;
      border: 2px solid #eaeaea;
      border-radius: 30px;
      padding: 10px 25px;
      font-size: 1rem;
      font-weight: 500;
      color: #666;
      cursor: pointer;
      transition: all 0.3s ease;
      
      &:hover {
        border-color: #667eea;
        color: #667eea;
      }
      
      &.active {
        background: #667eea;
        border-color: #667eea;
        color: white;
      }
    }
  }
}

.team-spotlight {
  background: var(--team-spotlight-bg, linear-gradient(to right, #f9f9f9, #f1f1f1));
  padding: 80px 20px;
  
  :deep(.dark-mode) & {
    --team-spotlight-bg: linear-gradient(to right, #232323, #1e1e1e);
  }
  
  .section-title {
    text-align: center;
    font-size: 2.5rem;
    font-weight: 700;
    margin-bottom: 50px;
    color: var(--spotlight-title-color, #333);
    
    :deep(.dark-mode) & {
      --spotlight-title-color: #f0f0f0;
    }
  }
  
  .team-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
    gap: 30px;
    max-width: 1200px;
    margin: 0 auto;
    
    .team-member-card {
      background: var(--member-card-bg, white);
      border-radius: 15px;
      padding: 30px;
      text-align: center;
      box-shadow: 0 10px 20px rgba(0, 0, 0, 0.05);
      transition: transform 0.3s ease, box-shadow 0.3s ease;
      
      :deep(.dark-mode) & {
        --member-card-bg: #2a2a2a;
        box-shadow: 0 10px 20px rgba(0, 0, 0, 0.15);
      }
      
      &:hover {
        transform: translateY(-10px);
        box-shadow: 0 15px 30px rgba(0, 0, 0, 0.1);
        
        :deep(.dark-mode) & {
          box-shadow: 0 15px 30px rgba(0, 0, 0, 0.3);
        }
      }
        .member-avatar-large {
        width: 120px;
        height: 120px;
        border-radius: 50%;
        background-size: cover;
        background-position: center;
        margin: 0 auto 20px;
        border: 5px solid var(--avatar-border, #f0f0f0);
        
        :deep(.dark-mode) & {
          --avatar-border: #3a3a3a;
        }
      }
      
      .member-name {
        font-size: 1.5rem;
        font-weight: 700;
        margin: 0 0 5px;
        color: var(--member-name-color, #333);
        
        :deep(.dark-mode) & {
          --member-name-color: #f0f0f0;
        }
      }
      
      .member-role {
        color: #667eea;
        font-weight: 500;
        margin-bottom: 20px;
      }
      
      .member-projects {
        display: flex;
        flex-direction: column;
        align-items: center;
        
        span {
          font-size: 0.9rem;
          color: var(--projects-label-color, #666);
          margin-bottom: 10px;
          
          :deep(.dark-mode) & {
            --projects-label-color: #b0b0b0;
          }
        }
        
        .project-dots {
          display: flex;
          gap: 8px;
          
          .project-dot {
            width: 15px;
            height: 15px;
            border-radius: 50%;
            cursor: pointer;
            transition: transform 0.2s ease;
            
            &:hover {
              transform: scale(1.4);
            }
          }
        }
      }
    }
  }
}
</style>
