import { content } from "./content.js";

const $ = (selector) => document.querySelector(selector);
const text = (selector, value) => { $(selector).textContent = value; };
function element(tag, className, value) {
  const node = document.createElement(tag);
  if (className) node.className = className;
  if (value !== undefined) node.textContent = value;
  return node;
}

document.title = content.title;
$("meta[name='description']").content = content.description;
$("meta[property='og:title']").content = content.title;
$("meta[property='og:description']").content = content.description;
document.querySelectorAll("[data-name]").forEach(node => { node.textContent = content.name; });
$(".brand").setAttribute("aria-label", `${content.name}，返回顶部`);
$("#hero-name").replaceChildren(document.createTextNode(content.name), element("span", "name-dot", "."));
$(".name-dot").setAttribute("aria-hidden", "true");
text("#roman-name", content.romanName);
text("#hero-eyebrow", content.hero.eyebrow);
content.hero.heading.forEach(line => $("#hero-heading").append(element("span", "heading-line", line)));
text("#hero-introduction", content.hero.introduction);
text("#hero-note", content.hero.note);
text("#projects-heading", content.projectsHeading);
text("#projects-introduction", content.projectsIntroduction);
text("#contact-heading", content.contactHeading);
text("#contact-text", content.contactText);
text("#year", new Date().getFullYear());
text("#email-link", content.email);
$("#email-link").href = `mailto:${content.email}`;
$("#send-email").href = `mailto:${content.email}`;

function renderProjects(projects) {
  const fragment = document.createDocumentFragment();
  projects.forEach((project, index) => {
    const article = element("article", "project");
    article.id = project.id;
    const headingId = `project-heading-${index}`;
    article.setAttribute("aria-labelledby", headingId);
    const number = element("div", "project-number", String(index + 1).padStart(2, "0"));
    number.setAttribute("aria-hidden", "true");
    const body = element("div", "project-body");
    body.append(element("p", "project-category", project.category));
    const heading = element("h3", "project-title", project.title);
    heading.id = headingId;
    body.append(heading, element("p", "project-subtitle", project.subtitle), element("p", "project-summary", project.summary));
    const tags = element("ul", "project-tags");
    tags.setAttribute("aria-label", "项目技术");
    project.technologies.forEach(tag => tags.append(element("li", "", tag)));
    body.append(tags);
    const highlights = element("ul", "project-highlights");
    project.highlights.forEach(value => highlights.append(element("li", "", value)));
    body.append(highlights);
    const details = element("details", "project-details");
    const summary = element("summary", "");
    const summaryLabel = element("span", "detail-action", "展开项目详情");
    const icon = element("span", "detail-icon", "+");
    icon.setAttribute("aria-hidden", "true");
    summary.append(summaryLabel, icon);
    details.append(summary);
    const sections = element("div", "detail-sections");
    project.sections.forEach(section => {
      const block = element("div", "detail-section");
      block.append(element("h4", "", section.title));
      if (section.text) block.append(element("p", "", section.text));
      if (section.items) {
        const list = element("ul", "");
        section.items.forEach(value => list.append(element("li", "", value)));
        block.append(list);
      }
      sections.append(block);
    });
    details.append(sections);
    details.addEventListener("toggle", () => {
      summaryLabel.textContent = details.open ? "收起项目详情" : "展开项目详情";
      icon.textContent = details.open ? "−" : "+";
    });
    body.append(details);
    article.append(number, body);
    fragment.append(article);
  });
  $("#project-list").replaceChildren(fragment);
}
renderProjects(content.projects);

$("#copy-email").addEventListener("click", async () => {
  const button = $("#copy-email");
  try {
    if (navigator.clipboard && window.isSecureContext) {
      await navigator.clipboard.writeText(content.email);
    } else {
      const input = element("textarea", "clipboard-input", content.email);
      input.setAttribute("readonly", "");
      document.body.append(input);
      let copied;
      try { input.select(); copied = document.execCommand("copy"); }
      finally { input.remove(); button.focus({ preventScroll: true }); }
      if (!copied) throw new Error("Copy unavailable");
    }
    text("#copy-status", "邮箱已复制，期待你的来信。");
  } catch {
    text("#copy-status", "暂时无法自动复制，请长按或选中上方邮箱复制。");
  }
});
