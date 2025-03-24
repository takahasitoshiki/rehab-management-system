# リハビリ予約・患者管理システム

## ✨ アプリ概要
病院やリハビリ施設向けに開発された、患者情報とリハビリ予約を一元管理できるWebアプリケーションです。

---

## ⚙ユースケース
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

## 🔺開発フロー
```
rehab-management-system/
├── frontend/          # React + Vite frontend
├── backend/           # Node.js + Express backend
├── docker-compose.yml # Docker一括起動用設定
```

---

## 🚀 ローカル開発の立上
```bash
# ローカルで立上する場合
$ git clone https://github.com/yourname/rehab-management-system.git
$ cd rehab-management-system
$ cp .env.example backend/.env
$ docker-compose up --build
```

---

## 🌐 EC2 での本番動作
- AWS EC2 上にアプリを配置
- Docker Compose で frontend / backend を立ち上げ
- MongoDB Atlas URI を .env で管理

```bash
$ ssh -i ~/.ssh/aws-key.pem ec2-user@xx.xx.xx.xx
$ cd rehab-management-system
$ docker-compose up -d
```

---

## 🌟 これからの改善ポイント
- GitHub Actions で CI/CD 自動化
- モバイル対応 (React Native 検討)
- S3 や RDS への移行
- i18n 対応 (日本語 / 英語)

---

## 🚫 注意
- MongoDB Atlas URI は公開しないよう、.env で分離して管理しています
- 変更するファイル
    - docker-compose.yml
    - /frontend/.env
        - パブリックIPに書き換える；

---

## ✨ 開発者
- today (https://github.com/yourname)

---

ご覧頂きありがとうございます！

