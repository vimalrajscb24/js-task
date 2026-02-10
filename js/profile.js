/**
 * Profile Page JavaScript
 * Implements: Profile Edit Mode with Save functionality
 */

// Profile data (in a real app, this would come from a backend)
const profileData = {
    fullName: 'John Doe',
    email: 'john.doe@university.edu',
    phone: '+1 (555) 123-4567',
    studentId: 'CS2023001',
    department: 'Computer Science',
    enrollmentYear: '2023',
    bio: 'Passionate computer science student with interest in web development, machine learning, and data structures. Currently focusing on building full-stack applications.',
    avatar: 'https://ui-avatars.com/api/?name=John+Doe&background=4e73df&color=ffffff&size=150'
};

// Track original data for cancel functionality
let originalProfileData = { ...profileData };

/**
 * Enables edit mode for profile form
 */
const enableEditMode = () => {
    const form = document.getElementById('profileForm');
    const inputs = form.querySelectorAll('input, textarea');
    const editBtn = document.getElementById('editProfileBtn');
    const formActions = document.getElementById('formActions');
    
    // Enable all inputs
    inputs.forEach(input => {
        input.disabled = false;
        input.style.backgroundColor = '';
    });
    
    // Change edit button to save
    editBtn.innerHTML = '<i class="fas fa-save"></i> Save Changes';
    editBtn.dataset.mode = 'save';
    
    // Create action buttons
    formActions.innerHTML = `
        <button type="button" id="cancelEditBtn" class="btn btn-outline">
            <i class="fas fa-times"></i> Cancel
        </button>
        <button type="submit" id="saveProfileBtn" class="btn btn-primary">
            <i class="fas fa-save"></i> Save Changes
        </button>
    `;
    
    // Add event listeners to action buttons
    document.getElementById('cancelEditBtn').addEventListener('click', cancelEdit);
    document.getElementById('saveProfileBtn').addEventListener('click', saveProfile);
};

/**
 * Disables edit mode for profile form
 */
const disableEditMode = () => {
    const form = document.getElementById('profileForm');
    const inputs = form.querySelectorAll('input, textarea');
    const editBtn = document.getElementById('editProfileBtn');
    const formActions = document.getElementById('formActions');
    
    // Disable all inputs
    inputs.forEach(input => {
        input.disabled = true;
    });
    
    // Change save button back to edit
    editBtn.innerHTML = '<i class="fas fa-edit"></i> Edit Profile';
    editBtn.dataset.mode = 'edit';
    
    // Clear action buttons
    formActions.innerHTML = '';
};

/**
 * Saves profile changes
 */
const saveProfile = () => {
    // Get form values
    const form = document.getElementById('profileForm');
    const updatedData = {
        fullName: document.getElementById('fullName').value,
        email: document.getElementById('email').value,
        phone: document.getElementById('phone').value,
        studentId: document.getElementById('studentId').value,
        department: document.getElementById('department').value,
        enrollmentYear: document.getElementById('enrollmentYear').value,
        bio: document.getElementById('bio').value
    };
    
    // Simple validation
    if (!updatedData.fullName.trim() || !updatedData.email.trim()) {
        showAlert('Name and email are required fields', 'error');
        return;
    }
    
    if (!isValidEmail(updatedData.email)) {
        showAlert('Please enter a valid email address', 'error');
        return;
    }
    
    // Update profile data
    Object.assign(profileData, updatedData);
    
    // Update original data
    originalProfileData = { ...profileData };
    
    // Disable edit mode
    disableEditMode();
    
    // Update profile header name if it exists
    const profileName = document.querySelector('.profile-info h2');
    if (profileName) {
        profileName.textContent = updatedData.fullName;
    }
    
    // Show success message
    showAlert('Profile updated successfully!', 'success');
    
    // Simulate updating user profile in localStorage
    localStorage.setItem('currentUser', updatedData.fullName);
};

/**
 * Cancels edit mode and restores original values
 */
const cancelEdit = () => {
    // Restore original values
    document.getElementById('fullName').value = originalProfileData.fullName;
    document.getElementById('email').value = originalProfileData.email;
    document.getElementById('phone').value = originalProfileData.phone;
    document.getElementById('studentId').value = originalProfileData.studentId;
    document.getElementById('department').value = originalProfileData.department;
    document.getElementById('enrollmentYear').value = originalProfileData.enrollmentYear;
    document.getElementById('bio').value = originalProfileData.bio;
    
    // Disable edit mode
    disableEditMode();
    
    // Show info message
    showAlert('Edit cancelled. No changes were saved.', 'info');
};

/**
 * Validates email format
 * @param {string} email - Email to validate
 * @returns {boolean} - True if email is valid
 */
const isValidEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
};

/**
 * Shows alert notification
 * @param {string} message - Alert message
 * @param {string} type - Alert type (success, error, warning, info)
 */
const showAlert = (message, type = 'success') => {
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
    
    // Auto-remove after 5 seconds
    setTimeout(() => {
        if (alert.parentNode) {
            alert.classList.add('hiding');
            setTimeout(() => alert.remove(), 300);
        }
    }, 5000);
};

/**
 * Initializes profile page functionality
 */
const initProfilePage = () => {
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
    
    // Initialize edit profile button
    const editProfileBtn = document.getElementById('editProfileBtn');
    if (editProfileBtn) {
        editProfileBtn.addEventListener('click', () => {
            const currentMode = editProfileBtn.dataset.mode;
            
            if (currentMode === 'edit') {
                enableEditMode();
            } else {
                // If already in save mode, trigger save
                saveProfile();
            }
        });
    }
    
    // Initialize profile data
    document.getElementById('fullName').value = profileData.fullName;
    document.getElementById('email').value = profileData.email;
    document.getElementById('phone').value = profileData.phone;
    document.getElementById('studentId').value = profileData.studentId;
    document.getElementById('department').value = profileData.department;
    document.getElementById('enrollmentYear').value = profileData.enrollmentYear;
    document.getElementById('bio').value = profileData.bio;
    
    // Set initial mode
    const editBtn = document.getElementById('editProfileBtn');
    if (editBtn) {
        editBtn.dataset.mode = 'edit';
    }
    
    // Make sure form is initially disabled
    disableEditMode();
    
    // Update user profile in header
    const currentUser = localStorage.getItem('currentUser');
    if (currentUser) {
        const profileName = document.querySelector('.profile-info h2');
        const userName = document.querySelector('.user-profile span');
        
        if (profileName) profileName.textContent = currentUser;
        if (userName) userName.textContent = currentUser;
    }
};

// Initialize when DOM is loaded
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initProfilePage);
} else {
    initProfilePage();
}