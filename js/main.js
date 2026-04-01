// ============================================================
//  SITE LOGIC — juliogustavo.com
//  Handles navigation, article routing, and all rendering.
//  You should NOT need to edit this file normally.
// ============================================================

document.addEventListener('DOMContentLoaded', () => {

  // ── BOOT SEQUENCE ──────────────────────────────────────────
  buildNav();
  buildHome();
  buildArticleList();
  buildResearch();
  buildAbout();
  buildCV();
  updateStatusBar();

  // Route based on URL hash
  const hash = location.hash.replace('#', '') || 'home';
  route(hash);

  window.addEventListener('hashchange', () => {
    const h = location.hash.replace('#', '') || 'home';
    route(h);
  });
});

// ── ROUTER ─────────────────────────────────────────────────

function route(hash) {
  // Article detail: #article/slug
  if (hash.startsWith('article/')) {
    const slug = hash.replace('article/', '');
    showArticle(slug);
    return;
  }
  showPage(hash);
}

function showPage(id) {
  document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
  document.querySelectorAll('nav a').forEach(a => {
    a.classList.toggle('active', a.dataset.page === id);
  });

  const el = document.getElementById('page-' + id);
  if (el) {
    el.classList.add('active');
    updateStatusBar(id);
  }
}

// ── NAV ────────────────────────────────────────────────────

function buildNav() {
  const nav = document.querySelector('nav');
  const pages = [
    { id: 'home',     label: 'home' },
    { id: 'articles', label: 'articles' },
    { id: 'research', label: 'research' },
    { id: 'cv',       label: 'cv' },
    { id: 'about',    label: 'about' },
  ];
  pages.forEach(p => {
    const a = document.createElement('a');
    a.href = '#' + p.id;
    a.textContent = p.label;
    a.dataset.page = p.id;
    nav.appendChild(a);
  });
}

// ── HOME PAGE ──────────────────────────────────────────────

function buildHome() {
  const el = document.getElementById('page-home');

  const ascii = `
 ██╗ ██╗   ██╗██╗     ██╗ ██████╗
 ██║ ██║   ██║██║     ██║██╔═══██╗
 ██║ ██║   ██║██║     ██║██║   ██║
 ██║ ██║   ██║██║     ██║██║   ██║
 ██║ ╚██████╔╝███████╗██║╚██████╔╝
 ╚═╝  ╚═════╝ ╚══════╝╚═╝ ╚═════╝
`.trim();

  el.innerHTML = `
    <div class="block" style="animation-delay:0s">
      <pre class="hero-ascii">${ascii}</pre>
      <div class="hero-name">${SITE.name}</div>
      <div class="hero-title">${SITE.title}</div>
    </div>

    <div class="block" style="animation-delay:0.1s">
      <div class="prompt-line">
        <span class="prompt-user">julio</span>
        <span class="prompt-at">@</span>
        <span class="prompt-host">juliogustavo.com</span>
        <span class="prompt-colon">:</span>
        <span class="prompt-path">~</span>
        <span class="prompt-dollar">$</span>
        <span class="prompt-cmd typewriter">whoami</span>
      </div>
      <div class="cmd-output">${SITE.tagline}</div>
    </div>

    <div class="block" style="animation-delay:0.2s">
      <div class="block-label">expertise</div>
      <div class="block-content">
        <div class="tags">${SITE.skills.map(s => `<span class="tag">${s}</span>`).join('')}</div>
      </div>
    </div>

    <div class="block" style="animation-delay:0.3s">
      <div class="block-label">links</div>
      <div class="block-content">
        <div class="link-row">
          ${SITE.links.github   ? `<a class="link-item" href="${SITE.links.github}"   target="_blank">github</a>` : ''}
          ${SITE.links.linkedin ? `<a class="link-item" href="${SITE.links.linkedin}" target="_blank">linkedin</a>` : ''}
          ${SITE.links.cv       ? `<a class="link-item" href="${SITE.links.cv}"       target="_blank">download cv</a>` : ''}
          ${SITE.links.email    ? `<a class="link-item" href="${SITE.links.email}">email</a>` : ''}
        </div>
      </div>
    </div>

    <div class="block" style="animation-delay:0.4s">
      <div class="block-label">quick nav</div>
      <div class="block-content cmd-output">
        Type a section — <a href="#articles">articles</a> · <a href="#research">research</a> · <a href="#cv">cv</a> · <a href="#about">about</a>
      </div>
    </div>
  `;
}

