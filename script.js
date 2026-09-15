const commands = [
  {
    id:'git-status-short', platform:'git', platformLabel:'Git', risk:'safe', riskLabel:'nur lesend',
    title:'Git-Status kompakt', command:'git status --short',
    description:'Zeigt geänderte, neue und gelöschte Dateien ohne die lange Standardausgabe.',
    what:'Git vergleicht Working Tree und Staging Area mit dem letzten Commit und zeigt pro Datei einen kurzen Statuscode.',
    use:'Perfekt als schneller Sicherheitscheck vor add, commit, switch oder pull.',
    compat:'Git 2.x · alle Systeme', tags:'status änderungen dateien staging working tree kurz'
  },
  {
    id:'git-log-graph', platform:'git', platformLabel:'Git', risk:'safe', riskLabel:'nur lesend',
    title:'Git-Historie als Graph', command:'git log --oneline --graph --decorate -15',
    description:'Zeigt die letzten 15 Commits kompakt inklusive Branch- und Merge-Struktur.',
    what:'--oneline kürzt jeden Commit, --graph zeichnet die Verzweigungen und --decorate ergänzt Branch- und Tag-Namen.',
    use:'Sehr nützlich, wenn du verstehen willst, wie Branches und Merges zusammenhängen.',
    compat:'Git 2.x · alle Systeme', tags:'history commits graph branch merge log historie'
  },
  {
    id:'git-switch-branch', platform:'git', platformLabel:'Git', risk:'write', riskLabel:'verändert',
    title:'Neue Branch erstellen', command:'git switch -c feature/meine-idee',
    description:'Erstellt eine neue Branch und wechselt sofort hinein.',
    what:'switch -c erzeugt einen neuen Branch-Zeiger am aktuellen Commit und checkt ihn anschließend aus.',
    use:'Sauberer Start für ein neues Feature, Experiment oder einen Fix.',
    compat:'Git ≥ 2.23 · alle Systeme', tags:'branch zweig erstellen wechseln feature checkout'
  },
  {
    id:'git-diff', platform:'git', platformLabel:'Git', risk:'safe', riskLabel:'nur lesend',
    title:'Ungestagte Änderungen prüfen', command:'git diff',
    description:'Zeigt exakt, welche Textänderungen noch nicht gestaged wurden.',
    what:'Git berechnet die Differenz zwischen deinem Working Tree und dem Index.',
    use:'Vor git add prüfen, ob wirklich nur die gewünschten Änderungen enthalten sind.',
    compat:'Git · alle Systeme', tags:'diff unterschied änderungen code prüfen'
  },
  {
    id:'git-diff-staged', platform:'git', platformLabel:'Git', risk:'safe', riskLabel:'nur lesend',
    title:'Staged Änderungen prüfen', command:'git diff --staged',
    description:'Zeigt genau das, was im nächsten Commit landen würde.',
    what:'Vergleicht die Staging Area mit dem letzten Commit.',
    use:'Der beste letzte Check direkt vor git commit.',
    compat:'Git · alle Systeme', tags:'diff staged cached commit prüfen'
  },
  {
    id:'git-remote', platform:'git', platformLabel:'Git', risk:'safe', riskLabel:'nur lesend',
    title:'Remote-URLs prüfen', command:'git remote -v',
    description:'Zeigt die konfigurierten Fetch- und Push-Ziele des Repositories.',
    what:'Liest die Remote-Konfiguration aus .git/config und zeigt Name sowie URL.',
    use:'Hilft sofort, wenn du nicht weißt, mit welchem GitHub-Repository dein Ordner verbunden ist.',
    compat:'Git · alle Systeme', tags:'remote github url origin repository repo'
  },
  {
    id:'git-branch-vv', platform:'git', platformLabel:'Git', risk:'safe', riskLabel:'nur lesend',
    title:'Branches + Upstream sehen', command:'git branch -vv',
    description:'Zeigt lokale Branches, letzten Commit und den verknüpften Remote-Branch.',
    what:'-v zeigt Commit-Infos; ein zweites v ergänzt Tracking- bzw. Upstream-Informationen.',
    use:'Ideal bei Fragen wie: „Welche Branch pushe ich eigentlich wohin?“',
    compat:'Git · alle Systeme', tags:'branch upstream tracking remote verbose'
  },
  {
    id:'git-fetch-prune', platform:'git', platformLabel:'Git', risk:'write', riskLabel:'verändert',
    title:'Remote-Infos sauber aktualisieren', command:'git fetch --prune',
    description:'Lädt neue Remote-Referenzen und entfernt lokal veraltete Remote-Branches.',
    what:'fetch lädt Metadaten und Commits ohne deinen aktuellen Branch zu mergen. --prune entfernt Referenzen auf remote gelöschte Branches.',
    use:'Guter erster Schritt, bevor du Branches vergleichst oder synchronisierst.',
    compat:'Git · Netzwerkzugriff', tags:'fetch prune remote aktualisieren branches github'
  },
  {
    id:'git-stash', platform:'git', platformLabel:'Git', risk:'write', riskLabel:'verändert',
    title:'Arbeit kurz weglegen', command:'git stash push -m "wip"',
    description:'Speichert lokale Änderungen temporär im Stash.',
    what:'Git erzeugt interne Commit-Objekte für deine Änderungen und setzt den Working Tree anschließend zurück.',
    use:'Praktisch, wenn du kurz die Branch wechseln musst, aber noch nicht committen willst.',
    compat:'Git · alle Systeme', tags:'stash wip speichern temporär branch wechseln'
  },
  {
    id:'git-restore', platform:'git', platformLabel:'Git', risk:'caution', riskLabel:'Vorsicht',
    title:'Lokale Datei zurücksetzen', command:'git restore -- path/zur/datei',
    description:'Verwirft nicht gestagete Änderungen an genau einer Datei.',
    what:'Git ersetzt den Inhalt der Datei mit der Version aus dem Index.',
    use:'Wenn du lokale Änderungen an einer Datei bewusst wegwerfen willst.',
    compat:'Git ≥ 2.23', tags:'restore reset datei verwerfen undo rückgängig',
    warning:'Nicht gestagete Änderungen an dieser Datei gehen dabei verloren.'
  },
  {
    id:'ps-port', platform:'powershell', platformLabel:'PowerShell', risk:'safe', riskLabel:'nur lesend',
    title:'Wer benutzt Port 3000?', command:'Get-NetTCPConnection -LocalPort 3000 | Select-Object LocalAddress,LocalPort,State,OwningProcess',
    description:'Findet unter Windows die PID des Prozesses, der Port 3000 verwendet.',
    what:'Get-NetTCPConnection liest die TCP-Verbindungen aus. Select-Object reduziert die Ausgabe auf die relevanten Spalten.',
    use:'Typischer Debug-Schritt, wenn ein Dev-Server meldet: „Port already in use“.',
    compat:'Windows PowerShell 5+ / PowerShell 7', tags:'windows port prozess pid localhost tcp 3000 netzwerk'
  },
  {
    id:'ps-big-files', platform:'powershell', platformLabel:'PowerShell', risk:'safe', riskLabel:'nur lesend',
    title:'Die 10 größten Dateien', command:'Get-ChildItem -File -Recurse | Sort-Object Length -Descending | Select-Object -First 10 Name,Length,FullName',
    description:'Durchsucht den aktuellen Ordner und listet die größten Dateien auf.',
    what:'Get-ChildItem liefert Dateien rekursiv, Sort-Object sortiert nach Byte-Größe und Select-Object nimmt die ersten zehn.',
    use:'Schnell herausfinden, warum ein Projektordner plötzlich riesig ist.',
    compat:'Windows · PowerShell', tags:'dateien gross größte speicher ordner rekursiv size'
  },
  {
    id:'ps-processes', platform:'powershell', platformLabel:'PowerShell', risk:'safe', riskLabel:'nur lesend',
    title:'CPU-intensive Prozesse', command:'Get-Process | Sort-Object CPU -Descending | Select-Object -First 10 Name,CPU,Id',
    description:'Zeigt Prozesse mit der höchsten kumulierten CPU-Zeit.',
    what:'Get-Process liefert laufende Prozesse, danach wird nach CPU absteigend sortiert.',
    use:'Schneller Terminal-Blick auf auffällige Prozesse.',
    compat:'Windows · PowerShell', tags:'prozess cpu task manager performance pid'
  },
  {
    id:'ps-ip', platform:'powershell', platformLabel:'PowerShell', risk:'safe', riskLabel:'nur lesend',
    title:'Lokale IPv4-Adressen', command:"Get-NetIPAddress -AddressFamily IPv4 | Where-Object {$_.IPAddress -notlike '169.254*'} | Select-Object InterfaceAlias,IPAddress",
    description:'Listet IPv4-Adressen zusammen mit dem jeweiligen Netzwerkadapter.',
    what:'Liest IP-Konfigurationen aus und filtert typische APIPA-Adressen heraus.',
    use:'Hilfreich beim lokalen Netzwerk, Remote-Zugriff und Dev-Servern im LAN.',
    compat:'Windows · PowerShell', tags:'ip ipv4 netzwerk adresse wlan ethernet lokal'
  },
  {
    id:'ps-test-port', platform:'powershell', platformLabel:'PowerShell', risk:'safe', riskLabel:'nur lesend',
    title:'Host + Port testen', command:'Test-NetConnection github.com -Port 443',
    description:'Prüft DNS, Erreichbarkeit und einen konkreten TCP-Port.',
    what:'PowerShell versucht eine Netzwerkverbindung und liefert Diagnosedaten wie RemoteAddress und TcpTestSucceeded.',
    use:'Sehr praktisch, um Netzwerk- oder Firewall-Probleme einzugrenzen.',
    compat:'Windows · PowerShell', tags:'netzwerk port test tcp https dns firewall github'
  },
  {
    id:'ps-dns', platform:'powershell', platformLabel:'PowerShell', risk:'safe', riskLabel:'nur lesend',
    title:'DNS-Auflösung prüfen', command:'Resolve-DnsName github.com',
    description:'Zeigt, welche DNS-Einträge für einen Hostnamen aufgelöst werden.',
    what:'Fragt den konfigurierten DNS-Resolver ab und zeigt Records wie A, AAAA oder CNAME.',
    use:'Wenn eine Domain nicht erreichbar ist und du wissen willst, ob DNS das Problem ist.',
    compat:'Windows · PowerShell', tags:'dns domain ip hostname resolve internet'
  },
  {
    id:'ps-filehash', platform:'powershell', platformLabel:'PowerShell', risk:'safe', riskLabel:'nur lesend',
    title:'Datei-Hash berechnen', command:'Get-FileHash .\\datei.zip -Algorithm SHA256',
    description:'Berechnet den SHA-256-Prüfwert einer Datei.',
    what:'Liest die Datei und erzeugt einen kryptografischen Hashwert, ohne die Datei zu verändern.',
    use:'Downloads verifizieren oder prüfen, ob zwei Dateien wirklich identisch sind.',
    compat:'Windows · PowerShell', tags:'hash sha256 datei checksum überprüfen download'
  },
  {
    id:'ps-json', platform:'powershell', platformLabel:'PowerShell', risk:'safe', riskLabel:'nur lesend',
    title:'JSON lesbar formatieren', command:'Get-Content .\\data.json | ConvertFrom-Json | ConvertTo-Json -Depth 10',
    description:'Liest JSON ein, parst es und gibt es sauber strukturiert wieder aus.',
    what:'Die Pipeline wandelt Text in PowerShell-Objekte und anschließend wieder in eingerücktes JSON um.',
    use:'Gut zum schnellen Prüfen von API- oder Konfigurationsdateien.',
    compat:'Windows · PowerShell', tags:'json api formatieren pretty print datei'
  },
  {
    id:'ps-history', platform:'powershell', platformLabel:'PowerShell', risk:'safe', riskLabel:'nur lesend',
    title:'Letzte Befehle ansehen', command:'Get-History | Select-Object -Last 20',
    description:'Zeigt die letzten 20 Befehle der aktuellen PowerShell-Sitzung.',
    what:'Get-History liest den Session-Verlauf; Select-Object begrenzt die Ausgabe.',
    use:'Wenn du einen eben benutzten Befehl nicht noch einmal tippen willst.',
    compat:'PowerShell', tags:'history verlauf befehle session letzte'
  },
  {
    id:'ps-command-help', platform:'powershell', platformLabel:'PowerShell', risk:'safe', riskLabel:'nur lesend',
    title:'Befehle entdecken', command:'Get-Command *process*',
    description:'Sucht PowerShell-Kommandos, deren Name zu einem Begriff passt.',
    what:'Get-Command durchsucht Cmdlets, Funktionen, Aliase und ausführbare Programme.',
    use:'Extrem nützlich, wenn du weißt, was du tun willst, aber den Cmdlet-Namen nicht kennst.',
    compat:'PowerShell', tags:'hilfe help command finden cmdlet discover prozess'
  },
  {
    id:'unix-pwd', platform:'unix', platformLabel:'macOS / Linux', risk:'safe', riskLabel:'nur lesend',
    title:'Aktuellen Ordner anzeigen', command:'pwd',
    description:'Zeigt den vollständigen Pfad des Ordners, in dem du dich gerade befindest.',
    what:'pwd steht für “print working directory”.',
    use:'Einer der wichtigsten Orientierungsbefehle überhaupt.',
    compat:'macOS · Linux · Bash/Zsh', tags:'pwd ordner pfad wo bin ich directory beginner'
  },
  {
    id:'unix-list', platform:'unix', platformLabel:'macOS / Linux', risk:'safe', riskLabel:'nur lesend',
    title:'Dateien detailliert anzeigen', command:'ls -lah',
    description:'Listet auch versteckte Dateien, Rechte, Größen und Zeitstempel.',
    what:'-l aktiviert die lange Ansicht, -a zeigt versteckte Einträge, -h formatiert Größen lesbarer.',
    use:'Der klassische Überblick über einen Projektordner.',
    compat:'macOS · Linux', tags:'ls dateien ordner hidden versteckt liste rechte size'
  },
  {
    id:'unix-port', platform:'unix', platformLabel:'macOS / Linux', risk:'safe', riskLabel:'nur lesend',
    title:'Prozess auf Port finden', command:'lsof -i :3000',
    description:'Zeigt Prozesse, die Netzwerkverbindungen auf Port 3000 geöffnet haben.',
    what:'lsof listet offene Dateien; unter Unix zählen auch Netzwerk-Sockets zu diesen Ressourcen.',
    use:'Wenn dein lokaler Webserver wegen eines belegten Ports nicht startet.',
    compat:'macOS · viele Linux-Systeme', tags:'port 3000 lsof prozess pid localhost netzwerk'
  },
  {
    id:'unix-disk-folders', platform:'unix', platformLabel:'macOS / Linux', risk:'safe', riskLabel:'nur lesend',
    title:'Ordnergrößen sortieren', command:'du -sh ./* | sort -h',
    description:'Zeigt die Größe direkter Unterordner und sortiert sie aufsteigend.',
    what:'du berechnet Speicherverbrauch; die Pipe übergibt die Ausgabe an sort -h.',
    use:'Schnell herausfinden, welche Projektordner den meisten Platz verbrauchen.',
    compat:'macOS · Linux', tags:'du sort speicher größe ordner disk space pipe'
  },
  {
    id:'unix-recent', platform:'unix', platformLabel:'macOS / Linux', risk:'safe', riskLabel:'nur lesend',
    title:'Kürzlich geänderte Dateien', command:'find . -type f -mtime -1',
    description:'Findet Dateien unterhalb des aktuellen Ordners, die in den letzten 24 Stunden geändert wurden.',
    what:'find startet bei “.”, beschränkt auf Dateien und filtert nach Änderungszeit.',
    use:'Gut, wenn du gerade nicht mehr weißt, welche Dateien du zuletzt angefasst hast.',
    compat:'macOS · Linux', tags:'find dateien heute geändert mtime letzte 24 stunden'
  },
  {
    id:'unix-large-files', platform:'unix', platformLabel:'macOS / Linux', risk:'safe', riskLabel:'nur lesend',
    title:'Dateien über 100 MB finden', command:'find . -type f -size +100M',
    description:'Sucht große Dateien unterhalb des aktuellen Ordners.',
    what:'find filtert reguläre Dateien nach einer Mindestgröße von mehr als 100 MiB.',
    use:'Hilft bei übergroßen Repositories, Build-Artefakten oder vergessenen Videos.',
    compat:'macOS · Linux', tags:'find große dateien 100mb size repository speicher'
  },
  {
    id:'unix-grep', platform:'unix', platformLabel:'macOS / Linux', risk:'safe', riskLabel:'nur lesend',
    title:'Text im Projekt suchen', command:'grep -Rin --exclude-dir=.git "TODO" .',
    description:'Sucht rekursiv nach TODO, inklusive Dateiname und Zeilennummer.',
    what:'-R sucht rekursiv, -i ignoriert Groß-/Kleinschreibung, -n zeigt Zeilennummern.',
    use:'Ein schneller Ersatz für eine IDE-Suche direkt im Terminal.',
    compat:'macOS · Linux', tags:'grep suchen text todo projekt rekursiv zeile'
  },
  {
    id:'unix-tail', platform:'unix', platformLabel:'macOS / Linux', risk:'safe', riskLabel:'nur lesend',
    title:'Logdatei live verfolgen', command:'tail -f app.log',
    description:'Zeigt neue Zeilen einer Logdatei fortlaufend an.',
    what:'tail zeigt standardmäßig das Dateiende; -f bleibt aktiv und wartet auf neue Daten.',
    use:'Sehr nützlich beim Debugging von Servern oder Hintergrundprozessen.',
    compat:'macOS · Linux', tags:'tail log live verfolgen debug server'
  },
  {
    id:'unix-headers', platform:'unix', platformLabel:'macOS / Linux', risk:'safe', riskLabel:'nur lesend',
    title:'HTTP-Header prüfen', command:'curl -I https://example.com',
    description:'Ruft nur die HTTP-Response-Header einer URL ab.',
    what:'curl stellt die Anfrage; -I fordert bei HTTP nur Header statt des kompletten Inhalts an.',
    use:'Schnell Statuscode, Redirects, Cache-Header oder Server-Antwort prüfen.',
    compat:'macOS · Linux · curl', tags:'curl http header website status redirect server web'
  },
  {
    id:'unix-http-server', platform:'unix', platformLabel:'macOS / Linux', risk:'write', riskLabel:'verändert',
    title:'Lokalen Webserver starten', command:'python3 -m http.server 8000',
    description:'Serviert den aktuellen Ordner über einen simplen HTTP-Server auf Port 8000.',
    what:'Python startet sein eingebautes http.server-Modul und stellt die Dateien im aktuellen Ordner bereit.',
    use:'Perfekt zum schnellen Testen einer statischen Website im Browser.',
    compat:'Python 3 · macOS / Linux', tags:'python server localhost 8000 website html statisch web'
  }
];

