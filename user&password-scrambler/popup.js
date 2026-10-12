// popup.js
document.addEventListener('DOMContentLoaded', () => {
  const usernameInput = document.getElementById('username');
  const passwordInput = document.getElementById('password');
  const lenInput = document.getElementById('len');
  const digitsCheck = document.getElementById('digits');
  const symbolsCheck = document.getElementById('symbols');
  const generateBtn = document.getElementById('generate');
  const copyUserBtn = document.getElementById('copyUser');
  const copyPassBtn = document.getElementById('copyPass');
  const status = document.getElementById('status');

  function generate() {
    const length = Math.min(64, Math.max(8, parseInt(lenInput.value, 10) || 20));
    lenInput.value = length;
    usernameInput.value = generateUsername();
    passwordInput.value = generatePassword(length, digitsCheck.checked, symbolsCheck.checked);
    status.textContent = '';
  }

  function copyToClipboard(text, msg) {
    navigator.clipboard.writeText(text).then(() => {
      status.textContent = msg + ' copied!';
      setTimeout(() => { status.textContent = ''; }, 1500);
    }).catch(() => {
      status.textContent = 'Copy failed';
    });
  }

  generateBtn.addEventListener('click', generate);
  copyUserBtn.addEventListener('click', () => copyToClipboard(usernameInput.value, 'Username'));
  copyPassBtn.addEventListener('click', () => copyToClipboard(passwordInput.value, 'Password'));

  // Generate on load
  generate();

  // Press Enter anywhere to generate
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      generate();
    }
  });
});