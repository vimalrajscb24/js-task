/**
 * Dashboard Page JavaScript
 * Implements: Sidebar Toggle, Dynamic Dashboard Cards, Course List Rendering,
 * Navigation Active State, and Alert System
 */

// Task 2: Sidebar Toggle
const sidebar = document.getElementById('sidebar');
const sidebarToggle = document.getElementById('sidebarToggle');
const sidebarClose = document.getElementById('sidebarClose');

/**
 * Toggles the sidebar visibility
 */
const toggleSidebar = () => {
    sidebar.classList.toggle('active');
};

/**
 * Closes the sidebar
 */
const closeSidebar = () => {
    sidebar.classList.remove('active');
};

// Task 3: Dynamic Dashboard Cards
const statsData = [
    { 
        id: 1, 
        title: 'Total Courses', 
        value: 6, 
        icon: 'fas fa-book', 
        color: 'primary',
        description: 'Currently enrolled'
    },
    { 
        id: 2, 
        title: 'Assignments Due', 
        value: 3, 
        icon: 'fas fa-tasks', 
        color: 'danger',
        description: 'Pending submission'
    },
    { 
        id: 3, 
        title: 'Attendance', 
        value: '95%', 
        icon: 'fas fa-calendar-check', 
        color: 'success',
        description: 'Overall percentage'
    },
    { 
        id: 4, 
        title: 'Current GPA', 
        value: '3.8', 
        icon: 'fas fa-chart-line', 
        color: 'warning',
        description: 'Out of 4.0 scale'
    }
];

/**
 * Renders statistics cards dynamically
 */
const renderStatsCards = () => {
    const statsContainer = document.getElementById('statsContainer');
    if (!statsContainer) return;
    
    statsContainer.innerHTML = '';
    
    statsData.forEach(stat => {
        const card = document.createElement('div');
        card.className = `stat-card ${stat.color}`;
        
        card.innerHTML = `
            <div class="stat-icon">
                <i class="${stat.icon}"></i>
            </div>
            <div class="stat-value">${stat.value}</div>
            <div class="stat-label">${stat.title}</div>
            <div class="stat-description">${stat.description}</div>
        `;
        
        statsContainer.appendChild(card);
    });
};

// Task 4: Course List Rendering
const coursesData = [
    {
        id: 1,
        code: 'CS101',
        title: 'Introduction to Programming',
        instructor: 'Dr. Sarah Johnson',
        progress: 85,
        status: 'active',
        dueAssignments: 2
    },
    {
        id: 2,
        code: 'CS201',
        title: 'Data Structures',
        instructor: 'Prof. Michael Chen',
        progress: 70,
        status: 'active',
        dueAssignments: 1
    },
    {
        id: 3,
        code: 'MATH101',
        title: 'Calculus I',
        instructor: 'Dr. Robert Williams',
        progress: 100,
        status: 'completed',
        dueAssignments: 0
    },
    {
        id: 4,
        code: 'CS301',
        title: 'Database Systems',
        instructor: 'Dr. Emily Davis',
        progress: 60,
        status: 'active',
        dueAssignments: 0
    }
];

/**
 * Renders course cards dynamically
 */
const renderCourseCards = () => {
    const coursesContainer = document.getElementById('coursesContainer');
    if (!coursesContainer) return;
    
    coursesContainer.innerHTML = '';
    
    // Show only active courses on dashboard
    const activeCourses = coursesData.filter(course => course.status === 'active');
    
    activeCourses.forEach(course => {
        const card = document.createElement('div');
        card.className = 'course-card';
        
        card.innerHTML = `
            <div class="course-header">
                <div>
                    <h3 class="course-title">${course.title}</h3>
                    <div class="course-code">${course.code}</div>
                </div>
                <span class="course-status status-${course.status}">${course.status === 'active' ? 'Active' : 'Completed'}</span>
            </div>
            <div class="course-body">
                <div class="course-info">
                    <div class="course-instructor">
                        <i class="fas fa-user"></i>
                        <span>${course.instructor}</span>
                    </div>
                    ${course.dueAssignments > 0 ? 
                        `<div class="course-due">
                            <i class="fas fa-exclamation-circle text-danger"></i>
                            <span class="text-danger">${course.dueAssignments} assignment(s) due</span>
                        </div>` : 
                        '<div class="course-due"><i class="fas fa-check-circle text-success"></i><span>All caught up</span></div>'
                    }
                </div>
                <div class="course-progress">
                    <div class="progress-label">
                        <span>Progress</span>
                        <span>${course.progress}%</span>
                    </div>
                    <div class="progress-bar">
                        <div class="progress-fill" style="width: ${course.progress}%"></div>
                    </div>
                </div>
            </div>
            <div class="course-footer">
                <a href="course-detail.html?id=${course.id}" class="btn btn-outline btn-sm">View Details</a>
                <a href="assignments.html?course=${course.id}" class="btn btn-primary btn-sm">Assignments</a>
            </div>
        `;
        
        coursesContainer.appendChild(card);
    });
};

// Task: Recent Assignments
const assignmentsData = [
    {
        id: 1,
        title: 'Binary Search Tree Implementation',
        course: 'CS201 - Data Structures',
        dueDate: '2023-10-20',
        status: 'pending',
        courseId: 2
    },
    {
        id: 2,
        title: 'SQL Queries Practice',
        course: 'CS301 - Database Systems',
        dueDate: '2023-10-18',
        status: 'submitted',
        courseId: 4
    },
    {
        id: 3,
        title: 'Web API Development',
        course: 'CS101 - Introduction to Programming',
        dueDate: '2023-10-15',
        status: 'late',
        courseId: 1
    }
];