const $ = (selector, root = document) => root.querySelector(selector);
const $$ = (selector, root = document) => [...root.querySelectorAll(selector)];
const grid = $('#commandGrid');
const searchInput = $('#searchInput');
const riskFilter = $('#riskFilter');
const resultCount = $('#resultCount');
const emptyState = $('#emptyState');
const toast = $('#toast');
let activePlatform = 'all';

$('#commandCount').textContent = commands.length;

function escapeHtml(value) {
  return String(value).replace(/[&<>"']/g, ch => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#039;'}[ch]));
}

function cardTemplate(item) {
  const warning = item.warning ? `<div class="warning-box">${escapeHtml(item.warning)}</div>` : '';
  return `
    <article class="command-card" id="${item.id}" data-platform="${item.platform}" data-risk="${item.risk}" data-search="${escapeHtml(`${item.title} ${item.command} ${item.description} ${item.tags}`.toLowerCase())}">
      <div class="card-top">
        <div class="card-meta">
          <span class="pill ${item.platform}">${item.platformLabel}</span>
          <span class="risk ${item.risk}">${item.riskLabel}</span>
        </div>
      </div>
      <h3>${escapeHtml(item.title)}</h3>
      <p class="description">${escapeHtml(item.description)}</p>
      <div class="code-box">
        <pre><code>${escapeHtml(item.command)}</code></pre>
        <button class="copy-icon" type="button" data-copy="${escapeHtml(item.command)}" aria-label="Befehl kopieren">⧉</button>
      </div>
      <div class="card-actions">
        <button class="details-toggle" type="button" aria-expanded="false">Genauer erklären ↓</button>
        <span class="compat">${escapeHtml(item.compat)}</span>
      </div>
      <div class="card-details">
        <dl>
          <div><dt>Was passiert?</dt><dd>${escapeHtml(item.what)}</dd></div>
          <div><dt>Wann nützlich?</dt><dd>${escapeHtml(item.use)}</dd></div>
        </dl>
        ${warning}
      </div>
    </article>`;
}

function renderCommands() {
  grid.innerHTML = commands.map(cardTemplate).join('');
  bindCardActions();
  applyFilters();
}

function normalize(value) {
  return String(value).toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '');
}

function applyFilters() {
  const query = normalize(searchInput.value.trim());
  const risk = riskFilter.value;
  let visible = 0;

  $$('.command-card', grid).forEach(card => {
    const matchesPlatform = activePlatform === 'all' || card.dataset.platform === activePlatform;
    const matchesRisk = risk === 'all' || card.dataset.risk === risk;
    const matchesQuery = !query || normalize(card.dataset.search).includes(query);
    const show = matchesPlatform && matchesRisk && matchesQuery;
    card.classList.toggle('hidden', !show);
    if (show) visible++;
  });

  resultCount.textContent = visible;
  emptyState.classList.toggle('hidden', visible !== 0);
}

function bindCardActions() {
  $$('.copy-icon', grid).forEach(btn => btn.addEventListener('click', () => copyText(btn.dataset.copy, btn)));
  $$('.details-toggle', grid).forEach(btn => {
    btn.addEventListener('click', () => {
      const card = btn.closest('.command-card');
      const expanded = card.classList.toggle('expanded');
      btn.setAttribute('aria-expanded', expanded ? 'true' : 'false');
      btn.textContent = expanded ? 'Erklärung schließen ↑' : 'Genauer erklären ↓';
    });
  });
}

async function copyText(text, button) {
  try {
    await navigator.clipboard.writeText(text);
    showToast('Command kopiert.');
    if (button) {
      const old = button.textContent;
      button.textContent = '✓';
      setTimeout(() => button.textContent = old, 1100);
    }
  } catch {
    showToast('Kopieren wurde vom Browser blockiert.');
  }
}

let toastTimer;
function showToast(message) {
  toast.textContent = message;
  toast.classList.add('show');
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => toast.classList.remove('show'), 1500);
}

