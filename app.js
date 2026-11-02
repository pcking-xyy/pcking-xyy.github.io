import { content } from './content.js?v=20261102-xor';
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
  // 由真实训练数据生成的损失曲线：实线 TensorFlow，虚线 PyTorch。
  lossCurve: '<svg viewBox="0 0 420 150" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M48 92.7H404" stroke="#ecebe5" stroke-width="1"/><path d="M48 57.3H404" stroke="#ecebe5" stroke-width="1"/><path d="M48 22.0H404" stroke="#ecebe5" stroke-width="1"/><path d="M48 22V128H404" stroke="#cfc8bd" stroke-width="1.2"/><text x="48.0" y="141" font-family="Arial,sans-serif" font-size="9" text-anchor="middle" fill="#8c8279">0</text><text x="167.1" y="141" font-family="Arial,sans-serif" font-size="9" text-anchor="middle" fill="#8c8279">100</text><text x="286.1" y="141" font-family="Arial,sans-serif" font-size="9" text-anchor="middle" fill="#8c8279">200</text><text x="405.2" y="141" font-family="Arial,sans-serif" font-size="9" text-anchor="middle" fill="#8c8279">300</text><text x="40" y="131.0" font-family="Arial,sans-serif" font-size="9" text-anchor="end" fill="#8c8279">0</text><text x="40" y="95.7" font-family="Arial,sans-serif" font-size="9" text-anchor="end" fill="#8c8279">0.2</text><text x="40" y="60.3" font-family="Arial,sans-serif" font-size="9" text-anchor="end" fill="#8c8279">0.4</text><text x="40" y="25.0" font-family="Arial,sans-serif" font-size="9" text-anchor="end" fill="#8c8279">0.6</text><path d="M48.0 28.7L51.6 33.9L55.1 38.4L58.7 42.7L62.3 46.8L65.9 50.7L69.4 54.3L73.0 57.8L76.6 61.0L80.1 64.1L83.7 67.0L87.3 69.7L90.9 72.3L94.4 74.8L98.0 77.2L101.6 79.5L105.2 81.7L108.7 83.7L112.3 85.7L115.9 87.6L119.4 89.3L123.0 91.0L126.6 92.6L130.2 94.1L133.7 95.5L137.3 96.9L140.9 98.1L144.4 99.3L148.0 100.4L151.6 101.5L155.2 102.5L158.7 103.5L162.3 104.4L165.9 105.2L169.4 106.0L173.0 106.8L176.6 107.5L180.2 108.2L183.7 108.9L187.3 109.5L190.9 110.1L194.4 110.7L198.0 111.2L201.6 111.7L205.2 112.2L208.7 112.7L212.3 113.1L215.9 113.5L219.5 113.9L223.0 114.3L226.6 114.7L230.2 115.0L233.7 115.4L237.3 115.7L240.9 116.0L244.5 116.3L248.0 116.6L251.6 116.9L255.2 117.2L258.7 117.4L262.3 117.7L265.9 117.9L269.5 118.1L273.0 118.3L276.6 118.6L280.2 118.8L283.7 119.0L287.3 119.2L290.9 119.3L294.5 119.5L298.0 119.7L301.6 119.9L305.2 120.0L308.7 120.2L312.3 120.3L315.9 120.5L319.5 120.6L323.0 120.8L326.6 120.9L330.2 121.0L333.8 121.2L337.3 121.3L340.9 121.4L344.5 121.5L348.0 121.6L351.6 121.7L355.2 121.8L358.8 121.9L362.3 122.0L365.9 122.1L369.5 122.2L373.0 122.3L376.6 122.4L380.2 122.5L383.8 122.6L387.3 122.7L390.9 122.8L394.5 122.8L398.0 122.9L401.6 123.0L404.0 123.0" stroke="#c08aa4" stroke-width="1.6" stroke-dasharray="4 3"/><path d="M48.0 28.7L51.6 33.9L55.1 38.4L58.7 42.7L62.3 46.8L65.9 50.7L69.4 54.3L73.0 57.8L76.6 61.0L80.1 64.1L83.7 67.0L87.3 69.7L90.9 72.3L94.4 74.8L98.0 77.2L101.6 79.5L105.2 81.7L108.7 83.7L112.3 85.7L115.9 87.6L119.4 89.3L123.0 91.0L126.6 92.6L130.2 94.1L133.7 95.5L137.3 96.9L140.9 98.1L144.4 99.3L148.0 100.4L151.6 101.5L155.2 102.5L158.7 103.5L162.3 104.4L165.9 105.2L169.4 106.0L173.0 106.8L176.6 107.5L180.2 108.2L183.7 108.9L187.3 109.5L190.9 110.1L194.4 110.7L198.0 111.2L201.6 111.7L205.2 112.2L208.7 112.7L212.3 113.1L215.9 113.5L219.5 113.9L223.0 114.3L226.6 114.7L230.2 115.0L233.7 115.4L237.3 115.7L240.9 116.0L244.5 116.3L248.0 116.6L251.6 116.9L255.2 117.2L258.7 117.4L262.3 117.7L265.9 117.9L269.5 118.1L273.0 118.3L276.6 118.6L280.2 118.8L283.7 119.0L287.3 119.2L290.9 119.3L294.5 119.5L298.0 119.7L301.6 119.9L305.2 120.0L308.7 120.2L312.3 120.3L315.9 120.5L319.5 120.6L323.0 120.8L326.6 120.9L330.2 121.0L333.8 121.2L337.3 121.3L340.9 121.4L344.5 121.5L348.0 121.6L351.6 121.7L355.2 121.8L358.8 121.9L362.3 122.0L365.9 122.1L369.5 122.2L373.0 122.3L376.6 122.4L380.2 122.5L383.8 122.6L387.3 122.7L390.9 122.8L394.5 122.8L398.0 122.9L401.6 123.0L404.0 123.0" stroke="#7b4a63" stroke-width="2"/><circle cx="48.0" cy="28.7" r="2.6" fill="#7b4a63"/><circle cx="404.0" cy="123.0" r="2.6" fill="#7b4a63"/><text x="56.0" y="22.7" font-family="Arial,sans-serif" font-size="9" fill="#7b4a63">0.562</text><text x="400.0" y="114.0" font-family="Arial,sans-serif" font-size="9" text-anchor="end" fill="#7b4a63">0.028</text></svg>'
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
    const theme = ['fire','support','game','bridge','mlp'].includes(project.visual) ? project.visual : 'fire';
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
