/**
 * Assignments Page JavaScript
 * Implements: Assignment Status Management and Submission Simulation
 */

// Task 5: Assignment Status Management
const assignmentsData = [
    {
        id: 1,
        title: 'Binary Search Tree Implementation',
        course: 'CS201 - Data Structures',
        courseId: 2,
        dueDate: '2023-10-20',
        submittedDate: null,
        maxScore: 100,
        score: null,
        status: 'pending',
        description: 'Implement a binary search tree with insert, delete, and search operations.'
    },
    {
        id: 2,
        title: 'SQL Queries Practice',
        course: 'CS301 - Database Systems',
        courseId: 4,
        dueDate: '2023-10-18',
        submittedDate: '2023-10-17',
        maxScore: 100,
        score: 95,
        status: 'submitted',
        description: 'Write SQL queries for the given database schema.'
    },
    {
        id: 3,
        title: 'Web API Development',
        course: 'CS101 - Introduction to Programming',
        courseId: 1,
        dueDate: '2023-10-15',
        submittedDate: '2023-10-16',
        maxScore: 100,
        score: 85,
        status: 'late',
        description: 'Create a RESTful API with CRUD operations.'
    },
    {
        id: 4,
        title: 'Calculus Problem Set 5',
        course: 'MATH101 - Calculus I',
        courseId: 3,
        dueDate: '2023-10-10',
        submittedDate: '2023-10-09',
        maxScore: 100,
        score: 92,
        status: 'submitted',
        description: 'Solve differential calculus problems.'
    },
    {
        id: 5,
        title: 'Physics Lab Report',
        course: 'PHYS101 - Physics I',
        courseId: 6,
        dueDate: '2023-10-25',
        submittedDate: null,
        maxScore: 100,
        score: null,
        status: 'pending',
        description: 'Write a lab report on Newton\'s laws of motion.'
    },
    {
        id: 6,
        title: 'Web Development Project Proposal',
        course: 'CS401 - Web Development',
        courseId: 5,
        dueDate: '2023-10-22',
        submittedDate: null,
        maxScore: 50,
        score: null,
        status: 'pending',
        description: 'Submit a proposal for your final web development project.'
    }
];

/**
 * Determines assignment status based on due date and submission status
 * @param {Object} assignment - Assignment object
 * @returns {string} - Status string (pending, submitted, late)
 */
const determineStatus = (assignment) => {
    // If already submitted, return the stored status
    if (assignment.submittedDate) {
        return assignment.status;
    }
    
    // Calculate days until due date
    const today = new Date();
    const dueDate = new Date(assignment.dueDate);
    const timeDiff = dueDate.getTime() - today.getTime();
    const daysDiff = Math.ceil(timeDiff / (1000 * 3600 * 24));
    
    // Determine status
    if (daysDiff < 0) {
        return 'late';
    } else if (daysDiff <= 2) {
        // Within 2 days of due date - could be considered "urgent"
        return 'pending'; // Still pending but due soon
    } else {
        return 'pending';
    }
};

/**
 * Gets status display properties
 * @param {string} status - Assignment status
 * @returns {Object} - Object with text, class, and icon
 */
const getStatusProperties = (status) => {
    switch(status) {
        case 'pending':
            return {
                text: 'Pending',
                class: 'status-pending',
                icon: 'fas fa-clock'
            };
        case 'submitted':
            return {
                text: 'Submitted',
                class: 'status-submitted',
                icon: 'fas fa-check-circle'
            };
        case 'late':
            return {
                text: 'Late',
                class: 'status-late',
                icon: 'fas fa-exclamation-triangle'
            };
        default:
            return {
                text: 'Unknown',
                class: 'status-pending',
                icon: 'fas fa-question-circle'
            };
    }
};

/**
 * Renders assignment items
 * @param {Array} assignments - Array of assignment objects
 */
