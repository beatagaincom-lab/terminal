const cards = [...document.querySelectorAll('.command-card')];
const searchInput = document.querySelector('#searchInput');
const filterButtons = [...document.querySelectorAll('.filter')];
const emptyState = document.querySelector('#emptyState');
const toast = document.querySelector('#toast');

let activeFilter = 'all';

function normalize(value) {
  return value.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '');
}

function filterCards() {
  const q = normalize(searchInput.value.trim());
  let visible = 0;

  cards.forEach(card => {
    const text = normalize(card.innerText + ' ' + (card.dataset.tags || ''));
    const platformMatch = activeFilter === 'all' || text.includes(activeFilter);
    const queryMatch = !q || text.includes(q);
    const show = platformMatch && queryMatch;
    card.classList.toggle('hidden', !show);
    if (show) visible++;
  });

  emptyState.classList.toggle('hidden', visible !== 0);
}

searchInput.addEventListener('input', filterCards);

filterButtons.forEach(button => {
  button.addEventListener('click', () => {
    activeFilter = button.dataset.filter;
    filterButtons.forEach(btn => btn.classList.toggle('active', btn === button));
    filterCards();
  });
});

let toastTimer;
function showToast(message = 'Kopiert.') {
  toast.textContent = message;
  toast.classList.add('show');
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => toast.classList.remove('show'), 1400);
}

document.querySelectorAll('.copy-btn').forEach(button => {
  button.addEventListener('click', async () => {
    try {
      await navigator.clipboard.writeText(button.dataset.copy);
      const old = button.textContent;
      button.textContent = 'Kopiert ✓';
      showToast();
      setTimeout(() => button.textContent = old, 1200);
    } catch {
      showToast('Kopieren nicht erlaubt.');
    }
  });
});

document.querySelector('#themeToggle').addEventListener('click', () => {
  document.body.classList.toggle('light');
});

const commands = [
  'git status --short',
  'lsof -i :3000',
  'git log --oneline -5',
  'python3 -m json.tool data.json'
];
const typed = document.querySelector('#typedCommand');
let cmdIndex = 0, charIndex = 0, deleting = false;

function typeLoop() {
  const current = commands[cmdIndex];
  if (!deleting) {
    charIndex++;
    typed.textContent = current.slice(0, charIndex);
    if (charIndex >= current.length) {
      deleting = true;
      setTimeout(typeLoop, 1500);
      return;
    }
  } else {
    charIndex--;
    typed.textContent = current.slice(0, charIndex);
    if (charIndex <= 0) {
      deleting = false;
      cmdIndex = (cmdIndex + 1) % commands.length;
    }
  }
  setTimeout(typeLoop, deleting ? 30 : 55);
}
typeLoop();

const terminalForm = document.querySelector('#terminalForm');
const terminalInput = document.querySelector('#terminalInput');
const terminalOutput = document.querySelector('#terminalOutput');

const fakeCommands = {
  help: [
    'Verfügbare Demo-Kommandos:',
    'help, whoami, pwd, ls, git status, clear'
  ],
  whoami: ['visitor'],
  pwd: ['/home/visitor/terminal-tricks'],
  ls: ['README.md   commands/   playground/   notes.txt'],
  'git status': [
    'On branch main',
    'Your branch is up to date with origin/main.',
    '',
    'nothing to commit, working tree clean'
  ]
};

function appendLine(html, cls='') {
  const p = document.createElement('p');
  if (cls) p.className = cls;
  p.innerHTML = html;
  terminalOutput.appendChild(p);
  terminalOutput.scrollTop = terminalOutput.scrollHeight;
}

terminalForm.addEventListener('submit', (event) => {
  event.preventDefault();
  const raw = terminalInput.value.trim();
  if (!raw) return;
  appendLine(`<span class="prompt">visitor@terminaltricks</span> <span class="muted">~</span> <span class="cmd">${escapeHtml(raw)}</span>`);
  terminalInput.value = '';

  const key = raw.toLowerCase();
  if (key === 'clear') {
    terminalOutput.innerHTML = '';
    return;
  }

  const lines = fakeCommands[key];
  if (!lines) {
    appendLine(`demo: command not available — tippe <span class="cmd">help</span>`, 'muted');
    return;
  }
  lines.forEach(line => appendLine(escapeHtml(line), line ? '' : 'muted'));
});

function escapeHtml(str) {
  return str.replace(/[&<>"']/g, ch => ({
    '&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#039;'
  }[ch]));
}
