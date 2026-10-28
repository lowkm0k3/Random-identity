// content.js

// Function to find the username field related to a password field
function findUsernameField(passwordField) {
  // 1. Look for a form and find the closest text/email input before the password
  const form = passwordField.closest('form');
  if (form) {
    const inputs = Array.from(form.querySelectorAll('input[type="text"], input[type="email"]'));
    const passwordIndex = Array.from(form.elements).indexOf(passwordField);
    
    // Find the last text/email input that appears before the password field
    let bestMatch = null;
    for (const input of inputs) {
      if (Array.from(form.elements).indexOf(input) < passwordIndex) {
        bestMatch = input;
      }
    }
    if (bestMatch) return bestMatch;
  }

  // 2. Fallback: look at previous siblings or nearby elements
  let sibling = passwordField.previousElementSibling;
  while (sibling) {
    if (sibling.tagName === 'INPUT' && (sibling.type === 'text' || sibling.type === 'email')) {
      return sibling;
    }
    const innerInput = sibling.querySelector('input[type="text"], input[type="email"]');
    if (innerInput) return innerInput;
    sibling = sibling.previousElementSibling;
  }

  return null;
}

// Show a quick toast message
function showToast(msg) {
  const toast = document.createElement('div');
  toast.className = 'rid-toast';
  toast.textContent = msg;
  document.body.appendChild(toast);
  
  // Trigger reflow to enable transition
  toast.offsetHeight;
  toast.classList.add('show');
  
  setTimeout(() => {
    toast.classList.remove('show');
    setTimeout(() => toast.remove(), 300);
  }, 2000);
}

// Process a single password field
function processPasswordField(passField) {
  // If we already added a button, skip it
  if (passField.dataset.ridProcessed) return;
  passField.dataset.ridProcessed = 'true';

  // Create the button
  const btn = document.createElement('button');
  btn.type = 'button'; // Prevent form submission
  btn.className = 'rid-generate-btn';
  btn.textContent = '⚡ Generate';
  btn.title = 'Generate Random Identity';

  // Position the button inside the input's container
  const parent = passField.parentElement;
  if (parent) {
    // Ensure the parent is relative so our absolute button positions correctly
    const parentStyle = window.getComputedStyle(parent);
    if (parentStyle.position === 'static') {
      parent.style.position = 'relative';
    }
    parent.appendChild(btn);

    // Optional: add padding to the right of the input so text doesn't go under the button
    passField.style.paddingRight = '80px';
  }

  // Handle the click
  btn.addEventListener('click', (e) => {
    e.preventDefault();
    e.stopPropagation();

    // Generate values
    const username = generateUsername();
    const password = generatePassword(20, true, true);

    // Fill password
    passField.value = password;
    passField.dispatchEvent(new Event('input', { bubbles: true }));
    passField.dispatchEvent(new Event('change', { bubbles: true }));

    // Fill username
    const userField = findUsernameField(passField);
    if (userField) {
      userField.value = username;
      userField.dispatchEvent(new Event('input', { bubbles: true }));
      userField.dispatchEvent(new Event('change', { bubbles: true }));
    }

    // Show feedback
    showToast(userField ? 'Generated & filled!' : 'Generated password only.');
  });
}

// Scan the page for password fields
function scanPage() {
  const passwordFields = document.querySelectorAll('input[type="password"]');
  passwordFields.forEach(processPasswordField);
}

// Run on load
scanPage();

// Watch for dynamically loaded forms (React, Vue, etc.)
const observer = new MutationObserver((mutations) => {
  // Debounce to avoid running too often
  clearTimeout(window.ridScanTimeout);
  window.ridScanTimeout = setTimeout(scanPage, 500);
});

observer.observe(document.body, {
  childList: true,
  subtree: true
});