const renderAssignments = (assignments) => {
    const container = document.getElementById('assignmentsContainer');
    if (!container) return;
    
    container.innerHTML = '';
    
    if (assignments.length === 0) {
        container.innerHTML = `
            <div class="no-assignments">
                <i class="fas fa-tasks fa-3x"></i>
                <h3>No assignments found</h3>
                <p>Try adjusting your filter criteria</p>
            </div>
        `;
        return;
    }
    
    assignments.forEach(assignment => {
        // Determine current status
        const currentStatus = determineStatus(assignment);
        const statusProps = getStatusProperties(currentStatus);
        
        // Format dates
        const dueDate = new Date(assignment.dueDate);
        const formattedDueDate = dueDate.toLocaleDateString('en-US', {
            weekday: 'short',
            month: 'short',
            day: 'numeric',
            year: 'numeric'
        });
        
        // Calculate days until due
        const today = new Date();
        const timeDiff = dueDate.getTime() - today.getTime();
        const daysDiff = Math.ceil(timeDiff / (1000 * 3600 * 24));
        
        let dueText = '';
        if (daysDiff > 0) {
            dueText = `Due in ${daysDiff} day${daysDiff !== 1 ? 's' : ''}`;
        } else if (daysDiff === 0) {
            dueText = 'Due today';
        } else {
            dueText = `Due ${Math.abs(daysDiff)} day${Math.abs(daysDiff) !== 1 ? 's' : ''} ago`;
        }
        
        const item = document.createElement('div');
        item.className = 'assignment-item';
        item.dataset.assignmentId = assignment.id;
        
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
                        <span>${formattedDueDate} • ${dueText}</span>
                    </div>
                </div>
                <p class="assignment-description">${assignment.description}</p>
                ${assignment.submittedDate ? 
                    `<div class="assignment-submitted">
                        <i class="fas fa-paper-plane"></i>
                        <span>Submitted on ${new Date(assignment.submittedDate).toLocaleDateString()}</span>
                        ${assignment.score !== null ? 
                            `<span class="assignment-score">Score: ${assignment.score}/${assignment.maxScore}</span>` : 
                            '<span class="assignment-score">Grading in progress</span>'
                        }
                    </div>` : 
                    ''
                }
            </div>
            <div class="assignment-actions">
                <span class="assignment-status ${statusProps.class}">
                    <i class="${statusProps.icon}"></i> ${statusProps.text}
                </span>
                ${currentStatus === 'pending' ? 
                    `<button class="btn btn-primary btn-sm submit-btn" data-id="${assignment.id}">
                        <i class="fas fa-paper-plane"></i> Submit
                    </button>` : 
                    ''
                }
            </div>
        `;
        
        container.appendChild(item);
    });
    
    // Add event listeners to submit buttons
    document.querySelectorAll('.submit-btn').forEach(button => {
        button.addEventListener('click', handleAssignmentSubmit);
    });
};

// Task 6: Assignment Submission Simulation
/**
 * Handles assignment submission
 * @param {Event} event - Click event
 */
const handleAssignmentSubmit = (event) => {
    const button = event.currentTarget;
    const assignmentId = parseInt(button.dataset.id);
    
    // Find the assignment
    const assignment = assignmentsData.find(a => a.id === assignmentId);
    if (!assignment) return;
    
    // Disable button immediately
    button.disabled = true;
    button.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Submitting...';
    
    // Simulate network delay
    setTimeout(() => {
        // Update assignment status
        assignment.status = 'submitted';
        assignment.submittedDate = new Date().toISOString().split('T')[0];
        
        // Update UI
        const item = button.closest('.assignment-item');
        const statusElement = item.querySelector('.assignment-status');
        const statusProps = getStatusProperties('submitted');
        
        // Update status display
        statusElement.className = `assignment-status ${statusProps.class}`;
        statusElement.innerHTML = `<i class="${statusProps.icon}"></i> ${statusProps.text}`;
        
        // Add submitted info
        const infoDiv = item.querySelector('.assignment-info');
        const submittedDiv = document.createElement('div');
        submittedDiv.className = 'assignment-submitted';
        submittedDiv.innerHTML = `
            <i class="fas fa-paper-plane"></i>
            <span>Submitted just now</span>
            <span class="assignment-score">Grading in progress</span>
        `;
        
        // Remove the description and add submitted info
        const description = item.querySelector('.assignment-description');
        if (description) {
            description.insertAdjacentElement('afterend', submittedDiv);
        }
        
        // Remove submit button
        button.remove();
        
        // Show success alert
        if (typeof showAlert === 'function') {
            showAlert(`Assignment "${assignment.title}" submitted successfully!`, 'success');
        } else {
            // Fallback alert if showAlert not available
            alert(`Assignment "${assignment.title}" submitted successfully!`);
        }
        
        // Update badge count in sidebar
        updateAssignmentBadge();
    }, 1500);
};

/**
 * Filters assignments based on selected status
 * @returns {Array} - Filtered assignments
 */
const filterAssignments = () => {
    const activeFilter = document.querySelector('.filter-buttons .btn.active');
    const sortSelect = document.getElementById('sortAssignments');
    
    if (!activeFilter) return assignmentsData;
    
    const filterStatus = activeFilter.dataset.status;
    const sortBy = sortSelect ? sortSelect.value : 'dueDate';
    
    let filteredAssignments = [...assignmentsData];
    
    // Apply status filter
    if (filterStatus !== 'all') {
        filteredAssignments = filteredAssignments.filter(assignment => {
            const currentStatus = determineStatus(assignment);
            return currentStatus === filterStatus;
        });
    }
    
    // Apply sorting
    filteredAssignments.sort((a, b) => {
        switch(sortBy) {
            case 'dueDate':
                return new Date(a.dueDate) - new Date(b.dueDate);
            case 'course':
                return a.course.localeCompare(b.course);
            case 'status':
                const statusA = determineStatus(a);
                const statusB = determineStatus(b);
                return statusA.localeCompare(statusB);
            default:
                return 0;
        }
    });
    
    return filteredAssignments;
};

/**
 * Updates the assignments display based on current filters
 */
const updateAssignmentsDisplay = () => {
    const filteredAssignments = filterAssignments();
    renderAssignments(filteredAssignments);
};

/**
 * Updates the assignment badge count in the sidebar
 */
const updateAssignmentBadge = () => {
    const pendingCount = assignmentsData.filter(assignment => {
        const currentStatus = determineStatus(assignment);
        return currentStatus === 'pending' || currentStatus === 'late';
    }).length;
    
    // Update badge in sidebar
    const badge = document.querySelector('.nav-item a[href="assignments.html"] .badge');
    if (badge) {
        if (pendingCount > 0) {
            badge.textContent = pendingCount;
            badge.style.display = 'inline-block';
        } else {
            badge.style.display = 'none';
        }
    }
};

/**
 * Initializes assignments page functionality
 */
const initAssignmentsPage = () => {
    // Check login state
    const isLoggedIn = localStorage.getItem('isLoggedIn');
    if (isLoggedIn !== 'true') {
        window.location.href = 'index.html';
        return;
    }
    
    // Initialize sidebar toggle
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
    
    // Initialize filter buttons
    const filterButtons = document.querySelectorAll('.filter-buttons .btn');
    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Remove active class from all buttons
            filterButtons.forEach(btn => btn.classList.remove('active'));
            // Add active class to clicked button
            button.classList.add('active');
            // Update assignments display
            updateAssignmentsDisplay();
        });
    });
    
    // Initialize sort select
    const sortSelect = document.getElementById('sortAssignments');
    if (sortSelect) {
        sortSelect.addEventListener('change', updateAssignmentsDisplay);
    }
    
    // Calculate initial badge count
    updateAssignmentBadge();
    
    // Initial render
    updateAssignmentsDisplay();
};

// Initialize when DOM is loaded
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initAssignmentsPage);
} else {
    initAssignmentsPage();
}