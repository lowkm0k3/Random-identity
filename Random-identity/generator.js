// generator.js

const adjectives = [
  'Brave', 'Calm', 'Clever', 'Cosmic', 'Daring', 'Eager', 'Fancy', 'Gentle',
  'Happy', 'Jolly', 'Kind', 'Lucky', 'Mighty', 'Noble', 'Proud', 'Quick',
  'Rapid', 'Silent', 'Smart', 'Vivid', 'Wise', 'Bold', 'Bright', 'Swift'
];

const nouns = [
  'Falcon', 'Tiger', 'Dragon', 'Phoenix', 'Wolf', 'Bear', 'Lion', 'Eagle',
  'Shark', 'Panther', 'Cobra', 'Hawk', 'Raven', 'Fox', 'Owl', 'Lynx',
  'Jaguar', 'Leopard', 'Rhino', 'Bison', 'Otter', 'Badger', 'Heron', 'Crane'
];

function randomInt(min, max) {
  const range = max - min + 1;
  const maxSafe = Math.floor(65536 / range) * range;
  const arr = new Uint16Array(1);
  let val;
  do {
    crypto.getRandomValues(arr);
    val = arr[0];
  } while (val >= maxSafe);
  return min + (val % range);
}

function pick(arr) {
  return arr[randomInt(0, arr.length - 1)];
}

function capitalize(str) {
  return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
}

function generateUsername() {
  const adj = pick(adjectives);
  const noun = pick(nouns);
  const num = randomInt(1, 999);
  return `${capitalize(adj)}${capitalize(noun)}${num}`;
}

function generatePassword(length = 20, useDigits = true, useSymbols = true) {
  const lower = 'abcdefghijklmnopqrstuvwxyz';
  const upper = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  const digits = '0123456789';
  const symbols = '!@#$%^&*()_+-=[]{}|;:,.<>?';
  let chars = lower + upper;
  if (useDigits) chars += digits;
  if (useSymbols) chars += symbols;

  let pass = '';
  for (let i = 0; i < length; i++) {
    pass += chars[randomInt(0, chars.length - 1)];
  }
  return pass;
}