/* Historical interpretation is editorial; modern map coordinates locate city centres. */
(()=>{
const places=[
{id:'tournai',name:'图尔奈',latin:'Tournai',icon:'✒',lat:50.6056,lon:3.3889,year:'1561',kind:'belgic',region:'南尼德兰 → 今比利时',title:'在被误解与追捕中，公开说明我们所信',context:'《比利时信条》形成于哈布斯堡统治下的南尼德兰。德布雷以法文写作，为受逼迫的改革宗群体申明信仰；图尔奈是理解其写作处境的重要城市。',culture:'法语与荷兰语地域相接，地方教会与跨境改革宗网络互通。公开认信既是神学陈述，也是向当局澄清忠诚与良心界限的行为。',core:'信条首先回答我们信什么，不能简化为民族独立宣言。合法顺服政府与不能否认福音必须一起坚持。',read:'比1—7、27—29、36',source:'https://canrc.org/the-belgic-confession'},
{id:'heidelberg',name:'海德堡',latin:'Heidelberg',icon:'▤',lat:49.3988,lon:8.6724,year:'1563',kind:'heidelberg',region:'普法尔茨选侯国 → 今德国',title:'把讲台、学校与家庭接在同一条教导线上',context:'腓德烈三世主持教理教育改革，大学神学家与教会领袖共同参与。乌尔西努通常被视为关键执笔者；问答在1563年出版，并进入教会教导。',culture:'领邦、大学与堂会合作，面对不同新教取向之间的分歧。德文便于教养会众，拉丁文连接学术讨论；问答体让教义可以逐周传授。',core:'唯一安慰不是抽象情绪，而是以基督的赎买、父的保守、灵的更新承托整个人的生死。',read:'海主日1、23—25、32',source:'https://www.ub.uni-heidelberg.de/ausstellungen/625jahre2011/exponate/sektion1/03_07.html'},
{id:'valenciennes',name:'瓦朗谢讷',latin:'Valenciennes',icon:'✧',lat:50.3571,lon:3.5233,year:'1567',kind:'belgic',region:'南尼德兰地区 → 今法国',title:'告白没有立即换来安全，却留下持续的见证',context:'德布雷在1567年殉道；瓦朗谢讷把这段受压迫的告白史具体落在城市与人的生命上。不可把现代国界投射回其整个政治处境。',culture:'同一改革宗网络跨越今天的法国、比利时和荷兰。法文告白进入荷兰教会的认信生活，显示教会的合一不等于语言与民族一致。',core:'苦难不能证明神的应许失败；但也不能浪漫化迫害。信条训练教会以真理作见证，并认真对待人的生命。',read:'比27、28、37；海主日1、19',source:'https://canrc.org/the-belgic-confession'},
{id:'amsterdam',name:'阿姆斯特丹',latin:'Amsterdam',icon:'♫',lat:52.3676,lon:4.9041,year:'1566',kind:'heidelberg',region:'尼德兰 → 今荷兰',title:'从一本册子，到会众每周听见的语言',context:'荷译《海德堡要理问答》借达斯努斯1566年的诗篇集传播；阿姆斯特丹的教理讲道是其进入会众生活的重要一环。',culture:'翻译、印刷、诗篇歌唱与讲道相互配合。跨语言传播不是逐字搬运而已，还要使同一福音进入家庭教养、共同敬拜与日常表达。',core:'教理的目标不是只留下书架上的标准，而是使一代人能明白、宣认并活出所听见的福音。',read:'海主日21、25、38、45',source:'https://canrc.org/heidelberg-catechism'},
{id:'leiden',name:'莱顿',latin:'Leiden',icon:'⚖',lat:52.1601,lon:4.4970,year:'争议背景',kind:'dort',region:'尼德兰共和国 → 今荷兰',title:'关键不是人是否回应，而是回应怎样可能',context:'阿米念在莱顿任神学教授。围绕拣选、救赎、归正和持守的争议，最终成为多特大会的重要议题；他的追随者在1610年提出抗辩。',culture:'大学讲席、地方教会与公共政治相互牵连。学术争论进入讲台与治理，因此必须分清经文判断、制度程序与政治后果。',core:'改革宗不是否认真实的信心与意志，而是坚持神的恩典使罪人甘心相信；果子不能倒置为施恩的原因。',read:'多I.9；III/IV.10—16',source:'https://canrc.org/canons-of-dort'},
{id:'dordrecht',name:'多德雷赫特',latin:'Dordrecht / Dort',icon:'◎',lat:51.8133,lon:4.6901,year:'1618—1619',kind:'dort',region:'尼德兰共和国 → 今荷兰',title:'让争议接受教会公开而共同的辨明',context:'多特大会有尼德兰与国外改革宗代表参与，形成针对五项争议的裁决。《多特信经》与另外两份文献共同服事教会的认信。',culture:'国际代表与本地教会在同一会议中讨论，表明真理不能被某个城市私有化；大会也处于当时的政教结构中，不能神圣化所有政治措施。',core:'五项教义并非整套基督教的替代品；拣选、赎罪、重生与保守必须连同普遍传道、真实呼召和蒙恩途径一起读。',read:'多II.5；III/IV.8、17；V.14',source:'https://canrc.org/canons-of-dort'},
{id:'geneva',name:'日内瓦',latin:'Genève / Geneva',icon:'✦',lat:46.2044,lon:6.1432,year:'16世纪网络',kind:'network',region:'日内瓦城邦 → 今瑞士',title:'一座城市，连接训练、出版与跨境教会',context:'日内瓦是改革宗传播的重要节点。其改革遗产不是三份文献都在此写成，而是神学、教会实践与人员交流帮助形成跨地域网络。',culture:'法语环境、城市教会与跨境交流使改革宗信仰具有国际联系。今天的国际宗教改革博物馆也以文献、器物与艺术展示这段历史。',core:'欧陆不是单一民族或一种性格；认信的合一由共同的福音维系，不由地理距离或文化优势保证。',read:'比9、27；海主日21',source:'https://www.geneve.com/de/unternehmen/internationales-museum-der-reformation'}
];
const host=document.querySelector('#atlas');if(!host)return;
host.innerHTML=`<div class="atlas-top"><div><span class="pill teal">◈ 历史地理实验室</span><h3>把年代放回城市，把教义放回处境</h3></div><label>观察路线 <select id="atlasRoute"><option value="all">全部节点</option><option value="belgic">✒ 逼迫中的告白</option><option value="heidelberg">▤ 教导与传播</option><option value="dort">⚖ 争议与辨明</option><option value="network">✦ 跨境网络</option></select></label></div><div class="atlas-grid"><div class="atlas-visual"><div class="geo-stage"><img src="assets/europe.svg" width="930" height="650" alt="西欧现代地理定位底图：荷兰、比利时、法国、德国、瑞士" decoding="async"><svg class="route-overlay" viewBox="0 0 930 650" aria-hidden="true"><path class="network-line" d="M567 545Q720 400 724 347Q550 230 490 197Q410 200 396 273"/></svg><div id="geoPins"></div><div class="map-stamp">◉ 地理定位 · 不是历史疆界</div></div><p class="map-caption">底图随本站保存，无须地图服务。连线仅示意思想与教会联系，<strong>不表示实际旅行、边界或道路</strong>。现代坐标为城市中心近似值。</p><div id="cityButtons" class="city-buttons" aria-label="选择历史城市"></div></div><article id="placeStory" class="place-story" aria-live="polite"></article></div><div class="live-map"><div class="live-map-bar"><div><span class="pill gold">◎ 当代在线地图</span><h3 id="mapHeading">定位海德堡</h3></div><label>地图来源 <select id="mapProvider"><option value="osm">OpenStreetMap 街道</option><option value="esri">Esri 卫星与地名</option><option value="bing">Bing 街道</option></select></label><button id="loadMap" class="primary">打开在线地图 ↗</button><button id="nextMap" hidden>换一张地图 →</button><button id="closeMap" hidden>收起地图</button></div><p class="map-caption">在线底图显示<strong>今天的街道与地形</strong>，并非16世纪疆界或实时历史事件。没有单一服务能保证所有地区可达；空白时可切换来源或使用下方独立链接。只在打开后加载。</p><div class="live-placeholder" id="mapPlaceholder"><span>⌖</span><b>先认识历史，再观察今天的街区</b><p>点击城市即可联动坐标；有三个站内图层和五个独立入口。街图与影像的更新时间由各提供方决定。</p></div><iframe id="liveMap" title="当代在线街道地图" loading="lazy" referrerpolicy="strict-origin-when-cross-origin" hidden></iframe><p id="mapStatus" class="map-status" role="status">尚未请求外部地图。</p><div id="mapLinks" class="map-links"></div></div>`;
const qs=s=>host.querySelector(s);let selected=places[1],active=false;
const imagery='28e2fdce73a5455c9722b9fb24131ed5';
const providers={osm:'OpenStreetMap',esri:'Esri',bing:'Bing'};
let requestTimer, mapKey='';
function urls(p){
 const point=p.lat+','+p.lon;
 return {
  osm:[providers.osm,`https://www.openstreetmap.org/?mlat=${p.lat}&mlon=${p.lon}#map=12/${p.lat}/${p.lon}`],
  esri:[providers.esri,`https://www.arcgis.com/apps/mapviewer/index.html?webmap=${imagery}&center=${p.lon},${p.lat}&level=12`],
  bing:[providers.bing,`https://www.bing.com/maps?cp=${p.lat}~${p.lon}&lvl=12`],
  google:['Google',`https://www.google.com/maps/search/?api=1&query=${point}`],
  apple:['Apple',`https://maps.apple.com/?ll=${point}&q=${encodeURIComponent(p.latin)}`]
 };
}
function showMap(force=false){
 const p=selected, type=qs('#mapProvider').value, frame=qs('#liveMap'), key=type+':'+p.id;
 if(key===mapKey&&!force)return;
 active=true;mapKey=key;
 frame.hidden=false;qs('#mapPlaceholder').hidden=true;qs('#closeMap').hidden=false;qs('#nextMap').hidden=false;
 qs('#loadMap').textContent='重新加载 ↻';
 const bbox=[p.lon-.16,p.lat-.10,p.lon+.16,p.lat+.10].join(',');
 const embeds={
  osm:`https://www.openstreetmap.org/export/embed.html?bbox=${encodeURIComponent(bbox)}&layer=mapnik&marker=${p.lat}%2C${p.lon}`,
  esri:`https://www.arcgis.com/apps/Embed/index.html?webmap=${imagery}&extent=${bbox}&zoom=true&scale=true`,
  bing:`https://www.bing.com/maps/embed?h=420&w=800&cp=${p.lat}~${p.lon}&lvl=11&typ=d&sty=r&src=SHELL&FORM=MBEDV8`
 };
 const status=qs('#mapStatus');
 clearTimeout(requestTimer);
 status.textContent=`正在请求 ${providers[type]} · ${p.name}…`;
 frame.onload=()=>{
  if(mapKey!==key)return;
  clearTimeout(requestTimer);
  status.textContent=`${providers[type]} · ${p.name}。如地图空白，换一张地图或打开独立入口。`;
 };
 requestTimer=setTimeout(()=>{
  if(mapKey===key)status.textContent=`${providers[type]} 响应较慢。可以换源、重试，或继续使用上方的本地地图。`;
 },8000);
 frame.src=embeds[type];
}
function pick(id){selected=places.find(p=>p.id===id)||places[1];const p=selected;host.querySelectorAll('[data-city]').forEach(b=>b.setAttribute('aria-pressed',String(b.dataset.city===id)));qs('#placeStory').innerHTML=`<div class="place-kicker">${p.icon} ${p.year} · ${p.region}</div><h3>${p.name}<small>${p.latin}</small></h3><h4>${p.title}</h4><dl><dt>▤ 真实处境</dt><dd>${p.context}</dd><dt>◈ 文化如何进入文本</dt><dd>${p.culture}</dd><dt>✦ 必须抓住的核心</dt><dd class="core-note">${p.core}</dd></dl><p class="ref">交叉研读：${p.read}</p><a class="source" href="${p.source}" target="_blank" rel="noopener">核查历史来源 ↗</a>`;qs('#mapHeading').textContent='定位'+p.name;const u=urls(p);qs('#mapLinks').innerHTML=`<span class="coordinates">⌖ ${p.lat.toFixed(4)}°N · ${p.lon.toFixed(4)}°E</span>`+Object.values(u).map(([name,url])=>`<a href="${url}" target="_blank" rel="noopener">${name} ↗</a>`).join('');qs('#placeStory').dataset.city=p.id;if(active)showMap();document.dispatchEvent(new Event('gt:atlas'));}
function route(kind,preferred=selected.id){const visible=kind==='all'?places:places.filter(p=>p.kind===kind);qs('#cityButtons').innerHTML=visible.map(p=>`<button data-city="${p.id}" aria-pressed="false">${p.icon} ${p.name}<small>${p.year}</small></button>`).join('');qs('#geoPins').innerHTML=visible.map(p=>`<button class="geo-pin" data-city="${p.id}" style="left:${((p.lon+3)*62/930*100).toFixed(2)}%;top:${((55-p.lat)*62/650*100).toFixed(2)}%" title="${p.name}" aria-label="地图节点：${p.name}" aria-pressed="false"><span></span></button>`).join('');pick(visible.some(p=>p.id===preferred)?preferred:visible[0].id);}
document.addEventListener('gt:city',e=>{qs('#atlasRoute').value='all';route('all',e.detail)});host.addEventListener('click',e=>{const b=e.target.closest('[data-city]');if(b)pick(b.dataset.city)});qs('#atlasRoute').onchange=e=>route(e.target.value);qs('#loadMap').onclick=()=>showMap(true);
qs('#nextMap').onclick=()=>{const menu=qs('#mapProvider');menu.selectedIndex=(menu.selectedIndex+1)%menu.options.length;showMap()};qs('#mapProvider').onchange=()=>{if(active)showMap()};qs('#closeMap').onclick=()=>{active=false;mapKey='';clearTimeout(requestTimer);qs('#liveMap').onload=null;qs('#liveMap').removeAttribute('src');qs('#nextMap').hidden=true;qs('#liveMap').hidden=true;qs('#mapPlaceholder').hidden=false;qs('#closeMap').hidden=true;qs('#loadMap').textContent='打开在线地图 ↗';qs('#mapStatus').textContent='地图已收起，已卸载外部页面。'};route('all');
})();
