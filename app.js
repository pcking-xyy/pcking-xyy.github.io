import { content } from './content.js?v=20261118-reader';
import { renderChapterVisual } from './chapter-visuals.js?v=20261118-reader';
const $ = selector => document.querySelector(selector);
const text = (selector, value) => { $(selector).textContent = value; };
function element(tag, className, value) {
  const node = document.createElement(tag);
  if (className) node.className = className;
  if (value !== undefined) node.textContent = value;
  return node;
}
// 自绘装饰图，仅辅助解释项目概念，不代表检测画面或统计数据。
const drawings = {
  support: '<svg viewBox="0 0 420 180" fill="none" xmlns="http://www.w3.org/2000/svg"><rect x="25" y="44" width="104" height="85" rx="16" fill="#d0e3e8" stroke="#94b8c3"/><path d="M47 66h52M47 81h39M47 96h48" stroke="#558592" stroke-width="3" stroke-linecap="round"/><path d="m46 129-10 15v-26" fill="#d0e3e8" stroke="#94b8c3"/><path d="M130 86h40m-6-5 6 5-6 5" stroke="#789fa9" stroke-width="1.5"/><rect x="175" y="31" width="98" height="46" rx="10" fill="#f5fafb" stroke="#9bbbc4"/><text x="224" y="59" text-anchor="middle" font-family="Arial,sans-serif" font-size="15" fill="#376a78">RAG</text><rect x="175" y="103" width="98" height="46" rx="10" fill="#f5fafb" stroke="#9bbbc4"/><text x="224" y="131" text-anchor="middle" font-family="Arial,sans-serif" font-size="14" fill="#376a78">QLoRA</text><path d="M224 77v26m-4-5 4 5 4-5M273 54h34v34h16m-5-4 5 4-5 4M273 126h34V88" stroke="#789fa9" stroke-width="1.5"/><rect x="327" y="62" width="67" height="51" rx="11" fill="#477d8c"/><path d="M342 78h36M342 89h25" stroke="#eff8f9" stroke-width="3" stroke-linecap="round"/><path d="m345 113-8 10v-15" fill="#477d8c"/></svg>',
  fire: '<svg viewBox="0 0 420 180" fill="none" xmlns="http://www.w3.org/2000/svg"><rect x="24" y="35" width="103" height="110" rx="18" fill="#efd4c2" stroke="#d7ac91"/><path d="M76 53c8 22-14 28-7 40 8-2 11-12 11-12 25 17 29 33 17 47-11 14-37 14-48-2-13-20 6-35 13-44 6-8 10-18 14-29Z" fill="#bb6844"/><path d="M76 100c4 10 13 14 10 22-3 8-16 9-20 1-4-8 5-14 10-23Z" fill="#faeee4"/><path d="M127 90h42m-6-5 6 5-6 5" stroke="#b07c60" stroke-width="1.5"/><rect x="174" y="58" width="112" height="59" rx="12" fill="#fff9f2" stroke="#c89a7f"/><text x="230" y="84" text-anchor="middle" font-family="Arial,sans-serif" font-size="16" fill="#7b432b">YOLO</text><path d="M194 99h20m8 0h20m8 0h16" stroke="#d5a890" stroke-width="3" stroke-linecap="round"/><path d="M286 87h90m-6-5 6 5-6 5" stroke="#b07c60" stroke-width="1.5"/><circle cx="388" cy="87" r="11" fill="#a25b3b"/><path d="m383 87 4 4 6-8" stroke="#fff9f2" stroke-width="1.5"/><path d="M230 117v31h113V99" stroke="#b07c60" stroke-dasharray="3 4"/><rect x="254" y="135" width="75" height="26" rx="6" fill="#fff9f2" stroke="#c89a7f"/><text x="291" y="152" text-anchor="middle" font-family="Arial,sans-serif" font-size="12" fill="#7b432b">Gemma 3</text></svg>',

  game: '<svg viewBox="0 0 350 140" fill="none" xmlns="http://www.w3.org/2000/svg"><ellipse cx="175" cy="75" rx="120" ry="40" stroke="#bcbfe0" stroke-dasharray="3 6"/><path d="M175 76 72 52m103 24 103-24M175 76l-64 40m64-40 64 40M175 76V22" stroke="#bcbfe0"/><circle cx="175" cy="76" r="25" fill="#4e5595"/><path d="M181 63a13 13 0 1 0 6 22 15 15 0 0 1-6-22Z" fill="#ececf7"/><g fill="#f8f8fd" stroke="#929ac8"><circle cx="72" cy="52" r="13"/><circle cx="278" cy="52" r="13"/><circle cx="111" cy="116" r="13"/><circle cx="239" cy="116" r="13"/><circle cx="175" cy="22" r="13"/></g><g fill="#646da2"><circle cx="72" cy="52" r="4"/><circle cx="278" cy="52" r="4"/><circle cx="111" cy="116" r="4"/><circle cx="239" cy="116" r="4"/><circle cx="175" cy="22" r="4"/></g></svg>',
  bridge: '<svg viewBox="0 0 350 140" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M26 105h298M30 119h290" stroke="#b4c7b8"/><path d="M55 99V75Q175-22 295 75v24h-28Q175-16 83 99Z" fill="#c3d3c5" stroke="#6d8b74" stroke-width="1.5"/><path d="M58 73Q175-22 292 73" stroke="#315440" stroke-width="3"/><path d="M112 42v34m42-52v24m42-24v25m42-6v34" stroke="#7c9b82"/><path d="M32 99h286" stroke="#6d8b74" stroke-dasharray="2 5"/><circle cx="55" cy="75" r="4" fill="#2859e8"/><circle cx="175" cy="25" r="4" fill="#2859e8"/><circle cx="295" cy="75" r="4" fill="#2859e8"/></svg>',
  // 2–2–1 网络：前向连接在上，梯度沿下方虚线回到隐藏层。
  mlp: '<svg viewBox="0 0 420 152" fill="none" xmlns="http://www.w3.org/2000/svg"><g stroke="#c9a2b5" stroke-width="1.8"><path d="M68 52 173 46M68 62 173 122M68 110 173 50M68 120 173 126M219 50 316 80M219 122 316 92"/></g><g fill="#fdf8fa" stroke="#b2839a" stroke-width="1.7"><circle cx="46" cy="56" r="22"/><circle cx="46" cy="116" r="22"/><circle cx="196" cy="46" r="23"/><circle cx="196" cy="126" r="23"/></g><circle cx="340" cy="86" r="24" fill="#7b4a63"/><g font-family="Arial,sans-serif" font-size="15" text-anchor="middle" fill="#7b4a63"><text x="46" y="61">x₁</text><text x="46" y="121">x₂</text><text x="196" y="51">h₁</text><text x="196" y="131">h₂</text></g><text x="340" y="91" font-family="Arial,sans-serif" font-size="15" text-anchor="middle" fill="#fdf6f9">ŷ</text><text x="196" y="16" font-family="Arial,sans-serif" font-size="11" text-anchor="middle" fill="#8c6277">sigmoid</text><text x="120" y="34" font-family="Arial,sans-serif" font-size="11" text-anchor="middle" fill="#8c6277">W</text><text x="266" y="52" font-family="Arial,sans-serif" font-size="11" text-anchor="middle" fill="#8c6277">v</text><path d="M338 110C338 136 290 142 232 133" stroke="#a9738d" stroke-width="1.4" stroke-dasharray="3 4"/><path d="m240 129-8 4 8 4" stroke="#a9738d" stroke-width="1.4"/></svg>',
};
document.title = content.title;
$("meta[name='description']").content = content.description;
$("meta[property='og:title']").content = content.title;
$("meta[property='og:description']").content = content.description;
document.querySelectorAll('[data-name]').forEach(node => { node.textContent = content.name; });
$('.brand').setAttribute('aria-label', `${content.name}，返回顶部`);
text('#contact-heading', content.contactHeading);
text('#contact-text', content.contactText);
text('#year', new Date().getFullYear());
text('#email-link', content.email);
$('#email-link').href = $('#send-email').href = `mailto:${content.email}`;

