(() => {
  const byId = id => document.getElementById(id);
  const input = byId('indexSearch');
  const list = byId('indexResults');
  const status = byId('indexStatus');
  const more = byId('indexMore');
  const base = 'https://ccifellowship.org';
  let items = [];
  let limit = 32;

  function render() {
    const terms = input.value.toLowerCase().trim().split(/\s+/).filter(Boolean);
    const filtered = items.filter(item => terms.every(term => item.search.includes(term)));
    const rows = filtered.slice(0, limit).map(item => {
      const li = document.createElement('li');
      const link = document.createElement('a');
      link.href = base + item.path;
      link.textContent = item.title;
      li.append(link, ' · ' + item.group);
      return li;
    });
    list.replaceChildren(...rows);
    more.hidden = filtered.length <= limit;
    status.textContent = filtered.length ? '找到 ' + filtered.length + ' 项 · 显示 ' + rows.length + ' 项' : '没有符合的资料。';
  }

  fetch('cci-index.json').then(response => {
    if (!response.ok) throw new Error('index unavailable');
    return response.json();
  }).then(data => {
    items = data.map(item => ({...item, search: (item.title + ' ' + item.group + ' ' + item.path).toLowerCase()}));
    input.oninput = () => { limit = 32; render(); };
    more.onclick = () => { limit += 32; render(); };
    render();
  }).catch(() => {
    status.textContent = '索引暂时无法读取。上面的栏目与原文入口仍可打开。';
  });
})();
