# 归属于基督 · 三项联合信条研读

**主题：三项联合信条｜时间：2026-10-22（Asia/Taipei）｜版本：v1.0.0｜标识：三项联合信条-20261022-v1.0.0-GTstudy**

## 公开访问

- GitHub Pages：https://07-je-gt-love-personal-20260918.github.io/three-forms-20261022-v1-GTstudy/
- Surge：https://three-forms-20261022-v1-gtstudy.surge.sh
- Vercel：https://three-forms-20261022-v1-gtstudy.vercel.app
- 源码：https://github.com/07-Je-GT-Love-Personal-20260918/three-forms-20261022-v1-GTstudy

## 内容与范围

以欧陆改革宗三项联合信条为主线，提供整本圣经与圣约总览、历史时间线、西欧关系示意地图、三份文献比较、52主日及129问逐问解释与应用、37条信条逐条解读、多特59条正论和34条驳误逐条解释、常见误读与应用、237张分组记忆卡（12+129+37+59）、设备语音朗读、仅本机打开的PDF原文阅读台、深浅主题和打印排版。

这是全结构学习导读，不是穷尽性学术注释。尚未完成逐经文长篇释经、完整学术史注释或用户指定网站的全站研究。需继续由熟悉欧陆改革宗信条的牧者审阅。

## 原文与版权

指定原文来源为 https://ccifellowship.org/books/book-of-praise 。该2015版中文手册有明确版权保留和禁止未经许可翻印的声明。本仓库提供原创释义与官方阅读入口，不复制六份文献的整套中文译文，不声称逐字校对完成。用户提供的PDF只在本地用于资料定位，不公开上传。本站将作者解读与信条原文严格区分。

其他来源和版本注意事项见网页末尾。外部字体为可选增强，有系统字体回退；核心页面、地图和脚本无第三方运行库依赖。

## 开发

无构建依赖的静态HTML/CSS/JavaScript；Python只用于重新生成数据。

```text
python build.py
python -m http.server 8765 --directory dist
```

修改 `build.py` 后重新生成 `dist/study.json`；页面结构为 `dist/index.html`，样式为 `dist/style.css`，交互为 `dist/app.js`。

## 发布与恢复

- GitHub Pages：推送main后由GitHub Actions发布dist。仓库Pages的构建来源设置为GitHub Actions。
- Vercel：本版通过已登录的CLI将dist发布至生产环境。后续在本目录运行 `vercel deploy dist --prod --yes --scope abners-projects-6f97a189`。本版没有承诺或配置Vercel Git自动部署。
- Surge：使用已有登录会话运行 `npx surge ./dist three-forms-20261022-v1-gtstudy.surge.sh`。后续版本可更换域名版本号。
- 不将密钥、密码、登录状态、PDF参考材料提交到仓库。
- 恢复：切换到版本标签 `v1.0.0-20261022`，检查后重新部署dist。版本更新时修改README、网页版本标记并新增标签。

## 更新记录

### v1.0.0 · 2026-10-22

首个可发布学习版：建立三份文献的全部结构索引、综合导读、历史地图、比较、记忆与阅读交互。提供129问、37条、59条正论与34条驳误的原创逐条内容，增加237张卡片与私人PDF阅读台。保留官方原文链接；未转载受版权保护的中文全文。详细验证记录见 `VERIFICATION.md`。
