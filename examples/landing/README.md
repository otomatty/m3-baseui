# @m3/example-landing

`m3-baseui` を紹介する Astro 製ランディングページ。本文・特徴・導入手順は
静的 HTML として生成し（SEO 向け）、ライブデモのみ `@m3-baseui/react-tailwind`
を React アイランド（`client:visible`）として部分ハイドレートする。

## 開発

```bash
bun install
bun run --filter @m3/example-landing dev      # http://localhost:4321
bun run --filter @m3/example-landing build     # → dist/
bun run --filter @m3/example-landing preview    # ビルド結果をプレビュー
```

ワークスペースのライブラリは `@m3/source` 条件で TS ソースに解決するため、
事前ビルドは不要（dev / build / SSR すべてに設定済み）。

## Cloudflare Pages へのデプロイ

`output: "static"` の純静的サイトなので Cloudflare アダプタは不要。Pages は
`dist/` をそのまま配信する。

**Pages プロジェクト設定（ダッシュボード）**

| 項目 | 値 |
| --- | --- |
| Framework preset | Astro |
| Build command | `bun install && bun run --filter @m3/example-landing build` |
| Build output directory | `examples/landing/dist` |
| Root directory | （リポジトリルートのまま） |

**環境変数**

| 変数 | 用途 |
| --- | --- |
| `SITE_URL` | canonical / OGP / sitemap の絶対 URL。カスタムドメイン使用時に設定（未設定時は `https://m3-baseui.pages.dev`）。 |

`robots.txt` は `src/pages/robots.txt.ts` がビルド時に生成し、`SITE_URL` に
追従する。OGP 画像を使う場合は `public/og.png` を追加する（`src/layouts/Layout.astro`
の `image` 既定値が `/og.png`）。
