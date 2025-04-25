<template>  <div class="showcase-container" ref="showcaseContainer">    
    <div class="hero-section">
      <div class="team-badge" ref="teamBadge">TEAM SHOWCASE</div>
      <h1 class="main-title" ref="mainTitle">Our Team's Latest Projects</h1>
      <p class="subtitle" ref="subtitle">Explore our collaborative innovations</p>
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
import { CSSPlugin } from 'gsap/CSSPlugin';

// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger, CSSPlugin);

export default {
  name: 'ProjectsShowcase',
  components: {
    ProjectCard  },  data() {
    return {
      projects,
      currentFilter: 'all',
      teamMembers: [
        { name: 'Abdulrhman Adel', avatar: 'https://placehold.co/100x100/667eea/ffffff?text=A', role: 'Full-Stack Developer' },
        { name: 'Mohammed EL-Gharib', avatar: 'https://placehold.co/100x100/4CAF50/ffffff?text=M', role: 'Front-End Developer' },
        { name: 'Abdulrhman Zakaria', avatar: 'https://placehold.co/100x100/764ba2/ffffff?text=A', role: 'Backend Developer' },
        { name: 'Mahmoud EL-Khwass', avatar: 'https://placehold.co/100x100/FF5722/ffffff?text=M', role: 'Front-End Developer' }
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
      }, '-=0.4')      .from(this.$refs.subtitle, {
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
// define variables for colors and fonts
$primary-color: #667eea;
$secondary-color: #764ba2;
$font-family: 'Roboto', sans-serif;
$font-size: 16px;
$font-weight: 400;
$line-height: 1.5;
$border-radius: 8px;
$box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
$about-section-bg: #f0f0f0; 
.showcase-container {
  min-height: 100vh;
  background: transparent;
  position: relative;
  overflow: hidden;
    .dark-mode & {
    color-scheme: dark;
    background: linear-gradient(135deg, #0a0a18 0%, #151525 100%);
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
  background: var(--hero-bg, transparent);
  
  :deep(.dark-mode) & {
    --hero-bg: linear-gradient(135deg, rgba(15, 15, 30, 0.5) 0%, rgba(25, 25, 45, 0.5) 100%);
  }
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-image: 
      radial-gradient(circle at 20% 30%, rgba(102, 126, 234, 0.08) 0%, transparent 50%),
      radial-gradient(circle at 80% 70%, rgba(118, 75, 162, 0.08) 0%, transparent 50%);
    z-index: -1;
  }
  
  .team-badge {
    background: linear-gradient(45deg, #764ba2, #667eea);
    color: white;
    padding: 10px 20px;
    font-size: 0.9rem;
    font-weight: 700;
    border-radius: 25px;
    letter-spacing: 1.5px;
    margin-bottom: 30px;
    box-shadow: 0 10px 20px rgba(118, 75, 162, 0.25);
    position: relative;
    overflow: hidden;
    backdrop-filter: blur(10px);
    
    &::before {
      content: '';
      position: absolute;
      top: -10%;
      left: -10%;
      width: 120%;
      height: 120%;
      background: linear-gradient(90deg, 
        rgba(255, 255, 255, 0) 0%, 
        rgba(255, 255, 255, 0.3) 50%, 
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
    
    .dark-mode & {
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
  background: #f9f9f9;
  padding: 100px 20px;
  text-align: center;
  position: relative;
  overflow: hidden;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.05);
  
  .dark-mode & {
    background: #0f0f1e;
    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.15);
  }
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-image: 
      radial-gradient(circle at 20% 30%, rgba(103, 58, 183, 0.08) 0%, transparent 50%),
      radial-gradient(circle at 80% 70%, rgba(63, 81, 181, 0.08) 0%, transparent 50%);
    z-index: 0;
  }
  
  &::after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 5px;
    background: linear-gradient(90deg, #9c27b0, #3f51b5, #667eea, #764ba2);
    background-size: 300% 100%;
    animation: gradientMove 6s ease infinite;
  }
  
  .section-title {
    position: relative;
    font-size: 2.5rem;
    font-weight: 700;
    margin-bottom: 30px;
    background: linear-gradient(45deg, #9c27b0, #3f51b5);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    color: transparent;
    text-shadow: 0 2px 10px rgba(0, 0, 0, 0.2);
    z-index: 1;
  }
    .team-intro {
    position: relative;
    max-width: 800px;
    margin: 0 auto 60px;
    font-size: 1.2rem;
    line-height: 1.7;
    color: var(--intro-text-color, #555);
    z-index: 1;
    
    .dark-mode & {
      --intro-text-color: #c0c0ff;
    }
  }
  
  .team-stats {
    position: relative;
    display: flex;
    justify-content: center;
    gap: 80px;
    z-index: 1;
    
    @media (max-width: 768px) {
      flex-direction: column;
      gap: 40px;
    }
    
    .stat-item {
      text-align: center;
      
      .stat-number {
        font-size: 3.5rem;
        font-weight: 800;
        background: linear-gradient(45deg, #9c27b0, #3f51b5);
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
        background-clip: text;
        color: transparent;
        line-height: 1;
        margin-bottom: 10px;
        text-shadow: 0 2px 10px rgba(156, 39, 176, 0.3);
      }
        .stat-label {
        font-size: 1.1rem;
        color: var(--stat-label-color, #666);
        text-transform: uppercase;
        letter-spacing: 1px;
        
        .dark-mode & {
          --stat-label-color: #c0c0ff;
        }
      }
    }
  }
}

.projects-section {
  padding: 100px 20px;
  background: #ffffff;
  position: relative;
  
  .dark-mode & {
    background: #121220;
  }
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-image: 
      radial-gradient(circle at 5% 95%, rgba(103, 58, 183, 0.06) 0%, transparent 40%),
      radial-gradient(circle at 95% 15%, rgba(63, 81, 181, 0.06) 0%, transparent 40%);
    z-index: 0;
  }
  
  .section-title {
    position: relative;
    text-align: center;
    font-size: 2.5rem;
    font-weight: 700;
    margin-bottom: 50px;
    background: linear-gradient(45deg, #667eea, #764ba2);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    color: transparent;
    text-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
    z-index: 1;
  }
  
  .filter-container {
    position: relative;
    display: flex;
    justify-content: center;
    flex-wrap: wrap;
    gap: 15px;
    margin-bottom: 40px;
    z-index: 1;      .filter-button {
      background: var(--filter-btn-bg, rgba(255, 255, 255, 0.8));
      border: 2px solid var(--filter-btn-border, rgba(234, 234, 234, 0.8));
      border-radius: 30px;
      padding: 12px 30px;
      font-size: 1rem;
      font-weight: 500;
      color: var(--filter-btn-color, #666);
      cursor: pointer;
      transition: all 0.3s ease;
      backdrop-filter: blur(5px);
      box-shadow: 0 4px 10px rgba(0, 0, 0, 0.04);
      
      .dark-mode & {
        --filter-btn-bg: rgba(40, 40, 60, 0.6);
        --filter-btn-border: rgba(80, 80, 120, 0.3);
        --filter-btn-color: #c0c0c0;
        box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);
      }        &:hover {
        border-color: #667eea;
        color: #667eea;
        transform: translateY(-3px);
        box-shadow: 0 8px 15px rgba(102, 126, 234, 0.15);
        
        .dark-mode & {
          box-shadow: 0 8px 15px rgba(102, 126, 234, 0.2);
        }
      }
      
      &.active {
        background: linear-gradient(45deg, #667eea, #764ba2);
        border-color: transparent;
        color: white;
        box-shadow: 0 8px 15px rgba(102, 126, 234, 0.25);
      }
    }
  }
}

.team-spotlight {
  background: #f0f0f5;
  padding: 120px 20px;
  position: relative;
  overflow: hidden;
  box-shadow: 0 -10px 30px rgba(0, 0, 0, 0.03), 0 10px 30px rgba(0, 0, 0, 0.05);
  
  .dark-mode & {
    background: #0f0f1e;
    box-shadow: 0 -10px 30px rgba(0, 0, 0, 0.1), 0 10px 30px rgba(0, 0, 0, 0.15);
  }
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-image: 
      radial-gradient(circle at 20% 80%, rgba(103, 58, 183, 0.1) 0%, transparent 40%),
      radial-gradient(circle at 80% 20%, rgba(156, 39, 176, 0.1) 0%, transparent 40%),
      radial-gradient(circle at 50% 50%, rgba(102, 126, 234, 0.05) 0%, transparent 70%);
    z-index: 0;
  }
  
  &::after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 5px;
    background: linear-gradient(90deg, #764ba2, #667eea, #9C27B0, #3F51B5);
    background-size: 300% 100%;
    animation: gradientMove 6s ease infinite;
  }
  
  .section-title {
    position: relative;
    text-align: center;
    font-size: 2.5rem;
    font-weight: 700;
    margin-bottom: 70px;
    background: linear-gradient(45deg, #9c27b0, #3f51b5);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    color: transparent;
    text-shadow: 0 2px 10px rgba(0, 0, 0, 0.2);
    z-index: 1;
  }
    .team-grid {
    position: relative;
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
    gap: 30px;
    max-width: 1200px;
    margin: 0 auto;
    z-index: 1;
      .team-member-card {
      background: rgba(255, 255, 255, 0.9);
      border-radius: 20px;
      padding: 35px 30px;
      text-align: center;
      backdrop-filter: blur(10px);
      box-shadow: 0 20px 40px rgba(0, 0, 0, 0.08);
      transition: transform 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275), 
                  box-shadow 0.4s ease;
      border: 1px solid rgba(255, 255, 255, 0.2);
      position: relative;
      overflow: hidden;
      
      .dark-mode & {
        background: rgba(30, 30, 50, 0.8);
        box-shadow: 0 20px 40px rgba(0, 0, 0, 0.2);
        border: 1px solid rgba(103, 58, 183, 0.2);
      }
        &::before {
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: linear-gradient(120deg, 
          rgba(255, 255, 255, 0) 0%, 
          rgba(255, 255, 255, 0.05) 50%, 
          rgba(255, 255, 255, 0) 100%);
        z-index: 0;
        
        .dark-mode & {
          background: linear-gradient(120deg, 
            rgba(103, 58, 183, 0) 0%, 
            rgba(103, 58, 183, 0.05) 50%, 
            rgba(103, 58, 183, 0) 100%);
        }
      }        &:hover {
        transform: translateY(-15px) scale(1.03);
        box-shadow: 0 25px 50px rgba(0, 0, 0, 0.12);
        
        .dark-mode & {
          box-shadow: 0 25px 50px rgba(0, 0, 0, 0.3);
        }
        
        .member-avatar-large {
          transform: scale(1.1);
          border-color: var(--project-color, #764ba2);
        }
      }
      
      .member-avatar-large {
        width: 120px;
        height: 120px;
        border-radius: 50%;
        background-size: cover;
        background-position: center;
        margin: 0 auto 20px;
        border: 5px solid var(--avatar-border, rgba(255, 255, 255, 0.8));
        box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
        
        :deep(.dark-mode) & {
          --avatar-border: rgba(103, 58, 183, 0.3);
          box-shadow: 0 5px 15px rgba(0, 0, 0, 0.3);
        }
      }
        .member-name {
        font-size: 1.5rem;
        font-weight: 700;
        margin: 0 0 5px;
        color: var(--member-name-color, #333);
        
        :deep(.dark-mode) & {
          --member-name-color: #cfc7c7;
        }
      }
      
      .member-role {
        font-weight: 500;
        margin-bottom: 20px;
        background: linear-gradient(45deg, #9c27b0, #3f51b5);
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
        background-clip: text;
        color: transparent;
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
            --projects-label-color: #c0c0ff;
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
            transition: transform 0.2s ease, box-shadow 0.2s ease;
            box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
            
            &:hover {
              transform: scale(1.4);
              box-shadow: 0 0 8px currentColor;
            }          }
        }
      }
    }
  }
}
</style>