searchInput.addEventListener('input', applyFilters);
riskFilter.addEventListener('change', applyFilters);

$$('#platformFilters .filter').forEach(btn => {
  btn.addEventListener('click', () => {
    activePlatform = btn.dataset.filter;
    $$('#platformFilters .filter').forEach(other => other.classList.toggle('active', other === btn));
    applyFilters();
  });
});

$('#clearFilters').addEventListener('click', () => {
  searchInput.value = '';
  riskFilter.value = 'all';
  activePlatform = 'all';
  $$('#platformFilters .filter').forEach(btn => btn.classList.toggle('active', btn.dataset.filter === 'all'));
  applyFilters();
  searchInput.focus();
});

$('#themeToggle').addEventListener('click', () => {
  document.body.classList.toggle('light');
  localStorage.setItem('terminal-tricks-theme', document.body.classList.contains('light') ? 'light' : 'dark');
});
if (localStorage.getItem('terminal-tricks-theme') === 'light') document.body.classList.add('light');

const typingDemos = [
  ['git log --oneline --graph -5','Zeigt die letzten Commits als kompakten Branch-Graph.'],
  ['lsof -i :3000','Findet den Prozess, der Port 3000 belegt.'],
  ['python3 -m http.server 8000','Startet einen simplen lokalen Webserver.'],
  ['git diff --staged','Zeigt genau, was im nächsten Commit landen würde.']
];
let demoIndex = 0, charIndex = 0, deleting = false;
const typedCommand = $('#typedCommand');
const typedExplanation = $('#typedExplanation');
function typeLoop() {
  const [text, explanation] = typingDemos[demoIndex];
  if (!deleting) {
    charIndex++;
    typedCommand.textContent = text.slice(0, charIndex);
    if (charIndex === text.length) {
      typedExplanation.textContent = explanation;
      deleting = true;
      setTimeout(typeLoop, 1500);
      return;
    }
  } else {
    charIndex--;
    typedCommand.textContent = text.slice(0, charIndex);
    if (charIndex <= 0) {
      deleting = false;
      demoIndex = (demoIndex + 1) % typingDemos.length;
    }
  }
  setTimeout(typeLoop, deleting ? 25 : 43);
}
if (!window.matchMedia('(prefers-reduced-motion: reduce)').matches) typeLoop();
else {
  typedCommand.textContent = typingDemos[0][0];
  typedExplanation.textContent = typingDemos[0][1];
}