// ── ARTICLE LIST ────────────────────────────────────────────

function buildArticleList() {
  const el = document.getElementById('page-articles');

  // Sort newest first
  const sorted = [...ARTICLES].sort((a, b) => new Date(b.date) - new Date(a.date));

  const promptHtml = promptLine('articles', 'ls -lt articles/');
  const listHtml = sorted.map((art, i) => `
    <li class="article-item" style="animation-delay:${i * 0.06}s"
        onclick="location.hash='article/${art.id}'">
      <div class="article-title">${art.title}</div>
      <div class="article-meta">${formatDate(art.date)} ${art.github ? `· <a href="${art.github}" target="_blank" onclick="event.stopPropagation()">github ↗</a>` : ''}</div>
      <div class="article-excerpt">${art.excerpt}</div>
      <div class="article-tags tags">${art.tags.map(t => `<span class="tag">${t}</span>`).join('')}</div>
    </li>
  `).join('');

  el.innerHTML = `
    ${promptHtml}
    <ul class="article-list">${listHtml}</ul>
  `;
}

// ── ARTICLE VIEW ────────────────────────────────────────────

function showArticle(slug) {
  const art = ARTICLES.find(a => a.id === slug);

  // hide all pages, show articles page (reuse it for article view)
  document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
  document.querySelectorAll('nav a').forEach(a => {
    a.classList.toggle('active', a.dataset.page === 'articles');
  });

  const el = document.getElementById('page-articles');
  el.classList.add('active');

  if (!art) {
    el.innerHTML = `<div class="cmd-output">Error: article not found.</div>
      <a href="#articles" class="article-back">← back to articles</a>`;
    return;
  }

  el.innerHTML = `
    <a class="article-back" onclick="history.back(); return false;" href="#">← back to articles</a>
    <div class="article-full">
      <h1>${art.title}</h1>
      <div class="article-meta" style="margin-bottom:16px">
        ${formatDate(art.date)}
        ${art.tags.map(t => `<span class="tag" style="margin-left:8px">${t}</span>`).join('')}
        ${art.github ? `· <a href="${art.github}" target="_blank">view on github ↗</a>` : ''}
      </div>
      <hr class="divider">
      ${art.body}
    </div>
  `;

  updateStatusBar('article: ' + art.title);
}

// ── RESEARCH ────────────────────────────────────────────────

function buildResearch() {
  const el = document.getElementById('page-research');

  const pubsHtml = SITE.publications.map((p, i) => `
    <div class="pub-item" style="animation-delay:${i * 0.07}s">
      <div class="pub-title">${p.title}</div>
      <div class="pub-venue">${p.venue}</div>
      <div class="pub-authors">${p.authors}</div>
      <div class="pub-abstract">${p.abstract}</div>
      <div class="pub-links">
        ${p.doi    ? `<a class="pub-link" href="${p.doi}"    target="_blank">DOI ↗</a>` : ''}
        ${p.pdf    ? `<a class="pub-link" href="${p.pdf}"    target="_blank">PDF ↗</a>` : ''}
        ${p.github ? `<a class="pub-link" href="${p.github}" target="_blank">Code ↗</a>` : ''}
      </div>
    </div>
  `).join('');

  el.innerHTML = `
    ${promptLine('research', 'ls publications/')}
    ${pubsHtml}
  `;
}

