(() => {
  const get = id => document.getElementById(id);
  const root = 'assets/courses/';
  const files = new Map();
  const compact = matchMedia('(max-width: 820px)');
  const resultsPerBatch = 30;
  let books = [];
  let book, page, indexPages, chapter, hits = [], visibleHits = 0, activeTerm = '';
  let request = 0, focusReading = false;

  try { document.body.classList.toggle('dark', localStorage.getItem('gt-theme') === 'dark'); } catch {}
  get('courseToc').open = !compact.matches;
  const bookURL = (key, number) => '#' + key + '/' + number;

  async function json(path) {
    const response = await fetch(root + path);
    if (!response.ok) throw new Error('无法读取 ' + path);
    return response.json();
  }
  function loadPages(key) {
    if (!files.has(key)) {
      files.set(key, json(key + '.json').catch(error => { files.delete(key); throw error; }));
    }
    return files.get(key);
  }

  function makeLink(text, hash) {
    const link = document.createElement('a');
    link.textContent = text;
    link.href = hash;
    return link;
  }

  function renderChapters(item) {
    const list = document.createElement('ol');
    const cover = { page: 1, title: '封面及全书开头' };
    for (const entry of [cover, ...item.chapters]) {
      const row = document.createElement('li');
      row.append(makeLink(entry.title, bookURL(item.key, entry.page)));
      list.append(row);
    }
    get('bookChapters').replaceChildren(list);
  }

  function renderPageText() {
    const raw = indexPages[page - 1];
    const text = get('courseText');
    text.replaceChildren();
    if (!raw) {
      text.textContent = '本页无可提取文字。可打开 PDF 查看原页。';
      return;
    }
    if (!activeTerm) {
      text.textContent = raw;
      return;
    }
    let start = 0;
    const uncapitalized = raw.toLowerCase();
    for (let at = uncapitalized.indexOf(activeTerm); at >= start; at = uncapitalized.indexOf(activeTerm, start)) {
      text.append(raw.slice(start, at));
      const mark = document.createElement('mark');
      start = at + activeTerm.length;
      mark.textContent = raw.slice(at, start);
      text.append(mark);
    }
    text.append(raw.slice(start));
  }

  function bookmark() {
    try { return Number(localStorage.getItem('gt-course-' + book.key)); } catch { return 0; }
  }

  function renderBookmark() {
    const saved = bookmark();
    const button = get('bookmarkPage');
    button.setAttribute('aria-pressed', String(saved === page));
    button.textContent = saved === page ? '★ 已保存此页' : '☆ 保存阅读页';
    get('resumePage').hidden = !saved || saved === page;
    get('resumePage').href = bookURL(book.key, saved);
  }

  async function showPage() {
    const token = ++request;
    const [key, rawPage] = location.hash.slice(1).split('/');
    const selected = books.find(item => item.key === key) ?? books[0];
    const number = Math.min(selected.count, Math.max(1, /^[0-9]+$/.test(rawPage) ? Number(rawPage) : 1));
    get('courseStatus').textContent = '正在读取 ' + selected.title + '…';
    try {
      const extracted = await loadPages(selected.key);
      if (token !== request) return;
      if (book !== selected) {
        get('courseTerm').value = activeTerm = '';
        get('searchStatus').textContent = '';
        get('courseHits').replaceChildren();
        get('moreHits').hidden = true;
        renderChapters(selected);
      }
      book = selected;
      page = number;
      indexPages = extracted;
      chapter = book.chapters.findLast(entry => entry.page <= page);
      for (const link of get('bookTabs').children) {
        if (link.dataset.book === book.key) link.setAttribute('aria-current', 'page');
        else link.removeAttribute('aria-current');
      }
      get('bookTitle').textContent = book.title;
      get('bookAttribution').textContent = book.attribution + ' · 全书 ' + book.count + ' 页';
      get('pageHeading').textContent = '第 ' + page + ' 页' + (chapter ? ' · ' + chapter.title : '');
      get('pageNumber').max = book.count;
      get('pageNumber').value = page;
      get('pageTotal').textContent = '／' + book.count + ' 页';
      get('pagePrev').disabled = page === 1;
      get('pageNext').disabled = page === book.count;
      get('originalPdf').href = root + book.key + '.pdf#page=' + page;
      const guide = chapter?.anchors[0];
      get('returnGuide').hidden = !guide;
      get('returnGuide').href = guide ? './#' + guide : './';
      renderPageText();
      renderBookmark();
      get('courseStatus').textContent = '';
      get('courseLayout').hidden = false;
      if (focusReading) {
        focusReading = false;
        get('pageHeading').focus({preventScroll: true});
        get('pageHeading').scrollIntoView({block: 'start', behavior: 'instant'});
      }
    } catch {
      if (token !== request) return;
      get('courseStatus').replaceChildren('文字暂时无法加载。');
      const link = makeLink('打开完整 PDF', root + selected.key + '.pdf#page=' + number);
      get('courseStatus').append(link);
    }
  }

  function go(number) {
    if (book) location.hash = bookURL(book.key, number);
  }

  function showHits() {
    for (const number of hits.slice(visibleHits, visibleHits + resultsPerBatch)) {
      const row = document.createElement('li');
      const entry = book.chapters.findLast(item => item.page <= number);
      row.append(makeLink('第 ' + number + ' 页' + (entry ? ' · ' + entry.title : ''), bookURL(book.key, number)));
      get('courseHits').append(row);
    }
    visibleHits = get('courseHits').childElementCount;
    get('moreHits').hidden = visibleHits >= hits.length;
  }

  get('pagePrev').onclick = () => go(page - 1);
  get('pageNext').onclick = () => go(page + 1);
  get('jumpPage').onsubmit = event => { event.preventDefault(); go(get('pageNumber').value); };
  get('bookSearch').onsubmit = event => {
    event.preventDefault();
    activeTerm = get('courseTerm').value.trim().toLowerCase();
    hits = activeTerm ? indexPages.flatMap((text, i) => text.toLowerCase().includes(activeTerm) ? [i + 1] : []) : [];
    visibleHits = 0;
    get('courseHits').replaceChildren();
    get('searchStatus').textContent = hits.length ? '找到 ' + hits.length + ' 页' : '未找到匹配的页面。';
    showHits();
    renderPageText();
  };
  get('moreHits').onclick = showHits;
  get('bookmarkPage').onclick = () => {
    try {
      localStorage.setItem('gt-course-' + book.key, page);
      renderBookmark();
    } catch { get('courseStatus').textContent = '浏览器未保存书签。'; }
  };
  for (const id of ['bookChapters', 'courseHits']) {
    get(id).addEventListener('click', event => {
      const link = event.target.closest('a');
      if (!link || event.ctrlKey || event.metaKey || event.shiftKey || event.altKey) return;
      focusReading = true;
      if (compact.matches && id === 'bookChapters') get('courseToc').open = false;
      if (link.hash === location.hash) showPage();
    });
  }
  get('goBack').onclick = () => history.back();
  get('goForward').onclick = () => history.forward();
  get('goTop').onclick = () => window.scrollTo({ top: 0, behavior: 'instant' });
  get('goBottom').onclick = () => get('pageEnd').scrollIntoView();
  addEventListener('hashchange', showPage);

  json('index.json').then(items => {
    books = items;
    for (const item of items) {
      const link = makeLink(item.title, bookURL(item.key, 1));
      link.dataset.book = item.key;
      get('bookTabs').append(link);
    }
    showPage();
  }).catch(() => { get('courseStatus').textContent = '课程目录未能加载。'; });
})();
