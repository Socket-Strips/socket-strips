# Deploy

## Heroku and Vercel

### Heroku Server and DB

* Install the Heroku Postgres addon, it will automatically set `DATABASE_URL`.

* Set `CORS_ORIGIN` to the URL of the Vercel deployment, you can usually guess this using `{repo-name}.vercel.app` if `repo-name` is unique.

* Connect repo to Heroku and deploy main branch, Procfile should take care of the rest.

### Vercel Client

* Set `DATABASE_URL, NEXTAUTH_URL, NEXT_PUBLIC_SOCKET_URL, DISCORD_SECRET, DISCORD_ID` variables.

  * `DATABASE_URL` same as before.

  * `NEXTAUTH_URL` is the canonical url of your website, [see more](https://next-auth.js.org/configuration/options#nextauth_url).

  * `NEXT_PUBLIC_SOCKET_URL` is the heroku web url e.g. `https://{project-name}.herokuapp.com/`.

  * `DISCORD_SECRET, DISCORD_ID` are the respective details of the Discord app (used for auth).

* Set `Build & Development Settings` as follows:

  * Build: `mv ../prisma . && npx prisma generate && next build`

  * Install: `yarn && yarn add @prisma/client prisma typescript`

## Locally

### Local Server and DB

* Rename `.env.development.local` to `.env` in top folder (The one that has this README) and set the variables.

* Rename `.env.development.local` to `.env` in server folder and set the variables.

* Use Docker to host database:

  * ```docker run --name some-postgres -e POSTGRES_PASSWORD=12345 -d -p 5432:5432 postgres```

* Run `npx prisma generate` and `npx prisma migrate dev` if you ever make changes to the schema.

* Run `npx prisma migrate deploy` in production, [see more](https://www.prisma.io/docs/concepts/components/prisma-migrate#production-and-testing-environments).

* Run `yarn server`

### Local Client

* Rename `..env.local` to `.env.local` in client folder and set the variables.

* Run `yarn client`
