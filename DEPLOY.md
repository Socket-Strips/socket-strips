# Deploy

**Whether you deploy locally or not, make sure to check out the *Additional Details* section at the bottom of this page.**

<br />

## Heroku and Vercel

* Fork the [`prisma`](https://github.com/Socket-Strips/prisma), [`server`](https://github.com/Socket-Strips/server) and [`client`](https://github.com/Socket-Strips/client) submodules.

  * Update the `prisma` submodule in `server` and `client` to your own one.

### Heroku Server and DB

* Install the Heroku Postgres addon, it will automatically set `DATABASE_URL`.

* Set `CORS_ORIGIN` to the URL of the Vercel deployment, you can usually guess this using `{repo-name}.vercel.app` if `repo-name` is unique.

* Connect the `server` repo to Heroku and deploy main branch, Procfile should take care of the rest.

### Vercel Client

* Set `DATABASE_URL, NEXTAUTH_URL, NEXT_PUBLIC_SOCKET_URL, DISCORD_SECRET, DISCORD_ID` variables.

  * `DATABASE_URL` same as before.

  * `NEXTAUTH_URL` is the canonical url of your website, [see more](https://next-auth.js.org/configuration/options#nextauth_url).

  * `NEXT_PUBLIC_SOCKET_URL` is the heroku web url e.g. `https://{project-name}.herokuapp.com/`.

  * `DISCORD_SECRET, DISCORD_ID` are the respective details of the Discord app (used for auth).

* Set `Build & Development Settings` as follows:

  * Build: `mv ../prisma . && npx prisma generate && next build`

  * Install: `yarn && yarn add @prisma/client prisma typescript`

<br />

## Locally

* Clone this repo using `git clone --recurse-submodules` (to also clone submodules).

* Install deps in top folder (`yarn`).

### Local Server and DB

* Install deps in server folder (`yarn`).

* Rename `.env.development.local` to `.env` in server folder and set the variables.

* Use Docker to host database:

  * ```docker run --name some-postgres -e POSTGRES_PASSWORD=12345 -d -p 5432:5432 postgres```

* Run `npx prisma generate`.

* Run `npx prisma migrate dev` in **one** folder if you ever make changes to the schema.

  * Run `npx prisma migrate deploy` **in production**, [see more](https://www.prisma.io/docs/concepts/components/prisma-migrate#production-and-testing-environments).

* Run `yarn server`.

### Local Client

* Install deps in client folder (`yarn`).

* Rename `..env.local` to `.env.local` in client folder and set the variables.

* Run `npx prisma generate`.

* Run `yarn client`.

<br />

## Additional Details

### Git Submodules

This project uses *Git Submodules*; If you plan on changing anything, especially contributing, I ***highly*** advise you to [read up on the basics](https://gist.github.com/gitaarik/8735255).

### Discord

* Remember to set the OAauth2 redirect, e.g. `http://localhost:3000/api/auth/callback/discord`