# リハビリ予約・患者管理システム

## ✨ アプリ概要
病院やリハビリ施設向けに開発された、患者情報とリハビリ予約を一元管理できるWebアプリケーションです。

### 開発背景
元々理学療法士として働いていた時に使用していたリハ職専用のスケジュールシステムを自分なりに開発してみました。実際の現場では、患者の予約管理や情報共有に多くの時間を費やしており、より効率的で使いやすいシステムが必要だと感じていました。

### 解決したい課題
- **予約管理の複雑さ**: 手書きのスケジュール帳やExcelでの管理による予約の重複や漏れ
- **患者情報の分散**: カルテ、予約情報、治療記録が別々のシステムで管理されている
- **情報共有の非効率性**: 療法士間での患者情報やスケジュールの共有が困難
- **データの可視化不足**: 治療効果や予約状況の分析が困難

### システムの特徴
- **一元管理**: 患者情報、予約、治療記録を一つのシステムで管理
- **リアルタイム更新**: 予約の変更や患者情報の更新が即座に反映
- **直感的なUI**: 療法士が日常業務で使いやすいインターフェース
- **データ分析**: 予約状況や治療効果の可視化機能


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
- **E-mail** (daiamondtoshi@gmail.com)

---
## 🌍 デプロイ環境
本アプリケーションは以下の環境でデプロイされています：

- **URL（本番環境）**: [https://toshiki-portfolio.blog/login](https://toshiki-portfolio.blog/login)
- **デモ動画**:[https://youtu.be/txxzlPpnyWM]
- **ホスティングサービス**: AWS EC2 (Amazon Linux 2023)
- **データベース**: MongoDB Atlas (Cloud)
- **インフラ構成**: Docker / Docker Compose

---

ご覧いただきありがとうございます！

