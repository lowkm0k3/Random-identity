// popup.js

// --- Theme handling ---
const themeToggle = document.getElementById('themeToggle');

function applyTheme(isDark) {
  document.documentElement.classList.toggle('dark', isDark);
  themeToggle.textContent = isDark ? '☀' : '☾';
}

// Load saved theme, or fall back to system preference
const savedTheme = localStorage.getItem('theme'); // 'dark' | 'light' | null
const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
const startDark = savedTheme ? savedTheme === 'dark' : prefersDark;
applyTheme(startDark);

themeToggle.addEventListener('click', () => {
  const isDark = !document.documentElement.classList.contains('dark');
  applyTheme(isDark);
  localStorage.setItem('theme', isDark ? 'dark' : 'light');
});

// --- Main popup logic ---
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

  generate();

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      generate();
    }
  });
});