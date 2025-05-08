/**
 * ARXplore v1.0 Documentation Sidebar
 * This script dynamically creates and manages the sidebar and header across all documentation pages
 */

document.addEventListener('DOMContentLoaded', function() {
  // Chapters data - the sidebar navigation items
  const chapters = [
    { title: 'Home', href: 'index.html' },
    { title: 'UI State Management & Interaction', href: '01_ui_state_management___interaction_.html' },
    { title: 'ARXML File Processing', href: '02_arxml_file_processing_.html' },
    { title: 'Frontend Data Representation', href: '03_frontend_data_representation_.html' },
    { title: 'Dynamic Tree View Rendering', href: '04_dynamic_tree_view_rendering_.html' },
    { title: 'Client-Side Comparison Logic', href: '05_client_side_comparison_logic_.html' },
    { title: 'Difference Visualization & Sync', href: '06_difference_visualization___sync_.html' },
    { title: 'AI Difference Analysis', href: '07_ai_difference_analysis_.html' }
  ];

  // Check if we already have a proper structure
  const existingHeader = document.querySelector('.site-header');
  const existingSidebar = document.querySelector('.sidebar');
  const existingMainContainer = document.querySelector('.main-container');
  const existingContent = document.querySelector('.crossnote.markdown-preview');
  
  // Get original content if it exists
  let contentHTML = '';
  if (existingContent) {
    contentHTML = existingContent.innerHTML;
  }

  // If we have a complete structure, just update the active links
  if (existingHeader && existingSidebar && existingMainContainer) {
    updateActiveLinks();
    setupSidebarToggle();
    window.addEventListener('resize', setupSidebarToggle);
    return;
  }
  
  // Create new structure
  const body = document.querySelector('body');
  
  // Clear existing content
  body.innerHTML = '';
  
  // Create and append header
  const header = createHeader();
  body.appendChild(header);
  
  // Create main container
  const mainContainer = document.createElement('div');
  mainContainer.className = 'main-container';
  
  // Create and append sidebar
  const sidebar = createSidebar();
  mainContainer.appendChild(sidebar);
  
  // Create main content area
  const mainContent = document.createElement('main');
  mainContent.className = 'main-content';
  
  // Use the stored content
  if (contentHTML) {
    const contentDiv = document.createElement('div');
    contentDiv.className = 'crossnote markdown-preview';
    contentDiv.innerHTML = contentHTML;
    mainContent.appendChild(contentDiv);
  }
  
  mainContainer.appendChild(mainContent);
  body.appendChild(mainContainer);
  
  // Update active links in sidebar
  updateActiveLinks();
  
  // Setup toggle button for mobile
  setupSidebarToggle();
  
  // Update on window resize
  window.addEventListener('resize', setupSidebarToggle);

  // Create header
  function createHeader() {
    const header = document.createElement('header');
    header.className = 'site-header';
    
    const title = document.createElement('h1');
    title.textContent = 'ARXplore v1.0 Documentation';
    header.appendChild(title);
    
    return header;
  }
  
  // Create sidebar
  function createSidebar() {
    const sidebar = document.createElement('aside');
    sidebar.className = 'sidebar';
    
    const sidebarTitle = document.createElement('h2');
    sidebarTitle.className = 'sidebar-title';
    sidebarTitle.textContent = 'Chapters';
    sidebar.appendChild(sidebarTitle);
    
    const nav = document.createElement('ul');
    nav.className = 'sidebar-nav';
    
    // Add each chapter to the navigation
    chapters.forEach(chapter => {
      const li = document.createElement('li');
      const a = document.createElement('a');
      a.href = chapter.href;
      a.textContent = chapter.title;
      
      li.appendChild(a);
      nav.appendChild(li);
    });
    
    sidebar.appendChild(nav);
    return sidebar;
  }
  
  // Update active links in sidebar
  function updateActiveLinks() {
    // Get current page path
    const currentPath = window.location.pathname.split('/').pop();
    
    // Find and update all links in the sidebar
    const sidebarLinks = document.querySelectorAll('.sidebar-nav a');
    sidebarLinks.forEach(link => {
      const linkPath = link.getAttribute('href');
      if (linkPath === currentPath || 
          (currentPath === '' && linkPath === 'index.html')) {
        link.classList.add('active');
      } else {
        link.classList.remove('active');
      }
    });
  }
  
  // Setup mobile sidebar toggle
  function setupSidebarToggle() {
    if (window.innerWidth <= 576) {
      const header = document.querySelector('.site-header');
      if (!document.querySelector('.toggle-sidebar') && header) {
        const toggleBtn = document.createElement('button');
        toggleBtn.className = 'toggle-sidebar';
        toggleBtn.innerHTML = '☰';
        toggleBtn.style.background = 'none';
        toggleBtn.style.border = 'none';
        toggleBtn.style.color = 'white';
        toggleBtn.style.fontSize = '1.5rem';
        toggleBtn.style.cursor = 'pointer';
        toggleBtn.style.marginRight = 'auto';
        toggleBtn.style.marginLeft = '-0.5rem';
        
        // Toggle sidebar visibility when button is clicked
        toggleBtn.onclick = function() {
          const sidebar = document.querySelector('.sidebar');
          sidebar.classList.toggle('visible');
        };
        
        header.prepend(toggleBtn);
      }
    }
  }
}); 