const projectTheme = project => Object.hasOwn(drawings, project.visual) ? project.visual : 'fire';
const volume = number => String(number).padStart(2, '0');

function renderFeature(project, index) {
  const { feature } = project;
  const states = feature.kind === 'xor'
    ? project.sections.find(section => section.key === 'xor-results').table.rows.map(row => ({
      label: `(${row[0].replace(' ', ', ')})`,
      text: `目标值为 ${row[1]}。以 0.5 为分类阈值，预测为 ${row[4]}。`,
      row
    }))
    : feature.states;
  const block = element('section', 'chapter-feature');
  const title = element('h2', 'feature-title', feature.title);
  title.id = `feature-title-${index}`;
  block.setAttribute('aria-labelledby', title.id);
  const header = element('header', 'feature-header');
  header.append(element('p', 'feature-label', feature.label), title);
  const controls = element('div', 'feature-controls');
  controls.setAttribute('role', 'group');
  controls.setAttribute('aria-label', '切换演示');
  const stage = element('div', 'feature-stage');
  stage.id = `feature-stage-${index}`;
  const visual = element('div', 'feature-visual');
  const note = element('p', 'feature-note');
  note.setAttribute('aria-live', 'polite');
  stage.append(visual, note);
  const buttons = states.map(state => {
    const button = element('button', 'feature-option', state.label);
    button.type = 'button';
    button.setAttribute('aria-controls', stage.id);
    return button;
  });
  function show(position) {
    buttons.forEach((button, key) => {
      button.setAttribute('aria-pressed', String(key === position));
    });
    visual.replaceChildren(renderChapterVisual(feature.kind, position, states[position]));
    note.textContent = states[position].text;
  }
  buttons.forEach((button, position) => {
    button.addEventListener('click', () => show(position));
    button.addEventListener('keydown', event => {
      const direction = event.key === 'ArrowLeft' ? -1 : event.key === 'ArrowRight' ? 1 : 0;
      if (!direction) return;
      event.preventDefault();
      const target = (position + direction + states.length) % states.length;
      show(target);
      buttons[target].focus();
    });
  });
  controls.append(...buttons);
  block.append(header, controls, stage);
  show(0);
  return block;
}

