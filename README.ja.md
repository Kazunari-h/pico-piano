
# Pico Piano

TypeScript を中心に設計された Web Audio ツールキットです。ピアノ音源クラス、ADSR エンベロープ、ノート名ユーティリティ、及び React 用の `usePiano` フックを提供します。Next.js / Vite のデモと VitePress によるドキュメントサイトを同梱しています。

## 特徴

- `Piano` クラス: `play(note)` / `playHz(frequency)` などのユーティリティを提供
- ADSR エンベロープとベロシティ制御をサポート
- ノート名マッピング（`C0` → `B8`）
- React 向けの `usePiano` フックを提供
- VitePress ドキュメントサイトを同梱
- GitHub Actions による CI（ビルド / デプロイ）を用意

## インストール

```bash
npm install pico-piano
```

公開前にリポジトリから直接インストールして試すこともできます:

```bash
# デフォルトブランチの最新をインストール
npm install github:Kazunari-h/pico-piano

# または HTTPS の Git URL を指定
npm install git+https://github.com/Kazunari-h/pico-piano.git

# ブランチやタグ、コミットを指定する例
npm install github:Kazunari-h/pico-piano#main
```

注意:
- Git 経由インストール時にリポジトリ内の `prepare` スクリプトが実行され（本リポジトリでは `npm run build` を実行します）、`dist/` のビルド成果物が生成されます。
- `package.json` の `engines` に合わせて Node.js 20 以上を使用してください。

```ts
import Piano from "pico-piano";

const piano = new Piano({ sustain: 0.7 });
piano.play("C4", { duration: 1.2 });
```

### React フックの例

```tsx
import { usePiano } from "pico-piano";

const App = () => {
	const { play } = usePiano({ attack: 0.02 });
	return <button onClick={() => play("A4")}>Play A4</button>;
};
```

## モノレポ構成（抜粋）

- `src/` – パッケージ本体（公開対象）
- `apps/next-demo` – Next.js 14 デモ
- `apps/vite-demo` – Vite + React デモ
- `docs-site/` – VitePress ドキュメント

ルートの `package.json` にビルド用スクリプトをまとめています（`build` / `build:next` / `build:vite` / `build:docs` など）。

## ドキュメントのローカル確認

```bash
npm run dev:docs
```

ビルド出力は `docs-site/docs/.vitepress/dist` を想定しています。

## GitHub Actions（Docs デプロイの注意）

`gh-pages` への自動デプロイは Actions の `GITHUB_TOKEN` の権限に依存します。ワークフローに `permissions: contents: write` と `permissions: pages: write` を設定しておく必要があります。リポジトリ設定で Actions の権限が限定されている場合は、Personal Access Token（書き込み権限）を `secrets.GH_PAGES_PAT` に入れて `github_token: ${{ secrets.GH_PAGES_PAT }}` を使う方法に切り替えてください。

## ライセンス

MIT License

（このリポジトリは MIT ライセンスで公開されています）

---

英語版 README（`README.md`）と内容を揃えました。
