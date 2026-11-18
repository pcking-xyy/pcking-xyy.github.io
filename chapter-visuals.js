function node(tag, className, value) {
  const item = document.createElement(tag);
  if (className) item.className = className;
  if (value !== undefined) item.textContent = value;
  return item;
}

function diagram(label, body) {
  const frame = node('div', 'chapter-visual chapter-visual-diagram');
  frame.innerHTML = `<svg viewBox="0 0 600 280" role="img" aria-label="${label}" xmlns="http://www.w3.org/2000/svg">${body}</svg>`;
  return frame;
}

function diagramLabel(copy, x, y, attributes = '') {
  return `<text x="${x}" y="${y}" ${attributes}>${copy}</text>`;
}

function fire(index) {
  const scan = index > 0 ? `<path d="M29 59V31h28m486 0h28v28M29 215v28h28m486 0h28v-28" fill="none" stroke="#b49383" stroke-width="2"/>
    <rect x="329" y="116" width="102" height="112" rx="3" fill="none" stroke="#a14a2e" stroke-width="3" ${index === 2 ? 'stroke-dasharray="8 5"' : ''}/>
    <rect x="328" y="88" width="103" height="26" rx="3" fill="#a14a2e"/>
    ${diagramLabel(['','火焰候选','辅助复核','火焰 · 示意'][index],379,107,'class="svg-inverse" text-anchor="middle"')}
    ${index === 1 ? '<rect x="343" y="42" width="98" height="76" rx="3" fill="none" stroke="#624e46" stroke-width="2"/><rect x="342" y="15" width="99" height="25" rx="3" fill="#624e46"/>' + diagramLabel('烟雾候选',391,33,'class="svg-inverse" text-anchor="middle"') : ''}
    ${index === 2 ? '<path d="M432 173h49" stroke="#a14a2e" stroke-width="2"/><rect x="478" y="158" width="91" height="30" rx="4" fill="#fff7ee" stroke="#a14a2e"/>' + diagramLabel('Gemma 3',523,179,'text-anchor="middle"') : ''}
    ${index === 3 ? '<path d="M435 200h53" stroke="#694f42" stroke-width="2"/><circle cx="499" cy="200" r="13" fill="#694f42"/><path d="m493 200 4 4 8-9" fill="none" stroke="#fff" stroke-width="2"/>' : ''}` : '';
  return diagram([
    '示意输入：一幅包含烟雾和火焰的画面，尚未标记',
    '检测示意：YOLO 标出火焰和烟雾两个候选区域',
    '复核示意：选中的候选区域交给 Gemma 3 辅助复核',
    '结果示意：展示火焰候选的检测及辅助复核信息',
  ][index], `<rect width="600" height="280" fill="#efe8df"/>
    <path d="M0 171 87 135l101 36 116-49 147 39 149-42v135H0z" fill="#d7cbc1"/>
    <path d="M0 218h600v62H0z" fill="#dfd0c1"/><path d="M0 251h600" stroke="#f2ece2" stroke-dasharray="33 19" stroke-width="3"/>
    <path d="M58 217v-65l87-47 88 47v65z" fill="#c0aaa0"/><path d="m58 152 87-47 88 47" fill="none" stroke="#8c746a" stroke-width="5"/>
    <path d="M102 218v-53h47v53m26-53h30v28h-30z" fill="#ebe0d6"/><path d="M234 218h78v-48h-78" fill="#b09a8e"/>
    <path d="M15 218v-24m18 24v-24m224 24v-24m25 24v-24M12 198h282" fill="none" stroke="#937e73" stroke-width="2"/>
    <path d="M379 153c-26-16 4-30-7-44-10-14-27-19-19-36 4-9 17-11 20-19 4-14 28-16 36-6 8 9-5 17-1 25 17 8 23 18 16 29-5 8-27 10-31 21-6 15 10 25-14 30z" fill="#ab9c96" opacity=".8"/>
    <path d="M366 219c-29-8-30-28-13-47 2 11 7 12 9 12-7-14 18-22 15-53 21 16 26 38 21 46 7-1 11-6 12-14 21 28 3 56-44 56z" fill="#ba5c34"/>
    <path d="M373 218c-16-8-12-18-7-25 3 5 5 7 8 7-4-10 9-13 11-26 14 19 13 39-12 44z" fill="#efb567"/>
    ${scan}`);
}

