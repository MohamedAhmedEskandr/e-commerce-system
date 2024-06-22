function isValidName(name) {
    var namePattern = /^[a-zA-Z\s]+$/;
    return namePattern.test(name);
}
/******************************************************************************************* */
function isValidEmail(email) {
    var emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]{2,3}$/;
    return emailPattern.test(email) && email.endsWith(".com");
}
/******************************************************************************************* */
function isValidPassword(password) {
    var passwordPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    return passwordPattern.test(password);
}
/******************************************************************************************* */
function isPasswordConfirmed(password, confirmPassword) {
    return password === confirmPassword;
}
/******************************************************************************************* */
function showError(input, message) {
    var errorContainer = input.nextElementSibling;
    errorContainer.textContent = message;
    errorContainer.classList.add('active');
}
/******************************************************************************************* */
function hideError(input) {
    const errorContainer = input.nextElementSibling;
    errorContainer.textContent = '';
    errorContainer.classList.remove('active');
}
/******************************************************************************************* */
function handleFormSubmit(event) {
    event.preventDefault();
    var nameInput = document.getElementById('name');
    var emailInput = document.getElementById('email');
    var passwordInput = document.getElementById('password');
    var confirmPasswordInput = document.getElementById('confirmPassword');
    var isValid = true;

    if (!isValidName(nameInput.value)) {
        showError(nameInput, 'Name must only contain letters.');
        isValid = false;
    } else {
        hideError(nameInput);
    }

    if (!isValidEmail(emailInput.value)) {
        showError(emailInput, 'Email must contain "@" and end with ".com".');
        isValid = false;
    } else {
        hideError(emailInput);
    }

    if (!isValidPassword(passwordInput.value)) {
        showError(passwordInput, 'Password must be at least 8 characters long and include uppercase, lowercase, and special characters.');
        isValid = false;
    } else {
        hideError(passwordInput);
    }

    if (!isPasswordConfirmed(passwordInput.value, confirmPasswordInput.value)) {
        showError(confirmPasswordInput, 'Passwords do not match.');
        isValid = false;
    } else {
        hideError(confirmPasswordInput);
    }

    if (isValid) {
        // Store the entered name in localStorage
        localStorage.setItem('username', nameInput.value);
        
       // Example JavaScript redirect
       window.location.href = '../products/products.html';

    }
}
/******************************************************************************************* */
document.getElementById('loginForm').addEventListener('submit', handleFormSubmit);