function renderResultFigure(section) {
  const figure = element('figure', 'detail-figure chapter-evidence');
  const link = element('a', 'figure-link');
  link.href = section.image;
  link.target = '_blank';
  link.rel = 'noopener';
  const image = element('img');
  image.src = section.image;
  image.alt = section.imageAlt || '';
  image.decoding = 'async';
  link.append(image);
  figure.append(link);
  if (section.figureCaption) figure.append(element('figcaption', '', section.figureCaption));
  return figure;
}

function renderProjects(projects) {
  const fragment = document.createDocumentFragment();
  projects.forEach((project, index) => {
    const theme = projectTheme(project);
    const article = element('article', `project theme-${theme}`);
    article.id = project.id;
    article.hidden = true;
    const headingId = `project-heading-${index}`;
    article.setAttribute('aria-labelledby', headingId);
    const intro = element('div', 'project-intro');
    const metadata = element('div', 'project-meta');
    metadata.append(element('span','project-number',`CH. ${volume(index + 1)}`),element('span','project-category',project.category));
    const heading = element('h1', 'project-title', project.title);
    heading.id = headingId;
    heading.tabIndex = -1;
    intro.append(metadata, heading);
    if (project.feature) intro.append(element('p', 'chapter-question', project.feature.question));
    intro.append(element('p','project-summary',project.summary));
    const agent = element('div','project-agent');
    agent.append(element('span','agent-caption','协作 Agent'),element('span','agent-badge',project.agent));
    intro.append(agent);

    const facts = element('div', 'project-facts');
    [['协作任务',project.collaboration],['完成成果',project.outcome]].forEach(([label,value],i) => {
      const fact = element('div',i ? 'fact outcome' : 'fact');
      fact.append(element('h2','fact-label',label),element('p','',value));
      facts.append(fact);
    });

    const details = element('details','project-details');
    const summary = element('summary','');
    const action = element('span','detail-action','展开技术细节');
    summary.setAttribute('aria-label',`${project.title}：展开项目详情`);
    const icon = element('span','detail-icon','+');
    icon.setAttribute('aria-hidden','true');
    summary.append(action,icon);
    details.append(summary);
    const sections = element('div','detail-sections');
    const tags = element('ul','project-tags');
    tags.setAttribute('aria-label','项目技术');
    project.technologies.forEach(tag=>tags.append(element('li','',tag)));
    sections.append(tags);
    const evidence = project.sections.find(section => section.highlight && section.image);
    project.sections.forEach(section => {
      if (section === evidence || ['任务目标', 'Agent 协作'].includes(section.title)) return;
      const block = element('div','detail-section');
      block.append(element('h2','',section.title));
      if(section.text) block.append(element('p','',section.text));
      if(section.items) {
        const list=element('ul','');
        section.items.forEach(value=>list.append(element('li','',value)));
        block.append(list);
      }
      if(section.table) {
        const head=element('tr','');
        section.table.head.forEach(value=>head.append(element('th','',value)));
        const thead=element('thead','');
        thead.append(head);
        const tbody=element('tbody','');
        section.table.rows.forEach(row=>{
          const tr=element('tr','');
          row.forEach(value=>tr.append(element('td','',value)));
          tbody.append(tr);
        });
        const table=element('table','detail-table');
        table.append(thead,tbody);
        const wrap=element('div','table-wrap');
        wrap.append(table);
        block.append(wrap);
      }
      if(section.code) {
        const pre=element('pre','detail-code');
        pre.append(element('code','',section.code));
        block.append(pre);
      }
      if(section.image) block.append(renderResultFigure(section));
      if(section.figure && drawings[section.figure]) {
        const figure=element('figure','detail-figure');
        const art=element('div','figure-art');
        art.setAttribute('aria-hidden','true');
        art.innerHTML=drawings[section.figure];
        figure.append(art);
        if(section.figureCaption) figure.append(element('figcaption','',section.figureCaption));
        block.append(figure);
      }
      sections.append(block);
    });
    details.append(sections);
    details.addEventListener('toggle',()=>{
      action.textContent=details.open?'收起技术细节':'展开技术细节';
      summary.setAttribute('aria-label',`${project.title}：${details.open?'收起':'展开'}项目详情`);
      icon.textContent=details.open?'−':'+';
    });
    article.append(intro, facts);
    if (project.feature) article.append(renderFeature(project, index));
    if (evidence) article.append(renderResultFigure(evidence));
    article.append(details);
    fragment.append(article);
  });
  $('#project-list').replaceChildren(fragment);
  return [...$('#project-list').children];
}