function parking(state) {
  const chat = node('ol','chapter-visual-demo-chat');
  chat.setAttribute('aria-label','客服示例对话');
  for (const {speaker, text} of state.messages) {
    const bubble = node('li','chapter-visual-bubble');
    bubble.append(node('strong','',speaker), node('p','',text));
    chat.append(bubble);
  }
  return chat;
}

function werewolf(index) {
  const phase = ['天黑闭眼','狼人行动','天亮公告','手势投票'][index];
  const votes = [0, 3, 0, 2, 0];
  const seats = [[300,48],[456,103],[398,204],[202,204],[144,103]];
  const players = seats.map(([x,y], position) => {
    const marked = index === 1 && position === 1 || index === 3 && votes[position] > 0;
    const voted = index === 3 && votes[position] > 0;
    return `<circle cx="${x}" cy="${y}" r="25" fill="${marked ? '#535473' : '#fbf8f3'}" stroke="#7d7e97" stroke-width="${marked ? '2.5' : '1.5'}"/>
      ${diagramLabel(position + 1,x,y + 6,`text-anchor="middle" ${marked ? 'class="svg-inverse"' : ''}`)}
      ${voted ? `<rect x="${x + 14}" y="${y + 17}" width="35" height="22" rx="3" fill="#32334f"/>
        ${diagramLabel(votes[position] + ' 票',x + 31,y + 33,'text-anchor="middle" class="svg-inverse svg-small"')}` : ''}`;
  }).join('');
  const note = ['所有玩家进入等待状态','仅当前行动角色响应','公开信息并进入讨论','示例票数：2 号 3 票 · 4 号 2 票'][index];
  const dark = index < 2;
  const play = dark ? '<path d="M308 99a12 12 0 1 0 9 18 13 13 0 0 1-9-18z" fill="#eece93"/>' :
    index === 2 ? '<circle cx="300" cy="107" r="10" fill="#ac6d2f"/><path d="M300 90v4m0 26v4m-17-17h4m26 0h4" stroke="#ac6d2f" stroke-width="2"/>' :
      '<rect x="289" y="104" width="22" height="15" rx="3" fill="none" stroke="#555573" stroke-width="2"/><path d="m296 103 4-7 8 4-2 4" fill="#555573"/>';
  return diagram(`五人局示意：${phase}。${note}`, `<rect width="600" height="280" fill="${dark ? '#e7e5ec' : '#f3f0ed'}"/>
    <ellipse cx="300" cy="135" rx="173" ry="96" fill="${dark ? '#d8d7e3' : '#ebe5df'}" stroke="#a8a6b7" stroke-dasharray="5 7"/>
    <ellipse cx="300" cy="133" rx="121" ry="64" fill="${dark ? '#44445d' : '#fcfaf5'}"/>
    ${play}
    ${diagramLabel(phase,300,146,`text-anchor="middle" class="svg-heading ${dark ? 'svg-inverse' : ''}"`)}
    ${players}
    ${diagramLabel(note,300,259,'text-anchor="middle" class="svg-caption"')}`);
}

