# Socket Strips

WIP

## Features

### Server and Client

Feature | Server | Client |
:------------ | :-------------| :-------------|
Create | :heavy_check_mark: |   |
Read | :heavy_check_mark: |  :heavy_check_mark: |
Update | :heavy_check_mark: |  :heavy_check_mark: |
Delete | :heavy_check_mark: |  :heavy_check_mark: |
Sockets | :heavy_check_mark: |  :heavy_check_mark: |
Docker |  |   |

### Server

* [x] Custom logger
* [x] DB setup
* [x] Seeding

### Client

* [ ] Proper design
* [x] Toasts

put socket into app useEffect

`npx prisma generate`

`npx prisma migrate dev`

`docker run --name some-postgres -e POSTGRES_PASSWORD=12345 -d -p 5432:5432 postgres`

CURRENTLY `chalk, dotenv, socket.io, and winston` ARE INSTALLED OUTSIDE SO HEROKU WORKS, CHANGE THIS

### Envs

Heroku: `CORS_ORIGIN, DATABASE_URL, SHADOW_DATABASE_URL`

Next:

* Commands:
  * Build: `mv ../prisma . && npx prisma generate && next build`
  * Install: `yarn && yarn add @prisma/client prisma typescript`
* Env: `DATABASE_URL, SHADOW_DATABASE_URL, NEXTAUTH_URL, NEXT_PUBLIC_SOCKET_URL, DISCORD_SECRET, DISCORD_ID`
