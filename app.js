import { content } from './content.js?v=20261019';
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
  fire: '<svg viewBox="0 0 350 180" fill="none" xmlns="http://www.w3.org/2000/svg"><circle cx="175" cy="90" r="77" stroke="#b9cbe4" stroke-dasharray="3 7"/><circle cx="175" cy="90" r="56" fill="#dce6fa"/><path d="M177 39c8 27-17 32-9 49 9-3 12-14 12-14 29 21 35 39 22 56-13 18-49 18-62-2-16-24 8-42 16-53 6-9 16-21 21-36Z" fill="#2859e8"/><path d="M177 98c5 13 16 16 13 28-3 10-21 13-27 2-5-10 7-17 14-30Z" fill="#eaf0fa"/><path d="M27 90h45m206 0h45M68 86l5 4-5 4m250-8 5 4-5 4" stroke="#7291bf" stroke-width="1.5"/><rect x="17" y="80" width="16" height="20" rx="3" fill="#b9cbe4"/><circle cx="324" cy="90" r="9" stroke="#2859e8"/><path d="m320 90 3 3 5-6" stroke="#2859e8"/></svg>',
  game: '<svg viewBox="0 0 350 140" fill="none" xmlns="http://www.w3.org/2000/svg"><ellipse cx="175" cy="75" rx="120" ry="40" stroke="#c4bfb1" stroke-dasharray="3 6"/><path d="M175 76 72 52m103 24 103-24M175 76l-64 40m64-40 64 40M175 76V22" stroke="#c4bfb1"/><circle cx="175" cy="76" r="25" fill="#293e55"/><path d="M181 63a13 13 0 1 0 6 22 15 15 0 0 1-6-22Z" fill="#f0ede7"/><g fill="#f9f7f2" stroke="#9d998d"><circle cx="72" cy="52" r="13"/><circle cx="278" cy="52" r="13"/><circle cx="111" cy="116" r="13"/><circle cx="239" cy="116" r="13"/><circle cx="175" cy="22" r="13"/></g><g fill="#607080"><circle cx="72" cy="52" r="4"/><circle cx="278" cy="52" r="4"/><circle cx="111" cy="116" r="4"/><circle cx="239" cy="116" r="4"/><circle cx="175" cy="22" r="4"/></g></svg>',
  bridge: '<svg viewBox="0 0 350 140" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M26 105h298M30 119h290" stroke="#b4c7b8"/><path d="M55 99V75Q175-22 295 75v24h-28Q175-16 83 99Z" fill="#c3d3c5" stroke="#6d8b74" stroke-width="1.5"/><path d="M58 73Q175-22 292 73" stroke="#315440" stroke-width="3"/><path d="M112 42v34m42-52v24m42-24v25m42-6v34" stroke="#7c9b82"/><path d="M32 99h286" stroke="#6d8b74" stroke-dasharray="2 5"/><circle cx="55" cy="75" r="4" fill="#2859e8"/><circle cx="175" cy="25" r="4" fill="#2859e8"/><circle cx="295" cy="75" r="4" fill="#2859e8"/></svg>'
};
document.title = content.title;
$("meta[name='description']").content = content.description;
$("meta[property='og:title']").content = content.title;
$("meta[property='og:description']").content = content.description;
document.querySelectorAll('[data-name]').forEach(node => { node.textContent = content.name; });
$('.brand').setAttribute('aria-label', `${content.name}，返回顶部`);
text('#hero-eyebrow', content.hero.eyebrow);
content.hero.heading.forEach(line => $('#hero-heading').append(element('span', 'heading-line', line)));
text('#hero-introduction', content.hero.introduction);
text('#hero-note', content.hero.note);
text('#projects-heading', content.projectsHeading);
text('#projects-introduction', content.projectsIntroduction);
text('#contact-heading', content.contactHeading);
text('#contact-text', content.contactText);
text('#year', new Date().getFullYear());
text('#email-link', content.email);
$('#email-link').href = $('#send-email').href = `mailto:${content.email}`;

function renderProjects(projects) {
  const fragment = document.createDocumentFragment();
  projects.forEach((project, index) => {
    const article = element('article', 'project');
    article.id = project.id;
    const headingId = `project-heading-${index}`;
    article.setAttribute('aria-labelledby', headingId);
    const visual = element('figure', `project-visual visual-${project.visual || 'fire'}`);
    const top = element('div', 'visual-top');
    top.append(element('span', 'project-number', String(index + 1).padStart(2, '0')), element('span', '', 'CONCEPT / 流程示意'));
    const art = element('div', 'visual-art');
    art.setAttribute('aria-hidden', 'true');
    art.innerHTML = drawings[project.visual] || drawings.fire;
    const flow = element('ol', 'flow');
    (project.flow || []).forEach(step => {
      const li = element('li', '');
      li.append(element('strong', '', step.label), element('small', '', step.note));
      flow.append(li);
    });
    visual.append(top, art, flow, element('figcaption', '', project.diagramNote || '项目流程示意'));
    const body = element('div', 'project-body');
    body.append(element('p', 'project-category', project.category));
    const row = element('div', 'project-heading-row');
    const heading = element('h3', 'project-title', project.title);
    heading.id = headingId;
    row.append(heading, element('span', 'agent-badge', `Agent · ${project.agent}`));
    body.append(row, element('p', 'project-subtitle', project.subtitle), element('p', 'project-summary', project.summary));
    const tags = element('ul', 'project-tags');
    tags.setAttribute('aria-label', '项目技术');
    project.technologies.forEach(tag => tags.append(element('li', '', tag)));
    const facts = element('div', 'project-facts');
    [['如何协作',project.collaboration],['取得的成果',project.outcome]].forEach(([label,value]) => {
      const fact = element('div', '');
      fact.append(element('span', 'fact-label', label), element('p', '', value));
      facts.append(fact);
    });
    body.append(tags, facts);
    const details = element('details', 'project-details');
    const summary = element('summary', '');
    const action = element('span', 'detail-action', '展开项目详情');
    const icon = element('span', 'detail-icon', '+');
    icon.setAttribute('aria-hidden', 'true');
    summary.append(action, icon);
    details.append(summary);
    const sections = element('div', 'detail-sections');
    project.sections.forEach(section => {
      const block = element('div', 'detail-section');
      block.append(element('h4', '', section.title));
      if (section.text) block.append(element('p', '', section.text));
      if (section.items) {
        const list = element('ul', '');
        section.items.forEach(value => list.append(element('li', '', value)));
        block.append(list);
      }
      sections.append(block);
    });
    details.append(sections);
    details.addEventListener('toggle', () => {
      action.textContent = details.open ? '收起项目详情' : '展开项目详情';
      icon.textContent = details.open ? '−' : '+';
    });
    body.append(details);
    article.append(visual, body);
    fragment.append(article);
  });
  $('#project-list').replaceChildren(fragment);
}
renderProjects(content.projects);
const practice = content.practice;
text('#practice-heading', practice.title);
text('#practice-introduction', practice.introduction);
practice.steps.forEach((step,index) => {
  const li = element('li', 'practice-step');
  const number = element('span','step-number');
  number.setAttribute('aria-hidden','true');
  number.append(element('span','',String(index+1).padStart(2,'0')),element('span','',index===practice.steps.length-1?'↺':'→'));
  li.append(number, element('h3','',step.title),element('p','',step.text));
  $('#practice-steps').append(li);
});
text('#website-agent', `Agent · ${practice.website.agent}`);
text('#website-title', practice.website.title);
text('#website-text', practice.website.text);
text('#website-result', practice.website.result);
text('#practice-reflection', practice.reflection);
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
