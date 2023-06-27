# Vehicle Tagging System Frontend

Clone the repository either by HTTPS or SSH

```bash
  git clone https://github.com/laryhills/vehicle-tag-svelte.git
```

_Note that you will need to have [Node.js](https://nodejs.org) installed._

## Get started

Install the dependencies...

```bash
cd vehicle-tag-svelte
npm install
```

Supply the API_ROOT in the .env file from the backend [Vehicle Tag API Repository](https://github.com/laryhills/vehicle-tag-api)

```bash
  API_ROOT=http://localhost:8000
```

...then start [Rollup](https://rollupjs.org):

```bash
npm run dev
```

Login with the following credentials

```bash
  email: superadmin@example.com
  password: password
```

Navigate to [localhost:5000](http://localhost:5000). You should see your app running. Edit a component file in `src`, save it, and reload the page to see your changes.

By default, the server will only respond to requests from localhost. To allow connections from other computers, edit the `sirv` commands in package.json to include the option `--host 0.0.0.0`.

## Building and running in production mode

To create an optimised version of the app:

```bash
npm run build
```