const terminalOutput = $('#terminalOutput');
const terminalForm = $('#terminalForm');
const terminalInput = $('#terminalInput');
const demoHistory = [];
let historyCursor = 0;
const fakeCommands = {
  help: ['Verfügbare Demo-Kommandos:', 'help · pwd · ls · whoami · git status · git log --oneline -5 · clear'],
  pwd: ['/home/visitor/terminal-tricks'],
  ls: ['README.md   commands/   playground/   notes.txt'],
  whoami: ['visitor'],
  'git status': ['On branch main', 'Your branch is up to date with origin/main.', '', 'nothing to commit, working tree clean'],
  'git log --oneline -5': ['8c3d14a feat: improve command explanations', '27a91fe fix: responsive toolbar', 'a41f930 docs: explain URL fragments', 'b18ac8d feat: safe browser playground', '3f7c9a0 init terminal-tricks']
};

function appendTerminalLine(html, className = '') {
  const p = document.createElement('p');
  if (className) p.className = className;
  p.innerHTML = html;
  terminalOutput.appendChild(p);
  terminalOutput.scrollTop = terminalOutput.scrollHeight;
}

function runDemoCommand(raw) {
  const command = raw.trim();
  if (!command) return;
  appendTerminalLine(`<span class="prompt">visitor@terminaltricks</span> <span class="path-token">~</span> <span class="shell-symbol">$</span> <span class="command">${escapeHtml(command)}</span>`);
  if (command.toLowerCase() === 'clear') {
    terminalOutput.innerHTML = '';
    return;
  }
  const lines = fakeCommands[command.toLowerCase()];
  if (!lines) {
    appendTerminalLine(`sandbox: command not available — tippe <span class="command">help</span>`, 'muted');
    return;
  }
  lines.forEach(line => appendTerminalLine(escapeHtml(line), line ? '' : 'muted'));
}

