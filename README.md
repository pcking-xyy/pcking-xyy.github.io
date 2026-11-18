# pcking-xyy.github.io
夏杨阳的个人作品网站。首页用书架选项目，打开后可阅读案例并操作示意演示。

项目顺序、正文和演示文案在 `content.js` 中维护；`chapter-visuals.js` 负责绘制演示。XOR 演示读取正文中的实验结果表，共用同一份数据。

预览时在此目录运行 `python -m http.server 4173`，再用浏览器打开 `http://localhost:4173/`。正式网站通过 GitHub Pages 从 `main` 发布。
