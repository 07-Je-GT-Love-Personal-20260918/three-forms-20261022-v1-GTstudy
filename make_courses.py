"""Generate course reading data from the three authorized source PDFs."""
import argparse
import json
import re
import shutil
from pathlib import Path

import fitz

FILES = {
    'heidelberg': ('11', '海德堡要理问答讲座', '中国改革宗圣经学院', 371),
    'belgic': ('13', '比利时信条释义', '克莱伦斯·鲍曼 · 加拿大改革宗和澳大利亚自由改革宗教会翻译团队', 211),
    'dort': ('12', '靠主夸口 · 多特信经学习', '亚瑟·范·德尔登 · 加拿大改革宗和澳大利亚自由改革宗教会翻译团队', 295),
}
DOTTED = re.compile(r'^(.*?)\s*\.{3,}\s*(\d+)\s*$')
DAY = re.compile(r'主日\s*(\d+)(?:\s*(?:-|—|和)\s*(\d+))?')
CHINESE = '零一二三四五六七八九'

def chinese_number(value):
    if '十' not in value:
        return CHINESE.index(value)
    tens, units = value.split('十')
    return (CHINESE.index(tens) if tens else 1) * 10 + (CHINESE.index(units) if units else 0)

def chapters(key, doc):
    if key == 'belgic':
        entries = []
        for _, title, page in doc.get_toc():
            match = re.match(r'第(\d+)条', title)
            articles = match[1] if match else ''
            ids = [int(articles)] if len(articles) == 2 else [int(articles[:2]), int(articles[2:])] if articles else []
            entries.append({'page': page, 'title': title, 'anchors': [f'bc-{n}' for n in ids]})
        assert {x for e in entries for x in e['anchors']} == {f'bc-{n}' for n in range(1, 38)}
        return entries
    entries = []
    if key == 'dort':
        entries.append({'page': 4, 'title': '多特信经的历史回顾', 'anchors': []})
    part = -1
    for i in range(2 if key == 'heidelberg' else 3):
        if key == 'dort' and i == 0:
            continue
        for line in doc[i].get_text().splitlines():
            line = line.strip()
            if key == 'dort' and re.match(r'^第[一二三五].{0,2}项教义', line):
                part += 1
            match = DOTTED.fullmatch(line)
            if not match and key == "heidelberg" and line.startswith("第五十三讲"):
                match = re.fullmatch(r"(.*?)\s+(367)", line)
            if not match:
                continue
            title, printed = match[1].strip(), int(match[2])
            if key == 'heidelberg':
                if not re.match(r'^第[一二三四五六七八九十]+讲', title):
                    continue
                page = printed + (i == 0)
                days = DAY.search(title)
                anchors = [f'hc-{n}' for n in range(int(days[1]), int(days[2] or days[1]) + 1)] if days else []
                if '圣约' in title and not anchors:
                    anchors = ['hc-25', 'hc-26']
            else:
                article = re.match(r'^第([一二三四五六七八九十]+)条', title)
                if not article or part < 0:
                    continue
                page = printed + 3
                anchors = [f'dort-{part}-{chinese_number(article[1])}']
            entries.append({'page': page, 'title': title, 'anchors': anchors})
    assert len(entries) == (53 if key == 'heidelberg' else 60), (key,len(entries))
    if key == 'heidelberg':
        assert {x for e in entries for x in e['anchors']} == {f'hc-{n}' for n in range(1, 53)}
    else:
        assert {x for e in entries for x in e['anchors']} == {
            f'dort-{part}-{n}' for part, count in enumerate((18, 9, 17, 15)) for n in range(1, count+1)
        }
    return entries

def save_json(path, data):
    path.write_text(json.dumps(data, ensure_ascii=False, separators=(',', ':')) + '\n', encoding='utf-8')

def reference_links(out):
    cci = json.loads((out.parent.parent / 'cci-index.json').read_text(encoding='utf-8'))
    records = {}
    dort_parts = {'1': 0, '2': 1, '3-4': 2, '5': 3}
    for row in cci:
        path = row['path']
        canon = re.search(r'/confessions/(?:heidelberg-catechism(?:/[^/]+)*/lord-day-(\d+)|the-belgic-confession/(\d+)|canons-of-dort/section(1|2|3-4|5)/(\d+))$', path)
        if canon:
            day, article, part, number = canon.groups()
            anchor = f'hc-{int(day)}' if day else f'bc-{int(article)}' if article else (
                f'dort-{dort_parts[part]}-errors' if row['title'] == '错谬反驳' else f'dort-{dort_parts[part]}-{int(number)}'
            )
            records.setdefault(anchor, []).insert(0, [path, 'CCI 原文'])
        lesson = re.fullmatch(r'/books/i-belong/(\d+(?:-\d+)*)', path)
        if lesson:
            for day in lesson[1].split('-'):
                records.setdefault(f'hc-{int(day)}', []).append([path, 'CCI · I Belong'])
    assert len(records) == 152, len(records)
    save_json(out / 'references.json', records)

def main(source, out):
    out.mkdir(parents=True, exist_ok=True)
    books = []
    for key, (prefix, title, attribution, count) in FILES.items():
        source_pdf, = source.glob(prefix + '_*.pdf')
        with fitz.open(source_pdf) as doc:
            assert len(doc) == count
            index = chapters(key, doc)
            starts = [item['page'] for item in index]
            assert starts == sorted(set(starts)) and starts[-1] <= count
            pages = [page.get_text().strip() for page in doc]
        shutil.copyfile(source_pdf, out / f'{key}.pdf')
        save_json(out / f'{key}.json', pages)
        books.append({'key': key, 'title': title, 'attribution': attribution, 'count': count, 'chapters': index})
    save_json(out / 'index.json', books)
    reference_links(out)

if __name__ == '__main__':
    parser = argparse.ArgumentParser()
    parser.add_argument('source', type=Path)
    parser.add_argument('--output', type=Path, default=Path('dist/assets/courses'))
    args = parser.parse_args()
    main(args.source, args.output)
