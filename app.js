import { content } from './content.js?v=20261020-lebo';
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

text('#projects-heading', content.projectsHeading);
text('#projects-introduction', content.projectsIntroduction);
text('#contact-heading', content.contactHeading);
text('#contact-text', content.contactText);
text('#year', new Date().getFullYear());
text('#email-link', content.email);
$('#email-link').href = $('#send-email').href = `mailto:${content.email}`;

function renderProjects(projects) {
  const fragment = document.createDocumentFragment();
  const previews = document.createDocumentFragment();
  projects.forEach((project, index) => {
    const theme = ['fire','support','game','bridge'].includes(project.visual) ? project.visual : 'fire';
    const number = String(index + 1).padStart(2, '0');
    const preview = element('a', `project-preview theme-${theme}`);
    preview.href = `#${project.id}`;
    const thumb = element('span', 'preview-art');
    thumb.setAttribute('aria-hidden','true');
    thumb.innerHTML = drawings[theme];
    const caption = element('span', 'preview-caption');
    caption.append(element('strong','',project.previewTitle || project.title), element('small','',project.previewTag || project.category));
    const arrow = element('span','preview-arrow','↗');
    arrow.setAttribute('aria-hidden','true');
    preview.append(thumb, caption, arrow);
    previews.append(preview);

    const article = element('article', `project theme-${theme}`);
    article.id = project.id;
    const headingId = `project-heading-${index}`;
    article.setAttribute('aria-labelledby', headingId);
    const intro = element('div', 'project-intro');
    const metadata = element('div', 'project-meta');
    metadata.append(element('span','project-number',number),element('span','project-category',project.category));
    const heading = element('h3', 'project-title', project.title);
    heading.id = headingId;
    intro.append(metadata, heading, element('p','project-summary',project.summary));
    const agent = element('div','project-agent');
    agent.append(element('span','agent-caption','协作 Agent'),element('span','agent-badge',project.agent));
    intro.append(agent);

    const facts = element('div', 'project-facts');
    [['协作任务',project.collaboration],['完成成果',project.outcome]].forEach(([label,value],i) => {
      const fact = element('div',i ? 'fact outcome' : 'fact');
      fact.append(element('h4','fact-label',label),element('p','',value));
      facts.append(fact);
    });

    const visual = element('figure', 'project-visual');
    const visualTop = element('div', 'visual-top');
    visualTop.append(element('span','',project.visualTitle || project.subtitle),element('span','diagram-label','流程示意'));
    const art = element('div', 'visual-art');
    art.setAttribute('aria-hidden', 'true');
    art.innerHTML = drawings[theme];
    const flow = element('ol', 'flow');
    (project.flow || []).forEach(step => {
      const li = element('li','');
      li.append(element('strong','',step.label),element('small','',step.note));
      flow.append(li);
    });
    visual.append(visualTop,art,flow,element('figcaption','',project.diagramNote || '项目流程示意'));

    const details = element('details','project-details');
    const summary = element('summary','');
    const action = element('span','detail-action','查看过程与思考');
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
    project.sections.forEach(section => {
      const block = element('div','detail-section');
      block.append(element('h4','',section.title));
      if(section.text) block.append(element('p','',section.text));
      if(section.items) {
        const list=element('ul','');
        section.items.forEach(value=>list.append(element('li','',value)));
        block.append(list);
      }
      sections.append(block);
    });
    details.append(sections);
    details.addEventListener('toggle',()=>{
      action.textContent=details.open?'收起项目详情':'查看过程与思考';
      summary.setAttribute('aria-label',`${project.title}：${details.open?'收起':'展开'}项目详情`);
      icon.textContent=details.open?'−':'+';
    });
    // 文档顺序即手机阅读顺序：先理解项目与成果，再看示意图。
    article.append(intro,facts,visual,details);
    fragment.append(article);
  });
  $('#project-list').replaceChildren(fragment);
  $('#hero-projects').replaceChildren(previews);
  $('.hero-index').hidden = projects.length === 0;
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
