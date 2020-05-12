# Dish info lookup app

**Usage**

`yarn install`

setup your local database

```
psql
CREATE DATABASE dishinfo
yarn runMigration
yarn seed
```

start server

```
yarn start:server
```

Open `http://localhost:3000/`

start client

```
yarn start:client
```

Open `http://localhost:8080/`
