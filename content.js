// 修改此文件即可更新个人资料与项目；projects 数组顺序即页面顺序。
export const content = {
  name: "夏杨阳",
  romanName: "XIA YANGYANG",
  email: "2341501016@stu.suda.edu.cn",
  title: "夏杨阳 · 个人作品",
  description: "夏杨阳的个人作品网站：从计算机视觉到数据可视化，记录把想法做成作品的实践。",
  hero: {
    eyebrow: "个人作品 / PORTFOLIO",
    heading: ["从真实场景出发，", "让想法成为作品。"],
    introduction: "你好，我是夏杨阳。这里记录我在计算机视觉与数据可视化方向的项目实践，以及从问题到实现的思考。",
    note: "以视觉理解场景，以数据组织信息。",
  },
  projectsHeading: "在实践中，探索可能。",
  projectsIntroduction: "从线下游戏的流程自动化，到历史建筑的数据表达。每一个项目，都从一个具体的问题开始。",
  contactHeading: "从一次交流开始。",
  contactText: "如果你对这些项目感兴趣，或希望交流想法，欢迎通过邮件联系我。",
  projects: [
    {
      id: "werewolf",
      category: "计算机视觉 × 场景交互",
      title: "狼人杀智能主持系统",
      subtitle: "让视觉感知，参与游戏进程。",
      summary: "将实时视频处理与线下游戏规则结合，让系统引导游戏流程，并通过玩家手势完成投票统计。",
      technologies: ["Python", "OpenCV"],
      highlights: ["游戏流程自动引导", "手势投票识别", "五人局多轮运行"],
      sections: [
        { title: "问题与背景", text: "线下狼人杀需要专人主持，流程引导和投票统计较为繁琐。这个项目尝试用计算机视觉辅助主持，把游戏进程转化为可执行的系统流程。" },
        { title: "实现思路", text: "使用 Python 与 OpenCV 搭建实时视频处理管线，将视觉输入与游戏阶段联动。系统按“天黑闭眼 → 狼人行动 → 天亮公告”的顺序引导流程，并用倒计时控制各阶段节奏。" },
        { title: "完成的功能", items: ["按游戏阶段自动给出流程引导。", "提供倒计时，辅助控制行动与讨论时间。", "通过机器视觉识别玩家手势，完成投票统计。", "支持五人局多轮稳定运行。"] },
      ],
    },
    {
      id: "stone-bridges",
      category: "数据可视化 × 信息表达",
      title: "中国石拱桥数据可视化平台",
      subtitle: "用数据，连接结构与历史。",
      summary: "将石拱桥的结构参数、历史年代与地理分布整理为结构化数据，通过多个图表视角呈现桥梁之间的关联。",
      technologies: ["JavaScript", "ECharts", "Flask", "MySQL"],
      highlights: ["多维桥梁数据库", "四类可视化图表", "前后端数据联动"],
      sections: [
        { title: "问题与背景", text: "石拱桥的信息既包含地理与历史背景，也包含桥跨、桥宽等结构特征。这个项目将多维资料组织起来，让不同桥梁能够被直观地浏览和比较。" },
        { title: "实现思路", text: "收集中国现存重点石拱桥的结构参数、历史年代与地理分布，建立 MySQL 结构化数据库。使用 Flask 读取数据，通过 RESTful API 提供给基于 HTML、JavaScript 与 ECharts 的前端。" },
        { title: "完成的功能", items: ["全国石拱桥地理分布热力图。", "按朝代分布的时间轴柱状图。", "桥跨与桥宽散点对比图。", "单桥结构参数雷达图。"] },
      ],
    },
  ],
};
