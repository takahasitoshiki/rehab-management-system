# frontend/Dockerfile

# 1. Node.jsベースのイメージを使用
FROM node:18

# 2. 作業ディレクトリを作成
WORKDIR /app

# 3. package.json と lock ファイルをコピー
COPY package*.json ./

# 4. パッケージをインストール
RUN npm install

# 5. 全てのファイルをコピー
COPY . .

# 6. Vite開発サーバーを起動
EXPOSE 5173
CMD ["npm", "run", "dev", "--", "--host"]