terminalForm.addEventListener('submit', event => {
  event.preventDefault();
  const value = terminalInput.value;
  if (!value.trim()) return;
  demoHistory.push(value);
  historyCursor = demoHistory.length;
  runDemoCommand(value);
  terminalInput.value = '';
});
terminalInput.addEventListener('keydown', event => {
  if (event.key === 'ArrowUp' && demoHistory.length) {
    event.preventDefault();
    historyCursor = Math.max(0, historyCursor - 1);
    terminalInput.value = demoHistory[historyCursor] || '';
  }
  if (event.key === 'ArrowDown' && demoHistory.length) {
    event.preventDefault();
    historyCursor = Math.min(demoHistory.length, historyCursor + 1);
    terminalInput.value = demoHistory[historyCursor] || '';
  }
});
$$('#suggestions [data-demo]').forEach(btn => btn.addEventListener('click', () => {
  const cmd = btn.dataset.demo;
  if (cmd === 'clear') runDemoCommand(cmd);
  else {
    terminalInput.value = cmd;
    terminalInput.focus();
  }
}));

const searchDialog = $('#searchDialog');
const dialogSearch = $('#dialogSearch');
const dialogResults = $('#dialogResults');
function openPalette() {
  if (!searchDialog.open) searchDialog.showModal();
  dialogSearch.value = '';
  renderDialogResults('');
  setTimeout(() => dialogSearch.focus(), 0);
}
function renderDialogResults(query) {
  const q = normalize(query.trim());
  const matches = commands.filter(item => !q || normalize(`${item.title} ${item.command} ${item.tags}`).includes(q)).slice(0, 8);
  if (!matches.length) {
    dialogResults.innerHTML = '<div class="dialog-empty">Kein passender Command gefunden.</div>';
    return;
  }
  dialogResults.innerHTML = matches.map(item => `<button type="button" class="dialog-result" data-target="${item.id}"><span><strong>${escapeHtml(item.title)}</strong><code>${escapeHtml(item.command)}</code></span><span>${escapeHtml(item.platformLabel)}</span></button>`).join('');
  $$('.dialog-result', dialogResults).forEach(btn => btn.addEventListener('click', () => {
    searchDialog.close();
    const card = document.getElementById(btn.dataset.target);
    card?.scrollIntoView({behavior:'smooth', block:'center'});
    card?.classList.add('expanded');
    const toggle = card?.querySelector('.details-toggle');
    if (toggle) { toggle.setAttribute('aria-expanded','true'); toggle.textContent='Erklärung schließen ↑'; }
    card?.animate([{outline:'1px solid rgba(141,255,99,.75)'},{outline:'1px solid transparent'}],{duration:1300});
  }));
}
$('#openSearch').addEventListener('click', openPalette);
dialogSearch.addEventListener('input', () => renderDialogResults(dialogSearch.value));

window.addEventListener('keydown', event => {
  const tag = document.activeElement?.tagName;
  const typing = tag === 'INPUT' || tag === 'TEXTAREA' || tag === 'SELECT';
  if (event.key === '/' && !typing && !searchDialog.open) {
    event.preventDefault();
    searchInput.focus();
    document.getElementById('commands').scrollIntoView({behavior:'smooth'});
  }
  if ((event.ctrlKey || event.metaKey) && event.key.toLowerCase() === 'k') {
    event.preventDefault();
    openPalette();
  }
});

function scrollCleanTop() {
  window.scrollTo({top:0, behavior:'smooth'});
  if (location.hash) history.replaceState(null, '', location.pathname + location.search);
}
$('#backToTop').addEventListener('click', scrollCleanTop);
$$('.clean-top').forEach(link => link.addEventListener('click', event => {
  if (location.pathname.endsWith('/terminal/') || location.pathname.endsWith('/terminal/index.html')) {
    event.preventDefault();
    scrollCleanTop();
  }
}));

renderCommands();