function setupBookshelf(projects, chapters) {
  const shelf = $('#projects');
  const reader = $('#reader');
  const scroll = $('.shelf-scroll');
  const bookList = $('#shelf-books');
  const motion = matchMedia('(prefers-reduced-motion: reduce)');
  const read = $('#preview-read');
  let selected = -1;
  let hoverTimer;
  let hoverBook;
  let touchInput = false;
  const books = projects.map((project, index) => {
    const title = project.previewTitle || project.title;
    const button = element('button', `shelf-book theme-${projectTheme(project)}`);
    button.type = 'button';
    button.setAttribute('aria-label', `${volume(index + 1)} · ${project.title}`);
    const book = element('span', 'book-object');
    book.setAttribute('aria-hidden', 'true');
    const spine = element('span', 'book-spine');
    spine.append(element('span', 'book-number', volume(index + 1)), element('span', 'spine-title', title));
    const cover = element('span', 'book-cover');
    const art = element('span', 'cover-art');
    art.innerHTML = drawings[projectTheme(project)];
    cover.append(element('span', 'book-number', `VOL. ${volume(index + 1)}`), element('strong', 'cover-title', title), art, element('span', 'cover-agent', project.agent));
    book.append(spine, cover, element('span', 'book-pages'));
    button.append(book);
    button.addEventListener('pointerdown', event => {
      touchInput = event.pointerType === 'touch' || event.pointerType === 'pen';
    });
    button.addEventListener('click', event => {
      clearTimeout(hoverTimer);
      const tap = event.pointerType === 'touch' || event.pointerType === 'pen' ||
        (!event.pointerType && event.detail > 0 && touchInput);
      if (tap && index !== selected) select(index, true);
      else location.hash = project.id;
    });
    button.addEventListener('keydown', event => {
      const direction = { ArrowLeft: -1, ArrowRight: 1 }[event.key];
      const target = direction ? (index + direction + books.length) % books.length
        : event.key === 'Home' ? 0 : event.key === 'End' ? books.length - 1 : null;
      if (target === null) return;
      event.preventDefault();
      select(target, true);
      books[target].focus({ preventScroll: true });
    });
    return button;
  });
  if (!books.length) {
    shelf.append(element('p', 'shelf-hint', '暂无项目。'));
    return;
  }
  bookList.replaceChildren(...books);
  $('#shelf-layout').hidden = false;
  bookList.addEventListener('pointermove', event => {
    if (event.pointerType !== 'mouse') return;
    const book = event.target.closest('.shelf-book');
    if (book === hoverBook) return;
    clearTimeout(hoverTimer);
    hoverBook = book;
    const index = books.indexOf(book);
    if (index >= 0 && index !== selected) hoverTimer = setTimeout(() => select(index), 120);
  });
  bookList.addEventListener('pointerleave', () => {
    clearTimeout(hoverTimer);
    hoverBook = null;
  });
  const counter = index => `${volume(index + 1)} / ${volume(books.length)}`;

  function select(index, reveal = false) {
    clearTimeout(hoverTimer);
    if (index !== selected) {
      selected = index;
      const project = projects[index];
      books.forEach((book, position) => {
        book.setAttribute('aria-pressed', String(position === index));
        book.dataset.position = position < index ? 'before' : position > index ? 'after' : 'selected';
      });
      text('#shelf-count', counter(index));
      text('#preview-caption', `${counter(index)}  /  ${project.category}`);
      text('#preview-title', project.title);
      text('#preview-agent', `协作 Agent · ${project.agent}`);
      text('#preview-result', project.outcome);
      text('#shelf-status', `已选中 ${project.title}，${counter(index)}`);
      read.href = `#${project.id}`;
    }
    if (reveal && !shelf.hidden) {
      const bounds = scroll.getBoundingClientRect();
      const book = books[index].getBoundingClientRect();
      if (book.left < bounds.left + 24 || book.right > bounds.right - 24) {
        scroll.scrollBy({ left: book.left + book.width / 2 - bounds.left - bounds.width / 2, behavior: motion.matches ? 'instant' : 'smooth' });
      }
    }
  }
  for (const [selector, direction] of [['#shelf-prev', -1], ['#shelf-next', 1]]) {
    const control = $(selector);
    control.disabled = books.length < 2;
    control.addEventListener('click', () => select((selected + direction + books.length) % books.length, true));
  }
  function chapterLink(selector, project, label) {
    const link = $(selector);
    link.hidden = !project;
    if (project) {
      link.href = `#${project.id}`;
      link.textContent = `${label} · ${project.previewTitle || project.title}`;
    }
  }
  function route(fromHashChange = false) {
    const hash = location.hash;
    const index = projects.findIndex(project => `#${project.id}` === hash);
    clearTimeout(hoverTimer);
    shelf.hidden = index >= 0;
    reader.hidden = index < 0;
    chapters.forEach((chapter, position) => { chapter.hidden = position !== index; });
    const shelfLink = $('.site-header a[href="#projects"]');
    if (index < 0 && (!hash || hash === '#projects')) shelfLink.setAttribute('aria-current', 'location');
    else shelfLink.removeAttribute('aria-current');
    if (index >= 0) {
      select(index);
      chapterLink('#chapter-prev', projects[index - 1], '← 上一章');
      chapterLink('#chapter-next', projects[index + 1], '下一章 →');
      chapters[index].querySelector('.project-title').focus({ preventScroll: true });
      reader.scrollIntoView({ behavior: 'instant' });
    } else if (hash === '#projects') {
      select(selected, true);
      $('#shelf-heading').focus({ preventScroll: true });
      shelf.scrollIntoView({ behavior: 'instant' });
    } else if (fromHashChange) {
      if (!hash || hash === '#top') select(selected, true);
      document.getElementById(hash.slice(1) || 'top')?.scrollIntoView({ behavior: 'instant' });
    }
  }
  select(0);
  route();
  window.addEventListener('hashchange', () => route(true));
}

setupBookshelf(content.projects, renderProjects(content.projects));
$('#copy-email').addEventListener('click', async () => {
  const button = $('#copy-email');
  try {
    if (navigator.clipboard && window.isSecureContext) await navigator.clipboard.writeText(content.email);
    else {
      const input = element('textarea', 'clipboard-input', content.email);
      input.setAttribute('readonly', '');
      document.body.append(input);
      let copied;
      try { input.select(); copied = document.execCommand('copy'); }
      finally { input.remove(); button.focus({preventScroll:true}); }
      if (!copied) throw new Error('Copy unavailable');
    }
    text('#copy-status', '邮箱已复制，期待你的来信。');
  } catch { text('#copy-status', '暂时无法自动复制，请长按或选中上方邮箱复制。'); }
});
