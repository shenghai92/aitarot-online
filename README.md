# AI Tarot Online (aitarot.online)

一个强调隐私与关怀的 AI 占卜落地页，适配 Cloudflare Pages 静态托管。

## 已完成
- 首页文案：突出“先被理解，再被建议”
- 隐私主打：匿名、最小化采集、不卖数据
- Creem 支付入口占位（需替换为你的真实链接）
- 隐私政策页面
- SEO 基础：`robots.txt`、`sitemap.xml`

## 你需要提供（我才能继续代操作）
- Cloudflare API Token（有 Pages 与 DNS 编辑权限）
- Cloudflare 账户 ID
- 仓库远程地址与推送凭据（或你登录后我直接推）
- Creem 最终支付链接

## Cloudflare Pages 推荐设置
- Framework preset: `None`
- Build command: 留空
- Build output directory: `/`
- Root directory: `/`

## 上线后立即检查
- 将 `index.html` 内 `https://creem.io/` 替换为真实 Creem 链接
- 检查 DNS: `aitarot.online` 与 `www.aitarot.online`
- 开启 Cloudflare HTTPS 与 Always Use HTTPS

## 本地预览
```bash
npm run dev
# 打开 http://localhost:8787
```
