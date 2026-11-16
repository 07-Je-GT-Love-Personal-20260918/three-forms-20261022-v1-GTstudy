"""Build the public title-and-link index from a local CCI navigation audit."""
import argparse
import json
from pathlib import Path
from urllib.parse import urlsplit

GROUPS = {
    'book-of-praise/creeds': '普世信经',
    'book-of-praise/confessions': '三项联合信条',
    'book-of-praise/liturgical-forms': '仪文',
    'book-of-praise/prayers': '祷文',
    'book-of-praise/church-order': '教会规章',
    'book-of-praise/forms': '签署书',
    'book-of-praise': '敬拜手册',
    'i-belong': 'I Belong 教理教材',
    'flame-of-truth': '真理的火焰 · 教会史',
    'the-candlestand-statement': '烛台宣言',
    'the-gift-from-heaven': '天上的礼物',
    'bible-story': '圣经故事',
    'the-beauty-of-church-worship': '归正教会敬拜礼仪之美',
}

def group(path, title):
    for prefix, label in GROUPS.items():
        if path.startswith('/books/' + prefix):
            return label
    if path.startswith('/faq'):
        return '疑难解答'
    if path.startswith('/sermons/heidelberg-catechism') or '主日' in title:
        return '要理证道'
    if path.startswith(('/sermons/text', '/node/')):
        return '经文证道'
    return '信仰导览'

def build(source, target):
    audit = json.loads(source.read_text(encoding='utf-8'))
    unique = {}
    for page in audit['rows']:
        path, title = page['path'], page['title'].strip()
        url = urlsplit(path)
        if url.scheme or url.netloc or not path.startswith('/') or not title:
            continue
        if url.query and (not url.path.startswith('/faq') or url.query == 'page=0'):
            continue
        if path == '/home':
            continue
        if url.query:
            title += ' · 第 ' + str(int(url.query.removeprefix('page=')) + 1) + ' 页'
        unique.setdefault(page['key'], {'path': path, 'title': title, 'group': group(path, title)})
    records = sorted(unique.values(), key=lambda item: (item['group'], item['path']))
    target.write_text(json.dumps(records, ensure_ascii=False, indent=2) + '\n', encoding='utf-8')
    print('Indexed', len(records), 'public titles')

if __name__ == '__main__':
    parser = argparse.ArgumentParser()
    parser.add_argument('audit', type=Path)
    parser.add_argument('--output', type=Path, default=Path('dist/cci-index.json'))
    args = parser.parse_args()
    build(args.audit, args.output)
