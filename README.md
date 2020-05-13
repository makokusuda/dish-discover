# Dish info lookup app

This was created during my time as a student at Code Chrysalis.

This app helps you to think about the menu for meals.
You can search dishes by name, genre, and category. You cau submit your own dishes.
Enjoy!

## Project setup

### Install dependencies

```
yarn
```

### Local database

Create database

```
psql
CREATE DATABASE dishinfo
```

Run migration and seed data from JSON file on root directory

```
yarn runMigration
yarn seed
```

### Run app

Run the server

```
yarn start
```

Run the server in development with hot reloading

```
yarn start:server
```

Run the app

```
yarn start:client
```

Visit `http://localhost:8080/` to check the app

### Create compile file to deploy to Heroku

```
yarn build
```