// ── ABOUT ────────────────────────────────────────────────────

function buildAbout() {
  const el = document.getElementById('page-about');
  el.innerHTML = `
    ${promptLine('about', 'cat about.txt')}

    <div class="block">
      <div class="block-label">about me</div>
      <div class="block-content" style="max-width:680px; line-height:1.8">
        ${SITE.about}
      </div>
    </div>

    <hr class="divider">

    <div class="block">
      <div class="block-label">contact & links</div>
      <div class="block-content">
        <div class="link-row">
          ${SITE.links.email    ? `<a class="link-item" href="${SITE.links.email}">${SITE.email}</a>` : ''}
          ${SITE.links.github   ? `<a class="link-item" href="${SITE.links.github}"   target="_blank">github</a>` : ''}
          ${SITE.links.linkedin ? `<a class="link-item" href="${SITE.links.linkedin}" target="_blank">linkedin</a>` : ''}
        </div>
      </div>
    </div>
  `;
}

// ── CV ────────────────────────────────────────────────────────

function buildCV() {
  const el = document.getElementById('page-cv');

  const expHtml = SITE.experience.map((e, i) => `
    <div class="cv-entry" style="animation-delay:${i * 0.06}s">
      <div class="cv-role">${e.role}</div>
      <div class="cv-org">${e.orgUrl ? `<a href="${e.orgUrl}" target="_blank">${e.org}</a>` : e.org}</div>
      <div class="cv-date">${e.date}</div>
      <div class="cv-desc">${e.desc}</div>
    </div>
  `).join('');

  const eduHtml = SITE.education.map((e, i) => `
    <div class="cv-entry" style="animation-delay:${i * 0.06}s">
      <div class="cv-role">${e.degree}</div>
      <div class="cv-org">${e.school}</div>
      <div class="cv-date">${e.date}</div>
      <div class="cv-desc">${e.desc}</div>
    </div>
  `).join('');

  const cvDownload = SITE.links.cv
    ? `<a class="link-item" href="${SITE.links.cv}" target="_blank" style="margin-bottom:24px;display:inline-flex">↓ download full cv (pdf)</a>`
    : '';

  el.innerHTML = `
    ${promptLine('cv', 'cat cv.txt')}

    ${cvDownload}

    <div class="block">
      <div class="block-label">experience</div>
      <div class="block-content">${expHtml}</div>
    </div>

    <hr class="divider">

    <div class="block">
      <div class="block-label">education</div>
      <div class="block-content">${eduHtml}</div>
    </div>

    <hr class="divider">

    <div class="block">
      <div class="block-label">skills</div>
      <div class="block-content">
        <div class="tags">${SITE.skills.map(s => `<span class="tag">${s}</span>`).join('')}</div>
      </div>
    </div>
  `;
}

// ── STATUS BAR ──────────────────────────────────────────────

function updateStatusBar(page) {
  const bar = document.querySelector('.status-bar');
  if (!bar) return;
  const now = new Date().toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit' });
  bar.innerHTML = `
    <span>NORMAL | ${page || 'home'}</span>
    <span>${SITE.name} · juliogustavo.com · ${now}</span>
  `;
}

// ── HELPERS ──────────────────────────────────────────────────

function promptLine(path, cmd) {
  return `
    <div class="prompt-line" style="margin-bottom:20px">
      <span class="prompt-user">julio</span>
      <span class="prompt-at">@</span>
      <span class="prompt-host">juliogustavo.com</span>
      <span class="prompt-colon">:</span>
      <span class="prompt-path">~/${path}</span>
      <span class="prompt-dollar">$</span>
      <span class="prompt-cmd">${cmd}</span>
    </div>
  `;
}

function formatDate(str) {
  return new Date(str).toLocaleDateString('en-GB', {
    day: 'numeric', month: 'short', year: 'numeric'
  });
}