/**
 * Renders recent assignments
 */
const renderRecentAssignments = () => {
    const assignmentsContainer = document.getElementById('assignmentsContainer');
    if (!assignmentsContainer) return;
    
    assignmentsContainer.innerHTML = '';
    
    // Sort by due date (ascending)
    const sortedAssignments = [...assignmentsData].sort((a, b) => 
        new Date(a.dueDate) - new Date(b.dueDate)
    );
    
    // Take only first 3 assignments
    const recentAssignments = sortedAssignments.slice(0, 3);
    
    recentAssignments.forEach(assignment => {
        const item = document.createElement('div');
        item.className = 'assignment-item';
        
        // Format due date
        const dueDate = new Date(assignment.dueDate);
        const formattedDate = dueDate.toLocaleDateString('en-US', {
            month: 'short',
            day: 'numeric',
            year: 'numeric'
        });
        
        // Determine status text and class
        let statusText, statusClass;
        switch(assignment.status) {
            case 'pending':
                statusText = 'Pending';
                statusClass = 'status-pending';
                break;
            case 'submitted':
                statusText = 'Submitted';
                statusClass = 'status-submitted';
                break;
            case 'late':
                statusText = 'Late';
                statusClass = 'status-late';
                break;
            default:
                statusText = 'Unknown';
                statusClass = 'status-pending';
        }
        
        item.innerHTML = `
            <div class="assignment-info">
                <h3 class="assignment-title">${assignment.title}</h3>
                <div class="assignment-meta">
                    <div class="assignment-course">
                        <i class="fas fa-book"></i>
                        <span>${assignment.course}</span>
                    </div>
                    <div class="assignment-due">
                        <i class="fas fa-calendar"></i>
                        <span>Due: ${formattedDate}</span>
                    </div>
                </div>
            </div>
            <div class="assignment-actions">
                <span class="assignment-status ${statusClass}">${statusText}</span>
            </div>
        `;
        
        assignmentsContainer.appendChild(item);
    });
};

// Task 9: Navigation Active State
/**
 * Updates active state of navigation items based on current page
 */
const updateActiveNav = () => {
    const currentPage = window.location.pathname.split('/').pop();
    const navItems = document.querySelectorAll('.nav-item');
    
    navItems.forEach(item => {
        item.classList.remove('active');
        
        const link = item.querySelector('a');
        if (link) {
            const href = link.getAttribute('href');
            if (href === currentPage) {
                item.classList.add('active');
            }
        }
    });
};

// Task 10: Alert System
/**
 * Displays a notification alert (reusable across all pages)
 * @param {string} message - The message to display
 * @param {string} type - The alert type (success, error, warning, info)
 * @param {number} duration - How long to show the alert in milliseconds
 */
const showAlert = (message, type = 'success', duration = 5000) => {
    const alertContainer = document.getElementById('alertContainer');
    if (!alertContainer) return;
    
    // Create alert element
    const alert = document.createElement('div');
    alert.className = `alert alert-${type}`;
    alert.innerHTML = `
        <div class="alert-content">
            <strong>${type === 'success' ? 'Success!' : type === 'error' ? 'Error!' : type === 'warning' ? 'Warning!' : 'Info!'}</strong>
            <span>${message}</span>
        </div>
        <button class="alert-close">&times;</button>
    `;
    
    // Add to container
    alertContainer.appendChild(alert);
    
    // Add event listener to close button
    const closeBtn = alert.querySelector('.alert-close');
    closeBtn.addEventListener('click', () => {
        alert.classList.add('hiding');
        setTimeout(() => alert.remove(), 300);
    });
    
    // Auto-remove after specified duration
    setTimeout(() => {
        if (alert.parentNode) {
            alert.classList.add('hiding');
            setTimeout(() => alert.remove(), 300);
        }
    }, duration);
};

/**
 * Checks for login state and shows welcome message
 */
const checkLoginState = () => {
    const isLoggedIn = localStorage.getItem('isLoggedIn');
    const currentUser = localStorage.getItem('currentUser');
    
    if (isLoggedIn === 'true' && currentUser) {
        // Update welcome message if element exists
        const welcomeMessage = document.querySelector('.welcome-message');
        if (welcomeMessage) {
            welcomeMessage.textContent = `Welcome back, ${currentUser}!`;
        }
        
        // Show welcome alert (only once per session)
        if (!sessionStorage.getItem('welcomeShown')) {
            setTimeout(() => {
                showAlert(`Welcome back, ${currentUser}!`, 'success', 3000);
            }, 500);
            sessionStorage.setItem('welcomeShown', 'true');
        }
    } else {
        // Redirect to login if not logged in
        window.location.href = 'index.html';
    }
};

/**
 * Initialize dashboard page
 */
const initDashboard = () => {
    // Check login state
    checkLoginState();
    
    // Initialize sidebar toggle
    if (sidebarToggle) {
        sidebarToggle.addEventListener('click', toggleSidebar);
    }
    
    if (sidebarClose) {
        sidebarClose.addEventListener('click', closeSidebar);
    }
    
    // Close sidebar when clicking outside on mobile
    document.addEventListener('click', (event) => {
        if (window.innerWidth <= 992 && 
            sidebar.classList.contains('active') && 
            !sidebar.contains(event.target) && 
            event.target !== sidebarToggle) {
            closeSidebar();
        }
    });
    
    // Render dynamic content
    renderStatsCards();
    renderCourseCards();
    renderRecentAssignments();
    
    // Update navigation active state
    updateActiveNav();
    
    // Make showAlert function globally available for other scripts
    window.showAlert = showAlert;
};

// Initialize when DOM is loaded
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initDashboard);
} else {
    initDashboard();
}