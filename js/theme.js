/**
 * Theme Switcher JavaScript
 * Implements: Light/Dark Mode Toggle with localStorage persistence
 */

// DOM Elements
const themeToggleBtn = document.getElementById('themeToggle');

// Theme configuration
const themes = {
    light: {
        name: 'light',
        icon: 'fa-moon',
        label: 'Dark Mode'
    },
    dark: {
        name: 'dark',
        icon: 'fa-sun',
        label: 'Light Mode'
    }
};

/**
 * Gets the current theme from localStorage or prefers-color-scheme
 * @returns {string} - Current theme name
 */
const getCurrentTheme = () => {
    // Check localStorage first
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
        return savedTheme;
    }
    
    // Check system preference
    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
        return 'dark';
    }
    
    // Default to light theme
    return 'light';
};

/**
 * Sets the theme on the document
 * @param {string} themeName - Theme to apply
 */
const setTheme = (themeName) => {
    // Update document class
    document.body.classList.remove('light-theme', 'dark-theme');
    document.body.classList.add(`${themeName}-theme`);
    
    // Update localStorage
    localStorage.setItem('theme', themeName);
    
    // Update toggle button
    updateThemeToggle(themeName);
    
    // Dispatch theme change event (for other scripts if needed)
    document.dispatchEvent(new CustomEvent('themechange', {
        detail: { theme: themeName }
    }));
};

/**
 * Updates the theme toggle button
 * @param {string} themeName - Current theme name
 */
const updateThemeToggle = (themeName) => {
    if (!themeToggleBtn) return;
    
    const theme = themes[themeName];
    const oppositeTheme = themeName === 'light' ? themes.dark : themes.light;
    
    themeToggleBtn.innerHTML = `
        <i class="fas ${oppositeTheme.icon}"></i> ${oppositeTheme.label}
    `;
    
    // Update title for accessibility
    themeToggleBtn.title = `Switch to ${oppositeTheme.label}`;
};

/**
 * Toggles between light and dark themes
 */
const toggleTheme = () => {
    const currentTheme = getCurrentTheme();
    const newTheme = currentTheme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
};

/**
 * Initializes theme functionality
 */
const initTheme = () => {
    // Set initial theme
    const currentTheme = getCurrentTheme();
    setTheme(currentTheme);
    
    // Add event listener to toggle button
    if (themeToggleBtn) {
        themeToggleBtn.addEventListener('click', toggleTheme);
    }
    
    // Listen for system theme changes
    if (window.matchMedia) {
        const prefersDarkScheme = window.matchMedia('(prefers-color-scheme: dark)');
        
        prefersDarkScheme.addEventListener('change', (e) => {
            // Only update if user hasn't set a preference in localStorage
            if (!localStorage.getItem('theme')) {
                const newTheme = e.matches ? 'dark' : 'light';
                setTheme(newTheme);
            }
        });
    }
};

// Initialize when DOM is loaded
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initTheme);
} else {
    initTheme();
}

// Make theme functions available globally
window.ThemeSwitcher = {
    getCurrentTheme,
    setTheme,
    toggleTheme
};