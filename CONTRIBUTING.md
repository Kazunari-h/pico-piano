# Contributing

Thank you for your interest in contributing to pico-piano! This document explains how to report issues, propose changes, and submit pull requests.

## Filing issues
- Use the repository Issues tab to report bugs or request features.
- Provide a clear title, steps to reproduce, and any relevant logs or screenshots.

## Development setup
1. Clone the repository and install dependencies:

```bash
git clone git@github.com:Kazunari-h/pico-piano.git
cd pico-piano
npm ci
```

2. Build the library and run demos:

```bash
npm run build
npm run dev:vite    # start Vite demo
npm run dev:docs    # start docs site
```

## Pull requests
- Fork the repo and create a feature branch.
- Keep changes focused and add tests where applicable.
- Update `CHANGELOG.md` under `Unreleased` with a short note for user-visible changes.
- Open a PR targeting `main` and describe the change and rationale.

## Code style & tests
- The project uses TypeScript; keep types accurate and export types where appropriate.
- Run `npm run build` before opening a PR to ensure type and build checks pass.

## License
By contributing you agree that your contributions will be licensed under the project's MIT license.

---

# 日本語

`pico-piano` に貢献していただきありがとうございます。ここでは issue の報告、開発セットアップ、プルリクの作成方法を説明します。

## Issue の報告
- Issue タブから不具合や要望を報告してください。
- 再現手順、ログ、スクリーンショットを添えると助かります。

## 開発環境の準備
1. リポジトリをクローンして依存をインストールします。

```bash
git clone git@github.com:Kazunari-h/pico-piano.git
cd pico-piano
npm ci
```

2. ビルドとデモの起動:

```bash
npm run build
npm run dev:vite    # Vite デモを起動
npm run dev:docs    # ドキュメントサイトを起動
```

## プルリクエスト
- Fork してブランチを作成してください。
- 変更は小さく分け、テストを追加できる場合は追加してください。
- `CHANGELOG.md` の `Unreleased` に変更点を簡単に追記してください。
- PR の説明に変更点と理由を明記してください。

## コードスタイルとテスト
- TypeScript を使用しています。型を正確に保ち、公開 API の型定義を忘れないでください。
- PR 前に `npm run build` を実行してビルドが通ることを確認してください。

## ライセンス
貢献はプロジェクトの MIT ライセンスの下で提供されることに同意したものとみなします。
