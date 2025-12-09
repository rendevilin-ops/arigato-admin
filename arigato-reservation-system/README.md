# Arigato Reservation System

Next.js + TailwindCSS で構築された飲食店予約管理システム。

## Features
- 顧客側予約UI
- 管理UI（予約一覧・顧客管理・臨時休業）
- n8n / GAS / Upstash と連携したフルスタック構成

## 開発環境

### 1. インストール
npm install

shell
コードをコピーする

### 2. 開発サーバー
npm run dev

markdown
コードをコピーする

## 環境変数
`.env.local` に以下を設定：

N8N_ENDPOINT=
GAS_ENDPOINT=
UPSTASH_REDIS_REST_URL=
UPSTASH_REDIS_REST_TOKEN=

shell
コードをコピーする

## デプロイ
Vercel 推奨。
vercel --prod