const bridgeCharts = [
  `<path d="M145 105 166 75l57-9 30-20 37 18 45-8 26 13 39-14 44 15 21 30-25 20-22 3-19 24-29 8-13 24-33 13-27-9-35 19-24-18-45 3-23-22-35-6-17-29z" fill="#e2e5d8" stroke="#9ca995" stroke-width="1.5"/>
   <path d="M144 123c85-38 106 59 194 16 60-29 74-24 101-19M168 153c46-37 87 42 150 24 30-9 44-25 66-40" stroke="#faf8eb" stroke-width="2" fill="none"/>
   <path d="M242 67v125m73-136v140m72-136v88M153 104h292m-291 30h258m-219 30h176" stroke="#b9c3b2" stroke-opacity=".55" fill="none"/>
   <g fill="#86a785" fill-opacity=".25"><circle cx="206" cy="117" r="34"/><circle cx="299" cy="112" r="42"/><circle cx="361" cy="128" r="44"/><circle cx="407" cy="91" r="28"/></g>
   <g fill="#739473" fill-opacity=".42"><circle cx="206" cy="117" r="19"/><circle cx="299" cy="112" r="23"/><circle cx="361" cy="128" r="27"/><circle cx="407" cy="91" r="15"/></g>
   <g fill="#476b52"><circle cx="206" cy="117" r="5"/><circle cx="299" cy="112" r="8"/><circle cx="361" cy="128" r="10"/><circle cx="407" cy="91" r="5"/></g>`,
  `<path d="M130 59v144h354" fill="none" stroke="#8e9a8b" stroke-width="1.5"/><path d="M131 166h353m-353-36h353m-353-36h353" stroke="#bfcabd" stroke-dasharray="4 5"/>
   <g fill="#7f9e81"><rect x="160" y="157" width="37" height="45"/><rect x="224" y="129" width="37" height="73"/><rect x="288" y="144" width="37" height="58"/><rect x="352" y="86" width="37" height="116"/><rect x="416" y="112" width="37" height="90"/></g>
   ${diagramLabel('数量',101,64)}${diagramLabel('按朝代排序',481,223,'text-anchor="end"')}`,
  `<path d="M130 59v144h354" fill="none" stroke="#8e9a8b" stroke-width="1.5"/><path d="M131 166h353m-353-36h353m-353-36h353m-295-33v141m58-141v141m59-141v141m59-141v141m59-141v141" stroke="#bfcabd" stroke-dasharray="4 5"/>
   <g fill="#547e5c" fill-opacity=".84"><circle cx="169" cy="173" r="6"/><circle cx="216" cy="144" r="6"/><circle cx="243" cy="166" r="6"/><circle cx="269" cy="122" r="6"/><circle cx="300" cy="149" r="6"/><circle cx="322" cy="99" r="6"/><circle cx="366" cy="128" r="6"/><circle cx="403" cy="80" r="6"/><circle cx="437" cy="107" r="6"/></g>
   ${diagramLabel('桥宽',101,64)}${diagramLabel('桥跨',481,223,'text-anchor="end"')}`,
  `<g fill="none" stroke="#9da99b"><path d="M300 58 390 131 355 194 245 194 210 131Z"/><path d="M300 85 360 134 337 176 263 176 240 134Z"/><path d="M300 112 330 137 318 158 282 158 270 137Z"/><path d="M300 141V58m0 83 90-10m-90 10 55 53m-55-53-55 53m55-53-90-10"/></g>
   <path d="m300 75 67 59-34 39-78 12-9-48z" stroke="#527657" stroke-width="2" fill="#81a384" fill-opacity=".5"/>
   ${diagramLabel('结构指标一',300,48,'text-anchor="middle"')}${diagramLabel('指标二',402,135)}${diagramLabel('指标三',363,211)}${diagramLabel('指标四',235,211,'text-anchor="end"')}${diagramLabel('指标五',200,135,'text-anchor="end"')}`,
];

function bridge(index) {
  const labels = ['地理热力图','朝代时间轴','桥跨与桥宽散点图','单桥结构雷达图'];
  return diagram(`${labels[index]}：使用示意图形，不代表实际统计数据`, `<rect width="600" height="280" fill="#eef0e6"/>
    ${diagramLabel(labels[index],27,34,'class="svg-heading"')}${bridgeCharts[index]}
    ${diagramLabel('图表示意 · 非实际数据',573,257,'class="svg-caption" text-anchor="end"')}`);
}

function xor(state) {
  const [input, target, pair, probability, predicted] = state.row;
  const hiddenValues = pair.replace(/[()]/g, '').split(',').map(value => value.trim());
  const panel = node('div', 'chapter-visual-xor');
  const trace = node('dl', 'chapter-visual-trace');
  const values = [['输入', input], ['隐藏单元 h₁', hiddenValues[0]], ['隐藏单元 h₂', hiddenValues[1]], ['输出概率', probability]];
  for (const [label, value] of values) {
    const cell = node('div');
    const output = node('dd');
    output.append(node('strong','',value));
    if (label !== '输入') {
      const level = node('meter','chapter-visual-meter');
      level.min = 0;
      level.max = 1;
      level.value = Number(value);
      level.setAttribute('aria-label', label);
      output.append(level);
    }
    cell.append(node('dt','',label), output);
    trace.append(cell);
  }
  const conclusion = node('p', 'chapter-visual-verdict');
  conclusion.append(node('strong','',`预测 ${predicted}`), node('span','',`实际 ${target} · 概率 ≥ 0.5 判为 1`));
  panel.append(trace, conclusion);
  return panel;
}

export function renderChapterVisual(kind, index, state) {
  if (kind === 'fire') return fire(index);
  if (kind === 'parking') return parking(state);
  if (kind === 'werewolf') return werewolf(index);
  if (kind === 'bridge') return bridge(index);
  if (kind === 'xor') return xor(state);
  return node('div');
}
