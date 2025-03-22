# backend/Dockerfile

# Node.jsの公式イメージを使う（バージョンはお好みで）
FROM node:18

# 作業ディレクトリを作成
WORKDIR /app

# package.jsonとpackage-lock.jsonをコピー
COPY package*.json ./

# 依存パッケージをインストール
RUN npm install

# アプリの全ファイルをコピー
COPY . .

# 必要なポートを公開（Expressが使うポート）
EXPOSE 8000

# サーバーを起動（必要に応じて `npm run dev` に変更も可）
CMD ["npm", "run", "start"]