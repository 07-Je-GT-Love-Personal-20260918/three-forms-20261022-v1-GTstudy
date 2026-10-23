"""Generate a bundled, CDN-independent geographic overview from public-domain Natural Earth."""
from pathlib import Path
import json
root=Path(__file__).parent
data=json.loads((root/'data/europe-countries.geojson').read_text(encoding='utf-8'))
def xy(lon,lat):return ((lon+3)*62,(55-lat)*62)
paths=[]
colors={'France':'#e3d5b8','Germany':'#c6ddce','Belgium':'#eab5a2','Netherlands':'#b1d8e3','Switzerland':'#d8c6e4','United Kingdom':'#dbe0d5','Luxembourg':'#eab5a2'}
for f in data['features']:
    name=f['properties']['ADMIN']
    g=f['geometry'];polys=g['coordinates'] if g['type']=='MultiPolygon' else [g['coordinates']]
    for poly in polys:
        ring=poly[0]
        if not any(-4<lon<13 and 44<lat<56 for lon,lat,*_ in ring):continue
        d='M'+'L'.join(f'{xy(p[0],p[1])[0]:.1f},{xy(p[0],p[1])[1]:.1f}' for p in ring)+'Z'
        paths.append(f'<path d="{d}" fill="{colors.get(name,"#e5e6d7")}"/>')
labels=[('北海',190,100),('荷兰',540,142),('比利时',440,235),('法国',260,430),('德国',700,300),('瑞士',640,570)]
svg=f'''<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 930 650" role="img" aria-labelledby="t d"><title id="t">改革宗历史的西欧地理底图</title><desc id="d">法国、荷兰、比利时、德国与瑞士的现代地理概览。仅用于地名定位，不表示十六世纪政治边界。</desc><defs><clipPath id="crop"><rect width="930" height="650" rx="24"/></clipPath><pattern id="grid" width="62" height="62" patternUnits="userSpaceOnUse"><path d="M62 0H0V62" fill="none" stroke="#8da9a2" stroke-opacity=".18"/></pattern></defs><g clip-path="url(#crop)"><rect width="930" height="650" fill="#e0f0ee"/><g stroke="#fffcf4" stroke-width="2">{''.join(paths)}</g><rect width="930" height="650" fill="url(#grid)"/><g font-family="system-ui,sans-serif" font-size="20" fill="#46635a">{''.join(f'<text x="{x}" y="{y}">{s}</text>' for s,x,y in labels)}</g><text x="35" y="610" font-family="system-ui,sans-serif" font-size="13" fill="#567368">N ↑ · 现代国界仅供定位 · Natural Earth / Public Domain</text></g></svg>'''
(root/'dist/assets/europe.svg').write_text(svg,encoding='utf-8')
print('Bundled Europe SVG:',len(svg),'characters')
