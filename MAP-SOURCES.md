# 地图与历史补充 · v1.1.0 · 2026-10-24

## 本地地理底图

- 数据：Natural Earth，1:110m Admin 0 Countries。
- 获取来源：https://github.com/nvkelso/natural-earth-vector/blob/master/geojson/ne_110m_admin_0_countries.geojson
- 使用说明：https://www.naturalearthdata.com/about/terms-of-use/
- Natural Earth地理数据属于公共领域。本项目保留欧洲相关多边形，简化属性后置于data/europe-countries.geojson，并由make_atlas.py生成SVG。
- 底图表示现代地理及国界，绝非16世纪疆界；城市坐标为现代城市中心的近似定位，不表示某栋建筑的精确地址。
- 虚线仅说明思想、教会和文献的网络联系，不冒充实际旅行路线、道路或边境。

## 在线地图

- Bing Maps：官方嵌入页面，按当前阅读区宽高创建，避免固定宽度导致手机地图内部横向滚动。
- OpenStreetMap：官方export/embed页面，保留服务内的署名、缩放与问题报告。
- Google Maps：官方地图搜索链接，作为独立页面访问的备用入口。
- 不批量抓取、下载或缓存地图瓦片；不隐藏在线地图服务中的署名。
- 外部服务仅按用户点击加载；切换来源可更换服务，收起会卸载iframe。没有单一公共服务能保证全球所有网络可达。
- 参考：https://operations.osmfoundation.org/policies/tiles/ ；https://blogs.bing.com/maps/2013/6/How-to-Share-Maps-Using-the-Share-Charm-in-Windows/

## 本轮历史补充的主要来源

- 海德堡大学图书馆：https://www.ub.uni-heidelberg.de/ausstellungen/625jahre2011/exponate/sektion1/03_07.html
- Reformed Church in America：https://www.rca.org/about/theology/creeds-and-confessions/the-heidelberg-catechism/the-history-of-the-heidelberg-catechism/
- Canadian Reformed Churches：https://canrc.org/history 、https://canrc.org/the-belgic-confession 、https://canrc.org/heidelberg-catechism 、https://canrc.org/canons-of-dort
- 日内瓦官方旅游机构，国际宗教改革博物馆介绍：https://www.geneve.com/de/unternehmen/internationales-museum-der-reformation
- 用户提供的2015版中文手册继续作为三份文献定位与背景核对材料，未公开上传。

城市卡和文化机制比较属于原创综合解读；文化说明不能反过来充当教义真实性的证据。历史、教义与现代地图信息分别标注。
