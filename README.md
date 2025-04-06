# リハビリ予約・患者管理システム

## ✨ アプリ概要
病院やリハビリ施設向けに開発された、患者情報とリハビリ予約を一元管理できるWebアプリケーションです。

---

## ⚙ ユースケース
- **療法士（セラピスト）** 向けの患者登録・編集機能
- リハビリ予約の登録・管理
- ログイン／ログアウトによる認証付き操作

---

## ✨ 主な機能
- 患者の新規登録 / 編集 / 削除
- リハビリ予約の作成 / 編集 / 確認
- ユーザー認証（JWTベース）
- レスポンシブなUI（Ant Design使用）

---

## 📊 技術スタック
| カテゴリ | 技術 |
|----------|-----------------------|
| Frontend | React / TypeScript / Vite / Ant Design |
| Backend  | Node.js / Express / Mongoose |
| DB       | MongoDB Atlas (Cloud) |
| Hosting  | AWS EC2 (Amazon Linux 2023) |
| Infra    | Docker / Docker Compose |
| その他    | .env による環境変数管理 |

---

## 🔧 開発フロー
```
rehab-management-system/
├── frontend/          # React + Vite frontend
├── backend/           # Node.js + Express backend
├── docker-compose.yml # Docker一括起動用設定
```

---

## 🚀 ローカル開発の立ち上げ
以下の手順でローカル環境を構築できます：

```bash
# リポジトリをクローン
$ git clone https://github.com/yourname/rehab-management-system.git

# ディレクトリに移動
$ cd rehab-management-system

# 環境変数ファイルをコピー
$ cp .env.example backend/.env

# Dockerコンテナをビルドして起動
$ docker-compose up --build
```

---

## 🌐 EC2 での本番動作
AWS EC2 上でアプリを動作させる手順：

1. EC2 インスタンスに接続：
    ```bash
    $ ssh -i ~/.ssh/aws-key.pem ec2-user@xx.xx.xx.xx
    ```

2. プロジェクトディレクトリに移動：
    ```bash
    $ cd rehab-management-system
    ```

3. Docker Compose を使用してアプリを起動：
    ```bash
    $ docker-compose up -d
    ```

---

## 🌟 今後の改善ポイント
- **モバイル対応**：React Native を使用したモバイルアプリの検討
- **インフラの拡張**：S3 や RDS への移行
- **多言語対応**：i18n 対応（日本語 / 英語）
- **アルタイム通信**：web socketを使用したリアルタイム通信

---

## 🚫 注意事項
- **MongoDB Atlas URI** は `.env` ファイルで管理し、公開しないように注意してください。
- 以下のファイルを変更する必要があります：
    - `docker-compose.yml`
    - `/frontend/.env`（パブリックIPに書き換え）

---

## ✨ 開発者
- **Toshiki T.** (https://github.com/takahasitoshiki)

---
## 🌍 デプロイ環境
本アプリケーションは以下の環境でデプロイされています：

- **URL（本番環境）**: [https://toshiki-portfolio.blog/login](https://toshiki-portfolio.blog/login)
- **ホスティングサービス**: AWS EC2 (Amazon Linux 2023)
- **データベース**: MongoDB Atlas (Cloud)
- **インフラ構成**: Docker / Docker Compose

このセクションには、プロジェクトの開発者や貢献者の名前とGitHubリンクを記載します。これにより、他の人が開発者に連絡を取ったり、他のプロジェクトを確認したりすることができます。

---

ご覧いただきありがとうございます！

