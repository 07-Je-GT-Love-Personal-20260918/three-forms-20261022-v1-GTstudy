(() => {
  const toc = document.getElementById('toc');
  const summary = (title, contents, open = false) => {
    const block = document.createElement('details');
    const label = document.createElement('summary');
    label.textContent = title;
    block.open = open;
    block.append(label, ...contents);
    return block;
  };
  const jump = (id, label) => {
    const link = document.createElement('a');
    link.href = '#' + id;
    link.textContent = label;
    return link;
  };
  const groups = [
    ['海德堡要理问答', 'hcContent', [
      ['唯一安慰', 1, 1], ['罪与愁苦', 2, 4], ['救赎', 5, 31], ['感恩', 32, 52]
    ]],
    ['比利时信条', 'bcContent', [
      ['神与启示', 1, 11], ['创造与堕落', 12, 17], ['基督与救恩', 18, 26], ['教会、圣礼与末世', 27, 37]
    ]]
  ];
  document.addEventListener('gt:ready', () => {
    const main = toc.querySelector('.toc-groups');
    for (const [title, root, ranges] of groups) {
      const entries = [...document.querySelectorAll('#' + root + ' .entry')];
      const parts = ranges.map(([label, start, end]) => summary(label, entries.slice(start - 1, end).map(
        entry => jump(entry.id, entry.querySelector('.num').textContent + ' · ' + entry.querySelector('summary b').textContent)
      )));
      main.append(summary(title, parts));
    }
    const dort = [...document.querySelectorAll('.dort-head')].map(part => {
      const links = [...part.querySelectorAll('.dort-article,.errors')].map(entry =>
        jump(entry.id, entry.querySelector('summary').textContent.trim()));
      return summary(part.querySelector('h3').textContent, [
        jump(part.id, '教义导读'), ...links
      ]);
    });
    main.append(summary('多特信经', dort));
    addCourseLinks();
    addOriginalLinks();
  });

  function linkInGuide(anchor, href, label) {
    const detail = document.getElementById(anchor);
    if (!detail) return;
    let group = detail.querySelector('.course-references');
    if (!group) {
      group = document.createElement('div');
      group.className = 'course-references';
      detail.append(group);
    }
    const link = document.createElement('a');
    link.href = href;
    if (href.startsWith('https:')) {
      link.target = '_blank';
      link.rel = 'noopener';
    }
    link.textContent = label;
    group.append(link);
  }

  async function addCourseLinks() {
    try {
      const response = await fetch('assets/courses/index.json');
      if (!response.ok) return;
      const catalog = await response.json();
      for (const {key, chapters} of catalog) {
        for (const chapter of chapters) {
          for (const anchor of chapter.anchors) {
            linkInGuide(anchor, 'courses.html#' + key + '/' + chapter.page, '▤ 讲义 · ' + chapter.title);
          }
        }
      }
    } catch { /* The complete PDFs remain available from the course entry. */ }
  }

  async function addOriginalLinks() {
    try {
      const response = await fetch('assets/courses/references.json');
      if (!response.ok) return;
      for (const [anchor, links] of Object.entries(await response.json())) {
        for (const [path, label] of links) linkInGuide(anchor, 'https://ccifellowship.org' + path, label + ' ↗');
      }
    } catch { /* The CCI document index remains available in the main directory. */ }
  }

  document.addEventListener('click', event => {
    const jump = event.target.closest('[data-city-jump]');
    if (jump) document.dispatchEvent(new CustomEvent('gt:city', {detail: jump.dataset.cityJump}));
  });

  for (const button of toc.querySelectorAll('[data-toc-level]')) {
    button.addEventListener('click', () => {
      const openLevel = Number(button.dataset.tocLevel);
      for (const group of toc.querySelectorAll('details')) {
        group.open = group.parentElement.closest('details') ? openLevel > 1 : openLevel > 0;
      }
    });
  }
})();
