/**
 * Courses Page JavaScript
 * Implements: Course List Rendering with filtering and search
 */

const allCoursesData = [
    {
        id: 1,
        code: 'CS101',
        title: 'Introduction to Programming',
        instructor: 'Dr. Sarah Johnson',
        instructorAvatar: 'SJ',
        progress: 85,
        status: 'active',
        dueAssignments: 2,
        credits: 3,
        description: 'Fundamental concepts of programming using Python.'
    },
    {
        id: 2,
        code: 'CS201',
        title: 'Data Structures',
        instructor: 'Prof. Michael Chen',
        instructorAvatar: 'MC',
        progress: 70,
        status: 'active',
        dueAssignments: 1,
        credits: 4,
        description: 'Study of fundamental data structures and algorithms.'
    },
    {
        id: 3,
        code: 'MATH101',
        title: 'Calculus I',
        instructor: 'Dr. Robert Williams',
        instructorAvatar: 'RW',
        progress: 100,
        status: 'completed',
        dueAssignments: 0,
        credits: 4,
        description: 'Introduction to differential and integral calculus.'
    },
    {
        id: 4,
        code: 'CS301',
        title: 'Database Systems',
        instructor: 'Dr. Emily Davis',
        instructorAvatar: 'ED',
        progress: 60,
        status: 'active',
        dueAssignments: 0,
        credits: 3,
        description: 'Design and implementation of database systems.'
    },
    {
        id: 5,
        code: 'CS401',
        title: 'Web Development',
        instructor: 'Prof. Jessica Lee',
        instructorAvatar: 'JL',
        progress: 40,
        status: 'active',
        dueAssignments: 1,
        credits: 3,
        description: 'Full-stack web development with modern frameworks.'
    },
    {
        id: 6,
        code: 'PHYS101',
        title: 'Physics I',
        instructor: 'Dr. James Wilson',
        instructorAvatar: 'JW',
        progress: 100,
        status: 'completed',
        dueAssignments: 0,
        credits: 4,
        description: 'Mechanics, heat, and sound.'
    }
];

/**
 * Renders course cards with filtering
 * @param {Array} courses - Array of course objects to render
 */
const renderCourses = (courses) => {
    const coursesContainer = document.getElementById('coursesContainer');
    if (!coursesContainer) return;
    
    coursesContainer.innerHTML = '';
    
    if (courses.length === 0) {
        coursesContainer.innerHTML = `
            <div class="no-courses">
                <i class="fas fa-book-open fa-3x"></i>
                <h3>No courses found</h3>
                <p>Try adjusting your search or filter criteria</p>
            </div>
        `;
        return;
    }
    
    courses.forEach(course => {
        const card = document.createElement('div');
        card.className = 'course-card';
        card.dataset.courseId = course.id;
        
        card.innerHTML = `
            <div class="course-header">
                <div>
                    <h3 class="course-title">${course.title}</h3>
                    <div class="course-code">${course.code} • ${course.credits} Credits</div>
                </div>
                <span class="course-status status-${course.status}">
                    ${course.status === 'active' ? 'Active' : 'Completed'}
                </span>
            </div>
            <div class="course-body">
                <div class="course-info">
                    <div class="course-instructor">
                        <img src="https://ui-avatars.com/api/?name=${course.instructorAvatar}&background=4e73df&color=ffffff&size=32" alt="${course.instructor}">
                        <span>${course.instructor}</span>
                    </div>
                    <div class="course-description">
                        <p>${course.description}</p>
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

/**
 * Filters courses based on selected filter and search term
 */
const filterCourses = () => {
    const activeFilter = document.querySelector('.filter-buttons .btn.active');
    const searchInput = document.getElementById('courseSearch');
    
    if (!activeFilter || !searchInput) return allCoursesData;
    
    const filter = activeFilter.dataset.filter;
    const searchTerm = searchInput.value.toLowerCase().trim();
    
    let filteredCourses = [...allCoursesData];
    
    // Apply status filter
    if (filter !== 'all') {
        filteredCourses = filteredCourses.filter(course => course.status === filter);
    }
    
    // Apply search filter
    if (searchTerm) {
        filteredCourses = filteredCourses.filter(course => 
            course.title.toLowerCase().includes(searchTerm) ||
            course.code.toLowerCase().includes(searchTerm) ||
            course.instructor.toLowerCase().includes(searchTerm) ||
            course.description.toLowerCase().includes(searchTerm)
        );
    }
    
    return filteredCourses;
};

/**
 * Updates the courses display based on current filters
 */
const updateCoursesDisplay = () => {
    const filteredCourses = filterCourses();
    renderCourses(filteredCourses);
};

/**
 * Initializes course page functionality
 */
const initCoursesPage = () => {
    // Check login state
    const isLoggedIn = localStorage.getItem('isLoggedIn');
    if (isLoggedIn !== 'true') {
        window.location.href = 'index.html';
        return;
    }
    
    // Initialize sidebar toggle (reuse from dashboard.js)
    const sidebar = document.getElementById('sidebar');
    const sidebarToggle = document.getElementById('sidebarToggle');
    const sidebarClose = document.getElementById('sidebarClose');
    
    if (sidebarToggle) {
        sidebarToggle.addEventListener('click', () => {
            sidebar.classList.toggle('active');
        });
    }
    
    if (sidebarClose) {
        sidebarClose.addEventListener('click', () => {
            sidebar.classList.remove('active');
        });
    }
    
    // Close sidebar when clicking outside on mobile
    document.addEventListener('click', (event) => {
        if (window.innerWidth <= 992 && 
            sidebar.classList.contains('active') && 
            !sidebar.contains(event.target) && 
            event.target !== sidebarToggle) {
            sidebar.classList.remove('active');
        }
    });
    
    // Initialize filter buttons
    const filterButtons = document.querySelectorAll('.filter-buttons .btn');
    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Remove active class from all buttons
            filterButtons.forEach(btn => btn.classList.remove('active'));
            // Add active class to clicked button
            button.classList.add('active');
            // Update courses display
            updateCoursesDisplay();
        });
    });
    
    // Initialize search input
    const searchInput = document.getElementById('courseSearch');
    if (searchInput) {
        searchInput.addEventListener('input', updateCoursesDisplay);
    }
    
    // Initial render
    updateCoursesDisplay();
};

// Initialize when DOM is loaded
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initCoursesPage);
} else {
    initCoursesPage();
}