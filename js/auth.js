
/**
 * Task 1: Login Validation
 * Validates login form fields and redirects to dashboard on success
 */

// DOM Elements
const loginForm = document.getElementById('loginForm');
const usernameInput = document.getElementById('username');
const passwordInput = document.getElementById('password');
const usernameError = document.getElementById('usernameError');
const passwordError = document.getElementById('passwordError');

/**
 * Shows an error message for a form field
 * @param {HTMLElement} errorElement - The error message container
 * @param {string} message - The error message to display
 */
const showError = (errorElement, message) => {
    errorElement.textContent = message;
    errorElement.style.display = 'block';
};

/**
 * Clears the error message for a form field
 * @param {HTMLElement} errorElement - The error message container
 */
const clearError = (errorElement) => {
    errorElement.textContent = '';
    errorElement.style.display = 'none';
};

/**
 * Validates the login form
 * @returns {boolean} - True if form is valid, false otherwise
 */
const validateForm = () => {
    let isValid = true;
    
    // Clear previous errors
    clearError(usernameError);
    clearError(passwordError);
    
    // Validate username
    if (!usernameInput.value.trim()) {
        showError(usernameError, 'Username or email is required');
        usernameInput.focus();
        isValid = false;
    }
    
    // Validate password
    if (!passwordInput.value.trim()) {
        showError(passwordError, 'Password is required');
        if (isValid) passwordInput.focus();
        isValid = false;
    }
    
    return isValid;
};

/**
 * Displays a notification alert
 * @param {string} message - The message to display
 * @param {string} type - The alert type (success, error, warning, info)
 */
const showAlert = (message, type = 'success') => {
    const alertContainer = document.getElementById('alertContainer');
    
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
 * Handles form submission
 * @param {Event} event - The form submit event
 */
const handleLogin = (event) => {
    event.preventDefault(); // Prevent default form submission
    
    // Validate form
    if (!validateForm()) {
        return;
    }
    
    // Simulate login process
    const username = usernameInput.value.trim();
    
    // Show success alert
    showAlert(`Welcome back, ${username}! Redirecting to dashboard...`, 'success');
    
    // Simulate API call delay, then redirect
    setTimeout(() => {
        // Store login state in localStorage (for demo purposes)
        localStorage.setItem('isLoggedIn', 'true');
        localStorage.setItem('currentUser', username);
        
        // Redirect to dashboard
        window.location.href = 'dashboard.html';
    }, 1500);
};

/**
 * Initialize login page functionality
 */
const initLoginPage = () => {
    // Check if user is already logged in (for demo purposes)
    if (localStorage.getItem('isLoggedIn') === 'true') {
        // Redirect to dashboard if already logged in
        window.location.href = 'dashboard.html';
        return;
    }
    
    // Add event listeners
    if (loginForm) {
        loginForm.addEventListener('submit', handleLogin);
    }
    
    // Clear errors on input
    usernameInput.addEventListener('input', () => clearError(usernameError));
    passwordInput.addEventListener('input', () => clearError(passwordError));
    
    // Demo credentials for easier testing
    console.log('Demo credentials for testing:');
    console.log('Username: student@university.edu');
    console.log('Password: any value');
};

// Initialize when DOM is loaded
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initLoginPage);
} else {
    initLoginPage();
}
