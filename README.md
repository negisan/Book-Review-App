## Book Review App

> [API Document](https://app.swaggerhub.com/apis-docs/Takumaron/TechTrain-RailwayMission/1.0.0#/)

<br/>

## Project setup

### 上の API を利用する場合

#### client:

client ディレクトリに移動

```
$ cd client
```

以下のコマンドを実行してパッケージをインストール

```
$ yarn install
```

以下のコマンドで開発サーバーを起動

```
$ yarn start
```

<br/>

### backend も利用する場合

##### backend ディレクトリに移動してライブラリのインストール

```
$ cd backend
$ yarn install
```

##### MySql の準備

backend/config/config.json の username と password が MySql のユーザー名、パスワードと一致するように設定してください

動作確認(以下は ubuntu の cli での一例です。)

```
// インストールされているか確認
$ mysql --version

// MySqlが起動してなければ起動する
$ sudo /etc/init.d/mysql start

// ログインできるか確認
$ mysql -u root
```

##### DB の準備

```
// dbの作成

$ npx sequelize db:drop
$ npx sequelize db:create

// Migrationの実行
$ npx sequelize db:migrate

// ダミーデータの生成
$ npx sequelize db:seed:all

```

##### サーバーの起動

```
$ yarn run start
```

##### Client の起動

新しいターミナルを立ち上げて client ディレクトリへ移動

```
$ cd /client
```

<br/>

BASE_API_URL の変更

/client/src/helper/contrant.js の BASE_API_URL を http://localhost:4000 に切り替え

<br/>

アプリケーションの起動

```
$ yarn start
```

<br/>
